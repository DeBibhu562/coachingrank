import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CRAWLED_DIR = path.resolve(ROOT_DIR, 'data', 'crawled');
const MANIFEST_FILE = path.resolve(CRAWLED_DIR, 'manifest.json');
const ALL_CRAWLED_FILE = path.resolve(CRAWLED_DIR, 'all_crawled_rankings.json');
const RANKINGS_JSON_FILE = path.resolve(ROOT_DIR, 'src', 'data', 'rankings.generated.json');

const DEFAULT_BATCH_SIZE = 15;

function loadCrawledData() {
  if (!fs.existsSync(ALL_CRAWLED_FILE)) {
    throw new Error(`Crawled data file not found at ${ALL_CRAWLED_FILE}. Run 'node scripts/crawl-coachingcompare.mjs' first.`);
  }
  const all = JSON.parse(fs.readFileSync(ALL_CRAWLED_FILE, 'utf8'));
  // Filter for pages with rankings
  return all.filter((p) => p.hasRankings && p.institutes && p.institutes.length > 0);
}

function loadManifest() {
  if (fs.existsSync(MANIFEST_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
    } catch {
      // fallback
    }
  }
  return { items: {} };
}

function saveManifest(manifest) {
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf8');
}

function loadCurrentRankings() {
  if (!fs.existsSync(RANKINGS_JSON_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(RANKINGS_JSON_FILE, 'utf8'));
}

function saveCurrentRankings(rankings) {
  fs.writeFileSync(RANKINGS_JSON_FILE, JSON.stringify(rankings, null, 2), 'utf8');
}

function getBatches(crawledPages, batchSize = DEFAULT_BATCH_SIZE) {
  const manifest = loadManifest();
  const batches = [];
  for (let i = 0; i < crawledPages.length; i += batchSize) {
    const batchNum = Math.floor(i / batchSize) + 1;
    const pages = crawledPages.slice(i, i + batchSize);
    const isPublished = pages.every((p) => manifest.items[p.slug]?.published === true);
    const somePublished = pages.some((p) => manifest.items[p.slug]?.published === true);

    const exams = [...new Set(pages.map((p) => p.exam))];
    const cities = [...new Set(pages.map((p) => p.city).filter(Boolean))];

    batches.push({
      batchNumber: batchNum,
      size: pages.length,
      isPublished,
      somePublished,
      exams,
      cities,
      pages,
    });
  }
  return batches;
}

function cleanTextForCoachingRank(text) {
  if (!text) return '';
  return text
    .replace(/CoachingCompare\.in/gi, 'CoachingRank.in')
    .replace(/CoachingCompare/gi, 'CoachingRank')
    .replace(/coachingcompare\.in/gi, 'coachingrank.in');
}

function transformCrawledPageToRankingPage(p) {
  return {
    slug: p.slug,
    title: cleanTextForCoachingRank(p.title),
    exam: p.exam,
    city: p.city || null,
    criterion: p.criterion || null,
    institutes: (p.institutes || []).map((inst) => ({
      rank: inst.rank,
      name: inst.name,
      slug: inst.slug,
      blurb: cleanTextForCoachingRank(inst.blurb),
      inspectionScore: inst.inspectionScore ?? null,
      rating: inst.rating ?? null,
      reviewCount: inst.reviewCount ?? null,
      phone: inst.phone ?? null,
      email: inst.email ?? null,
      website: inst.website ?? null,
      address: inst.address ?? null,
      locality: inst.locality ?? null,
      batchSize: inst.batchSize ?? null,
      feesEstimate: inst.feesEstimate ?? null,
    })),
    faqs: (p.faqs || []).map((faq) => ({
      question: cleanTextForCoachingRank(faq.question),
      answer: cleanTextForCoachingRank(faq.answer),
    })),
    sourceUrl: p.sourceUrl,
    metaDescription: cleanTextForCoachingRank(p.metaDescription),
    isOnline: Boolean(p.isOnline),
  };
}

export function listBatches(batchSize = DEFAULT_BATCH_SIZE) {
  const crawledPages = loadCrawledData();
  const batches = getBatches(crawledPages, batchSize);
  const currentRankings = loadCurrentRankings();
  const currentSlugs = new Set(currentRankings.map((r) => r.slug));

  console.log('========================================================================');
  console.log('              COACHINGRANK — BATCH PAGE MANAGER STATUS                 ');
  console.log('========================================================================');
  console.log(`Total Crawled Pages with Rankings: ${crawledPages.length}`);
  console.log(`Currently Active in CoachingRank:  ${currentRankings.length}`);
  console.log(`Batch Size:                        ${batchSize} pages per batch`);
  console.log(`Total Batches Available:           ${batches.length}`);
  console.log('------------------------------------------------------------------------\n');

  for (const b of batches) {
    const statusLabel = b.isPublished
      ? '\x1b[32m[PUBLISHED]\x1b[0m'
      : b.somePublished
      ? '\x1b[33m[PARTIALLY PUBLISHED]\x1b[0m'
      : '\x1b[36m[READY TO CREATE]\x1b[0m';

    console.log(`Batch #${b.batchNumber}  ${statusLabel}  (${b.size} pages)`);
    console.log(`  Exams:  ${b.exams.join(', ') || 'General'}`);
    console.log(`  Cities: ${b.cities.join(', ') || 'National'}`);
    console.log('  Pages:');
    for (const p of b.pages.slice(0, 5)) {
      const active = currentSlugs.has(p.slug) ? '✓' : '•';
      console.log(`    ${active} /rankings/${p.slug} (${p.institutes.length} insts)`);
    }
    if (b.pages.length > 5) {
      console.log(`    ... and ${b.pages.length - 5} more`);
    }
    console.log('');
  }

  console.log('To create/publish a batch, run:');
  console.log('  node scripts/batch-pages.mjs create --batch=1');
  console.log('  node scripts/batch-pages.mjs create --next');
  console.log('========================================================================\n');
}

export function createBatch(batchNumber, batchSize = DEFAULT_BATCH_SIZE) {
  const crawledPages = loadCrawledData();
  const batches = getBatches(crawledPages, batchSize);
  const targetBatch = batches.find((b) => b.batchNumber === batchNumber);

  if (!targetBatch) {
    throw new Error(`Batch #${batchNumber} does not exist. Available: 1 to ${batches.length}`);
  }

  console.log(`\nPublishing Batch #${batchNumber} (${targetBatch.size} pages)...`);

  const currentRankings = loadCurrentRankings();
  const currentMap = new Map(currentRankings.map((r) => [r.slug, r]));
  const manifest = loadManifest();

  let added = 0;
  let updated = 0;

  for (const rawPage of targetBatch.pages) {
    const formatted = transformCrawledPageToRankingPage(rawPage);
    if (currentMap.has(formatted.slug)) {
      updated++;
    } else {
      added++;
    }
    currentMap.set(formatted.slug, formatted);

    // Update manifest
    manifest.items[formatted.slug] = {
      ...(manifest.items[formatted.slug] || {}),
      status: 'crawled',
      published: true,
      batchNumber,
      publishedAt: new Date().toISOString(),
    };
  }

  const updatedRankings = Array.from(currentMap.values());
  saveCurrentRankings(updatedRankings);
  saveManifest(manifest);

  console.log(`\n✓ Successfully published Batch #${batchNumber}!`);
  console.log(`  Added:   ${added} new pages`);
  console.log(`  Updated: ${updated} existing pages`);
  console.log(`  Total Active Pages in CoachingRank: ${updatedRankings.length}`);
  console.log('\nPages published in this batch:');
  for (const p of targetBatch.pages) {
    console.log(`  • /rankings/${p.slug} -> "${cleanTextForCoachingRank(p.title)}" (${p.institutes.length} institutes)`);
  }
  console.log('');
}

export function createNextBatch(batchSize = DEFAULT_BATCH_SIZE) {
  const crawledPages = loadCrawledData();
  const batches = getBatches(crawledPages, batchSize);
  const nextBatch = batches.find((b) => !b.isPublished);

  if (!nextBatch) {
    console.log('\nAll batches are already published! Nothing to create.');
    return;
  }

  createBatch(nextBatch.batchNumber, batchSize);
}

export function createAllBatches(batchSize = DEFAULT_BATCH_SIZE) {
  const crawledPages = loadCrawledData();
  const batches = getBatches(crawledPages, batchSize);

  console.log(`\nPublishing ALL ${batches.length} batches (${crawledPages.length} pages)...`);
  for (const b of batches) {
    createBatch(b.batchNumber, batchSize);
  }
}

// CLI entry point
const args = process.argv.slice(2);
const command = args[0] || 'list';

const batchSizeArg = args.find((a) => a.startsWith('--size='));
const batchSize = batchSizeArg ? Number(batchSizeArg.split('=')[1]) : DEFAULT_BATCH_SIZE;

const batchNumArg = args.find((a) => a.startsWith('--batch='));
const batchNumber = batchNumArg ? Number(batchNumArg.split('=')[1]) : null;

try {
  if (command === 'list' || command === 'status') {
    listBatches(batchSize);
  } else if (command === 'create') {
    if (args.includes('--all')) {
      createAllBatches(batchSize);
    } else if (args.includes('--next')) {
      createNextBatch(batchSize);
    } else if (batchNumber !== null) {
      createBatch(batchNumber, batchSize);
    } else {
      console.log('Specify a batch number to create, e.g.:');
      console.log('  node scripts/batch-pages.mjs create --batch=1');
      console.log('  node scripts/batch-pages.mjs create --next');
      console.log('  node scripts/batch-pages.mjs create --all');
    }
  } else {
    console.log(`Unknown command: ${command}`);
    console.log('Usage: node scripts/batch-pages.mjs [list|status|create] [--batch=N] [--next] [--size=15]');
  }
} catch (err) {
  console.error('\nError:', err.message);
  process.exit(1);
}
