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
| EDS blocks to develop | **13** |
| Block variations | **13** |
| EDS default content (not blocks) | 4 |
| High / Medium / Low complexity | 10 / 3 / 0 |
| Forms | 860 |
| Third-party integrations | 24 |
| Unrecognized 3rd-party hosts (review) | 28 |
| Blocks needing agent review | 0 |

---

## 2. Templates

| # | Template | Pages |
|---|---|---|
| 1 | **Store locator** (`store-locator`) | 440 |
| 2 | **Article** (`article`) | 209 |
| 3 | **Find care** (`find-care`) | 58 |
| 4 | **Redirect / External Stub** (`redirect-stub`) | 35 |
| 5 | **Store detail** (`store-detail`) | 30 |
| 6 | **Account** (`account`) | 27 |
| 7 | **Retail base template** (`retail-base-template`) | 22 |
| 8 | **Plp** (`plp`) | 11 |
| 9 | **Home page content template** (`home-page-content-template`) | 10 |
| 10 | **Retail content template** (`retail-content-template`) | 5 |
| 11 | **Cart** (`cart`) | 4 |
| 12 | **Content page** (`content-page`) | 2 |

---

## 3. Block Inventory

13 blocks to develop. Components that share a common DOM/decoration are consolidated into a single block whose differences are **variations** (one block built, N variations authored).

| Block | EDS name | Complexity | Pages | Variations |
|---|---|---|---|---|
| **Account / Authentication** | `account-auth (app)` | High | 793 | default (793) |
| **Cart** | `cart (commerce)` | High | 786 | default (786) |
| **Global Header / Nav** | `header (app nav)` | High | 786 | default (786) |
| **Store Locator** | `store-locator (app)` | High | 449 | default (449) |
| **Product Filters / Facets** | `product-filters (commerce)` | High | 25 | default (25) |
| **Product Detail (PDP)** | `product-detail-page (commerce)` | High | 25 | default (25) |
| **Product Listing (PLP)** | `product-list-page (commerce)` | High | 23 | default (23) |
| **Fulfillment & Add-to-Cart** | `product-fulfillment (commerce)` | High | 17 | default (17) |
| **Store Detail** | `store-detail (app)` | High | 10 | default (10) |
| **Editor's Pick / Featured Teaser** | `editors-pick (teaser)` | Medium | 4 | default (4) |
| **Video / Media Embed** | `embed (video)` | High | 3 | default (3) |
| **Accordion** | `accordion` | Medium | 2 | default (2) |
| **Recommendations / Merchandising Carousels** | `product-carousel (commerce)` | Medium | 1 | default (1) |

**EDS default content (not counted as blocks)** — rendered by core decoration / autoblocking, not authored as blocks: Rich Text (36), Separator (12), Image (4), Title (2).

---

## 4. Template → Block → Variation

### Store locator (`store-locator`) — 440 pages

| Block | Variations | Complexity |
|---|---|---|

### Article (`article`) — 209 pages

| Block | Variations | Complexity |
|---|---|---|

### Find care (`find-care`) — 58 pages

| Block | Variations | Complexity |
|---|---|---|

### Redirect / External Stub (`redirect-stub`) — 35 pages

| Block | Variations | Complexity |
|---|---|---|

### Store detail (`store-detail`) — 30 pages

| Block | Variations | Complexity |
|---|---|---|

### Account (`account`) — 27 pages

| Block | Variations | Complexity |
|---|---|---|

### Retail base template (`retail-base-template`) — 22 pages

| Block | Variations | Complexity |
|---|---|---|
| Editor's Pick / Featured Teaser | default | Medium |

### Plp (`plp`) — 11 pages

| Block | Variations | Complexity |
|---|---|---|

### Home page content template (`home-page-content-template`) — 10 pages

| Block | Variations | Complexity |
|---|---|---|

### Retail content template (`retail-content-template`) — 5 pages

| Block | Variations | Complexity |
|---|---|---|
| Editor's Pick / Featured Teaser | default | Medium |
| Video / Media Embed | default | High |
| Accordion | default | Medium |

### Cart (`cart`) — 4 pages

| Block | Variations | Complexity |
|---|---|---|

### Content page (`content-page`) — 2 pages

| Block | Variations | Complexity |
|---|---|---|

---

## 5. Functional Requirements

### Account / Authentication (`account-auth (app)`)

- **Pages:** 793 · **Templates:** 
- **Variations:** default (793)

- Sign in (email/password) and create-account.
- Password reset and guest order-lookup (order number, last name, phone).
- Account menu exposes orders, refills, rewards, saved items.
- Form validation on all inputs.

### Cart (`cart (commerce)`)

- **Pages:** 786 · **Templates:** 
- **Variations:** default (786)

- Line items with image, title, price, quantity controls.
- Fulfillment per item; price/summary totals.
- Promo/rewards application; proceed-to-checkout.
- Mini-cart icon reflects item count.

### Global Header / Nav (`header (app nav)`)

- **Pages:** 786 · **Templates:** 
- **Variations:** default (786)

- Mega-menu navigation across departments/categories.
- Store & pickup-location selector reflecting the chosen store.
- Account menu (sign in / orders / rewards / buy-again).
- Cart icon showing live item count.
- Site search entry point and language switcher.

### Store Locator (`store-locator (app)`)

- **Pages:** 449 · **Templates:** 
- **Variations:** default (449)

- Accepts a location (geolocate or entered) and lists nearby stores.
- Each store card shows address, service hours, services, distance and open/closed status; links to store detail and map.
- Filters (24-hour, pharmacy, drive-thru, clinic, etc.) refine results.
- 'Browse stores by state' provides an SEO directory path.
- Save/preferred-store action.

### Product Filters / Facets (`product-filters (commerce)`)

- **Pages:** 25 · **Templates:** 
- **Variations:** default (25)

- Facet groups (brand, price, color, undertone, fulfillment).
- Price min/max with Apply.
- Selecting facets refines the product grid; applied-filters chips can be cleared.

### Product Detail (PDP) (`product-detail-page (commerce)`)

- **Pages:** 25 · **Templates:** 
- **Variations:** default (25)

- Product gallery + title + brand + price + rating.
- Variant selection (color/size/undertone) updates price/availability.
- Fulfillment options (pickup / shipping / same-day) and add-to-cart / add-to-fulfillment.
- FSA-eligibility labelling; check-other-store availability.
- Reviews.

### Product Listing (PLP) (`product-list-page (commerce)`)

- **Pages:** 23 · **Templates:** 
- **Variations:** default (23)

- Grid of product cards (image, title, brand, price, rating, promotion/tag).
- Sort dropdown and result/item count.
- Faceted filters (brand, price range, fulfillment) refine results.
- Load-more / paginated navigation.
- Each card links to its PDP; add-to-cart / add-to-fulfillment where applicable.

### Fulfillment & Add-to-Cart (`product-fulfillment (commerce)`)

- **Pages:** 17 · **Templates:** 
- **Variations:** default (17)

- Fulfillment radios: pickup, same-day delivery, shipping — each with stock/availability + ready-time messaging.
- Quantity dropdown.
- Add-to-cart / add-for-pickup updates the cart + header count.
- Check other stores for availability.
- Pickup address/details reflect the selected store.

### Store Detail (`store-detail (app)`)

- **Pages:** 10 · **Templates:** 
- **Variations:** default (10)

- Shows the store's address, phone and per-service hours + open/closed status.
- Save as preferred store (star).
- Service links: schedule vaccine (COVID/flu/pneumonia), photo (cards/prints/same-day), FedEx returns, propane exchange, beauty consultation.
- 'See all' overlays for photo and services.
- In-store product search box.

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

### Recommendations / Merchandising Carousels (`product-carousel (commerce)`)

- **Pages:** 1 · **Templates:** 
- **Variations:** default (1)

- Horizontal carousels of product/offer cards (buy-again, top sellers, highest rated, newest arrivals, recently viewed, coupons, sales offers).
- Category/brand shortcut sections.
- Prev/next scroll; each card links to a PDP/PLP or applies an offer/coupon.

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

### Product Filters / Facets

- [ ] Selecting a facet narrows the grid.
- [ ] Setting a price range + Apply narrows by price.
- [ ] Clearing a facet restores results.

### Product Detail (PDP)

- [ ] PDP shows title, price and gallery.
- [ ] Selecting a variant updates the selection/price.
- [ ] Add-to-cart adds the item and updates the cart.
- [ ] Fulfillment options are selectable.

### Product Listing (PLP)

- [ ] Results render as product cards with price and rating.
- [ ] Changing sort reorders results.
- [ ] Applying a filter/price range narrows results.
- [ ] Load-more / next page appends or advances results.
- [ ] A card navigates to its PDP.

### Fulfillment & Add-to-Cart

- [ ] Selecting a fulfillment option updates availability messaging.
- [ ] Choosing quantity + add-to-cart adds the item and updates the cart count.
- [ ] Check-other-stores surfaces alternative stores.
- [ ] Out-of-stock options are disabled/messaged.

### Store Detail

- [ ] Store detail shows address, hours and status per service.
- [ ] Save-preferred-store marks the store preferred.
- [ ] A service link (e.g. schedule vaccine) navigates to that flow.
- [ ] 'See all photo products' opens the photo overlay.

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

---

## 7. User Journeys & Interactions

Capabilities detected across the site (page counts). These indicate the interactive journeys to design & test.

| Capability | Pages |
|---|---|
| Login / account | 827 |
| Checkout / buy | 796 |
| Filtering | 795 |
| Forms | 794 |
| Modal / popup | 793 |
| Tabs | 788 |
| Cart | 786 |
| Search | 784 |
| Accordion / flip | 595 |
| Pagination / load-more | 445 |
| Map | 441 |
| Video | 17 |
| Live chat | 10 |

> Journeys should be walked end-to-end with Playwright and documented in `data/observed-behaviors.json`. Multi-step flows (form → validation → submit → confirmation; filter → results; login → gated content) are called out per block in §5.

---

## 8. Forms

860 form instance(s) found. Kinds: generic (786), contact/lead (4), login/auth (11), checkout/payment (2).

| Page | Kind | Fields | Method | Posts to |
|---|---|---|---|---|
| / | generic | 1 | get | (js-handled) |
| /default.jsp | generic | 1 | get | (js-handled) |
| /familymgmt/manageAccountAccess | generic | 1 | get | (js-handled) |
| /familymgmt/manageAccountAccess | contact/lead | 5 | get | (js-handled) |
| /familymgmt/manageAccountAccess | generic | 0 | get | (js-handled) |
| /familymgmt/manageFamilyAccounts | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/advisor | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/marketplace_dark | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicaid | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare-resources | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/cigna | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/content/medicare-part-d-coverage-gap | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/content/medicare-part-d-coverage-gap_dark | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/content/find-prescription-coverage/medicare/medicare-part-b-services | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/partner/kindbody | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/partner/mdlive | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/partner/mdlive%5C | generic | 1 | get | (js-handled) |
| /findcare-partners/findcare/partner/vaccination | generic | 1 | get | (js-handled) |
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
| /findcare/category/weightloss | generic | 1 | get | (js-handled) |
| /findcare/category/weightloss | generic | 1 | get | (js-handled) |
| /findcare/category/women'shealth | generic | 1 | get | (js-handled) |
| /findcare/category/women'shealth | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage/advisor | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage/medicaid | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage/medicare/cigna | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage/medicare/united | generic | 1 | get | (js-handled) |
| /findcare/content/find-prescription-coverage/medicare/wellcare | generic | 1 | get | (js-handled) |
| /findcare/covid19/otc-test | generic | 1 | get | (js-handled) |
| /findcare/covid19/paxlovid | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/advisor | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/marketplace | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/marketplace_dark | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/marketplace/content/what-is-the-marketplace | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicaid | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare-resources | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/all-plans | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/content/medicare-part-d-coverage-gap | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/content/medicare-part-d-coverage-gap_dark | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/medicare-part-b-services | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/shopping | generic | 1 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/shopping | generic | 2 | get | (js-handled) |
| /findcare/find-prescription-coverage/medicare/shopping | generic | 3 | get | (js-handled) |
| /findcare/mdlive | generic | 1 | get | (js-handled) |
| /findcare/partner/dexcom | generic | 1 | get | (js-handled) |
| /findcare/partner/kindbody | generic | 1 | get | (js-handled) |
| /findcare/service/Enrollment_Guide | generic | 1 | get | (js-handled) |
| /findcare/service/nicorette | generic | 1 | get | (js-handled) |
| /findcare/service/pg-menopause | generic | 1 | get | (js-handled) |
| /findcare/services | generic | 1 | get | (js-handled) |
| /findcare/vaccination | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/diabetes | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/illness-injuries | generic | 1 | get | (js-handled) |
| /findcareui/findcare/category/virtual-visit | generic | 1 | get | (js-handled) |
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
| /health/p2/a/1900001/causes-of-gerd/2449134 | generic | 1 | get | (js-handled) |
| /health/p2/a/1900001/colon-cancer-treatment/2449137 | generic | 1 | get | (js-handled) |
| /health/p2/a/1900001/symptoms-of-colon-cancer/2449138 | generic | 1 | get | (js-handled) |
| /health/p2/a/1900001/the-power-of-probiotics/2130127 | generic | 1 | get | (js-handled) |
| /health/p2/a/2500001/what-is-pre-diabetes/2449046 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/5-tips-to-avoid-weight-gain-while-you-quit-smoking/2297202 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/conquering-smoking-cravings-and-triggers/2297203 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/creating-a-smoke-free-environment/2306377 | generic | 1 | get | (js-handled) |
| /health/p2/a/3000001/eight-reasons-to-quit-smoking/300001 | generic | 1 | get | (js-handled) |
| /health/quit-smoking/3000001 | generic | 1 | get | (js-handled) |
| /health/vaccines-immunizations/6-simple-tips-to-combat-needle-anxiety.html | generic | 1 | get | (js-handled) |
| /healthcare-solutions/how-we-can-help/clinical-trials | contact/lead | 10 | post | go.walgreenshealth.com |
| /locator/walgreens-1010+maple+ave-lisle-il-60532/id=7212 | generic | 1 | get | (js-handled) |
| /locator/walgreens-1010+maple+ave-lisle-il-60532/id=7212 | generic | 1 | get | (js-handled) |
| /locator/walgreens-11+e+75th+st-chicago-il-60619/id=3539 | generic | 1 | get | (js-handled) |
| /locator/walgreens-11+e+75th+st-chicago-il-60619/id=3539 | generic | 1 | get | (js-handled) |
| /locator/walgreens-15601+san+carlos+blvd-fort+myers-fl-33908/id=3356 | generic | 1 | get | (js-handled) |
| /locator/walgreens-15601+san+carlos+blvd-fort+myers-fl-33908/id=3356 | generic | 1 | get | (js-handled) |
| /locator/walgreens-1602+n+dixie+ave-elizabethtown-ky-42701/id=4123 | generic | 1 | get | (js-handled) |
| /locator/walgreens-1602+n+dixie+ave-elizabethtown-ky-42701/id=4123 | generic | 1 | get | (js-handled) |
| /locator/walgreens-2000+veterans+blvd-dublin-ga-31021/id=19407 | generic | 1 | get | (js-handled) |
| /locator/walgreens-2000+veterans+blvd-dublin-ga-31021/id=19407 | generic | 1 | get | (js-handled) |
| /locator/walgreens-2646+darlington+rd-beaver+falls-pa-15010/id=9942 | generic | 1 | get | (js-handled) |
| /locator/walgreens-2646+darlington+rd-beaver+falls-pa-15010/id=9942 | generic | 1 | get | (js-handled) |
| /locator/walgreens-26482+us+highway+281+n-san+antonio-tx-78258/id=13940 | generic | 1 | get | (js-handled) |
| /locator/walgreens-26482+us+highway+281+n-san+antonio-tx-78258/id=13940 | generic | 1 | get | (js-handled) |
| /locator/walgreens-411+s+mason+rd-katy-tx-77450/id=4696 | generic | 1 | get | (js-handled) |
| /locator/walgreens-411+s+mason+rd-katy-tx-77450/id=4696 | generic | 1 | get | (js-handled) |
| /locator/walgreens-4730+s+27th+st-milwaukee-wi-53221/id=5601 | generic | 1 | get | (js-handled) |
| /locator/walgreens-4730+s+27th+st-milwaukee-wi-53221/id=5601 | generic | 1 | get | (js-handled) |
| /locator/walgreens-92+leonardville+rd-belford-nj-07718/id=19757 | generic | 1 | get | (js-handled) |
| /locator/walgreens-92+leonardville+rd-belford-nj-07718/id=19757 | generic | 1 | get | (js-handled) |
| /login.jsp | login/auth | 3 | get | (js-handled) |
| /logout.jsp | generic | 1 | get | (js-handled) |
| /marketing/emailsignup/signup_main.jsp | generic | 1 | get | (js-handled) |
| /mktg/contactus/contact-us-landing.jsp | generic | 1 | get | (js-handled) |
| /mywalgreens/cards/credit.jsp | generic | 1 | get | (js-handled) |
| /mywalgreens/cards/debit.jsp | generic | 1 | get | (js-handled) |
| /mywalgreenshealthaccess/termsofuse | login/auth | 3 | get | (js-handled) |
| /offers/offers.jsp | generic | 1 | get | (js-handled) |
| /offers/offers.jsp/weeklyad | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp/sendcode | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp/sendcode | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp/validatecode | generic | 1 | get | (js-handled) |
| /password/password_reset.jsp/validatecode | generic | 1 | get | (js-handled) |
| /password/reset_password.jsp | generic | 1 | get | (js-handled) |
| /password/reset_password.jsp | generic | 1 | get | (js-handled) |
| /password/retrieve_username_confirmation.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/familyaccount/managefamilyaccounts.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/privacyComplaintForm/privacyComplaintForm.jsp | generic | 1 | get | (js-handled) |
| /pharmacy/privacyComplaintForm/privacyComplaintForm.jsp | checkout/payment | 21 | get | (js-handled) |
| /pharmacy/sell-your-pharmacy | generic | 1 | get | (js-handled) |
| /privacycenter | generic | 1 | get | (js-handled) |
| /promotion/offer-details | generic | 1 | get | (js-handled) |
| /promotion/party-supplies | generic | 1 | get | (js-handled) |
| /promotion/walgreens-app | generic | 1 | get | (js-handled) |
| /promotion/womens-wellness | generic | 1 | get | (js-handled) |
| /q/1+day+acuvue | generic | 1 | get | (js-handled) |
| /q/1+day+acuvue | generic | 2 | get | (js-handled) |
| /q/1+day+acuvue+moist | generic | 1 | get | (js-handled) |
| /q/1+day+acuvue+moist | generic | 2 | get | (js-handled) |
| /q/1+day+contacts+for+astigmatism | generic | 1 | get | (js-handled) |
| /q/1+day+contacts+for+astigmatism | generic | 2 | get | (js-handled) |
| /q/1+day+narafilcon+contact+lenses | generic | 1 | get | (js-handled) |
| /q/1+day+narafilcon+contact+lenses | generic | 2 | get | (js-handled) |
| /q/1+day+narafilcon+contacts | generic | 1 | get | (js-handled) |
| /q/1+day+narafilcon+contacts | generic | 2 | get | (js-handled) |
| /q/1+day+trueye | generic | 1 | get | (js-handled) |
| /q/1+day+trueye | generic | 2 | get | (js-handled) |
| /q/1+hour+teeth+whitening | generic | 1 | get | (js-handled) |
| /q/1+hour+teeth+whitening | generic | 2 | get | (js-handled) |
| /q/100+watt+bulbs | generic | 1 | get | (js-handled) |
| /q/100+watt+bulbs | generic | 2 | get | (js-handled) |
| /q/100+watt+light+bulbs | generic | 1 | get | (js-handled) |
| /q/100+watt+light+bulbs | generic | 2 | get | (js-handled) |
| /q/100+watt+light+bulbs+ | generic | 1 | get | (js-handled) |
| /q/100+watt+light+bulbs+ | generic | 2 | get | (js-handled) |
| /register/addressView | generic | 1 | get | (js-handled) |
| /register/addressView | generic | 7 | get | (js-handled) |
| /register/mywag/covidvaccine/updates | login/auth | 3 | get | (js-handled) |
| /register/pharmacyRegistration | generic | 1 | get | (js-handled) |
| /register/pharmacyRegistration | login/auth | 9 | get | (js-handled) |
| /register/pharmacyRegistration.jsp | generic | 1 | get | (js-handled) |
| /register/pharmacyRegistration.jsp | login/auth | 9 | get | (js-handled) |
| /register/regOptions.jsp | generic | 1 | get | (js-handled) |
| /register/regOptions.jsp | login/auth | 7 | get | (js-handled) |
| /register/regpersonalinfo | generic | 1 | get | (js-handled) |
| /register/regpersonalinfo | login/auth | 7 | get | (js-handled) |
| /request_error.jsp | generic | 1 | get | (js-handled) |
| /rx-checkout/guest-express-refill | generic | 1 | get | (js-handled) |
| /rx-checkout/guest-express-refill | generic | 4 | get | (js-handled) |
| /rx-checkout/guest-transfer-rx | generic | 1 | get | (js-handled) |
| /rx-checkout/guest-transfer-rx | contact/lead | 12 | get | (js-handled) |
| /rx-checkout/refill-by-scan | generic | 1 | get | (js-handled) |
| /rx-checkout/refill-by-scan | generic | 4 | get | (js-handled) |
| /rx-druginfo/pharmacy/finddrug/druginfosearch | generic | 1 | get | (js-handled) |
| /rx-druginfo/search-results | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/1900001/colon-cancer-treatment/2449137 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/1900001/symptoms-of-colon-cancer/2449138 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/1900001/what-is-gerd/2449001 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3000001/finding-the-right-mental-health-therapy/2438100 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3000001/the-impact-of-second-and-third-hand-smoke/2448994 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3200001/coronavirus-anxiety-and-stress-how-to-cope/2449053 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3200001/coronavirus-social-distancing-and-depression/2449047 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3200001/finding-the-right-mental-health-therapy/2438100 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/3200001/helping-a-family-member-who-has-ptsd/2442587 | generic | 1 | get | (js-handled) |
| /rx-healthanswer/health/p2/a/4000001/types-of-eczema-treatment/2442643 | generic | 1 | get | (js-handled) |
| /rx-settings/home-delivery-pharmacy | generic | 1 | get | (js-handled) |
| /shop | generic | 1 | get | (js-handled) |
| /shoplocal/default.jsp | generic | 1 | get | (js-handled) |
| /store-services/same-day-delivery | generic | 1 | get | (js-handled) |
| /store-services/same-day-delivery | generic | 1 | get | (js-handled) |
| /store-services/store-pickup | generic | 1 | get | (js-handled) |
| /store-services/store-pickup | generic | 1 | get | (js-handled) |
| /store/c/acuvue-oasys-hydraluxe-90pk-acuvue-oasys-1-day-90-pack/ID=prod6312311-product | generic | 1 | get | (js-handled) |
| /store/c/acuvue-oasys-hydraluxe-90pk-acuvue-oasys-1-day-90-pack/ID=prod6312311-product | generic | 4 | get | (js-handled) |
| /store/c/acuvue-oasys-hydraluxe-90pk-acuvue-oasys-1-day-90-pack/ID=prod6312311-product | generic | 4 | get | (js-handled) |
| /store/c/productlist/N=118/1/Brands=yes | generic | 1 | get | (js-handled) |
| /store/c/productlist/N=118/1/Brands=yes | generic | 2 | get | (js-handled) |
| /store/c/productlist/N=1268/1/Brands=yes | generic | 1 | get | (js-handled) |
| /store/c/productlist/N=1268/1/Brands=yes | generic | 2 | get | (js-handled) |
| /store/c/productlist/N=1382/1/Brands=yes | generic | 1 | get | (js-handled) |
| /store/c/productlist/N=1382/1/Brands=yes | generic | 2 | get | (js-handled) |
| /store/c/productlist/N=307776/1/Brands=yes | generic | 1 | get | (js-handled) |
| /store/c/productlist/N=307776/1/Brands=yes | generic | 2 | get | (js-handled) |
| /store/c/productlist/N=358197/1/Brands=yes | generic | 1 | get | (js-handled) |
| /store/c/productlist/N=358197/1/Brands=yes | generic | 2 | get | (js-handled) |
| /store/c/productlist/N=365113/1/Brands=yes | generic | 1 | get | (js-handled) |
| /store/c/productlist/N=365113/1/Brands=yes | generic | 2 | get | (js-handled) |
| /store/c/productlist/N=377466/1/Brands=yes | generic | 1 | get | (js-handled) |
| /store/c/productlist/N=377466/1/Brands=yes | generic | 2 | get | (js-handled) |
| /store/c/productlist/N=4608/1/Brands=yes | generic | 1 | get | (js-handled) |
| /store/c/productlist/N=4608/1/Brands=yes | generic | 2 | get | (js-handled) |
| /store/c/productlist/N=491/1/Brands=yes | generic | 1 | get | (js-handled) |
| /store/c/productlist/N=491/1/Brands=yes | generic | 2 | get | (js-handled) |
| /store/c/productlist/N=656/1/Brands=yes | generic | 1 | get | (js-handled) |
| /store/c/productlist/N=656/1/Brands=yes | generic | 2 | get | (js-handled) |
| /store/c/walgreens-advanced-moisturizing-cream-fragrance-free/ID=300397738-product | generic | 1 | get | (js-handled) |
| /store/c/walgreens-advanced-moisturizing-cream-fragrance-free/ID=300397738-product | checkout/payment | 5 | get | (js-handled) |
| /store/store/brands/brand.jsp | generic | 1 | get | (js-handled) |
| /store/store/category/productlist.jsp | generic | 1 | get | (js-handled) |
| /store/store/family_products.jsp | generic | 1 | get | (js-handled) |
| /store/store/save/clearance.jsp | generic | 1 | get | (js-handled) |
| /store/store/save/clearance.jsp | generic | 2 | get | (js-handled) |
| /store/store/save/sale.jsp | generic | 1 | get | (js-handled) |
| /store/store/save/sale.jsp | generic | 2 | get | (js-handled) |
| /store/store/save/w-cash-rewards-offers.jsp | generic | 1 | get | (js-handled) |
| /store/store/save/w-cash-rewards-offers.jsp | generic | 2 | get | (js-handled) |
| /storelocator/24-hour-pharmacy/beaverton-or | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-pharmacy/mineral-wells-tx | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-pharmacy/newark-nj | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-pharmacy/north-creek-ny | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-pharmacy/northridge-ca | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-pharmacy/parsippany-nj | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-pharmacy/penn-yan-ny | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-pharmacy/riverdale-ga | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-pharmacy/south-dartmouth-ma | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-pharmacy/sunset-beach-nc | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-store/bedford-tx | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-store/centreville-md | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-store/coral-springs-fl | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-store/doral-fl | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-store/harrison-nj | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-store/logan-wv | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-store/pine-bluff-ar | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-store/portage-mi | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-store/saratoga-springs-ny | generic | 1 | get | (js-handled) |
| /storelocator/24-hour-store/wales-wi | generic | 1 | get | (js-handled) |
| /storelocator/atm/jackson-heights-ny | generic | 1 | get | (js-handled) |
| /storelocator/atm/milan-il | generic | 1 | get | (js-handled) |
| /storelocator/atm/montebello-ca | generic | 1 | get | (js-handled) |
| /storelocator/atm/murphy-nc | generic | 1 | get | (js-handled) |
| /storelocator/atm/portland-or | generic | 1 | get | (js-handled) |
| /storelocator/atm/rotterdam-ny | generic | 1 | get | (js-handled) |
| /storelocator/atm/san-bruno-ca | generic | 1 | get | (js-handled) |
| /storelocator/atm/south-dartmouth-ma | generic | 1 | get | (js-handled) |
| /storelocator/atm/vassar-mi | generic | 1 | get | (js-handled) |
| /storelocator/atm/winston-salem-nc | generic | 1 | get | (js-handled) |
| /storelocator/beer/ithaca-ny | generic | 1 | get | (js-handled) |
| /storelocator/beer/killeen-tx | generic | 1 | get | (js-handled) |
| /storelocator/beer/patchogue-ny | generic | 1 | get | (js-handled) |
| /storelocator/beer/peoria-heights-il | generic | 1 | get | (js-handled) |
| /storelocator/beer/pine-bush-ny | generic | 1 | get | (js-handled) |
| /storelocator/beer/plano-tx | generic | 1 | get | (js-handled) |
| /storelocator/beer/rockmart-ga | generic | 1 | get | (js-handled) |
| /storelocator/beer/saint-clair-shores-mi | generic | 1 | get | (js-handled) |
| /storelocator/beer/sugar-hill-ga | generic | 1 | get | (js-handled) |
| /storelocator/beer/waldwick-nj | generic | 1 | get | (js-handled) |
| /storelocator/blue-rhino-propane-gas/midland-tx | generic | 1 | get | (js-handled) |
| /storelocator/blue-rhino-propane-gas/mount-morris-ny | generic | 1 | get | (js-handled) |
| /storelocator/blue-rhino-propane-gas/powell-oh | generic | 1 | get | (js-handled) |
| /storelocator/blue-rhino-propane-gas/red-bank-nj | generic | 1 | get | (js-handled) |
| /storelocator/blue-rhino-propane-gas/rock-island-il | generic | 1 | get | (js-handled) |
| /storelocator/blue-rhino-propane-gas/rocky-mount-nc | generic | 1 | get | (js-handled) |
| /storelocator/blue-rhino-propane-gas/rocky-point-ny | generic | 1 | get | (js-handled) |
| /storelocator/blue-rhino-propane-gas/saint-clair-shores-mi | generic | 1 | get | (js-handled) |
| /storelocator/blue-rhino-propane-gas/warrenton-nc | generic | 1 | get | (js-handled) |
| /storelocator/blue-rhino-propane-gas/west-columbia-tx | generic | 1 | get | (js-handled) |
| /storelocator/chickenpox/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/chickenpox/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/chickenpox/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/chickenpox/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/chickenpox/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/chickenpox/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/chickenpox/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/chickenpox/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/chickenpox/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/chickenpox/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/clinic/killeen-tx | generic | 1 | get | (js-handled) |
| /storelocator/clinic/lodi-ca | generic | 1 | get | (js-handled) |
| /storelocator/clinic/salem-oh | generic | 1 | get | (js-handled) |
| /storelocator/clinic/salem-or | generic | 1 | get | (js-handled) |
| /storelocator/clinic/san-bruno-ca | generic | 1 | get | (js-handled) |
| /storelocator/clinic/schaumburg-il | generic | 1 | get | (js-handled) |
| /storelocator/clinic/selma-ca | generic | 1 | get | (js-handled) |
| /storelocator/clinic/stamford-ny | generic | 1 | get | (js-handled) |
| /storelocator/clinic/the-dalles-or | generic | 1 | get | (js-handled) |
| /storelocator/clinic/willis-tx | generic | 1 | get | (js-handled) |
| /storelocator/covid-19/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/covid-19/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/covid-19/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/covid-19/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/covid-19/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/covid-19/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/covid-19/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/covid-19/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/covid-19/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/covid-19/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/drive-thru-pharmacy/idaho-falls-id | generic | 1 | get | (js-handled) |
| /storelocator/drive-thru-pharmacy/marina-ca | generic | 1 | get | (js-handled) |
| /storelocator/drive-thru-pharmacy/mount-holly-nc | generic | 1 | get | (js-handled) |
| /storelocator/drive-thru-pharmacy/oxnard-ca | generic | 1 | get | (js-handled) |
| /storelocator/drive-thru-pharmacy/rochelle-il | generic | 1 | get | (js-handled) |
| /storelocator/drive-thru-pharmacy/saint-johns-mi | generic | 1 | get | (js-handled) |
| /storelocator/drive-thru-pharmacy/seffner-fl | generic | 1 | get | (js-handled) |
| /storelocator/drive-thru-pharmacy/southlake-tx | generic | 1 | get | (js-handled) |
| /storelocator/drive-thru-pharmacy/spring-lake-nc | generic | 1 | get | (js-handled) |
| /storelocator/drive-thru-pharmacy/toronto-oh | generic | 1 | get | (js-handled) |
| /storelocator/driveThruClose/bellingham-ma | generic | 1 | get | (js-handled) |
| /storelocator/driveThruClose/burlington-nj | generic | 1 | get | (js-handled) |
| /storelocator/driveThruClose/college-park-ga | generic | 1 | get | (js-handled) |
| /storelocator/driveThruClose/lebanon-or | generic | 1 | get | (js-handled) |
| /storelocator/driveThruClose/levittown-pa | generic | 1 | get | (js-handled) |
| /storelocator/driveThruClose/lyndhurst-oh | generic | 1 | get | (js-handled) |
| /storelocator/driveThruClose/millwood-wa | generic | 1 | get | (js-handled) |
| /storelocator/driveThruClose/palos-heights-il | generic | 1 | get | (js-handled) |
| /storelocator/driveThruClose/park-city-ut | generic | 1 | get | (js-handled) |
| /storelocator/driveThruClose/shelbyville-tn | generic | 1 | get | (js-handled) |
| /storelocator/electric-car-charging-station/homewood-il | generic | 1 | get | (js-handled) |
| /storelocator/electric-car-charging-station/hudson-ny | generic | 1 | get | (js-handled) |
| /storelocator/electric-car-charging-station/huntington-beach-ca | generic | 1 | get | (js-handled) |
| /storelocator/electric-car-charging-station/kingwood-tx | generic | 1 | get | (js-handled) |
| /storelocator/electric-car-charging-station/opa-locka-fl | generic | 1 | get | (js-handled) |
| /storelocator/electric-car-charging-station/pasadena-ca | generic | 1 | get | (js-handled) |
| /storelocator/electric-car-charging-station/sault-s-marie-mi | generic | 1 | get | (js-handled) |
| /storelocator/electric-car-charging-station/spring-lake-nj | generic | 1 | get | (js-handled) |
| /storelocator/electric-car-charging-station/taylor-mi | generic | 1 | get | (js-handled) |
| /storelocator/electric-car-charging-station/wylie-tx | generic | 1 | get | (js-handled) |
| /storelocator/fedex/merritt-island-fl | generic | 1 | get | (js-handled) |
| /storelocator/fedex/miami-gardens-fl | generic | 1 | get | (js-handled) |
| /storelocator/fedex/mineola-ny | generic | 1 | get | (js-handled) |
| /storelocator/fedex/randolph-ma | generic | 1 | get | (js-handled) |
| /storelocator/fedex/river-forest-il | generic | 1 | get | (js-handled) |
| /storelocator/fedex/sun-city-center-fl | generic | 1 | get | (js-handled) |
| /storelocator/fedex/ticonderoga-ny | generic | 1 | get | (js-handled) |
| /storelocator/fedex/waterford-mi | generic | 1 | get | (js-handled) |
| /storelocator/fedex/westbury-ny | generic | 1 | get | (js-handled) |
| /storelocator/fedex/yorkshire-ny | generic | 1 | get | (js-handled) |
| /storelocator/FedRtn/herkimer-ny | generic | 1 | get | (js-handled) |
| /storelocator/FedRtn/johnson-city-ny | generic | 1 | get | (js-handled) |
| /storelocator/FedRtn/oradell-nj | generic | 1 | get | (js-handled) |
| /storelocator/FedRtn/reidsville-nc | generic | 1 | get | (js-handled) |
| /storelocator/FedRtn/richmond-hill-ga | generic | 1 | get | (js-handled) |
| /storelocator/FedRtn/salem-ma | generic | 1 | get | (js-handled) |
| /storelocator/FedRtn/snow-hill-nc | generic | 1 | get | (js-handled) |
| /storelocator/FedRtn/vineland-nj | generic | 1 | get | (js-handled) |
| /storelocator/FedRtn/west-orange-nj | generic | 1 | get | (js-handled) |
| /storelocator/FedRtn/westwood-ma | generic | 1 | get | (js-handled) |
| /storelocator/find.jsp | generic | 1 | get | (js-handled) |
| /storelocator/find.jsp?beauty=true | generic | 1 | get | (js-handled) |
| /storelocator/flu-shot/lompoc-ca | generic | 1 | get | (js-handled) |
| /storelocator/flu-shot/los-altos-ca | generic | 1 | get | (js-handled) |
| /storelocator/flu-shot/naperville-il | generic | 1 | get | (js-handled) |
| /storelocator/flu-shot/new-hyde-park-ny | generic | 1 | get | (js-handled) |
| /storelocator/flu-shot/plainfield-il | generic | 1 | get | (js-handled) |
| /storelocator/flu-shot/redondo-beach-ca | generic | 1 | get | (js-handled) |
| /storelocator/flu-shot/silsbee-tx | generic | 1 | get | (js-handled) |
| /storelocator/flu-shot/the-dalles-or | generic | 1 | get | (js-handled) |
| /storelocator/flu-shot/west-melbourne-fl | generic | 1 | get | (js-handled) |
| /storelocator/flu-shot/whittier-ca | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a-b-combo/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a-b-combo/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a-b-combo/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a-b-combo/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a-b-combo/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a-b-combo/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a-b-combo/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a-b-combo/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a-b-combo/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a-b-combo/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-a/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-b/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-b/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-b/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-b/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-b/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-b/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-b/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-b/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-b/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/hepatitis-b/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/hpv/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/hpv/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/hpv/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/hpv/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/hpv/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/hpv/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/hpv/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/hpv/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/hpv/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/hpv/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/japanese-encephalitis/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/japanese-encephalitis/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/japanese-encephalitis/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/japanese-encephalitis/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/japanese-encephalitis/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/japanese-encephalitis/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/japanese-encephalitis/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/japanese-encephalitis/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/japanese-encephalitis/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/japanese-encephalitis/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/lab-services/murrieta-ca | generic | 1 | get | (js-handled) |
| /storelocator/lab-services/new-hyde-park-ny | generic | 1 | get | (js-handled) |
| /storelocator/lab-services/ozone-park-ny | generic | 1 | get | (js-handled) |
| /storelocator/lab-services/port-isabel-tx | generic | 1 | get | (js-handled) |
| /storelocator/lab-services/robbinsville-nj | generic | 1 | get | (js-handled) |
| /storelocator/lab-services/spring-valley-ny | generic | 1 | get | (js-handled) |
| /storelocator/lab-services/taunton-ma | generic | 1 | get | (js-handled) |
| /storelocator/lab-services/trophy-club-tx | generic | 1 | get | (js-handled) |
| /storelocator/lab-services/weatherford-tx | generic | 1 | get | (js-handled) |
| /storelocator/lab-services/west-plains-mo | generic | 1 | get | (js-handled) |
| /storelocator/liquor/mill-valley-ca | generic | 1 | get | (js-handled) |
| /storelocator/liquor/milton-fl | generic | 1 | get | (js-handled) |
| /storelocator/liquor/north-chili-ny | generic | 1 | get | (js-handled) |
| /storelocator/liquor/perry-ga | generic | 1 | get | (js-handled) |
| /storelocator/liquor/river-vale-nj | generic | 1 | get | (js-handled) |
| /storelocator/liquor/sanford-fl | generic | 1 | get | (js-handled) |
| /storelocator/liquor/sherman-oaks-ca | generic | 1 | get | (js-handled) |
| /storelocator/liquor/stone-ridge-ny | generic | 1 | get | (js-handled) |
| /storelocator/liquor/weslaco-tx | generic | 1 | get | (js-handled) |
| /storelocator/liquor/west-allis-wi | generic | 1 | get | (js-handled) |
| /storelocator/measles-mumps-rubella-mmr/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/measles-mumps-rubella-mmr/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/measles-mumps-rubella-mmr/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/measles-mumps-rubella-mmr/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/measles-mumps-rubella-mmr/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/measles-mumps-rubella-mmr/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/measles-mumps-rubella-mmr/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/measles-mumps-rubella-mmr/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/measles-mumps-rubella-mmr/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/measles-mumps-rubella-mmr/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/medication-compounding/lockhart-tx | generic | 1 | get | (js-handled) |
| /storelocator/medication-compounding/miller-place-ny | generic | 1 | get | (js-handled) |
| /storelocator/medication-compounding/north-fort-myers-fl | generic | 1 | get | (js-handled) |
| /storelocator/medication-compounding/plainfield-nj | generic | 1 | get | (js-handled) |
| /storelocator/medication-compounding/poway-ca | generic | 1 | get | (js-handled) |
| /storelocator/medication-compounding/reading-ma | generic | 1 | get | (js-handled) |
| /storelocator/medication-compounding/saint-clair-shores-mi | generic | 1 | get | (js-handled) |
| /storelocator/medication-compounding/verona-nj | generic | 1 | get | (js-handled) |
| /storelocator/medication-compounding/wellington-fl | generic | 1 | get | (js-handled) |
| /storelocator/medication-compounding/westlake-oh | generic | 1 | get | (js-handled) |
| /storelocator/meningitis/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/meningitis/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/meningitis/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/meningitis/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/meningitis/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/meningitis/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/meningitis/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/meningitis/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/meningitis/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/meningitis/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/odd/malone-ny | generic | 1 | get | (js-handled) |
| /storelocator/odd/oldsmar-fl | generic | 1 | get | (js-handled) |
| /storelocator/odd/plymouth-nc | generic | 1 | get | (js-handled) |
| /storelocator/odd/suwanee-ga | generic | 1 | get | (js-handled) |
| /storelocator/odd/the-villages-fl | generic | 1 | get | (js-handled) |
| /storelocator/odd/ticonderoga-ny | generic | 1 | get | (js-handled) |
| /storelocator/odd/tracy-ca | generic | 1 | get | (js-handled) |
| /storelocator/odd/west-dundee-il | generic | 1 | get | (js-handled) |
| /storelocator/odd/westbury-ny | generic | 1 | get | (js-handled) |
| /storelocator/odd/wyoming-mi | generic | 1 | get | (js-handled) |
| /storelocator/passport-photos/leander-tx | generic | 1 | get | (js-handled) |
| /storelocator/passport-photos/manlius-ny | generic | 1 | get | (js-handled) |
| /storelocator/passport-photos/murphy-tx | generic | 1 | get | (js-handled) |
| /storelocator/passport-photos/norwalk-ca | generic | 1 | get | (js-handled) |
| /storelocator/passport-photos/oakland-nj | generic | 1 | get | (js-handled) |
| /storelocator/passport-photos/palm-beach-gardens-fl | generic | 1 | get | (js-handled) |
| /storelocator/passport-photos/peachtree-city-ga | generic | 1 | get | (js-handled) |
| /storelocator/passport-photos/rancho-santa-margarita-ca | generic | 1 | get | (js-handled) |
| /storelocator/passport-photos/willoughby-oh | generic | 1 | get | (js-handled) |
| /storelocator/passport-photos/winder-ga | generic | 1 | get | (js-handled) |
| /storelocator/pharmacy/baraboo-wi | generic | 1 | get | (js-handled) |
| /storelocator/pharmacy/east-providence-ri | generic | 1 | get | (js-handled) |
| /storelocator/pharmacy/gray-ga | generic | 1 | get | (js-handled) |
| /storelocator/pharmacy/lexington-tn | generic | 1 | get | (js-handled) |
| /storelocator/pharmacy/paintsville-ky | generic | 1 | get | (js-handled) |
| /storelocator/pharmacy/stanford-ky | generic | 1 | get | (js-handled) |
| /storelocator/photo/johnson-city-ny | generic | 1 | get | (js-handled) |
| /storelocator/photo/lake-placid-ny | generic | 1 | get | (js-handled) |
| /storelocator/photo/lake-villa-il | generic | 1 | get | (js-handled) |
| /storelocator/photo/lancaster-ca | generic | 1 | get | (js-handled) |
| /storelocator/photo/perry-fl | generic | 1 | get | (js-handled) |
| /storelocator/photo/rockford-il | generic | 1 | get | (js-handled) |
| /storelocator/photo/south-ozone-park-ny | generic | 1 | get | (js-handled) |
| /storelocator/photo/vails-gate-ny | generic | 1 | get | (js-handled) |
| /storelocator/photo/whitehall-mi | generic | 1 | get | (js-handled) |
| /storelocator/photo/wichita-falls-tx | generic | 1 | get | (js-handled) |
| /storelocator/pneumonia/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/pneumonia/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/pneumonia/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/pneumonia/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/pneumonia/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/pneumonia/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/pneumonia/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/pneumonia/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/pneumonia/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/pneumonia/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/polio/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/polio/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/polio/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/polio/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/polio/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/polio/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/polio/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/polio/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/polio/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/polio/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/primary-care/peru-il | generic | 1 | get | (js-handled) |
| /storelocator/primary-care/rocky-point-ny | generic | 1 | get | (js-handled) |
| /storelocator/primary-care/salem-or | generic | 1 | get | (js-handled) |
| /storelocator/primary-care/saranac-lake-ny | generic | 1 | get | (js-handled) |
| /storelocator/primary-care/shallotte-nc | generic | 1 | get | (js-handled) |
| /storelocator/primary-care/south-miami-fl | generic | 1 | get | (js-handled) |
| /storelocator/primary-care/ventnor-city-nj | generic | 1 | get | (js-handled) |
| /storelocator/primary-care/wappingers-falls-ny | generic | 1 | get | (js-handled) |
| /storelocator/primary-care/waupaca-wi | generic | 1 | get | (js-handled) |
| /storelocator/primary-care/woodbury-tn | generic | 1 | get | (js-handled) |
| /storelocator/rabies/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/rabies/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/rabies/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/rabies/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/rabies/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/rabies/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/rabies/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/rabies/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/rabies/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/rabies/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/redbox/indio-ca | generic | 1 | get | (js-handled) |
| /storelocator/redbox/marshall-tx | generic | 1 | get | (js-handled) |
| /storelocator/redbox/mattoon-il | generic | 1 | get | (js-handled) |
| /storelocator/redbox/miami-beach-fl | generic | 1 | get | (js-handled) |
| /storelocator/redbox/moline-il | generic | 1 | get | (js-handled) |
| /storelocator/redbox/montgomery-il | generic | 1 | get | (js-handled) |
| /storelocator/redbox/palatine-bridge-ny | generic | 1 | get | (js-handled) |
| /storelocator/redbox/parma-oh | generic | 1 | get | (js-handled) |
| /storelocator/redbox/pineville-nc | generic | 1 | get | (js-handled) |
| /storelocator/redbox/wood-river-il | generic | 1 | get | (js-handled) |
| /storelocator/rx-disposal/ithaca-ny | generic | 1 | get | (js-handled) |
| /storelocator/rx-disposal/milan-il | generic | 1 | get | (js-handled) |
| /storelocator/rx-disposal/mineola-ny | generic | 1 | get | (js-handled) |
| /storelocator/rx-disposal/nashville-nc | generic | 1 | get | (js-handled) |
| /storelocator/rx-disposal/passaic-nj | generic | 1 | get | (js-handled) |
| /storelocator/rx-disposal/south-yarmouth-ma | generic | 1 | get | (js-handled) |
| /storelocator/rx-disposal/three-rivers-mi | generic | 1 | get | (js-handled) |
| /storelocator/rx-disposal/waukegan-il | generic | 1 | get | (js-handled) |
| /storelocator/rx-disposal/waycross-ga | generic | 1 | get | (js-handled) |
| /storelocator/rx-disposal/western-springs-il | generic | 1 | get | (js-handled) |
| /storelocator/shingles/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/shingles/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/shingles/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/shingles/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/shingles/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/shingles/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/shingles/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/shingles/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/shingles/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/shingles/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/storeDetails.jsp?stnum=3323 | generic | 1 | get | (js-handled) |
| /storelocator/storeDetails.jsp?stnum=3323 | generic | 1 | get | (js-handled) |
| /storelocator/tdap/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/tdap/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/tdap/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/tdap/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/tdap/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/tdap/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/tdap/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/tdap/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/tdap/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/tdap/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/tetanus-diptheria-td/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/tetanus-diptheria-td/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/tetanus-diptheria-td/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/tetanus-diptheria-td/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/tetanus-diptheria-td/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/tetanus-diptheria-td/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/tetanus-diptheria-td/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/tetanus-diptheria-td/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/tetanus-diptheria-td/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/tetanus-diptheria-td/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/travel-health-consultations/liberty-ny | generic | 1 | get | (js-handled) |
| /storelocator/travel-health-consultations/nokomis-fl | generic | 1 | get | (js-handled) |
| /storelocator/travel-health-consultations/okeechobee-fl | generic | 1 | get | (js-handled) |
| /storelocator/travel-health-consultations/port-saint-lucie-fl | generic | 1 | get | (js-handled) |
| /storelocator/travel-health-consultations/schaumburg-il | generic | 1 | get | (js-handled) |
| /storelocator/travel-health-consultations/sebastian-fl | generic | 1 | get | (js-handled) |
| /storelocator/travel-health-consultations/sutter-creek-ca | generic | 1 | get | (js-handled) |
| /storelocator/travel-health-consultations/trophy-club-tx | generic | 1 | get | (js-handled) |
| /storelocator/travel-health-consultations/verona-nj | generic | 1 | get | (js-handled) |
| /storelocator/travel-health-consultations/wausau-wi | generic | 1 | get | (js-handled) |
| /storelocator/typhoid/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/typhoid/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/typhoid/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/typhoid/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/typhoid/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/typhoid/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/typhoid/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/typhoid/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/typhoid/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/typhoid/acton-ma | generic | 1 | get | (js-handled) |
| /storelocator/urgent-care/leander-tx | generic | 1 | get | (js-handled) |
| /storelocator/urgent-care/north-cape-may-nj | generic | 1 | get | (js-handled) |
| /storelocator/urgent-care/orchard-park-ny | generic | 1 | get | (js-handled) |
| /storelocator/urgent-care/painesville-oh | generic | 1 | get | (js-handled) |
| /storelocator/urgent-care/palmdale-ca | generic | 1 | get | (js-handled) |
| /storelocator/urgent-care/pana-il | generic | 1 | get | (js-handled) |
| /storelocator/urgent-care/san-gabriel-ca | generic | 1 | get | (js-handled) |
| /storelocator/urgent-care/st-petersburg-fl | generic | 1 | get | (js-handled) |
| /storelocator/urgent-care/sutter-creek-ca | generic | 1 | get | (js-handled) |
| /storelocator/urgent-care/xenia-oh | generic | 1 | get | (js-handled) |
| /storelocator/western-union/kingwood-tx | generic | 1 | get | (js-handled) |
| /storelocator/western-union/la-crescenta-ca | generic | 1 | get | (js-handled) |
| /storelocator/western-union/massapequa-ny | generic | 1 | get | (js-handled) |
| /storelocator/western-union/oak-forest-il | generic | 1 | get | (js-handled) |
| /storelocator/western-union/oswego-il | generic | 1 | get | (js-handled) |
| /storelocator/western-union/rosenberg-tx | generic | 1 | get | (js-handled) |
| /storelocator/western-union/south-chicago-heights-il | generic | 1 | get | (js-handled) |
| /storelocator/western-union/spencerport-ny | generic | 1 | get | (js-handled) |
| /storelocator/western-union/vero-beach-fl | generic | 1 | get | (js-handled) |
| /storelocator/western-union/west-lake-hills-tx | generic | 1 | get | (js-handled) |
| /storelocator/wic/cottage-grove-or | generic | 1 | get | (js-handled) |
| /storelocator/wic/penn-yan-ny | generic | 1 | get | (js-handled) |
| /storelocator/wic/pinehurst-nc | generic | 1 | get | (js-handled) |
| /storelocator/wic/rockport-ma | generic | 1 | get | (js-handled) |
| /storelocator/wic/south-glens-falls-ny | generic | 1 | get | (js-handled) |
| /storelocator/wic/statesboro-ga | generic | 1 | get | (js-handled) |
| /storelocator/wic/waltham-ma | generic | 1 | get | (js-handled) |
| /storelocator/wic/waynesville-nc | generic | 1 | get | (js-handled) |
| /storelocator/wic/west-long-branch-nj | generic | 1 | get | (js-handled) |
| /storelocator/wic/yorkville-il | generic | 1 | get | (js-handled) |
| /storelocator/wine/lake-oswego-or | generic | 1 | get | (js-handled) |
| /storelocator/wine/liverpool-ny | generic | 1 | get | (js-handled) |
| /storelocator/wine/manalapan-nj | generic | 1 | get | (js-handled) |
| /storelocator/wine/marlboro-nj | generic | 1 | get | (js-handled) |
| /storelocator/wine/monroe-ny | generic | 1 | get | (js-handled) |
| /storelocator/wine/riverside-ca | generic | 1 | get | (js-handled) |
| /storelocator/wine/sherman-oaks-ca | generic | 1 | get | (js-handled) |
| /storelocator/wine/springfield-gardens-ny | generic | 1 | get | (js-handled) |
| /storelocator/wine/sutter-creek-ca | generic | 1 | get | (js-handled) |
| /storelocator/wine/wilmette-il | generic | 1 | get | (js-handled) |
| /storelocator/yellow-fever/abbeville-la | generic | 1 | get | (js-handled) |
| /storelocator/yellow-fever/aberdeen-md | generic | 1 | get | (js-handled) |
| /storelocator/yellow-fever/aberdeen-ms | generic | 1 | get | (js-handled) |
| /storelocator/yellow-fever/aberdeen-nc | generic | 1 | get | (js-handled) |
| /storelocator/yellow-fever/abilene-tx | generic | 1 | get | (js-handled) |
| /storelocator/yellow-fever/abingdon-md | generic | 1 | get | (js-handled) |
| /storelocator/yellow-fever/abingdon-va | generic | 1 | get | (js-handled) |
| /storelocator/yellow-fever/abita-springs-la | generic | 1 | get | (js-handled) |
| /storelocator/yellow-fever/absecon-nj | generic | 1 | get | (js-handled) |
| /storelocator/yellow-fever/acton-ma | generic | 1 | get | (js-handled) |
| /testandtreat/testing | generic | 1 | get | (js-handled) |
| /testandtreat/treatment | generic | 1 | get | (js-handled) |
| /topic/about/history/ourpast.jsp | generic | 1 | get | (js-handled) |
| /topic/clinical-trials/ebonistudyinfo.jsp | generic | 1 | get | (js-handled) |
| /topic/contacts/deals.jsp | generic | 1 | get | (js-handled) |
| /topic/donotsellmyinfo_es.jsp | generic | 1 | get | (js-handled) |
| /topic/donotsellmyinfo.jsp | generic | 1 | get | (js-handled) |
| /topic/financial-services/overview.jsp | generic | 1 | get | (js-handled) |
| /topic/findcare/allergy-and-respiratory-info.jsp | generic | 1 | get | (js-handled) |
| /topic/findcare/diabetes-info.jsp | generic | 1 | get | (js-handled) |
| /topic/findcare/heart-health-info.jsp | generic | 1 | get | (js-handled) |
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
| /topic/help/shipping/shipping_help_main_espanol.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shipping/shipping_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/account_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/bulk_gift_cards_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/Bulk_Gift_Cards_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/checkout_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/coupons_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/paymentmethods_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/promotions_help.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/returns_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/shipping_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/shophelp/shop_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/storeshelp/stores_help_main.jsp | generic | 1 | get | (js-handled) |
| /topic/help/virtualhealthcare.jsp | generic | 1 | get | (js-handled) |
| /topic/information/access-to-services.jsp | generic | 1 | get | (js-handled) |
| /topic/information/california_transparency_act.jsp | generic | 1 | get | (js-handled) |
| /topic/information/recall.jsp | generic | 1 | get | (js-handled) |
| /topic/inkrefill/storelocator/storelocator/find.jsp?tab=store locator&requestType=locator | generic | 1 | get | (js-handled) |
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
| /topic/mywalgreenshealthaccess.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy.jsp | contact/lead | 9 | get | (js-handled) |
| /topic/pharmacy/compounding.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/financial-assistance.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/glp-1-bridge-program.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/hiv-pharmacy-services.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/hiv-pharmacy-services/prevention-and-testing.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/immunization-services-appointments | generic | 1 | get | (js-handled) |
| /topic/pharmacy/immunization-services-appointments.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/immunization-services/travel-health.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/medicare-resources/cybersecurity-tips.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/nebulizer-services.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/pharmacy_acquisition.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/pharmacy_regulation_websites.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/prescription-delivery.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/rx-savings-finder.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/chickenpox-vaccine_40.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/chikungunya-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/hepatitis-a-vaccine_33.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/hepatitis-ab-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/hepatitis-b-vaccine_34.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/scheduler/human-papillomavirus-hpv-vaccine_36.jsp | generic | 1 | get | (js-handled) |
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
| /topic/pharmacy/specialty-pharmacy/cancer-medication-support/medication-side-effects.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/fertility-order-review.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/fertility-preservation.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/fertility-services.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/mash.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/oncology-caregiver.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/side-effect-help/feel-more-like-you.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/specialty-pharmacy/srx-financial-assistance.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/text-alerts.jsp | generic | 1 | get | (js-handled) |
| /topic/pharmacy/text-opt-in.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/aarpcard.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/api.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/beauty-oncology-podcast.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/covid-vaccine.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/mywalgreens.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/mywalgreens/espanol.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/reloadablecards.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/rx-reward-offerA.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/rx-reward-offerB.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/seniorday.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/ship-to-store.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/shop-essentials.jsp | generic | 1 | get | (js-handled) |
| /topic/promotion/testAndTreat.testingPage.breadCrumb.servicesUrl | generic | 1 | get | (js-handled) |
| /topic/promotion/testAndTreat.testingPage.breadCrumb.walgreensHomePage | generic | 1 | get | (js-handled) |
| /topic/promotion/western-union.jsp | generic | 1 | get | (js-handled) |
| /topic/sr/social_responsibility_home.jsp | generic | 1 | get | (js-handled) |
| /topic/sr/sr_giving_back_contribution.jsp | generic | 1 | get | (js-handled) |
| /topic/store/fsa/shop_fsa.jsp | generic | 1 | get | (js-handled) |
| /topic/store/otc/shop_otc.jsp | generic | 1 | get | (js-handled) |
| /topic/USH/tudiabetes.jsp | generic | 1 | get | (js-handled) |
| /topic/v1/contactus | generic | 1 | get | (js-handled) |
| /topic/v1/privacycomplaint/complaintInfo | generic | 1 | get | (js-handled) |
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
| /topic/virtual-healthcare/skin-health/acne-treatment.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/skin-health/Pseudomembranous colitis. Mayo Clinic. Accessed June 16 | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/skin-health/tretinoin.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss/foundayo.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss/Foundayo.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss/ozempic.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss/wegovy.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/weight-loss/zepbound.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/womens-health.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/womens-health/birth-control.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/womens-health/online-uti-treatment.jsp | generic | 1 | get | (js-handled) |
| /topic/virtual-healthcare/womens-health/yeast-infection-treatment.jsp | generic | 1 | get | (js-handled) |
| /topic/walgreensgiftcards.jsp | generic | 1 | get | (js-handled) |
| /wellness/mental-health/anxiety-and-depression.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/how-to-stop-panic-attacks.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/how-to-support-a-friend-with-a-mental-health-condition.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/physical-side-effects-of-stress.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/seasonal-affective-disorder-is-more-than-just-the-winter-blues.html | generic | 1 | get | (js-handled) |
| /wellness/mental-health/what-is-bulimia.html | generic | 1 | get | (js-handled) |
| /wellness/sleep.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/how-much-sleep-should-i-be-getting.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/insomnia-in-women-what-you-should-know.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/melatonin-from-food.html | generic | 1 | get | (js-handled) |
| /wellness/sleep/narcolepsy-causes-symptoms-and-medications.html | generic | 1 | get | (js-handled) |
| /wrapper/inventory/v2/GetStoreInventory | generic | 1 | get | (js-handled) |
| /youraccount/communication_preferences.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/default.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/dlorder/reorder.jsp | login/auth | 3 | get | (js-handled) |
| /youraccount/personal_information.jsp | login/auth | 3 | get | (js-handled) |

---

## 9. Third-Party Integrations

**Analytics/Tag Mgmt**

| Integration | Pages |
|---|---|
| Adobe Launch/DTM (tag mgmt) | 823 |
| Adobe Analytics (AppMeasurement) | 795 |
| Google Analytics / GA4 | 787 |
| Adobe Helix RUM | 60 |
| Adobe Client Data Layer | 38 |
| Google Tag Manager | 23 |
| Amplitude | 1 |

**Chat/Support**

| Integration | Pages |
|---|---|
| Zendesk / LiveChat / Tidio | 2 |

**Consent/Privacy**

| Integration | Pages |
|---|---|
| OneTrust (consent) | 811 |
| TrustArc (consent) | 788 |

**Fonts**

| Integration | Pages |
|---|---|
| Google Fonts | 800 |

**Forms/CRM**

| Integration | Pages |
|---|---|
| Pardot (form) | 1 |

**Maps/Location**

| Integration | Pages |
|---|---|
| Google Maps | 816 |

**Marketing/Pixel**

| Integration | Pages |
|---|---|
| Facebook Pixel | 9 |
| LinkedIn Insight | 1 |

**Media/Video**

| Integration | Pages |
|---|---|
| Vimeo embed | 82 |
| YouTube embed | 19 |
| Spotify embed | 1 |

**Personalization/AB**

| Integration | Pages |
|---|---|
| Adobe Target (A/B) | 800 |
| Monetate | 799 |

**Reviews/UGC**

| Integration | Pages |
|---|---|
| Bazaarvoice (ratings/reviews) | 2 |

**Security/Bot**

| Integration | Pages |
|---|---|
| reCAPTCHA / hCaptcha | 7 |

**Survey/Feedback**

| Integration | Pages |
|---|---|
| Medallia (feedback) | 793 |
| Qualtrics (survey) | 23 |

**⚠︎ Unrecognized third-party hosts (need agent review — could be complex integrations):**

| Host | Pages |
|---|---|
| resources.digital-cloud-west.medallia.com | 793 |
| s2.go-mpulse.net | 756 |
| cdn.branch.io | 709 |
| www.wag-static.com | 200 |
| media-us2.digital.nuance.com | 32 |
| login-ds.dotomi.com | 31 |
| se.monetate.net | 29 |
| d.criteo.com | 26 |
| dynamic.criteo.com | 26 |
| sslwidget.criteo.com | 26 |
| js.adsrvr.org | 22 |
| www.mczbf.com | 21 |
| googleads.g.doubleclick.net | 21 |
| mihvea1f.micpn.com | 20 |
| dok.js-cdn.dynatrace.com | 15 |
| track.coherentpath.com | 13 |
| bat.bing.com | 13 |
| securepubads.g.doubleclick.net | 7 |
| unpkg.com | 3 |
| www.cdn-net.com | 2 |
| six.cdn-net.com | 2 |
| prod.accdab.net | 2 |
| apps.bazaarvoice.com | 2 |
| www.youtube.com | 1 |
| wag-dwa-api-prod.przone.net | 1 |
| s.pinimg.com | 1 |
| connect.facebook.net | 1 |
| content.syndigo.com | 1 |

---

## 10. Block Complexity

| Block | Complexity | Reason |
|---|---|---|
| **Account / Authentication** | High | Sign in / register / password reset / order lookup and account menus. Auth-gated flows with validation and session; typically integrated with an identity service. |
| **Cart** | High | Cart view/mini-cart: line items, quantities, fulfillment, price summary, promo code, checkout entry. Commerce, stateful, tied to session + catalog/pricing APIs. |
| **Global Header / Nav** | High | Global commerce header present on every page: logo, mega-menu category navigation, store/pickup selector, account menu, cart icon with live count, search, language switcher, rewards prompts. Stateful and shared sitewide. |
| **Store Locator** | High | Location-aware store finder: geolocation/entered location, results list with per-store cards (address, hours, services, distance), map view, browse-by-state, and multi-facet filters. Client-rendered against a store API — in EDS this is a JS-driven block calling a location service. |
| **Product Filters / Facets** | High | Faceted refinement rail for PLP: brand, price min/max apply, color/undertone (beauty), fulfillment. Client-side state synced to the results grid and often the URL. |
| **Product Detail (PDP)** | High | Product page: gallery, title/brand, price, variant selection (size/color/undertone), fulfillment (pickup/ship/same-day), add-to-cart, reviews, FSA eligibility. Commerce — Adobe Commerce PDP block in EDS. |
| **Product Listing (PLP)** | High | Search/browse results grid of product cards with sort, faceted filters, item count, pagination / load-more. Commerce — product data from a catalog API. In EDS this is an Adobe Commerce PLP block. |
| **Fulfillment & Add-to-Cart** | High | PDP fulfillment selector + add-to-cart: pickup / same-day-delivery / shipping radio options with per-option stock, ready-time and store availability, quantity dropdown, 'add for pickup' / 'add to cart', and check-other-stores. Session + inventory/pricing APIs. |
| **Store Detail** | High | Individual store page: address, per-service hours & open/closed status (store, pharmacy, photo, lab), preferred-store save, and service entry points (schedule vaccine — COVID/flu/pneumonia, photo products & projects, FedEx returns, same-day pickup, propane/Blue Rhino, beauty consultation). Location-data driven with several 'see all' overlays. |
| **Video / Media Embed** | High | Multiple providers (Scene7/Dynamic Media, YouTube, Vimeo, Spotify) with poster/lazy-load; may include transcript pairing and commerce links. |
| **Editor's Pick / Featured Teaser** | Medium | Teaser promoting a single curated item: media + eyebrow + title + byline. |
| **Accordion** | Medium | Expand/collapse panels (single or multi-open); requires toggle JS + accessible disclosure semantics. |
| **Recommendations / Merchandising Carousels** | Medium | Merchandising rails rendered from recommendation experience-fragments/APIs: sales offers, coupons, top sellers, highest rated, newest arrivals, recently-viewed (RVI), more-to-explore, all-categories & top-brands sections. Horizontal carousels of product/offer cards. |

---

*Generated by tools/site-analysis. Data: data/*.json. Dashboard: dashboard.html. Detailed: reports/index.html.*
