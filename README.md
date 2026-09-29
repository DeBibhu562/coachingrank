# CoachingRank.in

Independent coaching rankings, exam/city hubs, and answer-first pages for Google + AI search.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Vanilla CSS design system (white surfaces / brand red accent)
- Docker + Caddy-friendly compose on port `3021`

## Develop

```bash
cp .env.example .env
npm install
npm run dev
```

## Categories

- `/rankings/{keyword-slug}` (also accessible via direct `/{keyword-slug}`)
- `/exam/{exam}-coaching-rankings`
- `/city/best-coaching-institutes-in-{city}`
- `/institute/{brand-slug}`
- `/compare/{ranking-slug}-comparison`
- `/criterion/best-coaching-as-per-{criterion}`

## Crawl & Batch Creation Pipeline

To crawl pages from `coachingcompare.in` and generate pages in batches of 10–15:

### 1. Crawl Target Data
```bash
# Crawl all ranking pages from coachingcompare.in (saves to data/crawled/)
npm run crawl

# Force re-crawl ignoring cache:
node scripts/crawl-coachingcompare.mjs --force
```

### 2. Check Batch Status
```bash
# View all available batches, published status, exams, and cities
npm run batch:status
```

### 3. Create / Publish in Batches (10–15 pages at a time)
```bash
# Publish next batch of 15 pages:
node scripts/batch-pages.mjs create --next

# Publish next batch with custom batch size (e.g., 10 pages):
node scripts/batch-pages.mjs create --next --size=10

# Publish a specific batch (e.g. Batch #3):
node scripts/batch-pages.mjs create --batch=3

# Publish all batches:
node scripts/batch-pages.mjs create --all
```

### 4. Data Storage Structure
- `data/crawled/manifest.json`: Index tracking all URLs, crawl & batch publish status.
- `data/crawled/pages/<slug>.json`: Complete individual structured JSON for each page (titles, ranks, institutes, inspection scores, fees, batch sizes, FAQs).
- `data/crawled/all_crawled_rankings.json`: Aggregated master dataset of all crawled pages.
- `src/data/rankings.generated.json`: Active production dataset powering all Next.js static pages.

## Contact

info@coachingrank.in
