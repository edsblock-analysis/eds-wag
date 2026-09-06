# www.walgreens.com — EDS Migration Functional Analysis

**Source site:** https://www.walgreens.com
**Analysis date:** 2026-09-06
**Method:** Every one of the 853 URLs was fetched (HTTP 200: 835) and its DOM parsed for components, variations, embeds and integrations. Interactive behavior was verified live with Playwright on representative pages of every template and interactive block. Findings are evidence-based, not extrapolated.

> 0 URLs are content mirror/duplicate paths; 1 are non-English (es) variants — same templates/blocks, content only.

---

## 1. Executive Summary

| Metric | Value |
|---|---|
| Total URLs analyzed | **853** |
| Unique templates | **12** |
| EDS blocks to develop | **11** |
| Block variations | **11** |
| EDS default content (not blocks) | 4 |
| High / Medium / Low complexity | 8 / 3 / 0 |
| Forms | 43 |
| Third-party integrations | 19 |
| Unrecognized 3rd-party hosts (review) | 4 |
| Blocks needing agent review | 1 |

---

## 2. Templates

| # | Template | Pages |
|---|---|---|
| 1 | **Store locator** (`store-locator`) | 440 |
| 2 | **Article** (`article`) | 209 |
| 3 | **Find care** (`find-care`) | 60 |
| 4 | **Redirect / External Stub** (`redirect-stub`) | 45 |
| 5 | **Account** (`account`) | 26 |
| 6 | **Retail base template** (`retail-base-template`) | 22 |
| 7 | **Store detail** (`store-detail`) | 18 |
| 8 | **Plp** (`plp`) | 11 |
| 9 | **Home page content template** (`home-page-content-template`) | 10 |
| 10 | **Cart** (`cart`) | 5 |
| 11 | **Retail content template** (`retail-content-template`) | 5 |
| 12 | **Content page** (`content-page`) | 2 |

---

## 3. Block Inventory

11 blocks to develop. Components that share a common DOM/decoration are consolidated into a single block whose differences are **variations** (one block built, N variations authored).

| Block | EDS name | Complexity | Pages | Variations |
|---|---|---|---|---|
| **Account / Authentication** | `account-auth (app)` | High | 783 | default (783) |
| **Cart** | `cart (commerce)` | High | 778 | default (778) |
| **Global Header / Nav** | `header (app nav)` | High | 778 | default (778) |
| **Store Locator** | `store-locator (app)` | High | 463 | default (463) |
| **Product Listing (PLP)** | `product-list-page (commerce)` | High | 183 | default (183) |
| **Product Filters / Facets** | `product-filters (commerce)` | High | 13 | default (13) |
| **Product Detail (PDP)** | `product-detail-page (commerce)` | High | 13 | default (13) |
| **Spa more option** ⚠︎ | `spa-more-option` | Medium | 6 | default (6) |
| **Editor's Pick / Featured Teaser** | `editors-pick (teaser)` | Medium | 4 | default (4) |
| **Video / Media Embed** | `embed (video)` | High | 3 | default (3) |
| **Accordion** | `accordion` | Medium | 2 | default (2) |

**EDS default content (not counted as blocks)** — rendered by core decoration / autoblocking, not authored as blocks: Rich Text (36), Separator (12), Image (4), Title (2).

---

## 4. Template → Block → Variation

### Store locator (`store-locator`) — 440 pages

| Block | Variations | Complexity |
|---|---|---|

### Article (`article`) — 209 pages

| Block | Variations | Complexity |
|---|---|---|

### Find care (`find-care`) — 60 pages

| Block | Variations | Complexity |
|---|---|---|

### Redirect / External Stub (`redirect-stub`) — 45 pages

| Block | Variations | Complexity |
|---|---|---|

### Account (`account`) — 26 pages

| Block | Variations | Complexity |
|---|---|---|

### Retail base template (`retail-base-template`) — 22 pages

| Block | Variations | Complexity |
|---|---|---|
| Editor's Pick / Featured Teaser | default | Medium |

### Store detail (`store-detail`) — 18 pages

| Block | Variations | Complexity |
|---|---|---|

### Plp (`plp`) — 11 pages

| Block | Variations | Complexity |
|---|---|---|

### Home page content template (`home-page-content-template`) — 10 pages

| Block | Variations | Complexity |
|---|---|---|

### Cart (`cart`) — 5 pages

| Block | Variations | Complexity |
|---|---|---|

### Retail content template (`retail-content-template`) — 5 pages

| Block | Variations | Complexity |
|---|---|---|
| Editor's Pick / Featured Teaser | default | Medium |
| Video / Media Embed | default | High |
| Accordion | default | Medium |

### Content page (`content-page`) — 2 pages

| Block | Variations | Complexity |
|---|---|---|

---

## 5. Functional Requirements

### Account / Authentication (`account-auth (app)`)

- **Pages:** 783 · **Templates:** 
- **Variations:** default (783)

- Sign in (email/password) and create-account.
- Password reset and guest order-lookup (order number, last name, phone).
- Account menu exposes orders, refills, rewards, saved items.
- Form validation on all inputs.

### Cart (`cart (commerce)`)

- **Pages:** 778 · **Templates:** 
- **Variations:** default (778)

- Line items with image, title, price, quantity controls.
- Fulfillment per item; price/summary totals.
- Promo/rewards application; proceed-to-checkout.
- Mini-cart icon reflects item count.

### Global Header / Nav (`header (app nav)`)

- **Pages:** 778 · **Templates:** 
- **Variations:** default (778)

- Mega-menu navigation across departments/categories.
- Store & pickup-location selector reflecting the chosen store.
- Account menu (sign in / orders / rewards / buy-again).
- Cart icon showing live item count.
- Site search entry point and language switcher.

### Store Locator (`store-locator (app)`)

- **Pages:** 463 · **Templates:** 
- **Variations:** default (463)

- Accepts a location (geolocate or entered) and lists nearby stores.
- Each store card shows address, service hours, services, distance and open/closed status; links to store detail and map.
- Filters (24-hour, pharmacy, drive-thru, clinic, etc.) refine results.
- 'Browse stores by state' provides an SEO directory path.
- Save/preferred-store action.

### Product Listing (PLP) (`product-list-page (commerce)`)

- **Pages:** 183 · **Templates:** 
- **Variations:** default (183)

- Grid of product cards (image, title, brand, price, rating, promotion/tag).
- Sort dropdown and result/item count.
- Faceted filters (brand, price range, fulfillment) refine results.
- Load-more / paginated navigation.
- Each card links to its PDP; add-to-cart / add-to-fulfillment where applicable.

### Product Filters / Facets (`product-filters (commerce)`)

- **Pages:** 13 · **Templates:** 
- **Variations:** default (13)

- Facet groups (brand, price, color, undertone, fulfillment).
- Price min/max with Apply.
- Selecting facets refines the product grid; applied-filters chips can be cleared.

### Product Detail (PDP) (`product-detail-page (commerce)`)

- **Pages:** 13 · **Templates:** 
- **Variations:** default (13)

- Product gallery + title + brand + price + rating.
- Variant selection (color/size/undertone) updates price/availability.
- Fulfillment options (pickup / shipping / same-day) and add-to-cart / add-to-fulfillment.
- FSA-eligibility labelling; check-other-store availability.
- Reviews.

### Spa more option (`spa-more-option`)

- **Pages:** 6 · **Templates:** 
- **Variations:** default (6)

- AUTO-STUB — agent to document functionality from observed markup/behavior.

### Editor's Pick / Featured Teaser (`editors-pick (teaser)`)

- **Pages:** 4 · **Templates:** retail-base-template, retail-content-template
- **Variations:** default (4)

- Promotes curated item(s) with media, eyebrow, title, byline and link.

### Video / Media Embed (`embed (video)`)

- **Pages:** 3 · **Templates:** retail-content-template
- **Variations:** default (3)

- Embeds a video/podcast player from the detected provider.
- May add a related products/links block and a transcript section.

### Accordion (`accordion`)

- **Pages:** 2 · **Templates:** retail-content-template
- **Variations:** default (2)

- A list of headers that expand/collapse their panels on click.
- May allow single or multiple open panels.

---

## 6. Acceptance Criteria

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

### Store Locator

- [ ] Given a location, nearby stores list with address + hours + status.
- [ ] Applying a filter narrows the store list.
- [ ] 'View on map' opens the map for that store.
- [ ] Browse-by-state navigates the store directory.

### Product Listing (PLP)

- [ ] Results render as product cards with price and rating.
- [ ] Changing sort reorders results.
- [ ] Applying a filter/price range narrows results.
- [ ] Load-more / next page appends or advances results.
- [ ] A card navigates to its PDP.

### Product Filters / Facets

- [ ] Selecting a facet narrows the grid.
- [ ] Setting a price range + Apply narrows by price.
- [ ] Clearing a facet restores results.

### Product Detail (PDP)

- [ ] PDP shows title, price and gallery.
- [ ] Selecting a variant updates the selection/price.
- [ ] Add-to-cart adds the item and updates the cart.
- [ ] Fulfillment options are selectable.

### Spa more option

- [ ] AUTO-STUB — agent to define acceptance criteria from observed behavior.

### Editor's Pick / Featured Teaser

- [ ] The teaser shows the curated item with media and links to it.

### Video / Media Embed

- [ ] The embedded player loads and is playable.
- [ ] Any related links navigate correctly; transcript text is shown where present.

### Accordion

- [ ] Clicking a header expands its panel; clicking again collapses it.
- [ ] Keyboard and ARIA disclosure semantics work.

---

## 7. User Journeys & Interactions

Capabilities detected across the site (page counts). These indicate the interactive journeys to design & test.

| Capability | Pages |
|---|---|
| Login / account | 814 |
| Checkout / buy | 787 |
| Cart | 778 |
| Accordion / flip | 578 |
| Modal / popup | 541 |
| Filtering | 470 |
| Map | 205 |
| Pagination / load-more | 187 |
| Search | 52 |
| Forms | 43 |
| Video | 14 |
| Live chat | 8 |
| Tabs | 3 |

> Journeys should be walked end-to-end with Playwright and documented in `data/observed-behaviors.json`. Multi-step flows (form → validation → submit → confirmation; filter → results; login → gated content) are called out per block in §5.

---

## 8. Forms

43 form instance(s) found. Kinds: generic (36), contact/lead (2), login/auth (5).

| Page | Kind | Fields | Method | Posts to |
|---|---|---|---|---|
| /findcare/category/diabetes | generic | 1 | get | (js-handled) |
| /findcare/category/illness-injuries | generic | 1 | get | (js-handled) |
| /findcare/category/inperson-visit | generic | 1 | get | (js-handled) |
| /findcare/category/labsandat-homekits | generic | 1 | get | (js-handled) |
| /findcare/category/preventivecare | generic | 1 | get | (js-handled) |
| /findcare/category/skin-hair | generic | 1 | get | (js-handled) |
| /findcare/category/virtual-visit | generic | 1 | get | (js-handled) |
| /findcare/category/weightloss | generic | 1 | get | (js-handled) |
| /findcare/category/women'shealth | generic | 1 | get | (js-handled) |
| /healthcare-solutions/how-we-can-help/clinical-trials | contact/lead | 10 | post | go.walgreenshealth.com |
| /locator/walgreens-1010+maple+ave-lisle-il-60532/id=7212 | generic | 1 | get | (js-handled) |
| /locator/walgreens-11+e+75th+st-chicago-il-60619/id=3539 | generic | 1 | get | (js-handled) |
| /locator/walgreens-15601+san+carlos+blvd-fort+myers-fl-33908/id=3356 | generic | 1 | get | (js-handled) |
| /locator/walgreens-1602+n+dixie+ave-elizabethtown-ky-42701/id=4123 | generic | 1 | get | (js-handled) |
| /locator/walgreens-2000+veterans+blvd-dublin-ga-31021/id=19407 | generic | 1 | get | (js-handled) |
| /locator/walgreens-2646+darlington+rd-beaver+falls-pa-15010/id=9942 | generic | 1 | get | (js-handled) |
| /locator/walgreens-26482+us+highway+281+n-san+antonio-tx-78258/id=13940 | generic | 1 | get | (js-handled) |
| /locator/walgreens-411+s+mason+rd-katy-tx-77450/id=4696 | generic | 1 | get | (js-handled) |
| /locator/walgreens-4730+s+27th+st-milwaukee-wi-53221/id=5601 | generic | 1 | get | (js-handled) |
| /locator/walgreens-92+leonardville+rd-belford-nj-07718/id=19757 | generic | 1 | get | (js-handled) |
| /login.jsp | login/auth | 3 | get | (js-handled) |
| /q/1+day+acuvue | generic | 2 | get | (js-handled) |
| /q/1+day+acuvue+moist | generic | 2 | get | (js-handled) |
| /q/1+day+contacts+for+astigmatism | generic | 2 | get | (js-handled) |
| /q/1+day+narafilcon+contact+lenses | generic | 2 | get | (js-handled) |
| /q/1+day+narafilcon+contacts | generic | 2 | get | (js-handled) |
| /q/1+day+trueye | generic | 2 | get | (js-handled) |
| /q/1+hour+teeth+whitening | generic | 2 | get | (js-handled) |
| /q/100+watt+bulbs | generic | 2 | get | (js-handled) |
| /q/100+watt+light+bulbs | generic | 2 | get | (js-handled) |
| /q/100+watt+light+bulbs+ | generic | 2 | get | (js-handled) |
| /register/addressView | generic | 1 | get | (js-handled) |
| /store-services/same-day-delivery | generic | 1 | get | (js-handled) |
| /store-services/store-pickup | generic | 1 | get | (js-handled) |
| /store/store/save/clearance.jsp | generic | 2 | get | (js-handled) |
| /store/store/save/sale.jsp | generic | 2 | get | (js-handled) |
| /store/store/save/w-cash-rewards-offers.jsp | generic | 2 | get | (js-handled) |
| /storelocator/storeDetails.jsp?stnum=3323 | generic | 1 | get | (js-handled) |
| /topic/pharmacy.jsp | contact/lead | 9 | get | (js-handled) |
| /youraccount/communication_preferences.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/default.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/dlorder/reorder.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/personal_information.jsp | login/auth | 3 | get | (js-handled) |

---

## 9. Third-Party Integrations

**Analytics/Tag Mgmt**

| Integration | Pages |
|---|---|
| Adobe Launch/DTM (tag mgmt) | 812 |
| Adobe Analytics (AppMeasurement) | 780 |
| Google Analytics / GA4 | 775 |
| Adobe Helix RUM | 48 |
| Adobe Client Data Layer | 38 |
| Google Tag Manager | 3 |

**Chat/Support**

| Integration | Pages |
|---|---|
| Zendesk / LiveChat / Tidio | 2 |

**Consent/Privacy**

| Integration | Pages |
|---|---|
| OneTrust (consent) | 804 |
| TrustArc (consent) | 780 |

**Fonts**

| Integration | Pages |
|---|---|
| Google Fonts | 143 |

**Forms/CRM**

| Integration | Pages |
|---|---|
| Pardot (form) | 1 |

**Maps/Location**

| Integration | Pages |
|---|---|
| Google Maps | 806 |

**Marketing/Pixel**

| Integration | Pages |
|---|---|
| Facebook Pixel | 7 |
| LinkedIn Insight | 1 |

**Media/Video**

| Integration | Pages |
|---|---|
| YouTube embed | 16 |
| Spotify embed | 1 |

**Personalization/AB**

| Integration | Pages |
|---|---|
| Monetate | 783 |
| Adobe Target (A/B) | 264 |

**Survey/Feedback**

| Integration | Pages |
|---|---|
| Qualtrics (survey) | 23 |

**⚠︎ Unrecognized third-party hosts (need agent review — could be complex integrations):**

| Host | Pages |
|---|---|
| www.wag-static.com | 190 |
| dok.js-cdn.dynatrace.com | 16 |
| securepubads.g.doubleclick.net | 6 |
| unpkg.com | 3 |

---

## 10. Block Complexity

| Block | Complexity | Reason |
|---|---|---|
| **Account / Authentication** | High | Sign in / register / password reset / order lookup and account menus. Auth-gated flows with validation and session; typically integrated with an identity service. |
| **Cart** | High | Cart view/mini-cart: line items, quantities, fulfillment, price summary, promo code, checkout entry. Commerce, stateful, tied to session + catalog/pricing APIs. |
| **Global Header / Nav** | High | Global commerce header present on every page: logo, mega-menu category navigation, store/pickup selector, account menu, cart icon with live count, search, language switcher, rewards prompts. Stateful and shared sitewide. |
| **Store Locator** | High | Location-aware store finder: geolocation/entered location, results list with per-store cards (address, hours, services, distance), map view, browse-by-state, and multi-facet filters. Client-rendered against a store API — in EDS this is a JS-driven block calling a location service. |
| **Product Listing (PLP)** | High | Search/browse results grid of product cards with sort, faceted filters, item count, pagination / load-more. Commerce — product data from a catalog API. In EDS this is an Adobe Commerce PLP block. |
| **Product Filters / Facets** | High | Faceted refinement rail for PLP: brand, price min/max apply, color/undertone (beauty), fulfillment. Client-side state synced to the results grid and often the URL. |
| **Product Detail (PDP)** | High | Product page: gallery, title/brand, price, variant selection (size/color/undertone), fulfillment (pickup/ship/same-day), add-to-cart, reviews, FSA eligibility. Commerce — Adobe Commerce PDP block in EDS. |
| **Video / Media Embed** | High | Multiple providers (Scene7/Dynamic Media, YouTube, Vimeo, Spotify) with poster/lazy-load; may include transcript pairing and commerce links. |
| **Spa more option** ⚠︎ | Medium | AUTO-STUB — not in knowledge base; agent to assess complexity and rationale from observed markup/behavior. |
| **Editor's Pick / Featured Teaser** | Medium | Teaser promoting a single curated item: media + eyebrow + title + byline. |
| **Accordion** | Medium | Expand/collapse panels (single or multi-open); requires toggle JS + accessible disclosure semantics. |

---

## 11. ⚠︎ Needs Review (not assumed)

The following were auto-detected but not in the knowledge base — the agent must inspect the live pages and complete their spec rather than assume:

- **Spa more option** (`spa:testid:more-option`, 6 pages)

---

*Generated by tools/site-analysis. Data: data/*.json. Dashboard: dashboard.html. Detailed: reports/index.html.*
