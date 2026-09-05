---
name: site-analysis
description: Generate a full EDS-migration functional analysis report suite from a list of URLs. Crawls every URL individually, classifies templates, builds a block/variation catalog with functional requirements + acceptance criteria + complexity, detects third-party integrations, verifies interactive behavior with Playwright, and produces a dashboard, per-block/per-template detail pages, a consolidated report and a dev-only effort estimate under report/<slug>/. Use when the user gives a URL list (or a url/*.txt file) and asks for site analysis, block inventory, migration analysis, or effort estimates.
---

# Site Analysis → EDS Migration Report Suite

Given a list of URLs, produce the same report suite as `report/blog-walgreens/`
(dashboard + detailed reports + consolidated REPORT.md + dev estimate), based on
**observed evidence from every URL** — never a sample.

The toolkit at `tools/site-analysis/` does all the mechanical work. Your job is to
run it, then add the two things scripts cannot: **Playwright-verified interactive
behavior** and **completing any auto-stubbed blocks**.

## Inputs
- A URL list: either a path like `url/<name>.txt` (one URL per line; leading
  `123  ` line numbers are tolerated) or URLs the user pasted (write them to
  `url/<name>.txt` first).
- `slug` = the list's base name (e.g. `blog-walgreens`). Output goes to `report/<slug>/`.

## Steps

1. **Confirm scope.** State how many URLs will be analyzed and the output path
   `report/<slug>/`. If the count is very large (>500) note it will take a few minutes.

2. **Run the pipeline** (installs cheerio on first use):
   ```bash
   node tools/site-analysis/run-analysis.js --urls url/<name>.txt --out report/<slug> --slug <slug>
   ```
   Pass the current date via `ANALYSIS_DATE` env var so reports are dated, e.g.
   `ANALYSIS_DATE=2026-09-05 node tools/site-analysis/run-analysis.js …`.
   This writes `report/<slug>/{data,pages,reports}`, `dashboard.html`,
   `estimates.html`, `REPORT.md`. Read the step output.

3. **Complete auto-stubbed blocks.** If step 3 printed `NEED AGENT REVIEW`, open
   `report/<slug>/data/block-catalog.json` and, for each block with
   `"needsReview": true`, fill in `name`, `edsBlock`, `complexity` (+`complexityReason`),
   `functional[]` and `acceptance[]` from the component's markup (inspect a page in
   `report/<slug>/pages/`). Then **also add the component to
   `tools/site-analysis/knowledge/aem-wcm-blocks.json`** (or `ignoreComponents` /
   `foldInto` in `detectors.json` if it's a wrapper/sub-part) so future runs are
   automatic. Most AEM WCM components are already known; stubs mean something new.

4. **Verify interactive behavior with Playwright.** Pick one representative live URL
   per template and per interactive block (nav, search, carousels, pagination,
   accordions/jump-to-section, video/embeds, episode carousels, scroll-to-top).
   Use the Playwright MCP tools to actually interact (click, hover, type) and record
   what happens — states, transitions, whether pagination reloads or swaps in place,
   whether carousels auto-advance, what a search endpoint returns, etc. Write findings
   to `report/<slug>/data/observed-behaviors.json` in this shape:
   ```json
   { "verifiedVia": "Playwright on <host> (<date>)",
     "behaviors": {
       "<block-id>": { "observed": "what you saw when interacting",
                       "states": ["state-a","state-b"] } }
   }
   ```
   Key by the block `id` from `block-catalog.json` (e.g. `header`, `search`,
   `hero-carousel`, `paginate`, `slick-carousel`, `jump-to-section`, `video-embed`,
   `episode-container`, `card`). Behaviors are embedded into the block detail pages
   and the dashboard.

5. **Regenerate reports** to fold in your edits + behaviors:
   ```bash
   ANALYSIS_DATE=<date> node tools/site-analysis/4-generate.js --urls url/<name>.txt --out report/<slug> --slug <slug>
   ```

6. **Verify output.** Optionally serve `report/<slug>/` over HTTP and open
   `dashboard.html` + a block detail page with Playwright to confirm rendering and
   that links resolve. Report the headline numbers (URLs, templates, blocks,
   variations, estimate) to the user and point them to
   `report/<slug>/dashboard.html` and `report/<slug>/reports/index.html`.

## Notes
- **Evidence, not extrapolation.** Every URL is fetched and parsed. Do not infer
  blocks/templates from a subset.
- **Theme:** light background, blue header (already built into the generators).
- **Non-AEM sites:** the extractor keys on WCM Core `cmp-*` classes. If a site is
  not AEM, most components will land in `needsReview` — expect to author more of the
  catalog by hand and to extend the knowledge base. The template classifier has a
  structural fallback but confirm its output.
- **Re-runs are cheap:** raw HTML is cached in `report/<slug>/pages/`; re-running
  only re-parses. Delete a page file to force a re-fetch.
- **Committing:** the `pages/` cache can be large. Ask the user whether to commit it
  (as we did for blog-walgreens) or add `report/<slug>/pages/` to `.gitignore`.
- The whole `report/` tree is already excluded from EDS serving via `.hlxignore`
  (`.*` + `*.md`, and it's not linked from the site).
