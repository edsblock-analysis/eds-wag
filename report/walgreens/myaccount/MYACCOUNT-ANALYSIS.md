# walgreens.com — My Account & Checkout Analysis

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
