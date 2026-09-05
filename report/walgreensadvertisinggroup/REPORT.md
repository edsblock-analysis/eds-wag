# www.walgreensadvertisinggroup.com — EDS Migration Functional Analysis

**Source site:** https://www.walgreensadvertisinggroup.com
**Analysis date:** 2026-09-05
**Method:** Every one of the 16 URLs was fetched (HTTP 200: 16) and its DOM parsed for components, variations, embeds and integrations. Interactive behavior was verified live with Playwright on representative pages of every template and interactive block. Findings are evidence-based, not extrapolated.

---

## 1. Executive Summary

| Metric | Value |
|---|---|
| Total URLs analyzed | **16** |
| Unique templates | **11** |
| EDS blocks to develop | **15** |
| Block variations | **34** |
| EDS default content (not blocks) | 4 |
| High / Medium / Low complexity | 6 / 4 / 5 |
| Forms | 1 |
| Third-party integrations | 14 |
| Unrecognized 3rd-party hosts (review) | 4 |
| Blocks needing agent review | 0 |

---

## 2. Templates

| # | Template | Pages |
|---|---|---|
| 1 | **Redirect / External Stub** (`redirect-stub`) | 3 |
| 2 | **Solution Detail** (`page-solutions-detail`) | 3 |
| 3 | **Case Study** (`page-case-studies`) | 2 |
| 4 | **Home / Landing** (`home-landing`) | 1 |
| 5 | **About** (`page-about`) | 1 |
| 6 | **Approach** (`page-approach`) | 1 |
| 7 | **Careers** (`page-careers`) | 1 |
| 8 | **Contact** (`page-contact`) | 1 |
| 9 | **Insights Landing** (`page-insight`) | 1 |
| 10 | **Results** (`page-results`) | 1 |
| 11 | **Solutions** (`page-solutions`) | 1 |

---

## 3. Block Inventory

15 blocks to develop. Components that share a common DOM/decoration are consolidated into a single block whose differences are **variations** (one block built, N variations authored).

| Block | EDS name | Complexity | Pages | Variations |
|---|---|---|---|---|
| **Header / Navigation** | `header (nav)` | High | 13 | default (13) |
| **Footer** | `footer` | Medium | 13 | default (13) |
| **Callout (results band)** | `callout` | Low | 12 | background (1); cta-band (12); resource (4) |
| **Carousel** | `carousel` | High | 3 | people (1); logos (1); cards (1); icon-steps (3); solutions (1) |
| **Article Card** | `cards` | Medium | 3 | case-study (2); team (1); results-load-more (1); solution (3) |
| **Hero** | `hero` | High | 3 | about (1); approach (1); careers (1); contact-with-form (1); insight (1); results (1); solutions-detail (3); solutions (1) |
| **Testimonial** | `quote` | Low | 2 | default (2) |
| **Case Study Article** | `default content (article)` | Low | 2 | default (2) |
| **Social Media Links** | `social-media` | Low | 2 | default (2) |
| **Related Reads** | `explore-more` | Low | 2 | default (2) |
| **Feature columns** | `feature-columns` | High | 2 | media-text (2); solutions-tabbed (1); stat-tiles (1); circles (1) |
| **Flip Circles (interactive audience)** | `cards (flip)` | High | 1 | default (1) |
| **Feature Text (reveal)** | `text (reveal)` | Medium | 1 | reveal (1) |
| **Featured Persona** | `feature (persona)` | Medium | 1 | default (1) |
| **Insights Filter + Search** | `search (filtered list)` | High | 1 | default (1) |

**EDS default content (not counted as blocks)** — rendered by core decoration / autoblocking, not authored as blocks: Image (13), Button / CTA (13), Separator (13), Rich Text (6).

---

## 4. Template → Block → Variation

### Redirect / External Stub (`redirect-stub`) — 3 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Social Media Links | default | Low |

### Solution Detail (`page-solutions-detail`) — 3 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Callout (results band) | background, cta-band, resource | Low |
| Carousel | people, logos, cards, icon-steps, solutions | High |
| Article Card | case-study, team, results-load-more, solution | Medium |
| Hero | about, approach, careers, contact-with-form, insight, results, solutions-detail, solutions | High |
| Social Media Links | default | Low |

### Case Study (`page-case-studies`) — 2 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Callout (results band) | background, cta-band, resource | Low |
| Case Study Article | default | Low |
| Social Media Links | default | Low |
| Related Reads | default | Low |

### Home / Landing (`home-landing`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Callout (results band) | background, cta-band, resource | Low |
| Carousel | people, logos, cards, icon-steps, solutions | High |
| Article Card | case-study, team, results-load-more, solution | Medium |
| Social Media Links | default | Low |
| Feature columns | media-text, solutions-tabbed, stat-tiles, circles | High |

### About (`page-about`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Callout (results band) | background, cta-band, resource | Low |
| Article Card | case-study, team, results-load-more, solution | Medium |
| Hero | about, approach, careers, contact-with-form, insight, results, solutions-detail, solutions | High |
| Social Media Links | default | Low |

### Approach (`page-approach`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Callout (results band) | background, cta-band, resource | Low |
| Carousel | people, logos, cards, icon-steps, solutions | High |
| Hero | about, approach, careers, contact-with-form, insight, results, solutions-detail, solutions | High |
| Social Media Links | default | Low |
| Feature columns | media-text, solutions-tabbed, stat-tiles, circles | High |
| Flip Circles (interactive audience) | default | High |
| Feature Text (reveal) | reveal | Medium |
| Featured Persona | default | Medium |

### Careers (`page-careers`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Callout (results band) | background, cta-band, resource | Low |
| Hero | about, approach, careers, contact-with-form, insight, results, solutions-detail, solutions | High |
| Testimonial | default | Low |
| Social Media Links | default | Low |

### Contact (`page-contact`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Hero | about, approach, careers, contact-with-form, insight, results, solutions-detail, solutions | High |
| Social Media Links | default | Low |

### Insights Landing (`page-insight`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Callout (results band) | background, cta-band, resource | Low |
| Hero | about, approach, careers, contact-with-form, insight, results, solutions-detail, solutions | High |
| Social Media Links | default | Low |
| Insights Filter + Search | default | High |

### Results (`page-results`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Callout (results band) | background, cta-band, resource | Low |
| Article Card | case-study, team, results-load-more, solution | Medium |
| Hero | about, approach, careers, contact-with-form, insight, results, solutions-detail, solutions | High |
| Testimonial | default | Low |
| Social Media Links | default | Low |

### Solutions (`page-solutions`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Footer | default | Medium |
| Callout (results band) | background, cta-band, resource | Low |
| Carousel | people, logos, cards, icon-steps, solutions | High |
| Article Card | case-study, team, results-load-more, solution | Medium |
| Hero | about, approach, careers, contact-with-form, insight, results, solutions-detail, solutions | High |
| Social Media Links | default | Low |
| Feature columns | media-text, solutions-tabbed, stat-tiles, circles | High |

---

## 5. Functional Requirements

### Header / Navigation (`header (nav)`)

- **Pages:** 13 · **Templates:** all
- **Variations:** default (13)

- Logo links to the homepage.
- Primary navigation exposes top-level categories; sub-navigation reveals child links.
- Active category is highlighted.
- Search entry point toggles the search field.
- Responsive: persistent bar on desktop, drawer/hamburger on mobile.

### Footer (`footer`)

- **Pages:** 13 · **Templates:** all
- **Variations:** default (13)

- Logo linking home.
- Social profile links (external).
- Category link columns mirroring nav.
- Legal/privacy links.
- Disclaimer + copyright.

### Callout (results band) (`callout`)

- **Pages:** 12 · **Templates:** home-landing, page-about, page-approach, page-careers, page-case-studies, page-insight, page-results, page-solutions, page-solutions-detail
- **Variations:** background (1); cta-band (12); resource (4)

- Heading + claim/stat copy + CTA link(s).
- Background variation for emphasis.

### Carousel (`carousel`)

- **Pages:** 3 · **Templates:** home-landing, page-approach, page-solutions, page-solutions-detail
- **Variations:** people (1); logos (1); cards (1); icon-steps (3); solutions (1)


### Article Card (`cards`)

- **Pages:** 3 · **Templates:** home-landing, page-about, page-results, page-solutions, page-solutions-detail
- **Variations:** case-study (2); team (1); results-load-more (1); solution (3)

- Card is clickable to its target.
- Shows image, category eyebrow, title, meta (read-time/byline/date) per variation.
- Video variation overlays play icon + duration.

### Hero (`hero`)

- **Pages:** 3 · **Templates:** page-about, page-approach, page-careers, page-contact, page-insight, page-results, page-solutions, page-solutions-detail
- **Variations:** about (1); approach (1); careers (1); contact-with-form (1); insight (1); results (1); solutions-detail (3); solutions (1)


### Testimonial (`quote`)

- **Pages:** 2 · **Templates:** page-careers, page-results
- **Variations:** default (2)

- Displays a quote with attribution (name/role).
- May cycle through multiple testimonials.

### Case Study Article (`default content (article)`)

- **Pages:** 2 · **Templates:** page-case-studies
- **Variations:** default (2)

- Eyebrow + heading + long-form case-study narrative with imagery.

### Social Media Links (`social-media`)

- **Pages:** 2 · **Templates:** all
- **Variations:** default (2)

- Row of social icon links opening brand profiles.

### Related Reads (`explore-more`)

- **Pages:** 2 · **Templates:** page-case-studies
- **Variations:** default (2)

- Heading + related article promo (image + title) linking to another read.

### Feature columns (`feature-columns`)

- **Pages:** 2 · **Templates:** home-landing, page-approach, page-solutions
- **Variations:** media-text (2); solutions-tabbed (1); stat-tiles (1); circles (1)


### Flip Circles (interactive audience) (`cards (flip)`)

- **Pages:** 1 · **Templates:** page-approach
- **Variations:** default (1)

- Grid of circular cards representing audience segments.
- Hovering/clicking a circle flips it to reveal detail.

### Feature Text (reveal) (`text (reveal)`)

- **Pages:** 1 · **Templates:** page-approach
- **Variations:** reveal (1)

- Prominent statement/heading with a scroll-triggered reveal animation.
- Optional CTA button.

### Featured Persona (`feature (persona)`)

- **Pages:** 1 · **Templates:** page-approach
- **Variations:** default (1)

- Narrative persona feature: heading + sequential sub-sections with imagery describing a customer profile.

### Insights Filter + Search (`search (filtered list)`)

- **Pages:** 1 · **Templates:** page-insight
- **Variations:** default (1)

- Filter controls (Types, Topics, etc.) + a text search field.
- Apply filters / Clear all controls.
- Results grid updates to match filters/search.
- Result cards link to insight articles.

---

## 6. Acceptance Criteria

### Header / Navigation

- [ ] Navigation renders the full category tree on every page.
- [ ] Selecting a top-level category reveals or navigates to its children.
- [ ] The category matching the current page is marked active.
- [ ] On mobile the menu button opens/closes the drawer.

### Footer

- [ ] Footer renders columns, social, legal and copyright on every page.
- [ ] Social icons open the correct external profiles.

### Callout (results band)

- [ ] Renders heading and CTA(s); CTAs navigate correctly.
- [ ] Background variation renders with its themed background.

### Carousel


### Article Card

- [ ] Each card navigates to its target when clicked.
- [ ] Category eyebrow links to the category.
- [ ] Cards reflow responsively.

### Hero


### Testimonial

- [ ] Renders the quote and attribution.
- [ ] If rotating, quotes cycle.

### Case Study Article

- [ ] Renders the case-study heading and body content.

### Social Media Links

- [ ] Each social icon links to the correct external profile.

### Related Reads

- [ ] Renders the related item and links to it.

### Feature columns


### Flip Circles (interactive audience)

- [ ] Circles render in a grid.
- [ ] Hover/click flips a circle to show its back content.
- [ ] Works on touch (tap) as well as hover.

### Feature Text (reveal)

- [ ] Text renders and the reveal animation triggers on scroll.
- [ ] CTA (if present) navigates correctly.

### Featured Persona

- [ ] Renders the persona narrative sections and imagery in order.

### Insights Filter + Search

- [ ] Selecting filters and applying narrows the results.
- [ ] Text search narrows results.
- [ ] Clear all resets filters and restores the full list.
- [ ] Each result links to its insight.

---

## 7. User Journeys & Interactions

Capabilities detected across the site (page counts). These indicate the interactive journeys to design & test.

| Capability | Pages |
|---|---|
| Accordion / flip | 3 |
| Checkout / buy | 2 |
| Forms | 1 |
| Search | 1 |
| Filtering | 1 |
| Pagination / load-more | 1 |
| Login / account | 1 |
| Cart | 1 |

> Journeys should be walked end-to-end with Playwright and documented in `data/observed-behaviors.json`. Multi-step flows (form → validation → submit → confirmation; filter → results; login → gated content) are called out per block in §5.

---

## 8. Forms

1 form instance(s) found. Kinds: lead-gen (CRM) (1).

| Page | Kind | Fields | Method | Posts to |
|---|---|---|---|---|
| /home/contact.html | lead-gen (CRM) | 8 | post | webto.salesforce.com |

---

## 9. Third-Party Integrations

**Analytics/Tag Mgmt**

| Integration | Pages |
|---|---|
| Adobe Helix RUM | 13 |
| Google Analytics / GA4 | 3 |
| Google Tag Manager | 2 |
| Adobe Launch/DTM (tag mgmt) | 1 |
| Adobe Analytics (AppMeasurement) | 1 |

**Consent/Privacy**

| Integration | Pages |
|---|---|
| OneTrust (consent) | 3 |
| TrustArc (consent) | 2 |

**Fonts**

| Integration | Pages |
|---|---|
| Typekit / Adobe Fonts | 2 |
| Google Fonts | 2 |

**Forms/CRM**

| Integration | Pages |
|---|---|
| HubSpot (form/CRM) | 2 |
| Salesforce Web-to-Lead (form) | 1 |

**Maps/Location**

| Integration | Pages |
|---|---|
| Google Maps | 1 |

**Personalization/AB**

| Integration | Pages |
|---|---|
| Adobe Target (A/B) | 1 |
| Monetate | 1 |

**⚠︎ Unrecognized third-party hosts (need agent review — could be complex integrations):**

| Host | Pages |
|---|---|
| www.marsunited.com | 2 |
| js.hs-scripts.com | 2 |
| js.hsforms.net | 2 |
| www.wag-static.com | 1 |

---

## 10. Block Complexity

| Block | Complexity | Reason |
|---|---|---|
| **Header / Navigation** | High | Off-canvas / multi-level navigation with active-state tracking, integrated search toggle, and responsive desktop-bar vs mobile-drawer. Usually a shared Experience Fragment. |
| **Carousel** | High | Large multi-panel slider of audience/feature stories with imagery, headings, copy and many CTAs; prev/next navigation. |
| **Hero** | High | Static section hero (heading + copy + imagery) introducing the About page. |
| **Feature columns** | High | Alternating media + text blocks; observed as a horizontal scroller/slider of feature panels. |
| **Flip Circles (interactive audience)** | High | Interactive flip-card circles revealing audience segments on hover/click; requires flip interaction + responsive behavior. |
| **Insights Filter + Search** | High | Filterable/searchable insights list: type/topic filters, text search, apply/clear controls, results grid — client-side filtering (or query endpoint) with multiple states. |
| **Footer** | Medium | Large multi-column link structure + social + legal + disclaimer, content-driven; usually a shared Experience Fragment. |
| **Article Card** | Medium | Core reusable listing unit with multiple visual variations; drives listings, related content and carousels. |
| **Feature Text (reveal)** | Medium | Large statement text with a 'reveal' animation variation and an optional CTA. |
| **Featured Persona** | Medium | Rich persona narrative (e.g. 'Meet Maria') with many images and stacked sub-sections telling a customer story. |
| **Callout (results band)** | Low | Promotional callout band with heading, stat/claim and CTA link(s); a background variation exists. |
| **Testimonial** | Low | Quote/testimonial with attribution; may rotate multiple quotes. |
| **Case Study Article** | Low | Case-study detail body: eyebrow + H2 + narrative copy + imagery. |
| **Social Media Links** | Low | Static row of social icon links (usually in the footer XF). |
| **Related Reads** | Low | Related-content promo at the foot of a case study/insight linking to another read. |

---

*Generated by tools/site-analysis. Data: data/*.json. Dashboard: dashboard.html. Detailed: reports/index.html.*
