# site-analysis toolkit

Crawl a list of URLs and generate an **EDS-migration functional analysis report
suite** — dashboard, per-block & per-template detail pages, a consolidated report,
and a dev-only effort estimate. Output matches `report/blog-walgreens/`.

## One command

```bash
ANALYSIS_DATE=$(date +%F) node tools/site-analysis/run-analysis.js \
  --urls url/<name>.txt --out report/<slug> --slug <slug>
```

- `--urls` (required): text file, one URL per line (leading `123  ` line numbers OK).
- `--slug` (optional): defaults to the URL file's base name.
- `--out` (optional): defaults to `report/<slug>`.
- `ANALYSIS_DATE` (optional env): stamps the reports; defaults to a placeholder.

First run auto-installs `cheerio` into this folder.

## What it produces (`report/<slug>/`)

```
dashboard.html         interactive dashboard (tabs, searchable URL list)
estimates.html         dev-only effort estimate (hours)
REPORT.md              full written report
reports/index.html     report hub → full report, per-block, per-template, behaviors, integrations
pages/                 raw HTML evidence cache (one file per URL)
data/                  pages.json, summary.json, block-catalog.json, url-templates.json, (observed-behaviors.json)
```

## Pipeline (each step is runnable on its own)

| Step | Script | Does |
|---|---|---|
| 1 | `1-fetch-extract.js` | Fetch every URL (cached), extract components/variations/embeds/integrations → `data/pages.json` |
| 2 | `2-aggregate.js` | Classify templates, aggregate → `data/summary.json`, `data/url-templates.json` |
| 3 | `3-build-catalog.js` | Merge components with the knowledge base → `data/block-catalog.json` (unknowns flagged `needsReview`) |
| 4 | `4-generate.js` | Render REPORT.md, dashboard.html, estimates.html, reports/*.html |

Re-run step 4 anytime after editing `block-catalog.json` or adding
`data/observed-behaviors.json`.

## Knowledge base (extend this to improve future runs)

- `knowledge/aem-wcm-blocks.json` — AEM WCM Core Component → EDS block mappings with
  functional requirements, acceptance criteria, complexity and Playwright verify hints.
- `knowledge/detectors.json` — third-party integration regexes, template labels,
  `ignoreComponents` (structural wrappers) and `foldInto` (composite sub-parts).

When a run flags `needsReview` blocks, complete them in the output catalog **and**
add them here so the next site gets them automatically.

## Interactive verification

Scripts can't click. The agent (see `.claude/skills/site-analysis/SKILL.md`) drives
Playwright on representative pages, writes `data/observed-behaviors.json`, then re-runs
step 4 to embed the observed behavior into the block detail pages and dashboard.

## Notes

- Extractor keys on WCM Core `cmp-*` classes (AEM). Non-AEM sites will produce more
  `needsReview` stubs.
- Validated against `url/blog-walgreens.txt`: reproduces 804 URLs → 7 templates
  (710/32/23/23/7/7/2), matching the hand-built reference report.
