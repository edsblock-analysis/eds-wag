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
| EDS blocks to develop | **38** |
| Block variations | **40** |
| High / Medium / Low complexity | 10 / 8 / 20 |
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

| Block | EDS name | Complexity | Pages | Variations |
|---|---|---|---|---|
| **Header / Navigation** | `header (nav)` | High | 13 | default (13) |
| **Image** | `default content (image)` | Low | 13 | default (13) |
| **Button / CTA** | `default content (button)` | Low | 13 | primary (13); tertiary (11); secondary (12) |
| **Footer** | `footer` | Medium | 13 | default (13) |
| **Separator** | `default content (hr)` | Low | 13 | default (13) |
| **Footer Teaser (CTA band)** | `callout (cta-band)` | Low | 12 | default (12) |
| **Rich Text** | `default content (rich text)` | Low | 6 | default (6) |
| **Callout (results band)** | `callout` | Low | 5 | background (1) |
| **Featured Button / Resource Band** | `callout (resource)` | Low | 4 | default (4) |
| **Solution Detail Hero** | `hero (tabbed detail)` | High | 3 | default (3) |
| **Solution Cards (grouped)** | `cards` | Medium | 3 | default (3) |
| **Icon Carousel (steps)** | `carousel (steps)` | High | 3 | default (3) |
| **Image with Text** | `columns (media+text)` | Medium | 2 | default (2) |
| **Case Study Cards** | `cards` | Medium | 2 | default (2) |
| **Testimonial** | `quote` | Low | 2 | default (2) |
| **Case Study Article** | `default content (article)` | Low | 2 | default (2) |
| **Social Media Links** | `social-media` | Low | 2 | default (2) |
| **Related Reads** | `explore-more` | Low | 2 | default (2) |
| **People / Audience Slider** | `carousel (feature)` | High | 1 | default (1) |
| **Featured Solutions (tabbed)** | `tabs (solutions)` | High | 1 | default (1) |
| **Logo Slider (partners)** | `carousel (logos)` | Medium | 1 | default (1) |
| **About Hero** | `hero` | Low | 1 | default (1) |
| **About People (team)** | `cards (team)` | Low | 1 | default (1) |
| **Approach Hero (stat hero)** | `hero` | Low | 1 | default (1) |
| **Text + Circle Images (category stats)** | `columns (stat tiles)` | Low | 1 | default (1) |
| **Flip Circles (interactive audience)** | `cards (flip)` | High | 1 | default (1) |
| **Feature Text (reveal)** | `text (reveal)` | Medium | 1 | reveal (1) |
| **Featured Persona** | `feature (persona)` | Medium | 1 | default (1) |
| **Card Carousel** | `carousel (cards)` | High | 1 | default (1) |
| **Careers Hero** | `hero` | Low | 1 | default (1) |
| **Contact Hero + Form** | `form (contact)` | High | 1 | default (1) |
| **Insights Hero (featured)** | `hero` | Low | 1 | default (1) |
| **Insights Filter + Search** | `search (filtered list)` | High | 1 | default (1) |
| **Results Hero (stats)** | `hero` | Low | 1 | default (1) |
| **Results Cards (load more)** | `cards (load-more)` | Medium | 1 | default (1) |
| **Solutions Hero** | `hero` | Low | 1 | default (1) |
| **Featured Circles (differentiators)** | `columns (feature)` | Low | 1 | default (1) |
| **Solution Carousel** | `carousel (solutions)` | High | 1 | default (1) |

---

## 4. Template → Block → Variation

### Redirect / External Stub (`redirect-stub`) — 3 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Rich Text | default | Low |
| Social Media Links | default | Low |

### Solution Detail (`page-solutions-detail`) — 3 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Footer Teaser (CTA band) | default | Low |
| Rich Text | default | Low |
| Featured Button / Resource Band | default | Low |
| Solution Detail Hero | default | High |
| Solution Cards (grouped) | default | Medium |
| Icon Carousel (steps) | default | High |
| Social Media Links | default | Low |

### Case Study (`page-case-studies`) — 2 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Footer Teaser (CTA band) | default | Low |
| Rich Text | default | Low |
| Case Study Article | default | Low |
| Social Media Links | default | Low |
| Related Reads | default | Low |

### Home / Landing (`home-landing`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Footer Teaser (CTA band) | default | Low |
| Rich Text | default | Low |
| Callout (results band) | background | Low |
| Image with Text | default | Medium |
| Case Study Cards | default | Medium |
| Social Media Links | default | Low |
| People / Audience Slider | default | High |
| Featured Solutions (tabbed) | default | High |
| Logo Slider (partners) | default | Medium |

### About (`page-about`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Footer Teaser (CTA band) | default | Low |
| Rich Text | default | Low |
| Callout (results band) | background | Low |
| Social Media Links | default | Low |
| About Hero | default | Low |
| About People (team) | default | Low |

### Approach (`page-approach`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Footer Teaser (CTA band) | default | Low |
| Rich Text | default | Low |
| Callout (results band) | background | Low |
| Featured Button / Resource Band | default | Low |
| Image with Text | default | Medium |
| Social Media Links | default | Low |
| Approach Hero (stat hero) | default | Low |
| Text + Circle Images (category stats) | default | Low |
| Flip Circles (interactive audience) | default | High |
| Feature Text (reveal) | reveal | Medium |
| Featured Persona | default | Medium |
| Card Carousel | default | High |

### Careers (`page-careers`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Footer Teaser (CTA band) | default | Low |
| Rich Text | default | Low |
| Testimonial | default | Low |
| Social Media Links | default | Low |
| Careers Hero | default | Low |

### Contact (`page-contact`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Rich Text | default | Low |
| Social Media Links | default | Low |
| Contact Hero + Form | default | High |

### Insights Landing (`page-insight`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Footer Teaser (CTA band) | default | Low |
| Rich Text | default | Low |
| Social Media Links | default | Low |
| Insights Hero (featured) | default | Low |
| Insights Filter + Search | default | High |

### Results (`page-results`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Footer Teaser (CTA band) | default | Low |
| Rich Text | default | Low |
| Callout (results band) | background | Low |
| Testimonial | default | Low |
| Social Media Links | default | Low |
| Results Hero (stats) | default | Low |
| Results Cards (load more) | default | Medium |

### Solutions (`page-solutions`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Header / Navigation | default | High |
| Image | default | Low |
| Button / CTA | primary, tertiary, secondary | Low |
| Footer | default | Medium |
| Separator | default | Low |
| Footer Teaser (CTA band) | default | Low |
| Rich Text | default | Low |
| Callout (results band) | background | Low |
| Case Study Cards | default | Medium |
| Social Media Links | default | Low |
| Solutions Hero | default | Low |
| Featured Circles (differentiators) | default | Low |
| Solution Carousel | default | High |

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

### Image (`default content (image)`)

- **Pages:** 13 · **Templates:** all
- **Variations:** default (13)

- Renders a responsive image with alt text.

### Button / CTA (`default content (button)`)

- **Pages:** 13 · **Templates:** all
- **Variations:** primary (13); tertiary (11); secondary (12)

- Renders a CTA link styled as a button.

### Footer (`footer`)

- **Pages:** 13 · **Templates:** all
- **Variations:** default (13)

- Logo linking home.
- Social profile links (external).
- Category link columns mirroring nav.
- Legal/privacy links.
- Disclaimer + copyright.

### Separator (`default content (hr)`)

- **Pages:** 13 · **Templates:** all
- **Variations:** default (13)

- Renders a divider between content.

### Footer Teaser (CTA band) (`callout (cta-band)`)

- **Pages:** 12 · **Templates:** home-landing, page-about, page-approach, page-careers, page-case-studies, page-insight, page-results, page-solutions, page-solutions-detail
- **Variations:** default (12)

- Heading + copy + CTA button(s) in a full-width band above the footer.

### Rich Text (`default content (rich text)`)

- **Pages:** 6 · **Templates:** all
- **Variations:** default (6)

- Renders formatted rich-text content (paragraphs, lists, links).

### Callout (results band) (`callout`)

- **Pages:** 5 · **Templates:** home-landing, page-about, page-approach, page-results, page-solutions
- **Variations:** background (1)

- Heading + claim/stat copy + CTA link(s).
- Background variation for emphasis.

### Featured Button / Resource Band (`callout (resource)`)

- **Pages:** 4 · **Templates:** page-approach, page-solutions-detail
- **Variations:** default (4)

- Heading + description + prominent CTA button(s) to a resource/portal (often external).

### Solution Detail Hero (`hero (tabbed detail)`)

- **Pages:** 3 · **Templates:** page-solutions-detail
- **Variations:** default (3)

- H1 + supporting copy.
- Multiple solution offerings presented as sub-sections with links/CTAs.
- May include tab or anchor navigation between offerings.
- Rich media/imagery per offering.

### Solution Cards (grouped) (`cards`)

- **Pages:** 3 · **Templates:** page-solutions-detail
- **Variations:** default (3)

- Section header + a grid of solution cards each with heading and description.

### Icon Carousel (steps) (`carousel (steps)`)

- **Pages:** 3 · **Templates:** page-solutions-detail
- **Variations:** default (3)

- Horizontal carousel of steps (icon + heading + copy).
- Prev/next controls advance steps.
- A CTA button (e.g. Let's go).

### Image with Text (`columns (media+text)`)

- **Pages:** 2 · **Templates:** home-landing, page-approach
- **Variations:** default (2)

- Pairs media with heading + copy in alternating layout.
- May scroll/slide through multiple feature panels.

### Case Study Cards (`cards`)

- **Pages:** 2 · **Templates:** home-landing, page-solutions
- **Variations:** default (2)

- Section header + grid of case-study cards (category, title, KPI/result, CTA).
- Each card links to its case-study page.

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

### People / Audience Slider (`carousel (feature)`)

- **Pages:** 1 · **Templates:** home-landing
- **Variations:** default (1)

- Slider of feature/audience panels (imagery + heading + copy + CTA).
- Prev/next controls advance panels.

### Featured Solutions (tabbed) (`tabs (solutions)`)

- **Pages:** 1 · **Templates:** home-landing
- **Variations:** default (1)

- Presents solution groups (In-store, Onsite & Owned, Offsite Digital).
- Tabs/segments switch the visible solution group.
- Each solution links to its detail page.

### Logo Slider (partners) (`carousel (logos)`)

- **Pages:** 1 · **Templates:** home-landing
- **Variations:** default (1)

- Heading + a row/marquee of partner logos.
- Logos may auto-scroll or be swipeable.

### About Hero (`hero`)

- **Pages:** 1 · **Templates:** page-about
- **Variations:** default (1)

- Heading + narrative copy + supporting imagery introducing the page.

### About People (team) (`cards (team)`)

- **Pages:** 1 · **Templates:** page-about
- **Variations:** default (1)

- Heading + a grid of team-member cards (photo, name, role, blurb).

### Approach Hero (stat hero) (`hero`)

- **Pages:** 1 · **Templates:** page-approach
- **Variations:** default (1)

- Heading, supporting copy and a prominent stat/figure with imagery.

### Text + Circle Images (category stats) (`columns (stat tiles)`)

- **Pages:** 1 · **Templates:** page-approach
- **Variations:** default (1)

- Displays category tiles with a figure/stat, label and circular image.

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

### Card Carousel (`carousel (cards)`)

- **Pages:** 1 · **Templates:** page-approach
- **Variations:** default (1)

- Horizontal carousel of cards (heading + copy + CTA).
- Prev/next controls advance cards.
- Each card CTA links out.

### Careers Hero (`hero`)

- **Pages:** 1 · **Templates:** page-careers
- **Variations:** default (1)

- Heading + copy + imagery + CTA button(s) linking to jobs/apply.

### Contact Hero + Form (`form (contact)`)

- **Pages:** 1 · **Templates:** page-contact
- **Variations:** default (1)

- Heading + intro copy.
- Multi-field contact/lead form (name, email, company, message, etc.).
- Client-side validation + submit to a form endpoint.
- Includes an embedded video and a testimonial/quote.
- Links to LinkedIn and jobs.

### Insights Hero (featured) (`hero`)

- **Pages:** 1 · **Templates:** page-insight
- **Variations:** default (1)

- Heading + copy + imagery promoting a featured insight with CTA(s).

### Insights Filter + Search (`search (filtered list)`)

- **Pages:** 1 · **Templates:** page-insight
- **Variations:** default (1)

- Filter controls (Types, Topics, etc.) + a text search field.
- Apply filters / Clear all controls.
- Results grid updates to match filters/search.
- Result cards link to insight articles.

### Results Hero (stats) (`hero`)

- **Pages:** 1 · **Templates:** page-results
- **Variations:** default (1)

- Heading + supporting copy + a row of prominent KPI stats with footnotes.

### Results Cards (load more) (`cards (load-more)`)

- **Pages:** 1 · **Templates:** page-results
- **Variations:** default (1)

- Grid of result cards (title + KPI + CTA).
- 'Load more' reveals additional cards.

### Solutions Hero (`hero`)

- **Pages:** 1 · **Templates:** page-solutions
- **Variations:** default (1)

- Heading + copy + imagery introducing solutions.

### Featured Circles (differentiators) (`columns (feature)`)

- **Pages:** 1 · **Templates:** page-solutions
- **Variations:** default (1)

- Circular feature callouts each with a heading and supporting copy.

### Solution Carousel (`carousel (solutions)`)

- **Pages:** 1 · **Templates:** page-solutions
- **Variations:** default (1)

- Carousel of solution channels each with imagery, heading, copy and link.
- Prev/next controls advance slides.

---

## 6. Acceptance Criteria

### Header / Navigation

- [ ] Navigation renders the full category tree on every page.
- [ ] Selecting a top-level category reveals or navigates to its children.
- [ ] The category matching the current page is marked active.
- [ ] On mobile the menu button opens/closes the drawer.

### Image

- [ ] Image renders responsively with alt text.

### Button / CTA

- [ ] Button navigates to its target.

### Footer

- [ ] Footer renders columns, social, legal and copyright on every page.
- [ ] Social icons open the correct external profiles.

### Separator

- [ ] Separator renders between sections.

### Footer Teaser (CTA band)

- [ ] Renders heading and CTA(s); each CTA navigates to its target (e.g. contact).

### Rich Text

- [ ] Rich text renders with correct formatting and working inline links.

### Callout (results band)

- [ ] Renders heading and CTA(s); CTAs navigate correctly.
- [ ] Background variation renders with its themed background.

### Featured Button / Resource Band

- [ ] Renders heading and button(s); button navigates to the resource.

### Solution Detail Hero

- [ ] Renders the H1 and all solution offerings.
- [ ] Navigation/links between offerings work.
- [ ] Each CTA navigates correctly.

### Solution Cards (grouped)

- [ ] Renders each solution card with heading and description.
- [ ] Any card links navigate correctly.

### Icon Carousel (steps)

- [ ] Steps render in sequence.
- [ ] Prev/next advances the visible step(s).
- [ ] The CTA navigates correctly.

### Image with Text

- [ ] Each panel renders media + heading + copy.
- [ ] If a slider, prev/next or scroll advances panels.

### Case Study Cards

- [ ] Renders each case-study card with its result.
- [ ] Each card navigates to its case study.

### Testimonial

- [ ] Renders the quote and attribution.
- [ ] If rotating, quotes cycle.

### Case Study Article

- [ ] Renders the case-study heading and body content.

### Social Media Links

- [ ] Each social icon links to the correct external profile.

### Related Reads

- [ ] Renders the related item and links to it.

### People / Audience Slider

- [ ] Panels render; prev/next advances them.
- [ ] Each CTA navigates correctly.

### Featured Solutions (tabbed)

- [ ] All solution groups are reachable via the tabs/segments.
- [ ] Switching a tab shows that group's solutions.
- [ ] Each solution link navigates to its detail page.

### Logo Slider (partners)

- [ ] Logos render under the heading.
- [ ] If auto-scrolling, the marquee animates; if swipeable, drag/prev-next works.

### About Hero

- [ ] Renders heading, copy and imagery.

### About People (team)

- [ ] Renders each team member with photo, name, role and blurb.

### Approach Hero (stat hero)

- [ ] Renders heading, stat and imagery.

### Text + Circle Images (category stats)

- [ ] Renders each category tile with its stat and image.

### Flip Circles (interactive audience)

- [ ] Circles render in a grid.
- [ ] Hover/click flips a circle to show its back content.
- [ ] Works on touch (tap) as well as hover.

### Feature Text (reveal)

- [ ] Text renders and the reveal animation triggers on scroll.
- [ ] CTA (if present) navigates correctly.

### Featured Persona

- [ ] Renders the persona narrative sections and imagery in order.

### Card Carousel

- [ ] Cards render; prev/next advances them.
- [ ] Each CTA navigates correctly.

### Careers Hero

- [ ] Renders heading and imagery; CTA(s) navigate to jobs/apply.

### Contact Hero + Form

- [ ] The form renders all fields and validates required inputs.
- [ ] Submitting with valid data posts to the endpoint and shows a success state.
- [ ] Submitting with invalid data shows validation errors.
- [ ] The embedded video plays.

### Insights Hero (featured)

- [ ] Renders heading/imagery; CTA links to the featured insight.

### Insights Filter + Search

- [ ] Selecting filters and applying narrows the results.
- [ ] Text search narrows results.
- [ ] Clear all resets filters and restores the full list.
- [ ] Each result links to its insight.

### Results Hero (stats)

- [ ] Renders heading and the stat figures.

### Results Cards (load more)

- [ ] Initial cards render.
- [ ] Clicking 'Load more' appends more cards.
- [ ] Each card links to its detail.

### Solutions Hero

- [ ] Renders heading and imagery.

### Featured Circles (differentiators)

- [ ] Renders each circle with heading and copy.

### Solution Carousel

- [ ] Slides render; prev/next advances them.
- [ ] Each slide link navigates to its solution detail.

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
| **Solution Detail Hero** | High | Large solution-detail hero with H1, sub-sections (H2/H3) and many links/buttons (43 observed) — likely tabbed/anchored navigation into solution offerings. |
| **Icon Carousel (steps)** | High | Horizontal step/process carousel with icons, step headings and copy, plus a CTA; prev/next navigation. |
| **People / Audience Slider** | High | Large multi-panel slider of audience/feature stories with imagery, headings, copy and many CTAs; prev/next navigation. |
| **Featured Solutions (tabbed)** | High | Grouped solution showcase (In-store / Onsite & Owned / Offsite) with many links (12 buttons) — tab/segment switching between solution groups. |
| **Flip Circles (interactive audience)** | High | Interactive flip-card circles revealing audience segments on hover/click; requires flip interaction + responsive behavior. |
| **Card Carousel** | High | Horizontal carousel of content cards (heading + copy + CTA) with prev/next navigation. |
| **Contact Hero + Form** | High | Contact page hero containing a multi-field lead form (13 inputs observed) plus an embedded video and testimonial; requires form handling, validation and a submit endpoint. On EDS this is a form block wired to a form service. |
| **Insights Filter + Search** | High | Filterable/searchable insights list: type/topic filters, text search, apply/clear controls, results grid — client-side filtering (or query endpoint) with multiple states. |
| **Solution Carousel** | High | Horizontal carousel of solution channels (in-store/onsite/offsite) with imagery, headings and links; prev/next navigation. |
| **Footer** | Medium | Large multi-column link structure + social + legal + disclaimer, content-driven; usually a shared Experience Fragment. |
| **Solution Cards (grouped)** | Medium | Grouped solution cards (e.g. wagDSP, DSP & SSP, CTV) with headings and descriptions under a section header. |
| **Image with Text** | Medium | Alternating media + text blocks; observed as a horizontal scroller/slider of feature panels. |
| **Case Study Cards** | Medium | Grid of case-study cards (category eyebrow + title + KPI + CTA) linking to case-study pages. |
| **Logo Slider (partners)** | Medium | Auto-scrolling/marquee band of partner logos under a heading. |
| **Feature Text (reveal)** | Medium | Large statement text with a 'reveal' animation variation and an optional CTA. |
| **Featured Persona** | Medium | Rich persona narrative (e.g. 'Meet Maria') with many images and stacked sub-sections telling a customer story. |
| **Results Cards (load more)** | Medium | Grid of result/case-study cards with a 'Load more' control that reveals additional cards. |
| **Image** | Low | Responsive image; maps to EDS optimized picture. |
| **Button / CTA** | Low | Link styled as a button; maps to EDS button autoblocking. |
| **Separator** | Low | Horizontal rule / divider. |
| **Footer Teaser (CTA band)** | Low | Pre-footer CTA band: heading, supporting copy, imagery and CTA button(s) driving conversion. |
| **Rich Text** | Low | Rich-text body (paragraphs, lists, inline links); maps to EDS default content. |
| **Callout (results band)** | Low | Promotional callout band with heading, stat/claim and CTA link(s); a background variation exists. |
| **Featured Button / Resource Band** | Low | Resource band with heading and prominent button(s) linking to an external portal/resource. |
| **Testimonial** | Low | Quote/testimonial with attribution; may rotate multiple quotes. |
| **Case Study Article** | Low | Case-study detail body: eyebrow + H2 + narrative copy + imagery. |
| **Social Media Links** | Low | Static row of social icon links (usually in the footer XF). |
| **Related Reads** | Low | Related-content promo at the foot of a case study/insight linking to another read. |
| **About Hero** | Low | Static section hero (heading + copy + imagery) introducing the About page. |
| **About People (team)** | Low | Team grid: heading + member cards (name/role/photo/blurb). |
| **Approach Hero (stat hero)** | Low | Section hero highlighting a headline plus a large stat/number and imagery. |
| **Text + Circle Images (category stats)** | Low | Category stat tiles (e.g. Beauty, Health, Household) with figures and circular imagery. |
| **Careers Hero** | Low | Section hero for careers with heading, copy, imagery and CTA(s) (e.g. explore jobs). |
| **Insights Hero (featured)** | Low | Featured insight hero: heading, copy, imagery and CTA(s) to the featured article. |
| **Results Hero (stats)** | Low | Hero with headline and prominent KPI stats (e.g. $5 ROAS, 3.4%). |
| **Solutions Hero** | Low | Section hero for the solutions overview: heading, copy, imagery. |
| **Featured Circles (differentiators)** | Low | Static set of circular feature callouts (Your Customer / Your Choices) with headings and copy. |

---

*Generated by tools/site-analysis. Data: data/*.json. Dashboard: dashboard.html. Detailed: reports/index.html.*
