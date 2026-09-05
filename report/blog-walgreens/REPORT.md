# blog.walgreens.com — EDS Migration Functional Analysis

**Source site:** https://blog.walgreens.com/ ("The Thread" by Walgreens)
**Platform detected:** Adobe Experience Manager (AEM) Sites using WCM Core Components (`cmp-*`), Experience Fragments for header/footer, Scene7/Dynamic Media for video, Adobe Client Data Layer + Adobe Launch for analytics, OneTrust for consent.
**Analysis date:** 2026-09-05
**Method:** Every one of the 804 URLs in `url/blog-walgreens.txt` was individually fetched (HTTP 200 for all 804) and its DOM parsed for components, variations, embeds and integrations. Interactive behavior was verified live with Playwright on representative pages of every template and every interactive block (navigation drawer, predictive search, hero carousel, category pagination, "The latest" carousel, jump-to-section, YouTube/Spotify/Scene7 players, episode carousel). Findings below are based on observed evidence, not extrapolation.

> **Note on totals.** 50 of the 804 URLs are content-hub mirror paths (`/content/content-hub/us/en/...`) that duplicate public article/hub URLs. They are counted in the crawl but represent the same authored content; the effective unique authored page count is ~754. 30 URLs are Spanish-language variants of English articles (same templates/blocks).

---

## 1. Executive Summary

| Metric | Value |
|---|---|
| Total URLs analyzed | **804** (all HTTP 200) |
| Unique page templates | **7** |
| EDS blocks to develop | **24** |
| Total block variations | **36** |
| Content-hub mirror (duplicate) URLs | 50 |
| Spanish-language pages | 30 |
| High-complexity blocks | 8 |
| Third-party integrations | 8 (see §7) |

---

## 2. Templates

**7 unique templates** identified (primary signal: each page's `<meta name="template">`, refined by structural evidence). Page counts:

| # | Template | Pages | Description |
|---|---|---|---|
| 1 | **Article** (`article`) | 710 | Standard editorial health/wellness/beauty article: breadcrumb, title + date/read-time, rich-text body, "Explore more" related cards. Includes video-articles (YouTube/Scene7 lead media + optional Featured products + Transcript) and recipe articles (Jump to section). |
| 2 | **Category Hub** (`category-hub`) | 32 | Rich editorial landing for a top-level/section category: featured hero card container, "The latest" carousel, promo blocks, paginated article grid, watch-videos gallery, and "Explore more" subcategory tiles with live counts. |
| 3 | **Video / Podcast Episode** (`video-episode`) | 23 | Series episode page: Scene7 or Spotify player, "More episodes" carousel with S:E badges, "Read transcript" link. |
| 4 | **Video Transcript** (`video-transcript`) | 23 | Plain transcript page paired 1:1 with a video/podcast episode. |
| 5 | **Buying Guide** (`buying-guide-article`) | 7 | Buying-guide / OTC-selection article built on the blank template; article body + related cards. |
| 6 | **Category Listing (Community/Series)** (`category-listing`) | 7 | Community-stories landing pages: section hero, series list / series teasers, curated cards. |
| 7 | **Home / Landing** (`home-landing`) | 2 | Site homepage (and its content-hub mirror): hero carousel, trending, featured teaser, editor's pick, explore tiles. |

**Total: 804 pages across 7 templates.**

---

## 3. Block Inventory (with variations & page usage)

24 blocks / 36 variations. "Pages" = number of the 804 crawled pages the block/variation appears on (from DOM evidence).

| Block | EDS block name | Complexity | Pages | Variations (pages) |
|---|---|---|---|---|
| **Header / Navigation** | `header (nav)` | High | 804 | default (804) |
| **Predictive Search** | `search` | High | 804 | header-search (804) |
| **Footer (mega)** | `footer` | Medium | 804 | default (804) |
| **Hero Carousel (homepage)** | `hero-carousel` | High | 2 | default (2) |
| **Trending Articles** | `trending-articles` | Medium | 2 | default (2) |
| **Editor's Pick / Featured Teaser** | `editors-pick (teaser)` | Medium | 3 | featured-teaser (3); editors-pick (2); teaser-card-list (2) |
| **Article Card** | `cards` | Medium | 743 | hero (30); medium (732); small (32); video (28) |
| **Category Hero Card Container** | `card-container-hero` | Medium | 32 | default (32) |
| **Content Carousel ("The latest" / episodes)** | `carousel` | High | 53 | latest-articles (30); episode-rail (23) |
| **Article Listing + Pagination** | `article-list (paginate)` | High | 27 | default (27) |
| **Promo Blocks** | `promo-blocks` | Low | 29 | default (29) |
| **Explore (category tiles)** | `explore` | Low | 32 | default (32) |
| **Explore More (related articles)** | `explore-more` | Low | 714 | default (714) |
| **Breadcrumb** | `breadcrumb` | Low | 763 | default (763) |
| **Article Body (rich text + title + meta)** | `default content + section-metadata` | Low | 740 | standard-article (710); recipe (8); transcript (23) |
| **Jump to Section** | `jump-to-section (TOC)` | Medium | 8 | default (8) |
| **Video / Media Embed** | `embed (video)` | High | 23 | scene7 (20); youtube (13); spotify (10) |
| **Watch Videos (video gallery)** | `watch-videos` | High | 20 | default (20) |
| **Episode Container (series)** | `episode-container` | High | 23 | default (23) |
| **Series List / Series Teaser** | `series-list` | Medium | 3 | series-list (3); series-teaser (1) |
| **Section Hero (community landing)** | `hero` | Low | 4 | default (4) |
| **Scroll to Top** | `scroll-to-top` | Low | 702 | default (702) |
| **Background Container (section styling)** | `section-metadata (background)` | Low | 21 | navy-blue (20); gray (3) |
| **Social Media Links** | `social-media` | Low | 804 | default (804) |

---

## 4. Template → Block → Variation Mapping

### Article (`article`) — 710 pages

| Block | Variations used | Notes |
|---|---|---|
| Header / Navigation | default | Global (header/footer/search/social) |
| Predictive Search | header-search | Global (header/footer/search/social) |
| Footer (mega) | default | Global (header/footer/search/social) |
| Article Card | hero, medium, small, video |  |
| Explore More (related articles) | default |  |
| Breadcrumb | default |  |
| Article Body (rich text + title + meta) | standard-article, recipe, transcript |  |
| Jump to Section | default |  |
| Video / Media Embed | scene7, youtube, spotify |  |
| Scroll to Top | default |  |
| Background Container (section styling) | navy-blue, gray |  |
| Social Media Links | default | Global (header/footer/search/social) |

### Category Hub (`category-hub`) — 32 pages

| Block | Variations used | Notes |
|---|---|---|
| Header / Navigation | default | Global (header/footer/search/social) |
| Predictive Search | header-search | Global (header/footer/search/social) |
| Footer (mega) | default | Global (header/footer/search/social) |
| Article Card | hero, medium, small, video |  |
| Category Hero Card Container | default |  |
| Content Carousel ("The latest" / episodes) | latest-articles, episode-rail |  |
| Article Listing + Pagination | default |  |
| Promo Blocks | default |  |
| Explore (category tiles) | default |  |
| Explore More (related articles) | default |  |
| Breadcrumb | default |  |
| Video / Media Embed | scene7, youtube, spotify |  |
| Watch Videos (video gallery) | default |  |
| Scroll to Top | default |  |
| Background Container (section styling) | navy-blue, gray |  |
| Social Media Links | default | Global (header/footer/search/social) |

### Video / Podcast Episode (`video-episode`) — 23 pages

| Block | Variations used | Notes |
|---|---|---|
| Header / Navigation | default | Global (header/footer/search/social) |
| Predictive Search | header-search | Global (header/footer/search/social) |
| Footer (mega) | default | Global (header/footer/search/social) |
| Content Carousel ("The latest" / episodes) | latest-articles, episode-rail |  |
| Breadcrumb | default |  |
| Video / Media Embed | scene7, youtube, spotify |  |
| Episode Container (series) | default |  |
| Scroll to Top | default |  |
| Social Media Links | default | Global (header/footer/search/social) |

### Video Transcript (`video-transcript`) — 23 pages

| Block | Variations used | Notes |
|---|---|---|
| Header / Navigation | default | Global (header/footer/search/social) |
| Predictive Search | header-search | Global (header/footer/search/social) |
| Footer (mega) | default | Global (header/footer/search/social) |
| Breadcrumb | default |  |
| Article Body (rich text + title + meta) | standard-article, recipe, transcript |  |
| Social Media Links | default | Global (header/footer/search/social) |

### Buying Guide (`buying-guide-article`) — 7 pages

| Block | Variations used | Notes |
|---|---|---|
| Header / Navigation | default | Global (header/footer/search/social) |
| Predictive Search | header-search | Global (header/footer/search/social) |
| Footer (mega) | default | Global (header/footer/search/social) |
| Article Card | hero, medium, small, video |  |
| Explore More (related articles) | default |  |
| Article Body (rich text + title + meta) | standard-article, recipe, transcript |  |
| Social Media Links | default | Global (header/footer/search/social) |

### Category Listing (Community/Series) (`category-listing`) — 7 pages

| Block | Variations used | Notes |
|---|---|---|
| Header / Navigation | default | Global (header/footer/search/social) |
| Predictive Search | header-search | Global (header/footer/search/social) |
| Footer (mega) | default | Global (header/footer/search/social) |
| Article Card | hero, medium, small, video |  |
| Article Listing + Pagination | default |  |
| Explore More (related articles) | default |  |
| Series List / Series Teaser | series-list, series-teaser |  |
| Section Hero (community landing) | default |  |
| Social Media Links | default | Global (header/footer/search/social) |

### Home / Landing (`home-landing`) — 2 pages

| Block | Variations used | Notes |
|---|---|---|
| Header / Navigation | default | Global (header/footer/search/social) |
| Predictive Search | header-search | Global (header/footer/search/social) |
| Footer (mega) | default | Global (header/footer/search/social) |
| Hero Carousel (homepage) | default |  |
| Trending Articles | default |  |
| Editor's Pick / Featured Teaser | featured-teaser, editors-pick, teaser-card-list |  |
| Explore (category tiles) | default |  |
| Scroll to Top | default |  |
| Social Media Links | default | Global (header/footer/search/social) |

---

## 5. Block Functional Requirements

### Header / Navigation (`header (nav)`)

- **Appears on:** 804 pages  
- **Templates:** all  
- **Variations:** **default** — Logo + hamburger + search toggle; off-canvas category drawer. (804 pages)

**Functionality / behavior:**
- Hamburger "Menu button" opens an off-canvas navigation drawer.
- Drawer shows 5 top-level categories: Health, Wellness, Beauty, Community Stories, Buying Guides.
- Clicking a top-level category drills down to reveal its child links inline; a "Back" button returns to the top level.
- Active category is highlighted (cmp-navigation__item--active).
- Logo links to the homepage (content-hub homepage path).
- Search icon toggles the predictive search field (see Search block).
- 110 navigation items across 2 levels sourced from the site structure (cmp-list driven).

### Predictive Search (`search`)

- **Appears on:** 804 pages  
- **Templates:** all  
- **Variations:** **header-search** — Predictive typeahead in the header. (804 pages)

**Functionality / behavior:**
- Search field with role="search", input name "fulltext".
- Minimum query length 3 characters (data-cmp-min-length="3") before a request fires.
- Returns up to 10 results (data-cmp-results-size="10").
- Performs AJAX GET to a .searchresults.json endpoint; verified response is a JSON array of {title, description, url, lastModified}.
- Shows a loading indicator while fetching and a Clear button to reset the field.
- Each result links to the article page.

### Footer (mega) (`footer`)

- **Appears on:** 804 pages  
- **Templates:** all  
- **Variations:** **default** — Mega footer with category columns, social, legal, disclaimer. (804 pages)

**Functionality / behavior:**
- Walgreens logo linking to homepage.
- Social links: Pinterest, Facebook, Twitter/X, Instagram (external).
- "Visit Walgreens.com" link (external commerce site).
- Full category link columns (Health, Wellness, Beauty, Community Stories) mirroring nav.
- Legal links: "Online Privacy & Security" and "Your Privacy Choices" (walgreens.com do-not-sell).
- Medical disclaimer paragraph and copyright line.

### Hero Carousel (homepage) (`hero-carousel`)

- **Appears on:** 2 pages  
- **Templates:** home-landing  
- **Variations:** **default** — 5-slide auto-rotating hero with dot indicators. (2 pages)

**Functionality / behavior:**
- Auto-advances through 5 slides (verified: "Viewing" indicator advanced without user action).
- Dot navigation (#carousel-0..4) jumps to a specific slide.
- Each slide: background image + overlay + featured title + description + CTA link.

### Trending Articles (`trending-articles`)

- **Appears on:** 2 pages  
- **Templates:** home-landing  
- **Variations:** **default** — Lead trending article + list of secondary trending links. (2 pages)

**Functionality / behavior:**
- Displays a "Trending" heading, one lead article, and a list of additional article links with titles + descriptions.

### Editor's Pick / Featured Teaser (`editors-pick (teaser)`)

- **Appears on:** 3 pages  
- **Templates:** home-landing  
- **Variations:** **featured-teaser** — FEATURED eyebrow + large teaser card. (3 pages); **editors-pick** — Editor's pick article promo with image + type label + byline. (2 pages); **teaser-card-list** — List of teaser cards. (2 pages)

**Functionality / behavior:**
- Promotes one or more curated articles with image, eyebrow/type label, title, byline, and link.

### Article Card (`cards`)

- **Appears on:** 743 pages  
- **Templates:** category-hub, article, buying-guide-article, category-listing  
- **Variations:** **hero** — Large featured card (image + category + title + read-time + byline + date). (30 pages); **medium** — Standard grid/related card (image + category + title + read-time + byline + date). (732 pages); **small** — Compact card (image + title + byline + date), used in "recommended"/sidebar rails. (32 pages); **video** — Card with video duration badge + play-icon overlay for video content. (28 pages)

**Functionality / behavior:**
- Card is fully clickable to the target article.
- Displays image, category eyebrow (links to category), title, read-time, byline and date depending on variation.
- Video variation overlays a play icon and duration badge.

### Category Hero Card Container (`card-container-hero`)

- **Appears on:** 32 pages  
- **Templates:** category-hub  
- **Variations:** **default** — Hero card + supporting medium cards row. (32 pages)

**Functionality / behavior:**
- Presents the top/featured articles of a category as a hero card plus supporting cards.

### Content Carousel ("The latest" / episodes) (`carousel`)

- **Appears on:** 53 pages  
- **Templates:** category-hub, video-episode  
- **Variations:** **latest-articles** — "The latest" horizontal article carousel with prev/next + see all. (30 pages); **episode-rail** — Episode thumbnail carousel on video pages. (23 pages)

**Functionality / behavior:**
- Horizontal carousel of cards with Previous/Next buttons.
- Previous is disabled at the start; Next disabled at the end (verified).
- Optional "see all" link to the full category.

### Article Listing + Pagination (`article-list (paginate)`)

- **Appears on:** 27 pages  
- **Templates:** category-hub, category-listing  
- **Variations:** **default** — Paginated article grid with numbered pages + jump-to-page. (27 pages)

**Functionality / behavior:**
- Renders the category article grid in pages.
- Numbered page buttons; Previous disabled on page 1, Next disabled on last page.
- "Jump to page" spinbutton navigates directly to a page.
- Pagination is client-side: verified that clicking page 2 swapped content in place with NO URL change or reload; controls and spinbutton updated accordingly.

### Promo Blocks (`promo-blocks`)

- **Appears on:** 29 pages  
- **Templates:** category-hub  
- **Variations:** **default** — Two promotional tiles (image + title) linking to featured articles. (29 pages)

**Functionality / behavior:**
- Displays promotional tiles (image + title) that link to featured content.

### Explore (category tiles) (`explore`)

- **Appears on:** 32 pages  
- **Templates:** home-landing, category-hub  
- **Variations:** **default** — Category tiles with image + name (+ article count on hubs). (32 pages)

**Functionality / behavior:**
- Shows a grid of category tiles; on category hubs each tile displays a live count of articles ("N New articles").

### Explore More (related articles) (`explore-more`)

- **Appears on:** 714 pages  
- **Templates:** article, buying-guide-article, category-hub, category-listing  
- **Variations:** **default** — Related-article card row (medium/video cards). (714 pages)

**Functionality / behavior:**
- Displays a row of related articles as cards below the main content.

### Breadcrumb (`breadcrumb`)

- **Appears on:** 763 pages  
- **Templates:** article, video-episode, video-transcript, category-hub  
- **Variations:** **default** — Home > Category > Subcategory > Page trail. (763 pages)

**Functionality / behavior:**
- Shows the page hierarchy from Home to the current page; ancestor items are links.

### Article Body (rich text + title + meta) (`default content + section-metadata`)

- **Appears on:** 740 pages  
- **Templates:** article, buying-guide-article, video-transcript  
- **Variations:** **standard-article** — Eyebrow + H1 + date/read-time + rich body + separators. (710 pages); **recipe** — Recipe article with Ingredients / step-by-step Directions + jump-to-section. (8 pages); **transcript** — Plain transcript body paired with a video episode. (23 pages)

**Functionality / behavior:**
- Renders eyebrow category, H1 title, publish date + read-time, and rich-text body (headings, paragraphs, lists, images, links).
- Red separators divide sections.

### Jump to Section (`jump-to-section (TOC)`)

- **Appears on:** 8 pages  
- **Templates:** article  
- **Variations:** **default** — Dropdown listing in-page section anchors (e.g. recipe steps). (8 pages)

**Functionality / behavior:**
- A "Jump to section" button toggles a dropdown of section links.
- Verified: expands to anchor links pointing at in-page IDs (#Ingredients, #step1..#step5).
- Selecting an item scrolls to that section.

### Video / Media Embed (`embed (video)`)

- **Appears on:** 23 pages  
- **Templates:** article, category-hub, video-episode  
- **Variations:** **scene7** — Adobe Scene7/Dynamic Media VideoViewer player. (20 pages); **youtube** — YouTube iframe embed (in-article video). (13 pages); **spotify** — Spotify podcast episode iframe. (10 pages)

**Functionality / behavior:**
- Embeds a video/podcast player from Scene7, YouTube or Spotify.
- Video-article variant may add a "Featured products" block deep-linking to walgreens.com PDPs and a "Transcript" section.

### Watch Videos (video gallery) (`watch-videos`)

- **Appears on:** 20 pages  
- **Templates:** category-hub  
- **Variations:** **default** — Grid of video cards launching Scene7 players. (20 pages)

**Functionality / behavior:**
- Displays a gallery of video cards; selecting one plays the video (Scene7 VideoViewer).

### Episode Container (series) (`episode-container`)

- **Appears on:** 23 pages  
- **Templates:** video-episode  
- **Variations:** **default** — Current episode player + "More episodes" carousel + Read transcript link. (23 pages)

**Functionality / behavior:**
- Shows the current episode player.
- "More episodes" reveals an episode carousel (S1:E1..E10 thumbnails with season/episode badges) with Previous/Next.
- "Read transcript" links to the paired transcript page.

### Series List / Series Teaser (`series-list`)

- **Appears on:** 3 pages  
- **Templates:** category-listing  
- **Variations:** **series-list** — List of series within a community-stories section. (3 pages); **series-teaser** — Series teaser card (incl. right-aligned variation). (1 pages)

**Functionality / behavior:**
- Presents community-story series as a list and/or teaser cards linking to each series.

### Section Hero (community landing) (`hero`)

- **Appears on:** 4 pages  
- **Templates:** category-listing  
- **Variations:** **default** — Section hero banner with image + title. (4 pages)

**Functionality / behavior:**
- Displays a hero banner (image + title) introducing a community-stories section.

### Scroll to Top (`scroll-to-top`)

- **Appears on:** 702 pages  
- **Templates:** article, category-hub, home-landing, video-episode  
- **Variations:** **default** — Floating back-to-top button. (702 pages)

**Functionality / behavior:**
- A floating button appears after scrolling; clicking it smooth-scrolls to the top.

### Background Container (section styling) (`section-metadata (background)`)

- **Appears on:** 21 pages  
- **Templates:** category-hub, article  
- **Variations:** **navy-blue** — Navy-blue section background. (20 pages); **gray** — Gray section background. (3 pages)

**Functionality / behavior:**
- Wraps a section to apply a themed background colour.

### Social Media Links (`social-media`)

- **Appears on:** 804 pages  
- **Templates:** all  
- **Variations:** **default** — Pinterest / Facebook / X / Instagram icon links. (804 pages)

**Functionality / behavior:**
- Row of social icon links opening the brand profiles.

---

## 6. Acceptance Criteria (per block)

Derived from observed behavior (Playwright-verified where interactive).

### Header / Navigation

- [ ] Given any page, when the user clicks the Menu button, the navigation drawer opens showing the 5 top-level categories.
- [ ] Given the drawer is open, when the user clicks a top-level category, its subcategories are revealed and a Back button appears.
- [ ] Given a drilled-down state, when the user clicks Back, the top-level list is restored.
- [ ] Given the drawer is open, when the user clicks Close, the drawer dismisses.
- [ ] The category matching the current page is visually marked active.
- [ ] On desktop widths the navigation renders as a persistent bar; on mobile as the drawer.

### Predictive Search

- [ ] Given the search field, when fewer than 3 characters are typed, no request is made and no results show.
- [ ] Given 3+ characters, when the user types, matching results (max 10) render as a typeahead list.
- [ ] Given results are shown, when the user clicks a result, they navigate to that article.
- [ ] Given text in the field, when the user clicks Clear, the field empties and results close.
- [ ] A loading indicator is shown while results are being fetched.

### Footer (mega)

- [ ] The footer renders category columns, social icons, legal links, disclaimer and copyright on every page.
- [ ] Social icons open the respective external profiles in the browser.
- [ ] "Your Privacy Choices" links to the walgreens.com do-not-sell page.

### Hero Carousel (homepage)

- [ ] On load, the hero auto-rotates through all slides.
- [ ] When a dot is clicked, the corresponding slide is shown and marked "Viewing".
- [ ] Each slide CTA navigates to the linked article.

### Trending Articles

- [ ] The Trending section lists the lead + secondary articles; each links to its article.

### Editor's Pick / Featured Teaser

- [ ] The Editor's pick / Featured area shows the curated article(s) with image and byline, each linking to the article.

### Article Card

- [ ] Each card navigates to its article when clicked.
- [ ] The category eyebrow links to the category hub.
- [ ] Video-variation cards show a duration badge and play icon.
- [ ] Cards reflow responsively (multi-column desktop, single column mobile).

### Category Hero Card Container

- [ ] The hero container shows the featured article prominently with supporting cards, each linking to its article.

### Content Carousel ("The latest" / episodes)

- [ ] At the first position the Previous button is disabled.
- [ ] Clicking Next advances the visible cards; at the end Next is disabled.
- [ ] "see all" navigates to the full category listing.

### Article Listing + Pagination

- [ ] On page 1 the Previous button is disabled.
- [ ] Clicking a page number swaps the grid to that page without a full reload.
- [ ] On the last page the Next button is disabled.
- [ ] Entering a number in "Jump to page" navigates to that page.

### Promo Blocks

- [ ] Each promo tile links to its target article and shows its image + title.

### Explore (category tiles)

- [ ] Each explore tile links to its category; on hubs it shows the article count.

### Explore More (related articles)

- [ ] The "Explore more" row shows related article cards, each linking to its article.

### Breadcrumb

- [ ] The breadcrumb reflects the page path; each ancestor link navigates to that level.

### Article Body (rich text + title + meta)

- [ ] Article renders title, date, read-time and full body content with correct heading hierarchy and inline links.

### Jump to Section

- [ ] Clicking the button expands the section list; clicking again collapses it.
- [ ] Selecting a section scrolls the page to the matching anchor.

### Video / Media Embed

- [ ] The embedded player loads and is playable.
- [ ] Where present, "Featured products" links navigate to the walgreens.com product pages and the transcript text is shown.

### Watch Videos (video gallery)

- [ ] Each video card shows a thumbnail + duration and plays the video when selected.

### Episode Container (series)

- [ ] "More episodes" reveals the episode carousel; prev/next scroll episodes.
- [ ] Each episode thumbnail navigates to that episode page.
- [ ] "Read transcript" opens the paired transcript page.

### Series List / Series Teaser

- [ ] Each series entry links to its series landing/episode; teaser shows image + title.

### Section Hero (community landing)

- [ ] The section hero shows the section image and title.

### Scroll to Top

- [ ] After scrolling down, the button is visible; clicking it returns the viewport to the top.

### Background Container (section styling)

- [ ] Sections wrapped in the container render with the specified background colour.

### Social Media Links

- [ ] Each social icon links to the correct external profile.

---

## 7. Third-Party Integrations

| Integration | Purpose | Pages | Used by (templates / blocks) |
|---|---|---|---|
| Adobe Launch / DTM | Tag management & analytics | 804 | All templates (global) |
| Adobe Client Data Layer | Analytics data layer (page/interaction events) | 804 | All templates (global) |
| Adobe Helix RUM | Real User Monitoring (rum.hlx.page) | 804 | All templates (global) |
| Adobe Scene7 / Dynamic Media | Video hosting & VideoViewer player | 804 | Video embed, Watch Videos, Episode container (player JS loaded globally) |
| OneTrust | Cookie consent / privacy banner | 804 | All templates (global) |
| YouTube | In-article video embeds | 37 | Video-article variant (article), category-hub |
| Spotify | Podcast episode embeds | 10 | Video/podcast episode template |
| walgreens.com (commerce) | "Featured products" PDP deep-links & footer/store links | 5 | Video-article "Featured products"; footer "Visit Walgreens.com" |
| Social platforms | Footer profile links (Pinterest, Facebook, X, Instagram) | 804 | Footer / Social Media block |
| AEM search servlet | Predictive search JSON endpoint (to be replaced by an EDS index query in migration) | 804 | Search block (all pages) |

**Migration note:** Analytics (Launch/Client Data Layer), consent (OneTrust) and search are AEM/global services. In EDS, RUM is native; Launch/OneTrust can be re-added via the site's `head.html`/scripts; predictive search must be rebuilt against an EDS index (e.g. `query-index.json`). Scene7 videos can be retained via embed or migrated to EDS video handling.

---

## 8. Block Complexity

| Block | Complexity | Reason |
|---|---|---|
| **Header / Navigation** | High | Off-canvas drawer with 2-level drill-down + Back, active-state tracking, integrated predictive search toggle, and responsive (desktop bar vs mobile drawer). Delivered as an Experience Fragment shared across all pages. |
| **Predictive Search** | High | AJAX predictive search against a JSON servlet, min-length gating, debounced typeahead, loading + empty + results states, keyboard accessibility. In EDS this must be reimplemented against an index (e.g. a query-index.json). |
| **Hero Carousel (homepage)** | High | Auto-rotating multi-slide carousel with dot navigation, per-slide background image + overlay + CTA, and pause/resume. Custom JS. |
| **Content Carousel ("The latest" / episodes)** | High | Horizontal scroller with prev/next controls, disabled states at bounds, "see all" link, responsive item counts. Used for latest articles and episode rails. |
| **Article Listing + Pagination** | High | Client-side paginated grid: numbered pages, prev/next bound states, "Jump to page" spinbutton, no reload. Data-driven from the category index. |
| **Video / Media Embed** | High | Multiple providers (Scene7 VideoViewer, YouTube, Spotify) with poster/lazy-load, transcript pairing and optional "Featured products" commerce links. Provider-specific players. |
| **Watch Videos (video gallery)** | High | Gallery of video cards each launching a Scene7 player; combines card grid with the video embed lifecycle. |
| **Episode Container (series)** | High | Series episode navigation with a "More episodes" carousel (S:E badges), current-episode player, and transcript link. Series-aware. |
| **Footer (mega)** | Medium | Large multi-column link structure + social + legal + disclaimer, sourced from site structure. Mostly static but content-driven; delivered as an Experience Fragment. |
| **Trending Articles** | Medium | Curated list of trending links with a lead item + secondary list; content-driven layout. |
| **Editor's Pick / Featured Teaser** | Medium | Composite of teaser + teaser-card-list; image + eyebrow + title + byline promoting a single curated article. |
| **Article Card** | Medium | Core reusable listing unit with 4 visual variations; drives listings, related content and carousels. Medium because variations + video badge + responsive grid, but no complex state. |
| **Category Hero Card Container** | Medium | Featured cluster at the top of category hubs combining one hero card with several medium cards. |
| **Jump to Section** | Medium | Dropdown table-of-contents that expands to anchor links to in-page section IDs; requires generating/binding anchors. |
| **Series List / Series Teaser** | Medium | Landing structure for community-story series (list of series + teaser cards). Content-driven with a distinctive teaser variation. |
| **Promo Blocks** | Low | Static promotional image tiles with title + link. Simple content-driven layout. |
| **Explore (category tiles)** | Low | Grid of category tiles (image + name). On category hubs, tiles show live "N New articles" counts. |
| **Explore More (related articles)** | Low | Row of related-article cards at the foot of articles. Reuses the Card block. |
| **Breadcrumb** | Low | Hierarchical trail derived from page path; standard EDS breadcrumb. |
| **Article Body (rich text + title + meta)** | Low | Standard rich text: headings, lists, images, links, separators, title + date/read-time meta. Maps to EDS default content. |
| **Section Hero (community landing)** | Low | Static section hero banner (image + title) on community-stories landing pages. |
| **Scroll to Top** | Low | Floating button that appears after scroll and returns to top. Trivial JS. |
| **Background Container (section styling)** | Low | Section wrapper applying a background colour (navy-blue / gray). Maps to EDS section metadata / styling. |
| **Social Media Links** | Low | Static row of social icons (part of the footer XF). |

**Distribution:** High: 8 · Medium: 7 · Low: 9.

---

## 9. Migration Notes & Recommendations

- **Effort concentration:** 710 of 804 pages (~88%) use the **Article** template — a low-complexity, content-driven page. The bulk of migration effort is *content authoring volume*, not block complexity.
- **High-complexity blocks** (header/nav drawer, predictive search, hero carousel, carousels, client-side pagination, video/embed, watch-videos, episode container) are concentrated on the homepage (2), category hubs (32) and video pages (23), i.e. a small number of pages — build these blocks once and reuse.
- **Card** is the single most reused unit (743 pages, 4 variations); prioritize it.
- **Content-hub mirror URLs (50)** and **Spanish variants (30)** reuse the same templates/blocks — no additional block work, only content.
- **Video/podcast** content spans 3 providers (Scene7, YouTube, Spotify) — a single `embed` block with provider variations covers all.
- Header, footer, search and social are **global** (Experience Fragments) — implement as EDS nav/footer + shared scripts.

---

*Generated from live crawl evidence. Supporting data: `data/pages.json` (per-URL), `data/summary.json` (aggregates), `data/block-catalog.json` (blocks), `data/observed-behaviors.json` (Playwright findings), `data/url-templates.json` (per-URL template assignment). Interactive dashboard: `dashboard.html`.*
