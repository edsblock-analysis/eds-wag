# blog.walgreens.com — EDS Migration Analysis

Evidence-based functional analysis of **all 804 URLs** in `url/blog-walgreens.txt`, prepared for migrating "The Thread" (blog.walgreens.com) from Adobe AEM to Edge Delivery Services.

## Deliverables

| File | What it is |
|---|---|
| **`dashboard.html`** | Interactive dashboard (open in a browser). Tabs: Overview, Templates, Blocks & Variations, Template→Block map, Observed Behaviors, Integrations, and a searchable list of all 804 URLs. Blocks & templates deep-link into the detailed report pages. |
| **`reports/index.html`** | **Detailed HTML report hub** — links to the full report plus one detailed page per block and per template. |
| **`reports/`** | 37 standalone HTML reports: `full-report.html`, `blocks.html`, `templates.html`, `behaviors.html`, `integrations.html`, 24 × `block-*.html` (per-block spec: variations, functional reqs, acceptance criteria, observed behavior, example source URLs), 7 × `template-*.html` (blocks used + full page list). |
| **`REPORT.md`** | Full written report (Markdown source): templates, block inventory, template→block→variation mapping, functional requirements, acceptance criteria, third-party integrations, complexity, and migration notes. |

## How the analysis was produced (reproducible)

Every URL was fetched and parsed individually (no sampling); interactive behavior was verified live with Playwright. Scripts + data live in `data/`:

| File | Role |
|---|---|
| `data/fetch-extract.js` | Fetches all 804 URLs (cached to `pages/`) and extracts per-URL structure → `pages.json`. |
| `data/aggregate.js` | Classifies templates & aggregates blocks/variations/integrations → `summary.json`, `url-templates.json`. |
| `data/block-catalog.js` | Hand-authored block knowledge layer (functional reqs, acceptance criteria, complexity) → `block-catalog.json`. |
| `data/observed-behaviors.json` | Playwright-verified interactive behaviors per block/template. |
| `data/gen-report.js` / `data/gen-dashboard.js` / `data/gen-detailed.js` | Render `REPORT.md`, `dashboard.html`, and the `reports/` detailed HTML pages. |
| `pages/` | Raw HTML evidence cache (804 files). |

To regenerate (requires `cheerio`): `cd data && npm i cheerio && node fetch-extract.js && node aggregate.js && node block-catalog.js && node gen-report.js && node gen-detailed.js && node gen-dashboard.js`.

## Headline findings

- **804 URLs**, all HTTP 200. Platform: **Adobe AEM Sites** (WCM Core Components, Experience Fragments, Scene7/Dynamic Media, Adobe Launch + Client Data Layer, OneTrust).
- **7 templates**: Article (710), Category Hub (32), Video Episode (23), Video Transcript (23), Buying Guide (7), Category Listing/Community (7), Home/Landing (2).
- **24 EDS blocks / 36 variations**. 8 High-, 7 Medium-, 9 Low-complexity.
- 50 URLs are content-hub mirror duplicates; 30 are Spanish variants — same templates/blocks, content only.
- Effort is dominated by **content volume** (88% Article pages); interactive complexity is concentrated on home/hub/video pages.
