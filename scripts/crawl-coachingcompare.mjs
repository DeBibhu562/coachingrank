import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CRAWLED_DIR = path.resolve(ROOT_DIR, 'data', 'crawled');
const PAGES_DIR = path.resolve(CRAWLED_DIR, 'pages');
const MANIFEST_FILE = path.resolve(CRAWLED_DIR, 'manifest.json');
const ALL_CRAWLED_FILE = path.resolve(CRAWLED_DIR, 'all_crawled_rankings.json');

const EXAMS = [
  'clat-pg', 'cuet-pg-law', 'du-llb', 'clat', 'ailet', 'judiciary',
  'jee', 'neet', 'upsc', 'cat', 'ipmat', 'ssc', 'banking', 'gate',
  'nda', 'cuet', 'ctet', 'class-10-boards', 'class-12-boards',
  'foundation', 'study-abroad', 'share-market'
];

const CITIES = [
  'south-delhi', 'delhi', 'mumbai', 'bangalore', 'hyderabad', 'chennai', 'kolkata',
  'pune', 'jaipur', 'lucknow', 'chandigarh', 'gurgaon', 'noida',
  'ahmedabad', 'surat', 'kanpur', 'nagpur', 'indore', 'patna', 'kota',
  'bhopal', 'dehradun', 'ranchi', 'coimbatore', 'visakhapatnam',
  'varanasi', 'guwahati', 'bhubaneswar', 'amritsar',
  'thiruvananthapuram', 'kochi'
];

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseSlug(slug) {
  let s = slug.replace(/^best-|^top-/, '');
  const isOnline = s.startsWith('online-');
  if (isOnline) s = s.replace(/^online-/, '');

  let exam = null;
  for (const e of EXAMS) {
    if (s.startsWith(e + '-coaching') || s === e + '-coaching' || s.startsWith(e)) {
      exam = e;
      break;
    }
  }

  let city = null;
  const inMatch = s.match(/-in-([a-z-]+)/);
  if (inMatch) {
    const candidate = inMatch[1].split('-as-per-')[0];
    for (const c of CITIES) {
      if (candidate === c || candidate.startsWith(c)) {
        city = c;
        break;
      }
    }
  }

  let criterion = null;
  const asPerMatch = s.match(/-as-per-([a-z-]+)/);
  if (asPerMatch) {
    criterion = asPerMatch[1];
  }

  return { slug, exam: exam || 'general', city, criterion, isOnline };
}

function extractRscMetrics(html) {
  const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  const allRsc = scripts.join('');

  const scores = [...allRsc.matchAll(/\\\"inspectionScore\\\":(\d+)/g)].map(m => Number(m[1]));
  const batchSizes = [...allRsc.matchAll(/\\\"batchSize\\\":\\\"([^"\\]+)\\\"/g)].map(m => m[1]);
  const fees = [...allRsc.matchAll(/\\\"feesEstimate\\\":\\\"([^"\\]+)\\\"/g)].map(m => m[1]);
  return { scores, batchSizes, fees };
}

function parsePageHtml(html, url, slug) {
  const title = (html.match(/<title>([^<]+)<\/title>/)?.[1] || '').trim();
  const metaDesc = html.match(/<meta name="description" content="([^"]+)"/)?.[1] || '';
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';

  const { exam, city, criterion, isOnline } = parseSlug(slug);

  let institutes = [];
  let faqs = [];

  const jsonLds = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  for (const m of jsonLds) {
    try {
      const p = JSON.parse(m[1]);
      if (p['@type'] === 'ItemList' && Array.isArray(p.itemListElement)) {
        institutes = p.itemListElement.map((elem) => {
          const it = elem.item || {};
          return {
            rank: elem.position || 1,
            name: it.name || 'Ranked Institute',
            slug: slugify(it.name || ''),
            blurb: (it.description || '').trim(),
            rating: it.aggregateRating?.ratingValue ? Number(it.aggregateRating.ratingValue) : null,
            reviewCount: it.aggregateRating?.reviewCount ? Number(it.aggregateRating.reviewCount) : null,
            phone: it.telephone || null,
            email: it.email || null,
            website: it.url || null,
            address: it.address?.streetAddress || null,
            locality: it.address?.addressLocality || null,
          };
        });
      }
      if (p['@type'] === 'FAQPage' && Array.isArray(p.mainEntity)) {
        faqs = p.mainEntity.map((f) => ({
          question: (f.name || f.question || '').trim(),
          answer: (f.acceptedAnswer?.text || f.answer || '').trim(),
        }));
      }
    } catch {
      // ignore JSON parse errors in malformed script tags
    }
  }

  // Merge extra metrics from RSC if available
  const { scores, batchSizes, fees } = extractRscMetrics(html);
  institutes = institutes.map((inst, idx) => ({
    ...inst,
    inspectionScore: scores[idx] !== undefined ? scores[idx] : null,
    batchSize: batchSizes[idx] || null,
    feesEstimate: fees[idx] || null,
  }));

  // Clean title for CoachingRank (replace brand name if needed, but preserve full title)
  const cleanTitle = title.replace(/\s*\|\s*CoachingCompare\.in/i, '').trim();

  return {
    sourceUrl: url,
    slug,
    title: cleanTitle || h1 || slug,
    rawTitle: title,
    h1: h1 || cleanTitle,
    metaDescription: metaDesc,
    exam,
    city,
    criterion,
    isOnline,
    institutes,
    faqs,
    hasRankings: institutes.length > 0,
    crawledAt: new Date().toISOString(),
  };
}

async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      return await res.text();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
}

async function getRankingUrlsFromSitemap() {
  console.log('Fetching sitemap from https://coachingcompare.in/sitemap.xml...');
  const xml = await fetchWithRetry('https://coachingcompare.in/sitemap.xml');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

  // Filter ranking URLs (best-* and top-*)
  const rankingUrls = [...new Set(locs.filter((url) => {
    const slug = url.replace('https://coachingcompare.in/', '');
    return slug.startsWith('best-') || slug.startsWith('top-');
  }))];

  console.log(`Found ${locs.length} total URLs in sitemap, ${rankingUrls.length} unique ranking URLs.`);
  return rankingUrls;
}

export async function crawlAll(options = {}) {
  const force = Boolean(options.force);
  const concurrency = options.concurrency || 5;
  const limit = options.limit || Infinity;

  fs.mkdirSync(PAGES_DIR, { recursive: true });

  const urls = await getRankingUrlsFromSitemap();
  const targetUrls = urls.slice(0, limit);

  // Load existing manifest if present
  let manifest = {
    updatedAt: new Date().toISOString(),
    totalDiscovered: targetUrls.length,
    crawledCount: 0,
    failedCount: 0,
    items: {},
  };

  if (fs.existsSync(MANIFEST_FILE) && !force) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
    } catch {
      // fresh manifest
    }
  }

  const queue = [...targetUrls];
  let processed = 0;
  let crawledSuccess = 0;
  let failed = 0;
  const allResults = [];

  console.log(`Starting crawl of ${targetUrls.length} pages (concurrency: ${concurrency})...`);

  async function worker(workerId) {
    while (queue.length > 0) {
      const url = queue.shift();
      const slug = url.replace('https://coachingcompare.in/', '');
      const pageFile = path.resolve(PAGES_DIR, `${slug}.json`);

      // If already crawled and not force, read from cache
      if (!force && fs.existsSync(pageFile) && manifest.items[slug]?.status === 'crawled') {
        try {
          const cached = JSON.parse(fs.readFileSync(pageFile, 'utf8'));
          allResults.push(cached);
          processed++;
          crawledSuccess++;
          continue;
        } catch {
          // re-crawl if file corrupt
        }
      }

      try {
        const html = await fetchWithRetry(url);
        const data = parsePageHtml(html, url, slug);

        fs.writeFileSync(pageFile, JSON.stringify(data, null, 2), 'utf8');

        manifest.items[slug] = {
          url,
          slug,
          title: data.title,
          exam: data.exam,
          city: data.city,
          criterion: data.criterion,
          institutesCount: data.institutes.length,
          faqsCount: data.faqs.length,
          status: 'crawled',
          crawledAt: data.crawledAt,
        };

        allResults.push(data);
        crawledSuccess++;
        processed++;

        if (processed % 10 === 0 || processed === targetUrls.length) {
          console.log(`[Worker ${workerId}] Crawled ${processed}/${targetUrls.length} pages (${data.institutes.length} insts: ${slug})`);
        }
      } catch (err) {
        console.error(`[Worker ${workerId}] Failed to crawl ${slug}:`, err.message);
        manifest.items[slug] = {
          url,
          slug,
          status: 'failed',
          error: err.message,
          attemptedAt: new Date().toISOString(),
        };
        failed++;
        processed++;
      }

      // Small delay between requests to be polite
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  const workers = Array.from({ length: concurrency }, (_, i) => worker(i + 1));
  await Promise.all(workers);

  manifest.updatedAt = new Date().toISOString();
  manifest.totalDiscovered = targetUrls.length;
  manifest.crawledCount = crawledSuccess;
  manifest.failedCount = failed;

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf8');
  fs.writeFileSync(ALL_CRAWLED_FILE, JSON.stringify(allResults, null, 2), 'utf8');

  console.log('\n--- Crawl Finished ---');
  console.log(`Total URLs: ${targetUrls.length}`);
  console.log(`Successfully crawled: ${crawledSuccess}`);
  console.log(`Failed: ${failed}`);
  console.log(`Manifest written to: ${MANIFEST_FILE}`);
  console.log(`Aggregated dataset: ${ALL_CRAWLED_FILE}`);

  return { crawledSuccess, failed, total: targetUrls.length };
}

// Run directly from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const force = process.argv.includes('--force');
  const limitArg = process.argv.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity;

  crawlAll({ force, limit }).catch((err) => {
    console.error('Fatal crawler error:', err);
    process.exit(1);
  });
}
