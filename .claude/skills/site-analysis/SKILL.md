---
name: site-analysis
description: Generate a full EDS-migration functional analysis report suite from a list of URLs. Crawls every URL individually, classifies templates, builds a block/variation catalog with functional requirements + acceptance criteria + complexity, maps user journeys, inventories forms, detects third-party integrations (and flags unknown ones), verifies interactive behavior with Playwright, and produces a dashboard, per-block/per-template detail pages, a consolidated report and a dev-only effort estimate under report/<slug>/. Use when the user gives a URL list (or a url/*.txt file) and asks for site analysis, block inventory, migration analysis, user journeys, or effort estimates.
---

# Site Analysis → EDS Migration Report Suite

Given a list of URLs, produce an evidence-based analysis (dashboard + detailed
reports + REPORT.md + dev estimate) matching `report/blog-walgreens/`.

**Core principle: ANALYSE, DON'T ASSUME.** Websites differ — new blocks, unfamiliar
functionality, multi-step user journeys, and complex/unknown third-party integrations
are expected. The toolkit deliberately *flags what it doesn't recognise* rather than
guessing. Your job is to investigate every flagged item on the live site (with
Playwright) before writing its spec, then teach the knowledge base so future runs
improve. Never fill a spec from the component name alone.

## Inputs
- A URL list: `url/<name>.txt` (one URL per line; leading `123  ` numbers tolerated),
  or URLs the user pasted (write them to `url/<name>.txt` first).
- `slug` = the list's base name. Output → `report/<slug>/`.

## Steps

1. **Confirm scope & detect platform.** State the URL count and output path. Fetch the
   homepage and check whether it's AEM (WCM Core `cmp-*` classes) or something else —
   this sets expectations for how much you'll author by hand (non-AEM ⇒ more).

2. **Run the pipeline** (auto-installs cheerio):
   ```bash
   ANALYSIS_DATE=$(date +%F) node tools/site-analysis/run-analysis.js \
     --urls url/<name>.txt --out report/<slug> --slug <slug>
   ```
   Read the step output carefully. It prints: templates, top components, **forms**,
   **journey capabilities**, **integrations**, and — critically — any
   **⚠︎ UNKNOWN 3rd-party hosts** and **blocks needing review**.

3. **Sanity-check the classification.** Open `data/summary.json` /
   `data/url-templates.json`. Do the template names and counts match what the site
   actually is? The classifier handles blog-style content sites, bespoke marketing
   sites (named-hero page types), and redirect stubs — but confirm, and if a whole
   class of page is mislabelled, improve `2-aggregate.js`'s `classify()` (a real,
   reusable fix) rather than hand-editing output.

4. **Investigate everything flagged — do NOT assume.**
   - **`needsReview` blocks** (`reports/needs-review.html` / `needsReview:true` in
     `data/block-catalog.json`): for each, open a page in `report/<slug>/pages/` AND
     interact with it live via Playwright. Determine what it really is and does, then
     fill in `name`, `edsBlock`, `complexity` (+reason), `functional[]`, `acceptance[]`.
   - **Unknown 3rd-party hosts** (`data/summary.json` → `unknownScriptHostCounts`):
     identify each host. If it's a real integration, add a detector to
     `knowledge/detectors.json` (with a `category`); if it's a CDN/noise, ignore it —
     but say so.
   - After resolving, **update the knowledge base** (`knowledge/aem-wcm-blocks.json`,
     `knowledge/detectors.json` ignore/fold/integrations) so the next site is automatic.

5. **Map & verify user journeys with Playwright (mandatory for interactive sites).**
   `data/summary.json` → `journeyCapabilityCounts` and `forms` list what to walk. For
   each capability present, drive it end-to-end and record *what actually happens*:
   - **Forms**: fill invalid → observe validation; note the submit endpoint/provider
     (e.g. Salesforce/Marketo/HubSpot) and success behaviour. Multi-step? Record steps.
   - **Search / filters**: query & filter; is it client-side or an endpoint? What
     narrows?
   - **Pagination / load-more**: reload vs in-place swap; bound states.
   - **Nav**: desktop vs mobile drawer; flyouts/drill-down; active state.
   - **Carousels / tabs / accordions / flip / modals**: how they advance/toggle;
     auto-play; keyboard.
   - **Login / cart / checkout**: if real, walk the funnel and note gated content and
     external systems. (Journey signals are keyword heuristics — verify before
     asserting; a marketing site may falsely trip `hasCart`.)
   - **Video / maps / chat**: provider and load behaviour.
   Write findings to `report/<slug>/data/observed-behaviors.json`, keyed by block `id`:
   ```json
   { "verifiedVia": "Playwright on <host> (<date>)",
     "behaviors": { "<block-id>": { "observed": "what you saw", "states": ["..."] } } }
   ```
   Also capture distinct **multi-step user journeys** (e.g. "Insights: filter → results
   → article", "Contact: form → validation → Salesforce submit") in the `observed`
   text so they're documented, not just per-block states.

6. **Regenerate** to fold in catalog edits + behaviours:
   ```bash
   ANALYSIS_DATE=$(date +%F) node tools/site-analysis/4-generate.js \
     --urls url/<name>.txt --out report/<slug> --slug <slug>
   ```

7. **Verify output & report.** Serve `report/<slug>/` and open `dashboard.html` + a
   block detail page with Playwright; confirm rendering and that `needs-review` is
   empty (or explain what remains and why). Tell the user the headline numbers (URLs,
   templates, blocks, variations, forms, integrations, estimate) and point them at
   `report/<slug>/dashboard.html` and `reports/index.html`. Flag notable risks
   (e.g. staging/author URLs leaking, unknown integrations, complex funnels).

8. **Commit** (ask about the `pages/` cache if large): commit both the report AND any
   `knowledge/*.json` + classifier improvements, then push.

## What the reports now include
Overview · Templates · Blocks & Variations · Template→Block map · **Journeys & Forms**
· Observed Behaviors · **Integrations (by category + unknown hosts)** · **Needs Review**
· All URLs — plus per-block/per-template detail pages, full REPORT.md, and estimates.html.

## Notes
- **Evidence, not extrapolation.** Every URL is fetched and parsed; interact to confirm behaviour.
- **Theme:** light background, blue header (built into the generators).
- **Non-AEM sites:** the extractor also captures generic `data-block`/section blocks when
  `cmp-*` are absent — expect many `needsReview` stubs and author more by hand.
- **Re-runs:** raw HTML cached in `report/<slug>/pages/`; delete a file to force re-fetch.
  Re-run step 1 (not just 2-4) if you changed extractor/detector logic, since detection
  happens during extraction.
- **Estimates** scale with the catalog (blocks by complexity + variations), template
  count, forms and integrations — they update automatically when you complete stubs.
- `tools/` and `report/` are excluded from EDS serving via `.hlxignore`.
