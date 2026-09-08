# www.walgreens.com — EDS Migration Functional Analysis

**Source site:** https://www.walgreens.com
**Analysis date:** 2026-09-08
**Method:** Every one of the 1183 URLs was fetched (HTTP 200: 1145) and its DOM parsed for components, variations, embeds and integrations. Interactive behavior was verified live with Playwright on representative pages of every template and interactive block. Findings are evidence-based, not extrapolated.

> 1 URLs are content mirror/duplicate paths; 2 are non-English (es) variants — same templates/blocks, content only.

> ⚠️ **Scope:** The public site is analyzed in full. **My Account, checkout and other authenticated/logged-in journeys were assessed at a high level only** — automated crawling of them is blocked by **Akamai bot protection + login-gating**. A **detailed analysis of My Account, checkout and the authenticated flow must still be performed manually** in a logged-in session. High-level findings are in §12 below.

---

## 1. Executive Summary

| Metric | Value |
|---|---|
| Total URLs analyzed | **1183** |
| Unique templates | **15** |
| EDS blocks to develop | **44** |
| Block variations | **51** |
| EDS default content (not blocks) | 6 |
| High / Medium / Low complexity | 24 / 9 / 11 |
| Forms | 998 |
| Third-party integrations | 25 |
| Unrecognized 3rd-party hosts (review) | 28 |
| Blocks needing agent review | 0 |

---

## 1a. Current Tech Stack

Inferred from detected components + third-party integrations on the live site.

| Category | Technology | Evidence |
|---|---|---|
| CMS / Components | **Adobe Experience Manager (AEM) — WCM Core Components** | cmp-* component classes, <meta name=template>: home-page-content-template, retail-content-template, article-page, page-content |
| Front-end | **React / client-side SPA** | components addressed via data-testid; client-rendered content (rendered via headless browser) |
| Target platform | **Adobe Edge Delivery Services (EDS)** | this analysis maps blocks/templates for EDS migration |
| Tag management | **Adobe Launch / DTM** | assets.adobedtm.com |
| Analytics | **Adobe Analytics** | AppMeasurement / smetrics |
| Analytics | **Adobe Client Data Layer** | adobe-client-data-layer |
| Analytics | **Google Analytics / GA4** | gtag/analytics.js |
| Tag management | **Google Tag Manager** | googletagmanager.com |
| Personalization / A-B | **Adobe Target** | target / tt.omtrdc |
| Personalization / A-B | **Monetate** | monetate |
| Consent / privacy | **OneTrust** | cookielaw.org / geolocation.onetrust.com |
| Consent / privacy | **TrustArc** | trustarc/truste |
| Monitoring (RUM) | **Adobe Helix RUM** | rum.hlx.page |
| Media / DAM | **Adobe Scene7 / Dynamic Media** | s7viewers / scene7.com |
| Media / video | **Vimeo embed, YouTube embed, Spotify embed** | embedded players |
| Forms / CRM | **Pardot (form)** | form endpoints |
| Reviews / UGC | **Bazaarvoice (ratings/reviews)** | ratings & reviews |
| Chat / support | **Zendesk / LiveChat / Tidio** | chat widget |
| Maps / location | **Google Maps** | store locator / maps |
| Fonts | **Google Fonts** | web fonts |
| Marketing pixels | **Facebook Pixel, LinkedIn Insight** | ad pixels |
| Feedback / survey | **Medallia (feedback), Qualtrics (survey)** | VoC / heatmap |

---

## 2. Templates

| # | Template | Pages |
|---|---|---|
| 1 | **Article** (`article`) | 751 |
| 2 | **Content page** (`content-page`) | 129 |
| 3 | **Find care** (`find-care`) | 94 |
| 4 | **Redirect / External Stub** (`redirect-stub`) | 71 |
| 5 | **Account** (`account`) | 46 |
| 6 | **Store detail** (`store-detail`) | 23 |
| 7 | **Retail base template** (`retail-base-template`) | 22 |
| 8 | **Home page content template** (`home-page-content-template`) | 15 |
| 9 | **Category Hub** (`category-hub`) | 11 |
| 10 | **Rx checkout** (`rx-checkout`) | 7 |
| 11 | **Retail content template** (`retail-content-template`) | 6 |
| 12 | **Store locator** (`store-locator`) | 3 |
| 13 | **Pdp** (`pdp`) | 3 |
| 14 | **Cart** (`cart`) | 1 |
| 15 | **Plp** (`plp`) | 1 |

---

## 3. Block Inventory

44 blocks to develop. Components that share a common DOM/decoration are consolidated into a single block whose differences are **variations** (one block built, N variations authored).

| Block | EDS name | Complexity | Pages | Variations |
|---|---|---|---|---|
| **Global Footer** | `footer` | Medium | 833 | default (833) |
| **Account / Authentication** | `account-auth (app)` | High | 629 | default (629) |
| **Cart** | `cart (commerce)` | High | 582 | default (582) |
| **Global Header / Nav** | `header (app nav)` | High | 582 | default (582) |
| **Promo Banner** | `promo-banner` | Low | 581 | default (581) |
| **Predictive Search** | `search` | High | 314 | default (314) |
| **Social Media Links** | `social-media` | Low | 314 | default (314) |
| **Article Card** | `cards` | Medium | 312 | hero (9); medium (312); small (11); video (7); related (301); hero-container (11) |
| **Breadcrumb** | `breadcrumb` | Low | 303 | default (303) |
| **Scroll to Top** | `scroll-to-top` | Low | 299 | default (299) |
| **Health/Wellness Article** | `article (default content)` | Low | 125 | default (125) |
| **Content / Product Carousel** | `carousel` | Medium | 84 | default (84) |
| **Live Chat / Click-to-Chat** | `live-chat (embed)` | Medium | 56 | default (56) |
| **Login / Sign-in Form** | `form (auth)` | High | 47 | default (47) |
| **Hero Banner** | `hero` | Medium | 45 | default (45) |
| **Quick Links / Category Shortcuts** | `quick-links` | Low | 22 | default (22) |
| **Article Listing + Pagination** | `article-list (paginate)` | High | 11 | inactive-page (11); active-page (11) |
| **Explore (category tiles)** | `explore` | Low | 11 | default (11) |
| **Carousel** | `carousel` | High | 11 | content (11) |
| **Promo Blocks** | `promo-blocks` | Low | 10 | default (10) |
| **Product Filters / Facets** | `product-filters (commerce)` | High | 9 | default (9) |
| **Product Detail (PDP)** | `product-detail-page (commerce)` | High | 9 | contact-lens (1); standard (1) |
| **Product Listing (PLP)** | `product-list-page (commerce)` | High | 7 | default (7) |
| **Background Container** | `section-metadata (background)` | Low | 7 | navy-blue (7) |
| **Watch Videos (gallery)** | `watch-videos` | High | 7 | default (7) |
| **Feature Tile / Teaser** | `teaser` | Low | 7 | default (7) |
| **Fulfillment & Add-to-Cart** | `product-fulfillment (commerce)` | High | 6 | default (6) |
| **Article / Content Body** | `default content (rich text + media)` | Low | 6 | default (6) |
| **Editor's Pick / Featured Teaser** | `editors-pick (teaser)` | Medium | 6 | default (6) |
| **Video / Media Embed** | `embed (video)` | High | 4 | default (4) |
| **Accordion** | `accordion` | Medium | 4 | default (4) |
| **Recommendations / Merchandising Carousels** | `product-carousel (commerce)` | Medium | 3 | default (3) |
| **Rx Refill (guest/express)** | `rx-refill (pharmacy app)` | High | 3 | default (3) |
| **Rx Transfer** | `rx-transfer (pharmacy app)` | High | 2 | default (2) |
| **Store Locator** | `store-locator (app)` | High | 2 | default (2) |
| **Order Pickup / On-my-way** | `order-pickup (app)` | High | 1 | default (1) |
| **Create Account (multi-step)** | `form (registration)` | High | 0 | default (0) |
| **Forgot / Reset Password (OTP/MFA)** | `form (auth-reset)` | High | 0 | default (0) |
| **Account Dashboard** | `account-dashboard (app)` | High | 0 | default (0) |
| **myWalgreens Rewards** | `rewards (app)` | Medium | 0 | default (0) |
| **Family / Caregiver Management** | `family-mgmt (app)` | High | 0 | default (0) |
| **Health History** | `health-history (app)` | High | 0 | default (0) |
| **Rx Settings / Insurance** | `rx-settings (app)` | High | 0 | default (0) |
| **Secure Pharmacy Messaging** | `secure-messaging (app)` | High | 0 | default (0) |

**EDS default content (not counted as blocks)** — rendered by core decoration / autoblocking, not authored as blocks: Rich Content (AEM DS) (343), Title (318), Separator (314), Button / CTA (314), Image (309), Rich Text (42).

---

## 4. Template → Block → Variation

### Article (`article`) — 751 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Account / Authentication | default | High |
| Cart | default | High |
| Global Header / Nav | default | High |
| Promo Banner | default | Low |
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Article Card | hero, medium, small, video, related, hero-container | Medium |
| Breadcrumb | default | Low |
| Scroll to Top | default | Low |
| Health/Wellness Article | default | Low |
| Content / Product Carousel | default | Medium |
| Live Chat / Click-to-Chat | default | Medium |
| Login / Sign-in Form | default | High |
| Hero Banner | default | Medium |
| Quick Links / Category Shortcuts | default | Low |
| Feature Tile / Teaser | default | Low |
| Article / Content Body | default | Low |
| Recommendations / Merchandising Carousels | default | Medium |
| Rx Transfer | default | High |
| Order Pickup / On-my-way | default | High |

### Content page (`content-page`) — 129 pages

| Block | Variations | Complexity |
|---|---|---|
| Predictive Search | default | High |
| Social Media Links | default | Low |

### Find care (`find-care`) — 94 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Account / Authentication | default | High |
| Cart | default | High |
| Global Header / Nav | default | High |
| Promo Banner | default | Low |
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Health/Wellness Article | default | Low |
| Content / Product Carousel | default | Medium |
| Live Chat / Click-to-Chat | default | Medium |
| Login / Sign-in Form | default | High |
| Hero Banner | default | Medium |
| Product Filters / Facets | default | High |
| Product Detail (PDP) | contact-lens, standard | High |
| Product Listing (PLP) | default | High |
| Fulfillment & Add-to-Cart | default | High |
| Article / Content Body | default | Low |

### Redirect / External Stub (`redirect-stub`) — 71 pages

| Block | Variations | Complexity |
|---|---|---|
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Content / Product Carousel | default | Medium |
| Hero Banner | default | Medium |

### Account (`account`) — 46 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Account / Authentication | default | High |
| Cart | default | High |
| Global Header / Nav | default | High |
| Promo Banner | default | Low |
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Live Chat / Click-to-Chat | default | Medium |
| Login / Sign-in Form | default | High |
| Create Account (multi-step) | default | High |
| Forgot / Reset Password (OTP/MFA) | default | High |
| Account Dashboard | default | High |
| myWalgreens Rewards | default | Medium |
| Family / Caregiver Management | default | High |
| Health History | default | High |
| Rx Settings / Insurance | default | High |
| Secure Pharmacy Messaging | default | High |

### Store detail (`store-detail`) — 23 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Account / Authentication | default | High |
| Cart | default | High |
| Global Header / Nav | default | High |
| Promo Banner | default | Low |
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Content / Product Carousel | default | Medium |
| Hero Banner | default | Medium |
| Quick Links / Category Shortcuts | default | Low |
| Product Filters / Facets | default | High |
| Product Detail (PDP) | contact-lens, standard | High |
| Product Listing (PLP) | default | High |
| Feature Tile / Teaser | default | Low |
| Fulfillment & Add-to-Cart | default | High |
| Editor's Pick / Featured Teaser | default | Medium |
| Accordion | default | Medium |
| Recommendations / Merchandising Carousels | default | Medium |

### Retail base template (`retail-base-template`) — 22 pages

| Block | Variations | Complexity |
|---|---|---|
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Feature Tile / Teaser | default | Low |
| Editor's Pick / Featured Teaser | default | Medium |

### Home page content template (`home-page-content-template`) — 15 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Account / Authentication | default | High |
| Cart | default | High |
| Global Header / Nav | default | High |
| Promo Banner | default | Low |
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Content / Product Carousel | default | Medium |
| Hero Banner | default | Medium |
| Quick Links / Category Shortcuts | default | Low |

### Category Hub (`category-hub`) — 11 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Global Header / Nav | default | High |
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Article Card | hero, medium, small, video, related, hero-container | Medium |
| Content / Product Carousel | default | Medium |
| Article Listing + Pagination | inactive-page, active-page | High |
| Explore (category tiles) | default | Low |
| Carousel | content | High |
| Promo Blocks | default | Low |
| Background Container | navy-blue | Low |
| Watch Videos (gallery) | default | High |

### Rx checkout (`rx-checkout`) — 7 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Account / Authentication | default | High |
| Cart | default | High |
| Global Header / Nav | default | High |
| Promo Banner | default | Low |
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Live Chat / Click-to-Chat | default | Medium |
| Login / Sign-in Form | default | High |
| Quick Links / Category Shortcuts | default | Low |
| Rx Refill (guest/express) | default | High |
| Rx Transfer | default | High |

### Retail content template (`retail-content-template`) — 6 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Account / Authentication | default | High |
| Cart | default | High |
| Global Header / Nav | default | High |
| Promo Banner | default | Low |
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Content / Product Carousel | default | Medium |
| Feature Tile / Teaser | default | Low |
| Editor's Pick / Featured Teaser | default | Medium |
| Video / Media Embed | default | High |
| Accordion | default | Medium |

### Store locator (`store-locator`) — 3 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Account / Authentication | default | High |
| Cart | default | High |
| Global Header / Nav | default | High |
| Promo Banner | default | Low |
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Store Locator | default | High |

### Pdp (`pdp`) — 3 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Account / Authentication | default | High |
| Cart | default | High |
| Global Header / Nav | default | High |
| Promo Banner | default | Low |
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Content / Product Carousel | default | Medium |
| Product Filters / Facets | default | High |
| Product Detail (PDP) | contact-lens, standard | High |
| Product Listing (PLP) | default | High |
| Fulfillment & Add-to-Cart | default | High |

### Cart (`cart`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Predictive Search | default | High |
| Social Media Links | default | Low |
| Hero Banner | default | Medium |
| Quick Links / Category Shortcuts | default | Low |

### Plp (`plp`) — 1 pages

| Block | Variations | Complexity |
|---|---|---|
| Global Footer | default | Medium |
| Account / Authentication | default | High |
| Cart | default | High |
| Global Header / Nav | default | High |
| Promo Banner | default | Low |
| Predictive Search | default | High |
| Social Media Links | default | Low |

---

## 5. Functional Requirements

### Global Footer (`footer`)

- **Pages:** 833 · **Templates:** account, article, category-hub, find-care, home-page-content-template, pdp, plp, retail-content-template, rx-checkout, store-detail, store-locator
- **Variations:** default (833)

- Multi-column link groups: Customer Service, myWalgreens, Company Info, Terms, Privacy & Security.
- Product category directory ('View all products by') + photo products.
- Newsletter/deals signup, social links, copyright and legal (privacy/CCPA/Washington health).
- 'Your Privacy Choices' CCPA opt-out.

### Account / Authentication (`account-auth (app)`)

- **Pages:** 629 · **Templates:** account, article, find-care, home-page-content-template, pdp, plp, retail-content-template, rx-checkout, store-detail, store-locator
- **Variations:** default (629)

- Sign in (email/password) and create-account.
- Password reset and guest order-lookup (order number, last name, phone).
- Account menu exposes orders, refills, rewards, saved items.
- Form validation on all inputs.

### Cart (`cart (commerce)`)

- **Pages:** 582 · **Templates:** account, article, find-care, home-page-content-template, pdp, plp, retail-content-template, rx-checkout, store-detail, store-locator
- **Variations:** default (582)

- Line items with image, title, price, quantity controls.
- Fulfillment per item; price/summary totals.
- Promo/rewards application; proceed-to-checkout.
- Mini-cart icon reflects item count.

### Global Header / Nav (`header (app nav)`)

- **Pages:** 582 · **Templates:** account, article, category-hub, find-care, home-page-content-template, pdp, plp, retail-content-template, rx-checkout, store-detail, store-locator
- **Variations:** default (582)

- Mega-menu navigation across departments/categories.
- Store & pickup-location selector reflecting the chosen store.
- Account menu (sign in / orders / rewards / buy-again).
- Cart icon showing live item count.
- Site search entry point and language switcher.

### Promo Banner (`promo-banner`)

- **Pages:** 581 · **Templates:** account, article, find-care, home-page-content-template, pdp, plp, retail-content-template, rx-checkout, store-detail, store-locator
- **Variations:** default (581)

- Rotating promotional offer links above the header.

### Predictive Search (`search`)

- **Pages:** 314 · **Templates:** all
- **Variations:** default (314)

- Search field (role=search).
- Minimum query length gates the request (check data-cmp-min-length).
- Returns a capped number of results (check data-cmp-results-size).
- AJAX request to a search endpoint returning JSON results.
- Loading indicator + clear button.
- Each result links to a page.

### Social Media Links (`social-media`)

- **Pages:** 314 · **Templates:** all
- **Variations:** default (314)

- Row of social icon links opening brand profiles.

### Article Card (`cards`)

- **Pages:** 312 · **Templates:** article, category-hub
- **Variations:** hero (9); medium (312); small (11); video (7); related (301); hero-container (11)

- Card is clickable to its target.
- Shows image, category eyebrow, title, meta (read-time/byline/date) per variation.
- Video variation overlays play icon + duration.

### Breadcrumb (`breadcrumb`)

- **Pages:** 303 · **Templates:** article
- **Variations:** default (303)

- Shows Home > ... > current; ancestors are links.

### Scroll to Top (`scroll-to-top`)

- **Pages:** 299 · **Templates:** article
- **Variations:** default (299)

- Button appears after scrolling; clicking smooth-scrolls to top.

### Health/Wellness Article (`article (default content)`)

- **Pages:** 125 · **Templates:** article, find-care
- **Variations:** default (125)

- Renders article title (H1), section headings, paragraphs, lists and images.
- Inline links to related conditions/products.
- Sits under a health category (breadcrumb/category context).

### Content / Product Carousel (`carousel`)

- **Pages:** 84 · **Templates:** article, category-hub, find-care, home-page-content-template, pdp, redirect-stub, retail-content-template, store-detail
- **Variations:** default (84)

- Horizontal carousel of cards with prev/next controls.
- Each card links to a PDP/PLP/content page.

### Live Chat / Click-to-Chat (`live-chat (embed)`)

- **Pages:** 56 · **Templates:** account, article, find-care, rx-checkout
- **Variations:** default (56)

- Fixed chat button launches a support chat widget.

### Login / Sign-in Form (`form (auth)`)

- **Pages:** 47 · **Templates:** account, article, find-care, rx-checkout
- **Variations:** default (47)

- Email + password fields with validation.
- Remember-me, forgot-password, create-account links.
- Submit authenticates against the identity service.

### Hero Banner (`hero`)

- **Pages:** 45 · **Templates:** article, cart, find-care, home-page-content-template, redirect-stub, store-detail
- **Variations:** default (45)

- Background media + headline + CTA(s); may auto-rotate.

### Quick Links / Category Shortcuts (`quick-links`)

- **Pages:** 22 · **Templates:** article, cart, home-page-content-template, rx-checkout, store-detail
- **Variations:** default (22)

- Row/grid of icon + label shortcut cards linking to categories/services.

### Article Listing + Pagination (`article-list (paginate)`)

- **Pages:** 11 · **Templates:** category-hub
- **Variations:** inactive-page (11); active-page (11)

- Renders the category grid in pages.
- Numbered page buttons; Previous disabled on page 1, Next on last page.
- Jump-to-page control.
- Verify whether pagination is client-side (no reload) or server-side.

### Explore (category tiles) (`explore`)

- **Pages:** 11 · **Templates:** category-hub
- **Variations:** default (11)

- Grid of category tiles; may show a live article count per tile.

### Carousel (`carousel`)

- **Pages:** 11 · **Templates:** category-hub
- **Variations:** content (11)


### Promo Blocks (`promo-blocks`)

- **Pages:** 10 · **Templates:** category-hub
- **Variations:** default (10)

- Promotional tiles (image + title) linking to featured content.

### Product Filters / Facets (`product-filters (commerce)`)

- **Pages:** 9 · **Templates:** find-care, pdp, store-detail
- **Variations:** default (9)

- Facet groups (brand, price, color, undertone, fulfillment).
- Price min/max with Apply.
- Selecting facets refines the product grid; applied-filters chips can be cleared.

### Product Detail (PDP) (`product-detail-page (commerce)`)

- **Pages:** 9 · **Templates:** find-care, pdp, store-detail
- **Variations:** contact-lens (1); standard (1)

- STANDARD variation: gallery + title/brand + price + rating; specifications table (brand, product-type, FSA/HSA-eligible, size, UPC, item-code); fulfillment radios (pickup/same-day/shipping) with stock + ready-time messaging + store address; quantity dropdown; add-for-pickup / add-to-cart; coupons; reviews; save-to-shopping-list; check-other-stores; description show-more; more-to-explore carousel.
- CONTACT-LENS variation: per-eye prescription selectors (right-eye-power, left-eye-power, and typically base curve / brand / quantity of boxes); product image tabs; add-to-cart. No fulfillment radios or specifications table — it is a vision-prescription configurator.
- Both: add-to-cart updates the header cart count and opens the cart-confirmation overlay.

### Product Listing (PLP) (`product-list-page (commerce)`)

- **Pages:** 7 · **Templates:** find-care, pdp, store-detail
- **Variations:** default (7)

- Grid of product cards (image, title, brand, price, rating, promotion/tag).
- Sort dropdown and result/item count.
- Faceted filters (brand, price range, fulfillment) refine results.
- Load-more / paginated navigation.
- Each card links to its PDP; add-to-cart / add-to-fulfillment where applicable.

### Background Container (`section-metadata (background)`)

- **Pages:** 7 · **Templates:** category-hub
- **Variations:** navy-blue (7)

- Wraps a section to apply a themed background.

### Watch Videos (gallery) (`watch-videos`)

- **Pages:** 7 · **Templates:** category-hub
- **Variations:** default (7)

- Gallery of video cards; selecting one plays the video.

### Feature Tile / Teaser (`teaser`)

- **Pages:** 7 · **Templates:** article, retail-base-template, retail-content-template, store-detail
- **Variations:** default (7)

- Media + heading + copy + CTA promoting a page/offer.

### Fulfillment & Add-to-Cart (`product-fulfillment (commerce)`)

- **Pages:** 6 · **Templates:** find-care, pdp, store-detail
- **Variations:** default (6)

- Fulfillment radios: pickup, same-day delivery, shipping — each with stock/availability + ready-time messaging.
- Quantity dropdown.
- Add-to-cart / add-for-pickup updates the cart + header count.
- Check other stores for availability.
- Pickup address/details reflect the selected store.

### Article / Content Body (`default content (rich text + media)`)

- **Pages:** 6 · **Templates:** article, find-care
- **Variations:** default (6)

- Renders page title, section headings, body copy, lists, images and inline links.

### Editor's Pick / Featured Teaser (`editors-pick (teaser)`)

- **Pages:** 6 · **Templates:** retail-base-template, retail-content-template, store-detail
- **Variations:** default (6)

- Promotes curated item(s) with media, eyebrow, title, byline and link.

### Video / Media Embed (`embed (video)`)

- **Pages:** 4 · **Templates:** retail-content-template
- **Variations:** default (4)

- Embeds a video/podcast player from the detected provider.
- May add a related products/links block and a transcript section.

### Accordion (`accordion`)

- **Pages:** 4 · **Templates:** retail-content-template, store-detail
- **Variations:** default (4)

- A list of headers that expand/collapse their panels on click.
- May allow single or multiple open panels.

### Recommendations / Merchandising Carousels (`product-carousel (commerce)`)

- **Pages:** 3 · **Templates:** article, store-detail
- **Variations:** default (3)

- Horizontal carousels of product/offer cards (buy-again, top sellers, highest rated, newest arrivals, recently viewed, coupons, sales offers).
- Category/brand shortcut sections.
- Prev/next scroll; each card links to a PDP/PLP or applies an offer/coupon.

### Rx Refill (guest/express) (`rx-refill (pharmacy app)`)

- **Pages:** 3 · **Templates:** rx-checkout
- **Variations:** default (3)

- Enter prescription number (guest express) or scan to refill.
- Select pickup store and pickup date/time.
- Provide guest contact details; validation on all fields.
- Submit refill to the pharmacy system with confirmation.

### Rx Transfer (`rx-transfer (pharmacy app)`)

- **Pages:** 2 · **Templates:** article, rx-checkout
- **Variations:** default (2)

- Identify current pharmacy and medication(s) to transfer.
- Choose destination Walgreens store.
- Provide patient details with validation.
- Submit transfer request with confirmation.

### Store Locator (`store-locator (app)`)

- **Pages:** 2 · **Templates:** store-locator
- **Variations:** default (2)

- Accepts a location (geolocate or entered) and lists nearby stores.
- Each store card shows address, service hours, services, distance and open/closed status; links to store detail and map.
- Filters (24-hour, pharmacy, drive-thru, clinic, etc.) refine results.
- 'Browse stores by state' provides an SEO directory path.
- Save/preferred-store action.

### Order Pickup / On-my-way (`order-pickup (app)`)

- **Pages:** 1 · **Templates:** article
- **Variations:** default (1)

- Order/pickup lookup and store info display.
- Continue/confirm pickup steps; on-my-way arrival notification.

### Create Account (multi-step) (`form (registration)`)

- **Pages:** 0 · **Templates:** account
- **Variations:** default (0)

- Collect first/last name, email, password (with live strength rules).
- Optionally create/link a myWalgreens account.
- Terms-of-use consent + state-specific legal notices.
- Multi-step continue → account provisioning via /profile/v1/checkAccount + registration.

### Forgot / Reset Password (OTP/MFA) (`form (auth-reset)`)

- **Pages:** 0 · **Templates:** account
- **Variations:** default (0)

- Request reset by email/username.
- Receive + enter OTP/pincode (MFA).
- Set a new password with the same rules.

### Account Dashboard (`account-dashboard (app)`)

- **Pages:** 0 · **Templates:** account
- **Variations:** default (0)

- Surfaces order status, prescription refills, rewards balance, saved items and profile links.
- Entry point to all account sub-sections.

### myWalgreens Rewards (`rewards (app)`)

- **Pages:** 0 · **Templates:** account
- **Variations:** default (0)

- Show Walgreens Cash balance + earned/available rewards.
- Clip/redeem offers; view history.

### Family / Caregiver Management (`family-mgmt (app)`)

- **Pages:** 0 · **Templates:** account
- **Variations:** default (0)

- Add/manage family members and their access levels.
- Switch selected member context for pharmacy actions.

### Health History (`health-history (app)`)

- **Pages:** 0 · **Templates:** account
- **Variations:** default (0)

- View/enter health history (conditions, allergies, medications) per profile.
- Detail view per record.

### Rx Settings / Insurance (`rx-settings (app)`)

- **Pages:** 0 · **Templates:** account
- **Variations:** default (0)

- Manage insurance on file and Rx preferences (auto-refill, notifications).

### Secure Pharmacy Messaging (`secure-messaging (app)`)

- **Pages:** 0 · **Templates:** account
- **Variations:** default (0)

- View and send secure messages with the pharmacy.
- Message activity/history.

---

## 6. Acceptance Criteria

### Global Footer

- [ ] Footer renders all link columns and legal links on every page.
- [ ] Newsletter signup and social links work.
- [ ] Privacy/CCPA links resolve.

### Account / Authentication

- [ ] Sign-in validates credentials and errors on invalid input.
- [ ] Order lookup accepts order number + last name.
- [ ] Account menu links resolve to account sections.

### Cart

- [ ] Cart lists items with quantities and totals.
- [ ] Changing quantity updates totals.
- [ ] Cart icon shows the current count.
- [ ] Checkout entry proceeds to the checkout flow.

### Global Header / Nav

- [ ] Header renders on every page with nav, account, cart and search.
- [ ] Cart icon reflects the current item count.
- [ ] Mega-menu opens category navigation.
- [ ] Store selector reflects/updates the chosen location.

### Promo Banner

- [ ] Promo links navigate to the offer/PLP.

### Predictive Search

- [ ] Below the min length, no request fires and no results show.
- [ ] At/above min length, matching results render as a typeahead list.
- [ ] Clicking a result navigates to that page.
- [ ] Clear empties the field and closes results.

### Social Media Links

- [ ] Each social icon links to the correct external profile.

### Article Card

- [ ] Each card navigates to its target when clicked.
- [ ] Category eyebrow links to the category.
- [ ] Cards reflow responsively.

### Breadcrumb

- [ ] Breadcrumb reflects the page path; ancestors navigate.

### Scroll to Top

- [ ] After scrolling the button is visible; clicking returns to top.

### Health/Wellness Article

- [ ] Article renders title + body with correct heading hierarchy.
- [ ] Inline links resolve.
- [ ] Images render with alt text.

### Content / Product Carousel

- [ ] Carousel scrolls via prev/next.
- [ ] Cards link correctly.

### Live Chat / Click-to-Chat

- [ ] Clicking the chat button opens the chat widget.

### Login / Sign-in Form

- [ ] Invalid input shows validation errors.
- [ ] Forgot-password / register links resolve.

### Hero Banner

- [ ] Hero renders headline + CTA; rotation works if present.

### Quick Links / Category Shortcuts

- [ ] Each quick-link navigates to its target.

### Article Listing + Pagination

- [ ] On page 1 Previous is disabled.
- [ ] Clicking a page shows that page's items.
- [ ] On the last page Next is disabled.

### Explore (category tiles)

- [ ] Each tile links to its category; counts (if present) are shown.

### Carousel


### Promo Blocks

- [ ] Each promo tile links to its target and shows image + title.

### Product Filters / Facets

- [ ] Selecting a facet narrows the grid.
- [ ] Setting a price range + Apply narrows by price.
- [ ] Clearing a facet restores results.

### Product Detail (PDP)

- [ ] STANDARD: PDP shows title/price/gallery + specs; fulfillment options selectable; add-to-cart updates the cart.
- [ ] CONTACT-LENS: left & right eye power (and box quantity) are selectable and required before add-to-cart; adding the configured prescription updates the cart.
- [ ] The correct variation renders per product type (vision products → contact-lens; all others → standard).

### Product Listing (PLP)

- [ ] Results render as product cards with price and rating.
- [ ] Changing sort reorders results.
- [ ] Applying a filter/price range narrows results.
- [ ] Load-more / next page appends or advances results.
- [ ] A card navigates to its PDP.

### Background Container

- [ ] Wrapped sections render with the specified background.

### Watch Videos (gallery)

- [ ] Each video card shows a thumbnail + duration and plays when selected.

### Feature Tile / Teaser

- [ ] Tile renders media + heading; CTA navigates.

### Fulfillment & Add-to-Cart

- [ ] Selecting a fulfillment option updates availability messaging.
- [ ] Choosing quantity + add-to-cart adds the item and updates the cart count.
- [ ] Check-other-stores surfaces alternative stores.
- [ ] Out-of-stock options are disabled/messaged.

### Article / Content Body

- [ ] Content renders with correct heading hierarchy and working links.

### Editor's Pick / Featured Teaser

- [ ] The teaser shows the curated item with media and links to it.

### Video / Media Embed

- [ ] The embedded player loads and is playable.
- [ ] Any related links navigate correctly; transcript text is shown where present.

### Accordion

- [ ] Clicking a header expands its panel; clicking again collapses it.
- [ ] Keyboard and ARIA disclosure semantics work.

### Recommendations / Merchandising Carousels

- [ ] Each carousel renders its product/offer cards.
- [ ] Prev/next scrolls the rail.
- [ ] A card navigates to the target PDP/PLP or clips a coupon.

### Rx Refill (guest/express)

- [ ] Invalid Rx number shows validation.
- [ ] A store + date can be selected.
- [ ] Submitting a valid refill shows a confirmation.
- [ ] Guest flow works without sign-in.

### Rx Transfer

- [ ] Required fields validate before submit.
- [ ] A destination store can be selected.
- [ ] Submitting shows a transfer confirmation.

### Store Locator

- [ ] Given a location, nearby stores list with address + hours + status.
- [ ] Applying a filter narrows the store list.
- [ ] 'View on map' opens the map for that store.
- [ ] Browse-by-state navigates the store directory.

### Order Pickup / On-my-way

- [ ] Pickup flow shows store info and progresses through steps.

### Create Account (multi-step)

- [ ] Password rules enforced inline before continue.
- [ ] Required fields + Terms consent gate submission.
- [ ] State notices (CA/CO) shown as applicable.

### Forgot / Reset Password (OTP/MFA)

- [ ] Invalid/expired code is rejected.
- [ ] New password enforces the rule set.

### Account Dashboard

- [ ] Dashboard shows the member's orders/refills/rewards; links resolve to each section.

### myWalgreens Rewards

- [ ] Balance and offers reflect the member account.

### Family / Caregiver Management

- [ ] Members can be added and access levels set; selection scopes subsequent actions.

### Health History

- [ ] Records display per authenticated profile; edits persist.

### Rx Settings / Insurance

- [ ] Insurance status shows and can be updated; preferences persist.

### Secure Pharmacy Messaging

- [ ] Threads display; new messages send and appear in history.

---

## 7. User Journeys & Interactions

Capabilities detected across the site (page counts). These indicate the interactive journeys to design & test.

| Capability | Pages |
|---|---|
| Login / account | 987 |
| Filtering | 948 |
| Checkout / buy | 947 |
| Forms | 946 |
| Tabs | 900 |
| Search | 894 |
| Modal / popup | 630 |
| Cart | 583 |
| Accordion / flip | 170 |
| Live chat | 53 |
| Video | 39 |
| Pagination / load-more | 32 |
| Map | 4 |

> Journeys should be walked end-to-end with Playwright and documented in `data/observed-behaviors.json`. Multi-step flows (form → validation → submit → confirmation; filter → results; login → gated content) are called out per block in §5.

---

## 8. Forms

998 form instance(s) found. Kinds: generic (581), contact/lead (13), login/auth (52), search (314), checkout/payment (2).

| Page | Kind | Fields | Method | Posts to |
|---|---|---|---|---|
| / | generic | 1 | get | (js-handled) |
| /22301037185 | generic | 1 | get | (js-handled) |
| /22301037185/walgreens/homepage | generic | 1 | get | (js-handled) |
| /22301037185/walgreens/sales/coupons | generic | 1 | get | (js-handled) |
| /22301037185/walgreens/sales/top-deals | generic | 1 | get | (js-handled) |
| /22301037185/walgreens/sales/weekly-ad | generic | 1 | get | (js-handled) |
| /22301037185/walgreens/shop | generic | 1 | get | (js-handled) |
| /22301037185/walgreens/store | generic | 1 | get | (js-handled) |
| /beauty/beauty-101.html | generic | 1 | get | (js-handled) |
| /beauty/makeup.html | generic | 1 | get | (js-handled) |
| /beauty/skin-care.html | generic | 1 | get | (js-handled) |
| /beauty/skin-care/face-exfoliators.html | generic | 1 | get | (js-handled) |
| /beauty/skin-care/five-surprising-tips-on-how-to-protect-your-skin-from-the-sun.html | generic | 1 | get | (js-handled) |
| /beauty/skin-care/sunscreen-for-babies-and-kids.html | generic | 1 | get | (js-handled) |
| /beauty/skin-care/sunscreen-for-sensitive-and-acne-prone-skin.html | generic | 1 | get | (js-handled) |
| /beauty/skin-care/sunscreen-with-zinc.html | generic | 1 | get | (js-handled) |
| /beauty/tutorials.html | generic | 1 | get | (js-handled) |
| /buying-guides/Acid-reflex-medicine-OTC-options-for-your-symptoms.html | generic | 1 | get | (js-handled) |
| /buying-guides/Constipation-relief-A-guide-to-OTC-laxatives-and-other-options.html | generic | 1 | get | (js-handled) |
| /buying-guides/Guide-to-menstrual-care-Find-the-right-supplies.html | generic | 1 | get | (js-handled) |
| /buying-guides/What-to-look-for-in-a-probiotic.html | generic | 1 | get | (js-handled) |
| /buying-guides/how-to-choose-an-over-the-counter-allergy-medication.html | generic | 1 | get | (js-handled) |
| /buying-guides/how-to-choose-an-over-the-counter-pain-reliever-2.html | generic | 1 | get | (js-handled) |
| /community-stories/7-ways-to-help-kids-de-stress-and-decompress.html | generic | 1 | get | (js-handled) |
| /community-stories/aapi-healthcare-challenges-and-solutions.html | generic | 1 | get | (js-handled) |
| /community-stories/beating-breast-cancer-through-early-detection.html | generic | 1 | get | (js-handled) |
| /community-stories/better-together.html | generic | 1 | get | (js-handled) |
| /community-stories/bringing-vaccines-to-every-community.html | generic | 1 | get | (js-handled) |
| /community-stories/committed-to-a-healthier-future-for-our-children.html | generic | 1 | get | (js-handled) |
| /community-stories/expanding-access-to-care-with-covid-19-vaccine-equity.html | generic | 1 | get | (js-handled) |
| /community-stories/feeding-thousands-of-kids-one-backpack-at-a-time.html | generic | 1 | get | (js-handled) |
| /community-stories/fighting-the-invisible-epidemic-of-diabetes.html | generic | 1 | get | (js-handled) |
| /community-stories/helping-breast-cancer-patients-get-quality-healthcare.html | generic | 1 | get | (js-handled) |
| /community-stories/helping-expectant-mothers-get-quality-prenatal-healthcare.html | generic | 1 | get | (js-handled) |
| /community-stories/improving-access-to-blood-cancer-care-in-minority-communities.html | generic | 1 | get | (js-handled) |
| /community-stories/improving-access-to-leukemia-and-lymphoma-care.html | generic | 1 | get | (js-handled) |
| /community-stories/kids-get-better-healthcare-access-thanks-to-your-red-nose-day-do.html | generic | 1 | get | (js-handled) |
| /community-stories/next-stop-better-care-for-kids-who-need-it.html | generic | 1 | get | (js-handled) |
| /community-stories/our-impact/maternal-health/every-mom-deserves-a-chance-at-a-healthy-pregnancy.html | generic | 1 | get | (js-handled) |
| /community-stories/our-impact/maternal-health/planning-for-pregnancy-these-tips-can-help.html | generic | 1 | get | (js-handled) |
| /community-stories/the-navigator-who-guides-breast-cancer-patients.html | generic | 1 | get | (js-handled) |
| /community-stories/the-power-of-a-three-minute-phone-call.html | generic | 1 | get | (js-handled) |
| /community-stories/the-vaccine-lady-holds-a-key-to-health-equity.html | generic | 1 | get | (js-handled) |
| /community-stories/your-voices/feel-more-like-you.html | generic | 1 | get | (js-handled) |
| /community-stories/your-voices/in-our-words.html | generic | 1 | get | (js-handled) |
| /community-stories/your-voices/shelf-life.html | generic | 1 | get | (js-handled) |
| /contacts | generic | 1 | get | (js-handled) |
| /content/content-hub/us/en/homepage.html | generic | 1 | get | (js-handled) |
| /coupons | generic | 1 | get | (js-handled) |
| /default.jsp | generic | 1 | get | (js-handled) |
| /familymgmt/manageAccountAccess | generic | 1 | get | (js-handled) |
| /familymgmt/manageAccountAccess | contact/lead | 5 | get | (js-handled) |
| /familymgmt/manageAccountAccess | generic | 0 | get | (js-handled) |
| /familymgmt/manageFamilyAccounts | generic | 1 | get | (js-handled) |
| /familymgmt/members/fullaccess | login/auth | 3 | get | (js-handled) |
| /familymgmt/selectedMember | login/auth | 3 | get | (js-handled) |
| /findcare | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/advisor | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/marketplace | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/marketplace/content/what-is-the-marketplace | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/marketplace_dark | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicaid | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare-resources | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/all-plans | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/cigna | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/content/medicare-part-d-coverage-gap | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/content/medicare-part-d-coverage-gap_dark | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/medicare-part-b-services | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/shopping | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/shopping | generic | 2 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/shopping | generic | 3 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/united | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/wellcare | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/partner/dexcom | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/partner/kindbody | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/partner/mdlive | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/partner/mdlivebehavioral | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/partner/services | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/partner/vaccination | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/service/Enrollment_Guide | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/service/abbottplus | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/service/nicorette | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/service/pg-menopause | generic | 1 | get | (js-handled) |
| /findcare/category/caregivers | generic | 1 | get | (js-handled) |
| /findcare/category/caregivers | generic | 1 | get | (js-handled) |
| /findcare/category/diabetes | generic | 1 | get | (js-handled) |
| /findcare/category/diabetes | generic | 1 | get | (js-handled) |
| /findcare/category/illness-injuries | generic | 1 | get | (js-handled) |
| /findcare/category/illness-injuries | generic | 1 | get | (js-handled) |
| /findcare/category/inperson-visit | generic | 1 | get | (js-handled) |
| /findcare/category/inperson-visit | generic | 1 | get | (js-handled) |
| /findcare/category/labsandat-homekits | generic | 1 | get | (js-handled) |
| /findcare/category/labsandat-homekits | generic | 1 | get | (js-handled) |
| /findcare/category/preventivecare | generic | 1 | get | (js-handled) |
| /findcare/category/preventivecare | generic | 1 | get | (js-handled) |
| /findcare/category/skin-hair | generic | 1 | get | (js-handled) |
| /findcare/category/skin-hair | generic | 1 | get | (js-handled) |
| /findcare/category/virtual-visit | generic | 1 | get | (js-handled) |
| /findcare/category/virtual-visit | generic | 1 | get | (js-handled) |
| /findcare/category/vision-hearing | generic | 1 | get | (js-handled) |
| /findcare/category/vision-hearing | generic | 1 | get | (js-handled) |
| /findcare/category/weightloss | generic | 1 | get | (js-handled) |
| /findcare/category/weightloss | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage.jsp | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage/advisor | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage/medicaid | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage/medicare/cigna | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage/medicare/united | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage/medicare/wellcare | generic | 1 | get | (js-handled) |
| /findcare/covid19 | login/auth | 3 | get | (js-handled) |
| /findcare/covid19/otc | generic | 1 | get | (js-handled) |
| /findcare/covid19/otc | generic | 2 | get | (js-handled) |
| /findcare/covid19/otc-test | generic | 1 | get | (js-handled) |
| /findcare/covid19/paxlovid | generic | 1 | get | (js-handled) |
| /findcare/covid19/paxlovid/positive-test | generic | 1 | get | (js-handled) |
| /findcare/covid19/testing | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/advisor | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/marketplace | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/marketplace/content/what-is-the-marketplace | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/marketplace_dark | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicaid | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare-resources | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/all-plans | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/cigna | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/content/medicare-part-d-coverage-gap | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/content/medicare-part-d-coverage-gap_dark | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/medicare-part-b-services | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/shopping | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/shopping | generic | 2 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/shopping | generic | 3 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/united | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/wellcare | generic | 1 | get | (js-handled) |
| /findcare/mdlive | generic | 1 | get | (js-handled) |
| /findcare/partner/dexcom | generic | 1 | get | (js-handled) |
| /findcare/partner/find-my-clinical-trial | contact/lead | 10 | post | go.walgreenshealth.com |
| /findcare/partner/kindbody | generic | 1 | get | (js-handled) |
| /findcare/service/Enrollment_Guide | generic | 1 | get | (js-handled) |
| /findcare/service/FreeStyle | generic | 1 | get | (js-handled) |
| /findcare/service/nicorette | generic | 1 | get | (js-handled) |
| /findcare/service/pg-menopause | generic | 1 | get | (js-handled) |
| /findcare/services | generic | 1 | get | (js-handled) |
| /findcare/vaccination | generic | 1 | get | (js-handled) |
| /findcarecovidui | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/caregivers | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/diabetes | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/illness-injuries | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/inperson-visit | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/labsandat-homekits | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/preventivecare | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/skin-hair | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/virtual-visit | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/vision-hearing | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/weightloss | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/women | generic | 1 | get | (js-handled) |
| /fsa | generic | 1 | get | (js-handled) |
| /hcimmhealthrecordui | generic | 1 | get | (js-handled) |
| /health-services/clinical-trials | generic | 1 | get | (js-handled) |
| /health-services/clinical-trials/es | generic | 1 | get | (js-handled) |
| /health/allergy-asthma/900006 | generic | 1 | get | (js-handled) |
| /health/allergy/11-tips-to-keep-indoor-allergies-at-bay.html | generic | 1 | get | (js-handled) |
| /health/cough-cold-flu/4-mitos-y-verdades-sobre-cuando-darse-la-vacuna-contra-la-gripe.html | generic | 1 | get | (js-handled) |
| /health/cough-cold-flu/4-myths-and-facts-about-the-timing-of-the-flu-shot.html | generic | 1 | get | (js-handled) |
| /health/cough-cold-flu/6-easy-ways-to-avoid-germs-this-holiday-season.html | generic | 1 | get | (js-handled) |
| /health/diabetes/500001 | generic | 1 | get | (js-handled) |
| /health/diabetes/7-ways-to-manage-diabetes-when-you-have-the-flu.html | generic | 1 | get | (js-handled) |
| /health/p2/a/1800002/are-nsaids-safe-five-facts-you-should-know/2191117 | generic | 1 | get | (js-handled) |
| /health/p2/a/1800002/back-muscle-strains-symptoms-and-treatment/2449025 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800002/back-pain-common-causes-and-treatments/2449005 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800002/constant-headaches-meaning-and-treatment/2449010 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800002/diagnosing-arthritis/2449027 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800002/headache-locations-and-what-they-mean/2449003 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800002/migraines-101/2156100 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800002/types-of-arthritis/2449033 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800002/what-causes-arthritis/2449021 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800002/what-is-tendonitis/2448392 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/causes-of-sleep-paralysis/2449148 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/how-much-sleep-should-i-be-getting/2442133 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/jet-lag-causes-symptoms-and-prevention/2448571 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/melatonin-from-food/2449132 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/melatonin-safety/2449154 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/narcolepsy-causes-symptoms-and-medications/2448663 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/pregnancy-insomnia/2449120 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/sleep-aids-and-natural-remedies-for-insomnia/2448660 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/sleep-apnea-causes-symptoms-and-treatment/2448661 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/sleep-insomnia-in-women/2448662 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/sleep-your-way-to-better-health-tonight/2129113 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/testing-for-sleep-apnea/2449115 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800004/too-much-sleep-hurts/2401101 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800006/alzheimers-disease-the-most-common-form-of-dementia/2447031 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800006/dementia-a-complex-group-of-symptoms/2447032 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800006/incontinence-101/2414104 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1800006/what-does-immunocompromised-mean/2449069 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/acid-reflux-in-babies/2449128 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/acid-reflux-in-pregnancy/2449123 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/acid-reflux-symptoms-and-treatments-explained/2446680 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/bloating-after-eating-causes-and-treatments/2448981 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/causes-of-gerd/2449134 | generic | 1 | get | (js-handled) |
| /health/p2/a/1900001/celiac-disease-an-informational-overview/2446666 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/colon-cancer-treatment/2449137 | generic | 1 | get | (js-handled) |
| /health/p2/a/1900001/constipation-explanations-and-solutions-for-a-common-problem/2446681 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/constipation-in-pregnancy/2449136 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/constipation-remedies/2449135 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/diarrhea-in-pregnancy/2449155 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/foods-that-help-with-diarrhea/2449152 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/foods-to-help-constipation/2449159 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/gluten-what-you-need-to-know/2446667 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/heartburn-vs-acid-reflux/2449133 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/how-to-help-a-constipated-baby/2449158 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/how-to-manage-ibs-symptoms/2448984 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/how-to-relieve-gas-pain/2449161 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/nausea-after-eating/2449149 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/nausea-in-pregnancy/2449150 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/nausea-medicine/2448988 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/nausea-remedies/2449151 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/remedies_for_diarrhea_in_babies/2449157 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/remedies_for_upset_stomach_and_diarrhea/2449156 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/symptoms-of-colon-cancer/2449138 | generic | 1 | get | (js-handled) |
| /health/p2/a/1900001/the-power-of-probiotics/2130127 | generic | 1 | get | (js-handled) |
| /health/p2/a/1900001/ulcerative-colitis-an-inflammatory-bowel-disease/2446669 | search | 1 | get | www.walgreens.com |
| /health/p2/a/1900001/what-is-heartburn-and-how-is-heartburn-treated/2446668 | search | 1 | get | www.walgreens.com |
| /health/p2/a/2500001/what-is-pre-diabetes/2449046 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/5-tips-to-avoid-weight-gain-while-you-quit-smoking/2297202 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/choosing-the-right-nicotine-replacement-therapy/2297204 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3000001/conquering-smoking-cravings-and-triggers/2297203 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/creating-a-smoke-free-environment/2306377 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/eight-reasons-to-quit-smoking/300001 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/eight-things-to-do-when-you-want-a-cigarette/2448990 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/five-ways-to-help-someone-quit-smoking/2448995 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/how-exercise-can-help-with-quitting-smoking/2448991 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/how-smoking-makes-medical-problems-worse/2448992 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/identification-and-management-of-gateways-to-smoking/2325846 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/managing-a-smoking-relapse/2317654 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/managing-mood-changes-after-quit-day/2448996 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/myths-and-facts-about-nicotine-replacement-therapy/2448997 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/quit-smoking-with-online-support/2342102 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/seven-ways-to-reduce-your-risk-of-cancer/2448998 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/the-effects-of-smoking-on-fertility/2448993 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/the-impact-of-second-and-third-hand-smoke/2448994 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/the-real-costs-of-smoking/2306378 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/youth-and-smoking-prevention-what-do-we-know-and-what-can-be-done/2297205 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/zyban-or-chantix-whats-the-difference/2306376 | generic | 1 | get | (js-handled) |
| /health/p2/a/3200001/OCD-symptoms/2449173 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/anxiety-and-depression/2448980 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/anxiety-in-children/2449102 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/autism-in-children/2449160 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/bipolar-disorder/2442586 | generic | 1 | get | (js-handled) |
| /health/p2/a/3200001/childrens-anxiety-disorders-treatment/2440102 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/childrens-depression-treatment/2441100 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/coronavirus-anxiety-and-stress-how-to-cope/2449053 | generic | 1 | get | (js-handled) |
| /health/p2/a/3200001/coronavirus-social-distancing-and-depression/2449047 | generic | 1 | get | (js-handled) |
| /health/p2/a/3200001/helpful-parenting-tips-during-covid-19/2449062 | generic | 1 | get | (js-handled) |
| /health/p2/a/3200001/helping-a-family-member-who-has-ptsd/2442587 | generic | 1 | get | (js-handled) |
| /health/p2/a/3200001/how-systemic-racism-affects-public-health-part-1-health-disparities-among-black-people/2449079 | generic | 1 | get | (js-handled) |
| /health/p2/a/3200001/how-to-choose-a-mental-health-therapist/2437101 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/how-to-manage-anxiety-medications/2440101 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/how-to-manage-stress/2449108 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/how-to-manage-your-antidepressants/2440100 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/managing-depression/2448985 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/medications-for-anxiety/2449103 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/mental-health-glossary/2437100 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/ocd-medications-and-treatment/2449169 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/physical-side-effects-stress/2449080 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/signs-and-symptoms-of-autism/2449168 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/signs-and-symptoms-of-schizophrenia/2449171 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/stopping-panic-attacks/2449104 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/trouble-sleeping-during-coronavirus-tips-to-get-better-rest/2449061 | generic | 1 | get | (js-handled) |
| /health/p2/a/3200001/what-is-bulimia/2449176 | search | 1 | get | www.walgreens.com |
| /health/p2/a/3200001/why-we-feel-stressed-during-the-pandemic/2449142 | generic | 1 | get | (js-handled) |
| /health/p2/a/4000001/Sunscreen-for-sensitive-and-acne-prone-skin/2449044 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/common-skin-rash-types-causes-and-symptoms/2448501 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/creams-and-treatments-for-eczema/2449055 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/dandruff-basics/2446853 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/dry-skin-causes-and-treatments/2448983 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/eczema-on-the-face-causes-and-treatments/2449054 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/eczema/2442643 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/face-exfoliators/2449039 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/first-aid-tips-for-cuts-and-scrapes/2448250 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/how-to-identify-and-treat-bug-bites/2448251 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/how-to-treat-poison-ivy-oak-and-sumac/2448322 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/sun-spots-causes-treatment-and-prevention/2448500 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/what-is-photosensitivity/2448091 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4000001/what-is-psoriasis/2446852 | search | 1 | get | www.walgreens.com |
| /health/p2/a/400002/menopause-what-to-expect/2178246 | search | 1 | get | www.walgreens.com |
| /health/p2/a/400002/migraines-101/2156100 | search | 1 | get | www.walgreens.com |
| /health/p2/a/400002/your-guide-to-managing-menopause/2129108 | generic | 1 | get | (js-handled) |
| /health/p2/a/400002/your-guide-to-urinary-tract-infections-utis/2129115 | generic | 1 | get | (js-handled) |
| /health/p2/a/400002/your-toughest-hiv-prevention-questions-answered/2449088 | search | 1 | get | www.walgreens.com |
| /health/p2/a/4300001/how-to-manage-anxiety-medications/2440101 | generic | 1 | get | (js-handled) |
| /health/p2/a/4300002/bipolar-disorder/2442586 | generic | 1 | get | (js-handled) |
| /health/p2/a/4300005/helping-a-family-member-who-has-ptsd/2442587 | generic | 1 | get | (js-handled) |
| /health/p2/a/4400001/incontinence-an-overview-for-caregivers/2446951 | search | 1 | get | www.walgreens.com |
| /health/p2/a/500001/alcohol-and-diabetes/2449059 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/blood-pressure-in-diabetes/2449068 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/caring-for-a-loved-one-with-diabetes/2142157 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/causes-of-diabetes-type-2/2449063 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/diabetes-and-the-keto-diet/2449064 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/diabetes-diet-dos-and-donts/2141102 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/diabetes-insulin/2449065 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/diabetes-tracker-take-charge-of-your-blood-sugar/2142154 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/diabetic-foot-problems/2447563 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/dry-mouth/2165855 | search | 1 | get | www.walgreens.com |
| /health/p2/a/500001/gestational-diabetes-causes-risk-factors-and-treatments/2447951 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/have-diabetes-know-your-numbers/2142147 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/how-to-test-your-blood-glucose-sugar/2142156 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/hyperglycemia-high-blood-sugar-for-diabetics/2447952 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/hypoglycemia-low-blood-sugar-for-diabetics/2447950 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/keep-blood-sugar-under-control/2142155 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/keep-your-vision-strong-even-with-diabetes/2143102 | search | 1 | get | www.walgreens.com |
| /health/p2/a/500001/managing-diabetes-medication-side-effects/2142148 | search | 1 | get | www.walgreens.com |
| /health/p2/a/500001/managing-diabetes-with-walgreens-tools/2414103 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/managing-nerve-pain-in-diabetes/2449066 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/smart-strategies-for-weight-loss-with-type-2-diabetes/2142152 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/sugar-substitutes-for-diabetes/2449067 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/switching-to-a-new-diabetes-medication/2142150 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/tests-for-diabetes/2447580 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/treating-diabetes-with-medication-an-overview/2142149 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/type_1_diabetes_in_children/2449060 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/veggie-frittata-recipe-for-diabetics/2443280 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/walk-away-from-diabetes/2142151 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/what-are-diabetic-socks/2447577 | search | 1 | get | www.walgreens.com |
| /health/p2/a/500001/what-is-diabetes/2133199 | generic | 1 | get | (js-handled) |
| /health/p2/a/500001/what-is-pre-diabetes/2449046 | generic | 1 | get | (js-handled) |
| /health/p2/a/800004/beta-blockers-vs-calcium-channel-blockers/2449236 | search | 1 | get | www.walgreens.com |
| /health/p2/a/800004/dehydration-causes-symptoms-prevention/2448382 | generic | 1 | get | (js-handled) |
| /health/p2/a/800006/the-dos-and-donts-of-your-diet-plan/2130134 | generic | 1 | get | (js-handled) |
| /health/p2/a/800006/the-power-of-probiotics/2130127 | generic | 1 | get | (js-handled) |
| /health/p2/a/800006/your-holiday-diet-game-plan/2130131 | generic | 1 | get | (js-handled) |
| /health/p2/a/900002/4-myths-about-the-timing-of-flu-shots/2448860 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/6-easy-ways-to-avoid-germs-this-holiday-season/2288394 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/bronchitis-vs-pneumonia/2448982 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/cold-medicine-when-pregnant-or-breastfeeding/2449000 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/cold-vs-flu-how-do-they-differ/2447313 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/cough-and-cold-medicine-for-children/2448872 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/covid-19-testing/2449117 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/croup-vs-whooping-cough/2448930 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/does-the-flu-shot-protect-me-from-COVID-19/2449081 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/flu-during-pregnancy-symptoms-and-prevention/2448913 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/flu-shot-options-for-seniors/2448800 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/flu-testing-and-diagnosis/2449076 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/flu-vs-covid-19-what-you-need-to-know/2449077 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/get-well-soon-kit-for-cold-and-flu-season/2449090 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/how-different-covid-19-vaccines-work/2449153 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/how-to-choose-a-face-mask/2449113 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/how-to-diagnose-pneumonia/2449091 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/how-to-recover-from-a-cold/2447233 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/how-to-wash-your-mask/2449129 | generic | 1 | get | (js-handled) |
| /health/p2/a/900002/humidifiers-for-babies-and-kids/2449092 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/humidifiers-for-cold-and-flu/2449093 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/is-pneumonia-contagious/2449094 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/keys-to-preventing-pneumonia/2288405 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/kids-and-the-flu-what-to-do/2201101 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/medicare-is-the-flu-shot-covered/2200227 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/medicine-for-cold-and-sinus/2448986 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/nasal-decongestants/2448987 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/persistent-cough/2449095 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/pneumonia-symptoms-and-treatment/2449096 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/pneumonia-vaccine/2449082 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/side-effects-of-the-measles-vaccine/2449099 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/sinus-infections-causes-and-symptoms-explained/2447234 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/the-flu-basics/2447312 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/the-flu-shot-what-you-need-to-know/2447311 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/tuberculosis-testing/2449107 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/wheezing/2449097 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/when-to-get-the-measles-vaccine/2449100 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/whooping-cough-the-common-term-for-pertussis/2447310 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900002/whooping-cough-vaccine/2449101 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/16-heart-healthy-foods-you-arent-eating/2181102 | generic | 1 | get | (js-handled) |
| /health/p2/a/900004/24-ways-to-lower-your-risk-for-heart-attack-today/2181100 | generic | 1 | get | (js-handled) |
| /health/p2/a/900004/beta-blockers-vs-calcium-channel-blockers/2449236 | generic | 1 | get | (js-handled) |
| /health/p2/a/900004/causes-of-heart-failure/2449056 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/common-heart-disease-medications/2447722 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/early-signs-of-lung-cancer/2449028 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/foods-to-lower-cholesterol/2449072 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/form-heart-healthy-habits/2358263 | generic | 1 | get | (js-handled) |
| /health/p2/a/900004/heart-arrhythmias-causes-and-treatments/2449121 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/heart-attack-causes-symptoms-treatments-and-prevention/2447481 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/heart-disease-information/2447491 | generic | 1 | get | (js-handled) |
| /health/p2/a/900004/heart-rate-what-is-heart-rate-and-how-to-measure-it/2447492 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/how-to-lower-blood-pressure/2449057 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/how-to-lower-cholesterol/2449073 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/how-to-lower-triglyceride-levels/2449130 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/lipid-panel-testing/2449143 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/lung-cancer-risk-factors/2449030 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/nuclear-stress-test/2449071 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/overview-of-arteries-and-arterial-diseases/2447480 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/signs-and-symptoms-of-common-heart-diseases/2447493 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/signs_and_symptoms_of_AFib/2449058 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/sinus-arrhythmia/2449122 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/stages-of-copd/2449147 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/symptoms-and-causes-of-high-triglycerides/2449144 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/symptoms-of-copd/2449146 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/symptoms-of-heat-stroke/2449070 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/symptoms_of_a_stroke/2449052 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/take-control-of-your-blood-pressure-a-5-step-plan/2182100 | generic | 1 | get | (js-handled) |
| /health/p2/a/900004/what-is-angina-pectoris/2449040 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/what-is-angina/2449050 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/whats-new-in-heart-health/2358264 | generic | 1 | get | (js-handled) |
| /health/p2/a/900004/who-should-be-screened-for-lung-cancer/2449006 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900004/why-your-heart-needs-a-good-nights-sleep/2356088 | generic | 1 | get | (js-handled) |
| /health/p2/a/900006/11-tips-to-reduce-indoor-allergies/2448062 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/allergens-a-comprehensive-guide/2446570 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/allergy-induced-asthma/2449127 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/allergy-medication-for-pregnancy-and-childhood/2448139 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/antihistamines-for-treating-allergy-symptoms/2448140 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/asthma-attacks/2449139 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/asthma-in-children/2449145 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/at_home_allergy_testing/2449012 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/can-allergies-cause-a-sore-throat/2449014 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/can_allergies_cause_headaches/2449015 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/coronavirus-symptoms-vs-allergies/2449051 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/coughing-in-asthma/2449140 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/coughing_from_allergies/2449016 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/do-you-have-allergies-or-a-cold/2449017 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/finding-relief-from-grass-allergies/2449018 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/how-to-avoid-common-fall-allergies/2449023 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/how-to-test-for-food-allergies/2449019 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/mold-allergy-symtoms-causes-and-treatments/2449020 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/natural-remedies-for-allergies-what-works/2448060 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/pollen-basics-for-the-allergy-sufferer/2446460 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/saline-nasal-spray-a-natural-alternative/2446451 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/symptoms-and-warning-signs-of-an-asthma-attack/2446545 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/symptoms-of-asthma/2449126 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/the-8-most-common-food-allergies/2446440 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/tips-for-managing-pet-allergy-symptoms/2448110 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/tree-pollen-allergy-types-and-symptoms/2448061 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/types-of-asthma-inhalers/2449141 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/what-causes-winter-allergies/2449004 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/what-is-contact-dermatitis/2446544 | search | 1 | get | www.walgreens.com |
| /health/p2/a/900006/what-type-of-allergy-medicine-do-i-need/2448063 | generic | 1 | get | (js-handled) |
| /health/p2/s/500001/8-easy-delicious-ways-to-cook-for-diabetes/2131873/1 | generic | 1 | get | (js-handled) |
| /health/p2/s/800006/10-ways-to-eat-right-now/2130139/1 | generic | 1 | get | (js-handled) |
| /health/p2/s/800006/11-superfoods-to-start-eating-now/2130191/1 | generic | 1 | get | (js-handled) |
| /health/p2/s/800006/8-flu-fighting-foods/2130100/1 | generic | 1 | get | (js-handled) |
| /health/p2/s/800006/9-healthy-substitutions-for-your-diet/2130150/1 | generic | 1 | get | (js-handled) |
| /health/p2/s/800006/weight-loss-tips-scale-wont-budge-heres-what-to-do/2130252/1 | generic | 1 | get | (js-handled) |
| /health/p2/s/900002/8-flu-fighting-foods/2130100/1 | generic | 1 | get | (js-handled) |
| /health/pain-management/1800002 | search | 1 | get | www.walgreens.com |
| /health/quit-smoking/3000001 | generic | 1 | get | (js-handled) |
| /health/vaccines-immunizations/6-simple-tips-to-combat-needle-anxiety.html | generic | 1 | get | (js-handled) |
| /healthcare-solutions/how-we-can-help/clinical-trials | contact/lead | 10 | post | go.walgreenshealth.com |
| /healthcare-solutions/how-we-can-help/disease-state-specialization/hiv | contact/lead | 10 | post | go.walgreenshealth.com |
| /healthychoices | generic | 1 | get | (js-handled) |
| /immunizationservice | generic | 1 | get | (js-handled) |
| /immunizationservice/pharmacy/immunization/ViewImmunizeHistory.jsp | login/auth | 3 | get | (js-handled) |
| /login.jsp | login/auth | 3 | get | (js-handled) |
| /logout | generic | 1 | get | (js-handled) |
| /logout.jsp | generic | 1 | get | (js-handled) |
| /marketing/emailsignup/signup_main.jsp | generic | 1 | get | (js-handled) |
| /mktg/contactus/contact-us-landing.jsp | generic | 1 | get | (js-handled) |
| /mywalgreens | generic | 1 | get | (js-handled) |
| /mywalgreens-terms | generic | 1 | get | (js-handled) |
| /mywalgreens/cards/credit.jsp | generic | 1 | get | (js-handled) |
| /mywalgreens/cards/debit.jsp | generic | 1 | get | (js-handled) |
| /mywalgreens/dashboard.jsp | generic | 1 | get | (js-handled) |
| /mywalgreens/upgrade.jsp | login/auth | 3 | get | (js-handled) |
| /mywalgreenshealthaccess/termsofuse | login/auth | 3 | get | (js-handled) |
| /offers | generic | 1 | get | (js-handled) |
| /offers/offers.jsp | generic | 1 | get | (js-handled) |
| /offers/offers.jsp/weeklyad | generic | 1 | get | (js-handled) |
| /our-team | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp/sendcode | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp/sendcode | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp/validatecode | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp/validatecode | generic | 1 | get | (js-handled) |
| /password/reset_password.jsp | generic | 1 | get | (js-handled) |
| /password/reset_password.jsp | generic | 1 | get | (js-handled) |
| /password/retrieve_username_confirmation.jsp | generic | 1 | get | (js-handled) |
| /pharmacy | generic | 1 | get | (js-handled) |
| /pharmacy | contact/lead | 9 | get | (js-handled) |
| /pharmacy/familyaccount/managefamilyaccounts.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/fulfillment/rx-landing | login/auth | 3 | get | (js-handled) |
| /pharmacy/immunization/ViewImmunizeHistory.jsp | login/auth | 3 | get | (js-handled) |
| /pharmacy/immunization/immunization_index.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/immunization/seasonal_flu.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/manageautorefills/manage_auto_refill.jsp | login/auth | 3 | get | (js-handled) |
| /pharmacy/messaging/psm/psmhome.jsp | login/auth | 3 | get | (js-handled) |
| /pharmacy/order/enterprescription.jsp | login/auth | 3 | get | (js-handled) |
| /pharmacy/order/express-refills.jsp | login/auth | 3 | get | (js-handled) |
| /pharmacy/order/transferprescription.jsp | login/auth | 3 | get | (js-handled) |
| /pharmacy/pharmacy_chat_landing.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/pharmacy_chat_landing.jsp | contact/lead | 9 | get | (js-handled) |
| /pharmacy/privacyComplaintForm/privacyComplaintForm.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/privacyComplaintForm/privacyComplaintForm.jsp | checkout/payment | 21 | get | (js-handled) |
| /pharmacy/report/rxprint.jsp | login/auth | 3 | get | (js-handled) |
| /pharmacy/rxstatus/rxStatus.jsp | login/auth | 3 | get | (js-handled) |
| /pharmacy/save-a-trip-refills.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/save-a-trip-refills.jsp | contact/lead | 9 | get | (js-handled) |
| /pharmacy/sell-your-pharmacy | generic | 1 | get | (js-handled) |
| /pharmacy/specialty-pharmacy/cancer-treatment/oral-chemo-drug-information.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/specialtypharmacy.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/youraccount/accountbalance/payment.jsp | login/auth | 3 | get | (js-handled) |
| /privacycenter | generic | 1 | get | (js-handled) |
| /promotion/offer-details | generic | 1 | get | (js-handled) |
| /promotion/party-supplies | generic | 1 | get | (js-handled) |
| /promotion/walgreens-app | generic | 1 | get | (js-handled) |
| /promotion/womens-wellness | generic | 1 | get | (js-handled) |
| /psc/prescription-savings-club | generic | 1 | get | (js-handled) |
| /register/addressView | generic | 1 | get | (js-handled) |
| /register/addressView | generic | 7 | get | (js-handled) |
| /register/completePharmacyReg | login/auth | 3 | get | (js-handled) |
| /register/mywag/covidvaccine/updates | login/auth | 3 | get | (js-handled) |
| /register/mywalgreens/enroll | login/auth | 3 | get | (js-handled) |
| /register/mywalgreens/multipleMatch | login/auth | 3 | get | (js-handled) |
| /register/mywalgreens/review | login/auth | 3 | get | (js-handled) |
| /register/mywalgreens/verifyCode | login/auth | 3 | get | (js-handled) |
| /register/mywalgreens/verifyMembership | login/auth | 3 | get | (js-handled) |
| /register/pharmacyRegistration | generic | 1 | get | (js-handled) |
| /register/pharmacyRegistration | login/auth | 9 | get | (js-handled) |
| /register/pharmacyRegistration.jsp | generic | 1 | get | (js-handled) |
| /register/pharmacyRegistration.jsp | login/auth | 9 | get | (js-handled) |
| /register/regConfirmationView | login/auth | 3 | get | (js-handled) |
| /register/regOptions.jsp | generic | 1 | get | (js-handled) |
| /register/regOptions.jsp | login/auth | 7 | get | (js-handled) |
| /register/reg_confirmation.jsp | login/auth | 3 | get | (js-handled) |
| /register/regpersonalinfo | generic | 1 | get | (js-handled) |
| /register/regpersonalinfo | login/auth | 7 | get | (js-handled) |
| /request_error.jsp | generic | 1 | get | (js-handled) |
| /rx-checkout/guest-express-refill | generic | 1 | get | (js-handled) |
| /rx-checkout/guest-express-refill | generic | 4 | get | (js-handled) |
| /rx-checkout/guest-transfer-rx | generic | 1 | get | (js-handled) |
| /rx-checkout/guest-transfer-rx | contact/lead | 12 | get | (js-handled) |
| /rx-checkout/order/enter-prescription | login/auth | 3 | get | (js-handled) |
| /rx-checkout/order/express-refill | login/auth | 3 | get | (js-handled) |
| /rx-checkout/order/transfer-prescription | login/auth | 3 | get | (js-handled) |
| /rx-checkout/pharmacy-landing | generic | 1 | get | (js-handled) |
| /rx-checkout/pharmacy-landing | contact/lead | 9 | get | (js-handled) |
| /rx-checkout/refill-by-scan | generic | 1 | get | (js-handled) |
| /rx-checkout/refill-by-scan | generic | 4 | get | (js-handled) |
| /rx-druginfo/pharmacy/finddrug/druginfosearch | generic | 1 | get | (js-handled) |
| /rx-druginfo/search-results | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/allergy-asthma/900006 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/answers | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/caregiver-support/4400001 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/cough-cold-flu/900002 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/diabetes/500001 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/digestive-health/1900001 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/heart-health/900004 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/mental-health/3200001 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800002/arthritis-medicine/2449002 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800002/constant-headaches-meaning-and-treatment/2449010 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800002/migraines-101/2156100 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800002/products-to-treat-and-manage-arthritis-pain/2449032 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800002/types-of-arthritis/2449033 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800002/types-of-arthritis/2449033&20200222 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/1800002/yoga-and-acupuncture-helpful-for-sciatic-nerve-pain/2448530 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800004/causes-of-sleep-paralysis/2449148 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800004/how-much-sleep-should-i-be-getting/2442133 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800004/jet-lag-causes-symptoms-and-prevention/2448571 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800004/narcolepsy-causes-symptoms-and-medications/2448663 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800004/sleep-aids-and-natural-remedies-for-insomnia/2448660 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800004/sleep-apnea-causes-symptoms-and-treatment/2448661 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800004/sleep-insomnia-in-women/2448662 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800004/too-much-sleep-hurts/2401101 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800006/alzheimers-disease-the-most-common-form-of-dementia/2447031 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1800006/what-does-immunocompromised-mean/2449069 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/acid-reflux-in-babies/2449128 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/acid-reflux-in-pregnancy/2449123 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/acid-reflux-symptoms-and-treatments-explained/2446680 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/bloating-after-eating-causes-and-treatments/2448981 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/celiac-disease-an-informational-overview/2446666 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/colon-cancer-treatment/2449137 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/1900001/constipation-explanations-and-solutions-for-a-common-problem/2446681 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/constipation-in-pregnancy/2449136 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/constipation-remedies/2449135 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/gluten-what-you-need-to-know/2446667 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/how-to-manage-ibs-symptoms/2448984 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/how-to-relieve-gas-pain/2449161 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/symptoms-of-colon-cancer/2449138 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/1900001/ulcerative-colitis-an-inflammatory-bowel-disease/2446669 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/1900001/what-is-gerd/2449001 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/1900001/what-is-heartburn-and-how-is-heartburn-treated/2446668 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/3000001/finding-the-right-mental-health-therapy/2438100 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3000001/the-impact-of-second-and-third-hand-smoke/2448994 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3200001/anxiety-and-depression/2448980 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/3200001/childrens-depression-treatment/2441100 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/3200001/coronavirus-anxiety-and-stress-how-to-cope/2449053 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3200001/coronavirus-social-distancing-and-depression/2449047 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3200001/finding-the-right-mental-health-therapy/2438100 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3200001/helping-a-family-member-who-has-ptsd/2442587 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3200001/how-to-manage-anxiety-medications/2440101 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/3200001/how-to-manage-stress/2449108 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/3200001/managing-depression/2448985 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/3200001/physical-side-effects-stress/2449080 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/4000001/common-skin-rash-types-causes-and-symptoms/2448501 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/4000001/creams-and-treatments-for-eczema/2449055 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/4000001/dandruff-basics/2446853 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/4000001/dry-skin-causes-and-treatments/2448983 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/4000001/eczema-on-the-face-causes-and-treatments/2449054 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/4000001/eczema/2442643 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/4000001/how-to-identify-and-treat-bug-bites/2448251 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/4000001/types-of-eczema-treatment/2442643 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/4000001/what-is-photosensitivity/2448091 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/4000001/what-is-psoriasis/2446852 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/400002/menopause-what-to-expect/2178246 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/400002/your-guide-to-managing-menopause/2129108 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/400002/your-guide-to-urinary-tract-infections-utis/2129115 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/400002/your-toughest-hiv-prevention-questions-answered/2449088 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/alcohol-and-diabetes/2449059 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/blood-pressure-in-diabetes/2449068 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/diabetes-insulin/2449065 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/diabetic-foot-problems/2447563 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/dry-mouth/2165855 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/gestational-diabetes-causes-risk-factors-and-treatments/2447951 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/how-to-test-your-blood-glucose-blood-sugar/2142156 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/500001/how-to-test-your-blood-glucose-sugar/2142156 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/hyperglycemia-high-blood-sugar-for-diabetics/2447952 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/hypoglycemia-low-blood-sugar-for-diabetics/2447950 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/keep-blood-sugar-under-control/2142155 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/managing-diabetes-with-walgreens-tools/2414103 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/500001/managing-nerve-pain-in-diabetes/2449066 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/tests-for-diabetes/2447580 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/treating-diabetes-with-medication-an-overview/2142149 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/what-is-diabetes/2133199 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/500001/what-is-pre-diabetes/2449046 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/800004/causes-of-childhood-obesity/2449199 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/800004/dehydration-causes-symptoms-prevention/2448382 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/900002/4-myths-about-the-timing-of-flu-shots/2448860 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/article_medhelp_whooping-cough-vaccine/2449101 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/article_pneumonia-vaccine/2449082 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/bronchitis-vs-pneumonia/2448982 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/cold-vs-flu-how-do-they-differ/2447313 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/croup-vs-whooping-cough/2448930 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/flu-during-pregnancy-symptoms-and-prevention/2448913 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/flu-shot-options-for-seniors/2448800 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/flu-testing-and-diagnosis/2449076 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/how-different-covid-19-vaccines-work/2449153 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/how-to-recover-from-a-cold/2447233 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/humidifiers-for-babies-and-kids/2449092 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/humidifiers-for-cold-and-flu/2449093 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/keys-to-preventing-pneumonia/2288405 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/nasal-decongestants/2448987 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/persistent-cough/2449095 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/pneumonia-symptoms-and-treatment/2449096 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/sinus-infections-causes-and-symptoms-explained/2447234 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/the-flu-basics/2447312 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/the-flu-shot-what-you-need-to-know/2447311 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/wheezing/2449097 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900002/whooping-cough-the-common-term-for-pertussis/2447310 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/early-signs-of-lung-cancer/2449028 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/foods-to-lower-cholesterol/2449072 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/heart-arrhythmias-causes-and-treatments/2449121 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/heart-attack-causes-symptoms-treatments-and-prevention/2447481 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/heart-disease-information/2447491 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/heart-rate-what-is-heart-rate-and-how-to-measure-it/2447492 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/how-to-lower-blood-pressure/2449057 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/how-to-lower-cholesterol/2449073 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/how-to-lower-triglyceride-levels/2449130 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/overview-of-arteries-and-arterial-diseases/2447480 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/signs-and-symptoms-of-common-heart-diseases/2447493 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/signs-and-symptoms-of-common-heart-diseases/2447722 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/900004/symptoms-and-causes-of-high-triglycerides/2449144 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/symptoms_of_a_stroke/2449052 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/take-control-of-your-blood-pressure-a-5-step-plan/2182100 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/900004/what-is-angina-pectoris/2449040 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900004/what-is-angina/2449050 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/11-tips-to-reduce-indoor-allergies/2448062 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/allergens-a-comprehensive-guide/2446570 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/allergy-induced-asthma/2449127 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/antihistamines-for-treating-allergy-symptoms/2448140 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/asthma-attacks/2449139 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/can-allergies-cause-a-sore-throat/2449014 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/coughing-in-asthma/2449140 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/coughing_from_allergies/2449016 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/finding-relief-from-grass-allergies/2449018 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/how-to-test-for-food-allergies/2449019 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/mold-allergy-symtoms-causes-and-treatments/2449020 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/pollen-basics-for-the-allergy-sufferer/2446460 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/saline-nasal-spray-a-natural-alternative/2446451 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/symptoms-and-warning-signs-of-an-asthma-attack/2446545 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/symptoms-of-asthma/2449126 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/the-8-most-common-food-allergies/2446440 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/tips-for-managing-pet-allergy-symptoms/2448110 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/tips-for-managing-pet-allergy-symptoms/2448534 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/900006/tree-pollen-allergy-types-and-symptoms/2448061 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/types-of-asthma-inhalers/2449141 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/a/900006/what-is-contact-dermatitis/2446544 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/p2/s/500001/diabetes-diet-dos-and-donts/2141102 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/pain-management/1800002 | search | 1 | get | www.walgreens.com |
| /rx-healthanswer/health/quit-smoking/3000001 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/sleep/1800004 | search | 1 | get | www.walgreens.com |
| /rx-profile/rxAuthentication | login/auth | 3 | get | (js-handled) |
| /rx-refillhub/autorefill | login/auth | 3 | get | (js-handled) |
| /rx-refillhub/refillhub-holistic | login/auth | 3 | get | (js-handled) |
| /rx-settings/home-delivery-pharmacy | generic | 1 | get | (js-handled) |
| /rx-settings/prescription-insurance | login/auth | 3 | get | (js-handled) |
| /rx-settings/print-rx | login/auth | 3 | get | (js-handled) |
| /rx-settings/print-rx.jsp | login/auth | 3 | get | (js-handled) |
| /rx-settings/rxsettings | login/auth | 3 | get | (js-handled) |
| /rx-settings/rxsettings/cap | login/auth | 3 | get | (js-handled) |
| /rx-settings/rxsettings/pay | login/auth | 3 | get | (js-handled) |
| /rx-settings/rxsettings/pay.jsp | login/auth | 3 | get | (js-handled) |
| /rx-status | login/auth | 3 | get | (js-handled) |
| /rx-utility/pharmacychat | generic | 1 | get | (js-handled) |
| /rx-utility/pharmacychat | contact/lead | 9 | get | (js-handled) |
| /shop | generic | 1 | get | (js-handled) |
| /shoplocal/default.jsp | generic | 1 | get | (js-handled) |
| /sso/samlRedirect.jsp?affiliateId=mdlive | login/auth | 3 | get | (js-handled) |
| /store-services/same-day-delivery | generic | 1 | get | (js-handled) |
| /store-services/same-day-delivery | generic | 1 | get | (js-handled) |
| /store-services/store-pickup | generic | 1 | get | (js-handled) |
| /store-services/store-pickup | generic | 1 | get | (js-handled) |
| /store/BalanceRewardsOffers/balance-rewards-offer.jsp?eventCode=A-R638-A-01-1001 | generic | 1 | get | (js-handled) |
| /store/catalog/shopLanding | generic | 1 | get | (js-handled) |
| /store/shoppinglist/showwishlist.jsp | generic | 1 | get | (js-handled) |
| /store/store/family_products.jsp | generic | 1 | get | (js-handled) |
| /store/store/save/clearance.jsp | generic | 1 | get | (js-handled) |
| /store/store/save/clearance.jsp | generic | 2 | get | (js-handled) |
| /store/store/save/sale.jsp | generic | 1 | get | (js-handled) |
| /store/store/save/sale.jsp | generic | 2 | get | (js-handled) |
| /store/store/save/w-cash-rewards-offers.jsp | generic | 1 | get | (js-handled) |
| /store/store/save/w-cash-rewards-offers.jsp | generic | 2 | get | (js-handled) |
| /store/store/xpo_products.jsp?pluCode= | generic | 1 | get | (js-handled) |
| /storelistings/storesbystate.jsp | generic | 1 | get | (js-handled) |
| /storelocator/find.jsp | generic | 1 | get | (js-handled) |
| /storelocator/storeDetails.jsp?stnum=3323 | generic | 1 | get | (js-handled) |
| /storelocator/storeDetails.jsp?stnum=3323 | generic | 1 | get | (js-handled) |
| /testandtreat/testing | generic | 1 | get | (js-handled) |
| /testandtreat/treatment | generic | 1 | get | (js-handled) |
| /topic | generic | 1 | get | (js-handled) |
| /topic/USH/tudiabetes.jsp | generic | 1 | get | (js-handled) |
| /topic/about/history/ourpast.jsp | generic | 1 | get | (js-handled) |
| /topic/apps/learn_about_mobile_apps.jsp | generic | 1 | get | (js-handled) |
| /topic/balancerewards/balance-program-details.jsp | generic | 1 | get | (js-handled) |
| /topic/brand/cerave-beauty-store.jsp | generic | 1 | get | (js-handled) |
| /topic/brand/no7-beauty-store.jsp | generic | 1 | get | (js-handled) |
| /topic/brand/olay-beauty-store.jsp | generic | 1 | get | (js-handled) |
| /topic/clinical-trials.jsp | generic | 1 | get | (js-handled) |
| /topic/clinical-trials/ebonistudyinfo.jsp | generic | 1 | get | (js-handled) |
| /topic/contacts/deals.jsp | generic | 1 | get | (js-handled) |
| /topic/donotsellmyinfo.jsp | generic | 1 | get | (js-handled) |
| /topic/donotsellmyinfo_es.jsp | generic | 1 | get | (js-handled) |
| /topic/financial-services/overview.jsp | generic | 1 | get | (js-handled) |
| /topic/findcare/allergy-and-respiratory-info.jsp | generic | 1 | get | (js-handled) |
| /topic/findcare/coronavirus.jsp | generic | 1 | get | (js-handled) |
| /topic/findcare/diabetes-info.jsp | generic | 1 | get | (js-handled) |
| /topic/findcare/heart-health-info.jsp | generic | 1 | get | (js-handled) |
| /topic/findcare/pain-management-info.jsp | generic | 1 | get | (js-handled) |
| /topic/findcare/testAndTreat.testingPage.breadCrumb.servicesUrl | generic | 1 | get | (js-handled) |
| /topic/findcare/testAndTreat.testingPage.breadCrumb.walgreensHomePage | generic | 1 | get | (js-handled) |
| /topic/fraud_information.jsp | generic | 1 | get | (js-handled) |
| /topic/giftcard/bulk-purchase-agreement.jsp | generic | 1 | get | (js-handled) |
| /topic/giftcard/promo-giftcard-termsandconditions.jsp | generic | 1 | get | (js-handled) |
| /topic/giftcard/termsandconditions.jsp | generic | 1 | get | (js-handled) |
| /topic/giftcards/all-giftcards.jsp | generic | 1 | get | (js-handled) |
| /topic/health/mental-health-support.jsp | generic | 1 | get | (js-handled) |
| /topic/help/accounthelp/account_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/cl_fairness_act.jsp | generic | 1 | get | (js-handled) |
| /topic/help/companyhelp/company_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/companyhelp/real_estate.jsp | generic | 1 | get | (js-handled) |
| /topic/help/customerservicehelp/customer_service_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/default.jsp | generic | 1 | get | (js-handled) |
| /topic/help/digital_millenium_copyright_act.jsp | generic | 1 | get | (js-handled) |
| /topic/help/general/noticeprivacypractices.jsp | generic | 1 | get | (js-handled) |
| /topic/help/generalhelp/coupon_policy_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/generalhelp/mywalgreens-credit-card-terms-of-use.jsp | generic | 1 | get | (js-handled) |
| /topic/help/generalhelp/mywalgreens-termsofuse-spanish.jsp | generic | 1 | get | (js-handled) |
| /topic/help/generalhelp/mywalgreens-termsofuse.jsp | generic | 1 | get | (js-handled) |
| /topic/help/generalhelp/privacy_practices_resources.jsp | generic | 1 | get | (js-handled) |
| /topic/help/generalhelp/privacyandsecurity.jsp | generic | 1 | get | (js-handled) |
| /topic/help/generalhelp/termsofuse.jsp | generic | 1 | get | (js-handled) |
| /topic/help/generalhelp/washington-consumer-health-privacy-policy.jsp | generic | 1 | get | (js-handled) |
| /topic/help/mobileandsocial.jsp | generic | 1 | get | (js-handled) |
| /topic/help/mywalgreens.jsp | generic | 1 | get | (js-handled) |
| /topic/help/pharmacyhelp/pharmacy_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/pharmacyhelp/pharmacy_reference_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/pharmacyhelp/walgreens_health_services_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/pickup.jsp | generic | 1 | get | (js-handled) |
| /topic/help/same-day-delivery.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shipping/shipping_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shipping/shipping_help_main_espanol.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/Bulk_Gift_Cards_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/account_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/bulk_gift_cards_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/checkout_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/coupons_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/paymentmethods_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/promotions_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/returns_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/shipping_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/shiptostore.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/shop_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/storeshelp/stores_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/virtualhealthcare.jsp | generic | 1 | get | (js-handled) |
| /topic/help/walgreens-gift-card-terms-of-use.jsp | generic | 1 | get | (js-handled) |
| /topic/information/access-to-services.jsp | generic | 1 | get | (js-handled) |
| /topic/information/california_transparency_act.jsp | generic | 1 | get | (js-handled) |
| /topic/information/recall.jsp | generic | 1 | get | (js-handled) |
| /topic/inkrefill/storelocator/storelocator/find.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-pharmacy-oral-oncology-medication-support.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-product-contact-lenses-brand.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-product-website-prices.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-website-bill-pay-tips.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-website-damage-delivery.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-website-exchange.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-website-order-status.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-website-sign-in-tips.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-website-wrong-missing-item.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-wphoto-coupon-code.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-wphoto-mail-order-status.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-wphoto-product-question.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/contactus-wphoto-returns.jsp | generic | 1 | get | (js-handled) |
| /topic/marketing/contactus/vendor_inquiries.jsp | generic | 1 | get | (js-handled) |
| /topic/mobile/apps/learn_about_mobile_apps.jsp | generic | 1 | get | (js-handled) |
| /topic/mywalgreenshealthaccess.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy.jsp | contact/lead | 9 | get | (js-handled) |
| /topic/pharmacy/compounding.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/easily-manage-prescriptions.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/easily-manage-prescriptions.jsp | contact/lead | 9 | get | (js-handled) |
| /topic/pharmacy/financial-assistance.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/glp-1-bridge-program.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/healthcare-clinic.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/hiv-pharmacy-services.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/hiv-pharmacy-services/prevention-and-testing.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/immunization-services-appointments | generic | 1 | get | (js-handled) |
| /topic/pharmacy/immunization-services-appointments.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/immunization-services/travel-health.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/live-therapist-video-chat.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/medicare-part-b.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/medicare-part-d-info.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/medicare-resources/cybersecurity-tips.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/nebulizer-services.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/pharmacy_acquisition.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/pharmacy_regulation_websites.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/prescription-delivery.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/rx-savings-finder.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/blood-pressure-test.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/chickenpox-vaccine_40.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/chikungunya-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/hepatitis-a-vaccine_33.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/hepatitis-ab-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/hepatitis-b-vaccine_34.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/human-papillomavirus-hpv-vaccine_36.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/influenza-vaccine_1.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/japanese-encephalitis-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/measles-mumps-rubella-mmr-vaccine_38.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/meningitis-vaccine_37.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/mpox-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/pneumonia-vaccine_2.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/polio-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/rabies-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/rsv-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/shingles-vaccine_31.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/tdap-td-tetanus-diphtheria-pertussis-vaccine_32.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/tick-borne-encephalitis-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/typhoid-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/yellow-fever-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/seasonal-flu.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/cancer-medication-support.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/cancer-medication-support/medication-side-effects.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/fertility-order-review.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/fertility-preservation.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/fertility-services.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/mash.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/oncology-caregiver.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/patient-resources.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/side-effect-help.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/side-effect-help/feel-more-like-you.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/srx-financial-assistance.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/text-alerts.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/text-opt-in.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/walgreens-express.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/90-day-Rx.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/90-day-Rx.jsp | contact/lead | 9 | get | (js-handled) |
| /topic/promotion/aarpcard.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/api.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/beauty-oncology-podcast.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/beautydeals.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/beautydeals.jsp | generic | 2 | get | (js-handled) |
| /topic/promotion/corporate-gift-card-sales.jsp | login/auth | 2 | post | (js-handled) |
| /topic/promotion/covid-testing.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/covid-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/health-wellness-deals.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/health-wellness-deals.jsp | generic | 2 | get | (js-handled) |
| /topic/promotion/mywalgreens.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/mywalgreens/espanol.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/offer-details.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/reloadablecards.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/rx-reward-offerA.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/rx-reward-offerB.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/scalp-health.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/seniorday.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/ship-to-store.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/shop-essentials.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/testAndTreat.testingPage.breadCrumb.servicesUrl | generic | 1 | get | (js-handled) |
| /topic/promotion/testAndTreat.testingPage.breadCrumb.walgreensHomePage | generic | 1 | get | (js-handled) |
| /topic/promotion/vitamin1.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/vitamin1.jsp | generic | 2 | get | (js-handled) |
| /topic/promotion/walgreens-online-deals.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/western-union.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/womens-wellness.jsp | generic | 1 | get | (js-handled) |
| /topic/sr/social_responsibility_home.jsp | generic | 1 | get | (js-handled) |
| /topic/sr/sr_giving_back_contribution.jsp | generic | 1 | get | (js-handled) |
| /topic/store/fsa/shop_fsa.jsp | generic | 1 | get | (js-handled) |
| /topic/store/otc/shop_otc.jsp | generic | 1 | get | (js-handled) |
| /topic/store/same-day-delivery.jsp | generic | 1 | get | (js-handled) |
| /topic/store/same-day-delivery.jsp | generic | 1 | get | (js-handled) |
| /topic/store/store-pickup.jsp | generic | 1 | get | (js-handled) |
| /topic/store/store-pickup.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/heart-health/high-cholesterol-treatment.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/illnesses-and-infections.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/illnesses-and-infections/altitude-sickness-prevention.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/illnesses-and-infections/anti-malaria-medication.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/illnesses-and-infections/cold-sores-treatment.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/illnesses-and-infections/cough-cold-and-sinus-infection-treatment.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/illnesses-and-infections/flu-treatment-online.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/illnesses-and-infections/pink-eye-conjunctivitis.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/mens-hair-loss.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/mens-hair-loss/finasteride.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/sexual-health.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/sexual-health/chlamydia-treatment.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/sexual-health/sildenafil.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/sexual-health/tadalafil.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/skin-health.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/skin-health/Pseudomembranous | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/skin-health/acne-treatment.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/skin-health/tretinoin.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss/Foundayo.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss/foundayo.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss/ozempic.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss/wegovy.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss/zepbound.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/womens-health.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/womens-health/birth-control.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/womens-health/online-uti-treatment.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/womens-health/yeast-infection-treatment.jsp | generic | 1 | get | (js-handled) |
| /topic/walgreensgiftcards.jsp | generic | 1 | get | (js-handled) |
| /topic/yourprivacychoices.jsp | generic | 1 | get | (js-handled) |
| /wellness/caregiver-support.html | generic | 1 | get | (js-handled) |
| /wellness/caregiver-support/5-self-care-tips-for-caregivers.html | generic | 1 | get | (js-handled) |
| /wellness/caregiver-support/bathroom-safety-providing-a-safe-environment-as-a-caregiver.html | generic | 1 | get | (js-handled) |
| /wellness/caregiver-support/caring-for-your-loved-one-bathing-and-grooming.html | generic | 1 | get | (js-handled) |
| /wellness/caregiver-support/hearing-aid-batteries-101-what-you-need-to-know.html | generic | 1 | get | (js-handled) |
| /wellness/caregiver-support/helping-seniors-navigate-medicare.html | generic | 1 | get | (js-handled) |
| /wellness/caregiver-support/incontinence-an-overview-for-caregivers.html | generic | 1 | get | (js-handled) |
| /wellness/caregiver-support/managing-stress-as-a-sandwich-generation-caregiver.html | generic | 1 | get | (js-handled) |
| /wellness/caregiver-support/mobility-devices-exploring-options-for-your-loved-ones.html | generic | 1 | get | (js-handled) |
| /wellness/caregiver-support/nutrition-and-healthy-aging-what-caregivers-need-to-know.html | generic | 1 | get | (js-handled) |
| /wellness/diet-fitness.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/7-simple-habits-to-improve-your-mental-health-and-well-being.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/anxiety-and-depression.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/how-to-choose-a-mental-health-professional.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/how-to-manage-your-anti-anxiety-medications.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/how-to-manage-your-antidepressants.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/how-to-stop-panic-attacks.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/how-to-support-a-friend-with-a-mental-health-condition.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/managing-depression.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/medications-for-anxiety.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/mental-health-glossary-terms-you-should-know.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/new-years-resolutions-4-tips-to-create-healthy-habits.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/ocd-medications-and-treatment.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/ocd-symptoms.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/physical-side-effects-of-stress.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/seasonal-affective-disorder-is-more-than-just-the-winter-blues.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/signs-and-symptoms-of-schizophrenia.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/spring-cleaning-for-your-home-and-health.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/what-is-bulimia.html | generic | 1 | get | (js-handled) |
| /wellness/sleep.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/how-much-sleep-should-i-be-getting.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/insomnia-from-menopause-causes-symptoms-and-treatment.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/insomnia-in-women-what-you-should-know.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/melatonin-from-food.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/melatonin-safety-what-you-need-to-know.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/narcolepsy-causes-symptoms-and-medications.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/sleep-aids-and-natural-remedies-for-insomnia.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/sleep-apnea-causes-symptoms-and-treatment.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/sleep-your-way-to-better-health.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/testing-for-sleep-apnea.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/too-much-sleep-hurts.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/what-are-the-causes-of-sleep-paralysis.html | generic | 1 | get | (js-handled) |
| /wellness/stress.html | generic | 1 | get | (js-handled) |
| /wellness/stress/how-to-manage-stress.html | generic | 1 | get | (js-handled) |
| /wellness/stress/how-to-spot-stress-in-your-child.html | generic | 1 | get | (js-handled) |
| /wellness/stress/stress-sleep.html | generic | 1 | get | (js-handled) |
| /wellness/vitamins-supplements.html | generic | 1 | get | (js-handled) |
| /wellness/vitamins-supplements/be-in-the-know-about-multivitamins.html | generic | 1 | get | (js-handled) |
| /wellness/vitamins-supplements/benefits-of-calcium--magnesium-and-zinc.html | generic | 1 | get | (js-handled) |
| /youraccount/communication_preferences.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/default.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/dlorder/reorder.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/health_history.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/personal_information.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/security_information.jsp | login/auth | 3 | get | (js-handled) |
| /store/c/acuvue-oasys-hydraluxe-90pk-acuvue-oasys-1-day-90-pack/ID=prod6312311-product | generic | 1 | get | (js-handled) |
| /store/c/acuvue-oasys-hydraluxe-90pk-acuvue-oasys-1-day-90-pack/ID=prod6312311-product | generic | 4 | get | (js-handled) |
| /store/c/acuvue-oasys-hydraluxe-90pk-acuvue-oasys-1-day-90-pack/ID=prod6312311-product | generic | 4 | get | (js-handled) |
| /store/c/walgreens-advanced-moisturizing-cream-fragrance-free/ID=300397738-product | generic | 1 | get | (js-handled) |
| /store/c/walgreens-advanced-moisturizing-cream-fragrance-free/ID=300397738-product | checkout/payment | 5 | get | (js-handled) |

---

## 9. Third-Party Integrations

**Analytics/Tag Mgmt**

| Integration | Pages |
|---|---|
| Adobe Launch/DTM (tag mgmt) | 978 |
| Adobe Analytics (AppMeasurement) | 945 |
| Google Analytics / GA4 | 626 |
| Adobe Helix RUM | 381 |
| Adobe Client Data Layer | 361 |
| Google Tag Manager | 21 |
| Amplitude | 1 |

**Chat/Support**

| Integration | Pages |
|---|---|
| Zendesk / LiveChat / Tidio | 2 |

**Consent/Privacy**

| Integration | Pages |
|---|---|
| OneTrust (consent) | 924 |
| TrustArc (consent) | 591 |

**Fonts**

| Integration | Pages |
|---|---|
| Google Fonts | 644 |

**Forms/CRM**

| Integration | Pages |
|---|---|
| Pardot (form) | 3 |

**Maps/Location**

| Integration | Pages |
|---|---|
| Google Maps | 618 |

**Marketing/Pixel**

| Integration | Pages |
|---|---|
| Facebook Pixel | 16 |
| LinkedIn Insight | 3 |

**Media/Video**

| Integration | Pages |
|---|---|
| Adobe Scene7 / Dynamic Media (video) | 314 |
| Vimeo embed | 198 |
| YouTube embed | 42 |
| Spotify embed | 1 |

**Personalization/AB**

| Integration | Pages |
|---|---|
| Adobe Target (A/B) | 958 |
| Monetate | 954 |

**Reviews/UGC**

| Integration | Pages |
|---|---|
| Bazaarvoice (ratings/reviews) | 3 |

**Security/Bot**

| Integration | Pages |
|---|---|
| reCAPTCHA / hCaptcha | 13 |

**Survey/Feedback**

| Integration | Pages |
|---|---|
| Medallia (feedback) | 943 |
| Qualtrics (survey) | 24 |

**⚠︎ Unrecognized third-party hosts (need agent review — could be complex integrations):**

| Host | Pages |
|---|---|
| resources.digital-cloud-west.medallia.com | 943 |
| cdn.branch.io | 743 |
| s2.go-mpulse.net | 690 |
| www.wag-static.com | 218 |
| dok.js-cdn.dynatrace.com | 164 |
| media-us2.digital.nuance.com | 120 |
| se.monetate.net | 115 |
| login-ds.dotomi.com | 25 |
| d.criteo.com | 20 |
| dynamic.criteo.com | 20 |
| sslwidget.criteo.com | 20 |
| js.adsrvr.org | 19 |
| www.mczbf.com | 17 |
| googleads.g.doubleclick.net | 16 |
| securepubads.g.doubleclick.net | 13 |
| mihvea1f.micpn.com | 13 |
| unpkg.com | 7 |
| track.coherentpath.com | 5 |
| bat.bing.com | 5 |
| www.youtube.com | 4 |
| www.cdn-net.com | 2 |
| six.cdn-net.com | 2 |
| prod.accdab.net | 2 |
| apps.bazaarvoice.com | 2 |
| connect.facebook.net | 1 |
| wag-dwa-api-prod.przone.net | 1 |
| cdn.glassboxcdn.com | 1 |
| content.syndigo.com | 1 |

---

## 10. Block Complexity

| Block | Complexity | Reason |
|---|---|---|
| **Account / Authentication** | High | Sign in / register / password reset / order lookup and account menus. Auth-gated flows with validation and session; typically integrated with an identity service. |
| **Cart** | High | Cart view/mini-cart: line items, quantities, fulfillment, price summary, promo code, checkout entry. Commerce, stateful, tied to session + catalog/pricing APIs. |
| **Global Header / Nav** | High | Global commerce header present on every page: logo, mega-menu category navigation, store/pickup selector, account menu, cart icon with live count, search, language switcher, rewards prompts. Stateful and shared sitewide. |
| **Predictive Search** | High | AJAX predictive/typeahead search with min-length gating, loading/empty/results states and keyboard a11y; on EDS must be rebuilt against an index (query-index.json). |
| **Login / Sign-in Form** | High | Email/password sign-in with validation, remember-me, forgot-password, and links to register; identity-service integrated. |
| **Article Listing + Pagination** | High | Client-side paginated grid: numbered pages, prev/next bound states, jump-to-page, no reload; data-driven from a category index. |
| **Carousel** | High | Horizontal scroller with prev/next, disabled bound states, optional 'see all', responsive item counts. |
| **Product Filters / Facets** | High | Faceted refinement rail for PLP: brand, price min/max apply, color/undertone (beauty), fulfillment. Client-side state synced to the results grid and often the URL. |
| **Product Detail (PDP)** | High | Product page with TWO distinct variations that differ materially in DOM & functionality (verified live): (1) STANDARD retail PDP — gallery, specifications table, fulfillment radios (pickup/same-day/shipping) with stock+ready messaging, quantity, add-for-pickup, coupons, reviews, save-to-list, check-other-stores; (2) CONTACT-LENS / VISION PDP — per-eye prescription configurator (left/right eye power, base curve, box quantity), image tabs, simple add-to-cart, NO fulfillment radios/specs table. Each is a separate authoring/dev configuration. Commerce — Adobe Commerce PDP block(s) in EDS. |
| **Product Listing (PLP)** | High | Search/browse results grid of product cards with sort, faceted filters, item count, pagination / load-more. Commerce — product data from a catalog API. In EDS this is an Adobe Commerce PLP block. |
| **Watch Videos (gallery)** | High | Gallery of video cards each launching a player; combines a card grid with the video embed lifecycle. |
| **Fulfillment & Add-to-Cart** | High | PDP fulfillment selector + add-to-cart: pickup / same-day-delivery / shipping radio options with per-option stock, ready-time and store availability, quantity dropdown, 'add for pickup' / 'add to cart', and check-other-stores. Session + inventory/pricing APIs. |
| **Video / Media Embed** | High | Multiple providers (Scene7/Dynamic Media, YouTube, Vimeo, Spotify) with poster/lazy-load; may include transcript pairing and commerce links. |
| **Rx Refill (guest/express)** | High | Prescription refill checkout: enter Rx number (or scan), select pickup store & date, guest details, and submit to the pharmacy fulfillment system. HIPAA-sensitive, validated, session/pharmacy-API integrated. |
| **Rx Transfer** | High | Transfer a prescription to Walgreens: identify current pharmacy + medication, choose destination store, provide patient details, submit. HIPAA-sensitive, validated, pharmacy-API integrated. |
| **Store Locator** | High | Location-aware store finder: geolocation/entered location, results list with per-store cards (address, hours, services, distance), map view, browse-by-state, and multi-facet filters. Client-rendered against a store API — in EDS this is a JS-driven block calling a location service. |
| **Order Pickup / On-my-way** | High | Store-pickup / on-my-way flow: order lookup, store info, continue steps, arrival notification. Session + order-service integrated. |
| **Create Account (multi-step)** | High | Multi-step registration (/register/regpersonalinfo …): name/email/password with live rules (≥10 & ≤64 chars, no name/email, no common patterns), myWalgreens link opt-in, Terms consent, US state legal notices (CA under-16, CO consumer data). Identity-service integrated. Rendered pre-auth but full flow is gated. |
| **Forgot / Reset Password (OTP/MFA)** | High | Password reset with email/SMS OTP + pincode validation (/profile/v1/resetPassword, sendCode, validate/pincode). MFA + session/CSRF. |
| **Account Dashboard** | High | Post-login landing (/youraccount/default.jsp, /mywalgreens/dashboard.jsp): orders, refills, rewards, saved items, profile shortcuts. Auth-gated; documented from bundles. |
| **Family / Caregiver Management** | High | Manage family members & caregiver access levels (/familymgmt/members/fullaccess, /selectedMember). Permissions + HIPAA-sensitive. |
| **Health History** | High | Health records / history (/profiles/{id}/healthhistory, /healthhistorydetail, /userhealthhistory). HIPAA-regulated, auth + DOB gated. |
| **Rx Settings / Insurance** | High | Prescription preferences + insurance on file (/rx-settings, svc/insurance/status). Pharmacy-service integrated. |
| **Secure Pharmacy Messaging** | High | Patient↔pharmacy secure messages (/pharmacy/messaging/psm/psmhome.jsp). HIPAA-regulated, auth-gated. |
| **Global Footer** | Medium | Sitewide mega-footer: customer service, myWalgreens, company info, terms/privacy, product category directory, photo products, social, newsletter signup and legal/copyright. Shared across all pages. |
| **Article Card** | Medium | Core reusable listing unit with multiple visual variations; drives listings, related content and carousels. |
| **Content / Product Carousel** | Medium | Horizontal glider/carousel of cards (products, offers, content) with prev/next; used on home, category and content pages. |
| **Live Chat / Click-to-Chat** | Medium | Click-to-chat support widget (Zendesk/vendor) launched from a fixed button. |
| **Hero Banner** | Medium | Homepage/landing hero: background media, headline, CTA(s); may rotate. |
| **Editor's Pick / Featured Teaser** | Medium | Teaser promoting a single curated item: media + eyebrow + title + byline. |
| **Accordion** | Medium | Expand/collapse panels (single or multi-open); requires toggle JS + accessible disclosure semantics. |
| **Recommendations / Merchandising Carousels** | Medium | Merchandising rails rendered from recommendation experience-fragments/APIs: sales offers, coupons, top sellers, highest rated, newest arrivals, recently-viewed (RVI), more-to-explore, all-categories & top-brands sections. Horizontal carousels of product/offer cards. |
| **myWalgreens Rewards** | Medium | Walgreens Cash rewards balance, offers and history (/balancerewards/*, myWagRewardsInfo). Loyalty-service integrated. |
| **Promo Banner** | Low | Sitewide promo strip above the header with rotating offer links. |
| **Social Media Links** | Low | Static row of social icon links (usually in the footer XF). |
| **Breadcrumb** | Low | Hierarchical trail derived from page path. |
| **Scroll to Top** | Low | Floating button appearing after scroll; returns to top. |
| **Health/Wellness Article** | Low | Editorial health/wellness article: H1, sub-headings, rich body copy, lists, images, inline links — maps to EDS default content within a category-details wrapper. Content-authored, not a coded block. |
| **Quick Links / Category Shortcuts** | Low | Grid/row of labelled icon shortcuts to key categories/services (homepage & landing pages). |
| **Explore (category tiles)** | Low | Grid of category tiles (image + name), sometimes with live article counts. |
| **Promo Blocks** | Low | Static promotional image tiles with title + link. |
| **Background Container** | Low | Section wrapper applying a themed background; maps to EDS section metadata. |
| **Feature Tile / Teaser** | Low | Image + heading + copy + CTA promotional tile (aemds-featuretile / cmp-teaser). |
| **Article / Content Body** | Low | Editorial/marketing page body rendered as semantic HTML (headings, paragraphs, lists, images, links). Maps to EDS default content; content-authored, not a coded block. |

---

## 12. My Account & Authenticated / Checkout Flows


> ⚠️ **High-level only — detailed analysis still required.** This is a preliminary,
> manually-run pass of the authenticated My Account + checkout/authenticated flows,
> limited by **Akamai bot protection** and login-gating (automated crawling of these
> flows is blocked). It maps blocks, forms, APIs and integrations from public code +
> rendered shells, but a **full detailed analysis of My Account, checkout, and the
> authenticated journey must be performed manually in a logged-in session** to
> confirm in-flow blocks, states and behavior.

**Scope:** Authenticated **My Account** section + **checkout/pharmacy-checkout** journeys only (public content/PLP/PDP pages are covered by the main `report/walgreens/` analysis, not repeated here).
**Date:** 2026-09-08
**Method & honest constraints:**
- Analysis was done **without logging in and without placing any order.** I did not use the pasted account credentials (treat that password as compromised and rotate it) and did not submit a live order on the production site.
- Evidence comes from **(a)** Playwright live rendering of the sign-in / create-account / checkout entry shells and their overlays, and **(b)** reading the site's **public React JS bundles** (`/profile/react/...login_v2`, `/rx-checkout/js/guestExpressRefill`, `/common/react/...header`) which contain the account & checkout routes, API calls, form fields, and functionality.
- Gentle pacing was used throughout (Akamai + CDNetworks bot protection is active; `/cart/view-ui` returns 403 to automated browsers).

---

## 1. Account is auth-gated (behavior observed)
`/youraccount/default.jsp` → **redirects to `/login.jsp?ru=/youraccount/default.jsp`**. All account sub-pages sit behind sign-in. The sign-in and create-account shells render pre-auth (SPA), so their blocks/forms are analyzable; the data-bearing account pages require a session.

---

## 2. Blocks / components in the My Account section

These are the EDS-block-equivalents for the account area (React components → EDS blocks):

| Block | Where | Complexity | Notes |
|---|---|---|---|
| **Sign-in** | /login.jsp | High | Email + Password + Show-password toggle, Forgot-password, Sign in, Create-account, FAQs, Chat-now. JS-submitted (no form action). React modal portal for overlays. |
| **Create-account (multi-step)** | /register/regpersonalinfo | High | First/Last name, Email, Password with **live rules** (≥10 & ≤64 chars, no name/email, no common patterns), myWalgreens link checkbox, Terms consent, state legal notices. Multi-step (`regpersonalinfo` → …). |
| **Forgot / reset password** | profile bundle | High | `resetPassword`, `resetPassword/sendcode`, `sendCode`, `validate/pincode` → email/SMS **OTP + pincode (MFA)** flow. |
| **Account dashboard** | /youraccount/default.jsp, /mywalgreens/dashboard.jsp | High | Landing after login (auth-gated). |
| **myWalgreens rewards** | /balancerewards/*, `myWagRewardsInfo` | Medium | Walgreens Cash rewards balance & offers. |
| **Family management** | /familymgmt/members/fullaccess, /familymgmt/selectedMember | High | Manage family/caregiver accounts & access levels. |
| **Health history / profile** | /profiles/{id}/healthhistory, /healthhistorydetail, /userhealthhistory | High | HIPAA-sensitive health records. |
| **Rx refill hub / auto-refill** | /rx-refillhub/refillhub, /autorefill, `svc/prescriptions/autoRefill`, `buyout/*` | High | Prescription refill management + auto-refill toggle. |
| **Rx settings / insurance** | /rx-settings, `svc/insurance/status` | High | Insurance on file, Rx preferences. |
| **Secure pharmacy messaging** | /pharmacy/messaging/psm/psmhome.jsp | High | Patient↔pharmacy secure messages. |
| **Account menu (header)** | header bundle | High | Account dropdown: sign-in / orders / rewards / buy-again; cart icon with live count; store selector. |
| **Order pickup / on-my-way** | /pickupDetails/onmyway | High | Arrival notification / order pickup. |
| **Live chat** | chatbot-prod.walgreens.com/chatLaunch.js | Medium | "Chat now" launches the Walgreens chatbot. |

---

## 3. Checkout journey (pharmacy / Rx checkout)

The primary transactional flow on this domain is **prescription (Rx) checkout**, reconstructed from the `guestExpressRefill` bundle + `/rxcheckout/*` and `/rxorders/*` endpoints:

**Flow:** DOB verify → (guest or account) → add to cart → shipping/pickup + address validation → insurance → payment → review → submit → confirmation.

| Step | Route / endpoint | Detail |
|---|---|---|
| DOB verification | /rx-checkout/dob-verify, `svc/dobver`, `/rxorders/v1/dobver` | Identity gate (date of birth) before Rx actions. |
| Add to cart | `/rxorders/v1/checkout-addtocart`, `checkout-expressaddtocart`, /rxcheckout/addtocart, /rxcheckout/quickfill | Add prescription(s) to the Rx cart. |
| Store / fulfillment | /rxcheckout/changeUserStore(/guest), /rx-checkout/prescription-checkout(-guest) | Choose pickup store or delivery. |
| Shipping address | /rxcheckout/updateUserShippingAddress(/guest), /rxcheckout/validateAddress | Enter + **validate** shipping address (APO/FPO military addresses referenced). |
| Insurance | /rx-settings/svc/insurance/status | Insurance on file / apply. |
| Payment | /rxccctokenization/int-svc/generatetoken, /rx-checkout/svc/srxpayments | **Tokenized card** (PCI), **3DS**, **Apple Pay & Google Pay** referenced in code. |
| Review | /rxcheckout/review(/guest), /rx-checkout/reviewcheckout | Order review. |
| Submit | /rxcheckout/submit(/guest), /rxcheckout/confirmorder, /rxcheckout/thirdPartyOrderSubmit | Place order (incl. third-party order submit). |
| Transfer Rx | /rx-checkout/guest-transfer-rx, /transfer-by-scan | Transfer prescription to Walgreens. |

**Retail cart/checkout** (`/cart/view-ui`) is Akamai-blocked to automated browsers, so its internal steps weren't walked live; the retail add-to-cart confirmation/mini-cart overlay was captured earlier in the main analysis. Note: **no real order was placed.**

---

## 4. Forms in the account/checkout area

| Form | Fields | Submit target |
|---|---|---|
| Sign-in | username, password, showPassword | `/profile/v1/login` + `/profile/v1/authenticate` (JS) |
| Create account | firstName, lastName, email, password (+ rules), myWalgreens opt-in, Terms consent | `/profile/v1/checkAccount` + registration (JS) |
| Forgot/reset password | email/username, OTP pincode | `/profile/v1/resetPassword`, `sendCode`, `validate/pincode` |
| Rx refill (guest express) | Rx number, DOB, store, contact | `/rxorders/v1/checkout-expressaddtocart`, `dobver` |
| Rx transfer | current pharmacy, medication, patient details | transfer endpoints |
| Shipping address | address lines, city, state, ZIP | `/rxcheckout/validateAddress` |
| Payment | tokenized card (number/exp/cvv), Apple/Google Pay | `/rxccctokenization/int-svc/generatetoken`, `srxpayments` |

---

## 5. Third-party integrations (account + checkout)

Captured from **live network traffic** on the account/checkout routes + bundle references:

| Category | Integration | Host / evidence |
|---|---|---|
| Analytics / tag mgmt | **Adobe Launch/DTM** | assets.adobedtm.com |
| Analytics | **Adobe Analytics (AppMeasurement)** | smetrics.walgreens.com |
| Personalization / A-B | **Adobe Target** | target.walgreens.com |
| Audience / DMP | **Adobe Audience Manager (demdex)** | dpm.demdex.net, walgreens.demdex.net |
| Ad attribution | **Adobe Advertising / everesttech** | cm.everesttech.net |
| Consent + geo | **OneTrust** (+ **geolocation**) | cdn.cookielaw.org, geolocation.onetrust.com |
| RUM / monitoring | **Dynatrace** (ruxitagentjs) | /dthandler/ruxitagentjs* |
| Support chat | **Walgreens Chatbot** | chatbot-prod.walgreens.com |
| Feedback / survey | **Medallia** | *.digital-cloud-west.medallia.com |
| Deep linking / app | **Branch.io** | api2.branch.io, app.link, cdn.branch.io |
| CDN / bot | **Akamai** (edge/bot wall), **CDNetworks** (cc.js) | errors.edgesuite.net, www.cdn-net.com |
| Payments | **Card tokenization + 3DS + Apple Pay + Google Pay** | /rxccctokenization, `3ds`, `applepay`, `googlepay` in bundle |
| Fonts | Google Fonts | fonts.googleapis.com/gstatic |

---

## 6. Country / geo & regulatory restrictions

- **USA-only**: shipping/checkout is oriented to US addresses (state + ZIP; **APO/FPO** military addresses referenced). No non-US country options found in the checkout address code.
- **OneTrust geolocation** (`geolocation.onetrust.com`) drives region-aware consent — consistent with US-state privacy compliance rather than international.
- **US state-level compliance** surfaced in the create-account UI: **California** ("do not create an account if you are a California resident under the age of 16"), **Colorado** consumer-data notice, plus **CCPA "Your Privacy Choices"** and **Washington Consumer Health Privacy** links.
- **HIPAA**: Notice of Privacy Practices; pharmacy/health-history flows are HIPAA-regulated, gated by DOB verification + auth.
- **Age gate**: create-account blocks under-16 CA residents.

---

## 7. Security posture (relevant to migration)
- **MFA / OTP** on password reset (send code → validate pincode) and account actions.
- **CSRF** tokens referenced in the auth bundle; **session** management.
- **CSP** enforced (inline-script violations logged); **Dynatrace** RUM; **Akamai** bot protection (403 on automated cart/checkout).
- **PCI**: card data tokenized client-side before submit (`rxccctokenization/generatetoken`); 3DS for card auth.

---

## 8. What could NOT be completed (transparency)
- **No login** performed (pasted credentials not used — rotate that password).
- **No order placed** (would require the login + a real transaction on production).
- Data-bearing authenticated pages (dashboard, order history contents, saved payments) render only for a logged-in session; their **structure/blocks/API are documented from the JS bundles**, but live authenticated screenshots were not captured.
- `/cart/view-ui` retail checkout internals are Akamai-403 to automated browsers.

*Evidence artifacts: `routes.json` (rendered shells/overlays/forms), `scripts.json` (35 bundles), `network-hosts.json` (integrations), `bundles/` (downloaded account/checkout/header JS).*
</content>


---

*Generated by tools/site-analysis. Data: data/*.json. Dashboard: dashboard.html. Detailed: reports/index.html.*
