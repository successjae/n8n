# AMXXR — Official Artist Website

The official digital hub for **AMXXR** (aka **Peace Beloved**) — Mount Vernon, NY MC and the
first artist signed to Pete Rock's **Tru Soul Records**.

This is a complete, zero-build static web app: open `index.html` in a browser (or serve the
folder with any static host) and everything works — storefront, fan capture, video library,
and the team dashboard.

```bash
# run locally
cd amxxr-website
python3 -m http.server 8080
# → http://localhost:8080
```

## What's inside

| Area | File(s) | Notes |
|---|---|---|
| Homepage | `index.html` | Cinematic hero, featured video/music/merch, announcements, partners, signup |
| Music hub | `music.html` | Live Spotify artist embed, discography (real Bandcamp/streaming links), email-gated exclusive drop |
| Video library | `videos.html` | Real YouTube content (official videos, interviews, BTS) with category filters + featured carousel |
| Store | `merch.html` | Catalog, cart drawer, promo codes, limited-drop countdown, bundles, checkout |
| Fan club | `fanclub.html` | Free tier + $7/mo VIP tier, full signup (email/SMS/city/social) |
| Shows | `events.html` | Upcoming/past dates, RSVP capture, city-demand signups |
| About | `about.html` | Bio, Pete Rock co-sign, brand identity, career timeline |
| Press kit | `press.html` | One-sheet, downloadable media kit, interview links, industry contacts |
| Partners | `sponsors.html` | Current partners (Tru Soul, Threesixty Ent.), packages, inquiry form |
| Contact | `contact.html` | Booking / sponsorship / media / general forms with budget ranges |
| **Team dashboard** | `admin/index.html` | Login: `team / beloved` (demo). Overview, fan CRM, orders, downloads, VIP, sponsors, content CMS, events, campaigns, analytics, settings |

### Design system
Custom, not template-based: warm near-black base, soul-gold + signal-crimson accents,
Anton display type over Space Grotesk, film-grain overlay, drifting abstract rings,
scroll-reveal animations, marquee strip, generated abstract cover art (no stock photos).
All tokens live at the top of `assets/css/style.css`. Fully responsive, mobile-first.

### Fan CRM (the backend)
Every form on the public site (signups, downloads, RSVPs, checkout, inquiry forms) writes a
fan record through `AMXXR_CRM` in `assets/js/main.js`. The dashboard reads the same store and
gives you:

- Search + filter across name/email/city/tags/source
- One-click segments: VIP, Merch Buyers, Local Fans (NY), High Engagement, SMS List,
  Downloaders, Sponsors, Media Contacts, Booking Leads, Street Team, RSVPs
- Per-fan detail: purchase history, download history, tags, notes, VIP toggle
- CSV export (per segment) and full JSON backup
- Role-based views (Admin / Manager / Content editor)
- Campaign composer (email/SMS to any segment) and analytics (funnel, best sellers,
  fan locations, signup sources, conversion rate)

### Content management
`assets/js/data.js` is the single source of truth for releases, videos, products, events,
sponsors and announcements. The dashboard's **Content Library** panel edits any collection as
JSON and persists overrides (localStorage) that the public pages pick up instantly — no
rebuilds.

## Demo mode vs. production

Everything runs client-side so the whole product is demoable offline. Three things are
intentionally demo-grade and must be swapped before real launch:

1. **Auth** — the admin login is a front-end gate, not security. Put `/admin` behind
   Supabase Auth, Clerk or Auth0 (or basic-auth at the host level as a stopgap).
2. **Database** — fan/order data lives in `localStorage`. All access goes through two small
   adapters (`AMXXR_CRM` in `main.js`, `DB` in `admin.js`); reimplement those ~6 functions
   against Supabase/Postgres/Airtable and nothing else changes.
3. **Payments** — checkout records the order and clears the cart without charging. The cart
   payload is already shaped like Stripe `line_items`; point the checkout button at a Stripe
   Checkout Session (or replace the store with Shopify Buy Buttons).

### Recommended integration map

| Need | Service | Where to wire it |
|---|---|---|
| Merch payments + VIP billing | Stripe Checkout / Shopify | `assets/js/store.js` → `checkoutBtn` handler |
| Email marketing | Mailchimp / Klaviyo / Brevo | `AMXXR_CRM.addFan()` → also POST to list API |
| SMS | Twilio / Attentive | same hook, when `phone` present |
| Fan database | Supabase (free tier is plenty) | `AMXXR_CRM` + admin `DB` adapters |
| Analytics | GA4 + Meta Pixel + TikTok Pixel | paste snippets into each page `<head>` |
| Hosting | Netlify / Vercel / Cloudflare Pages | drop the folder in; add `/admin` protection |

### SEO
Unique titles/descriptions per page, OpenGraph tags, `MusicGroup` JSON-LD schema on the
homepage, `robots.txt` (admin disallowed) and `sitemap.xml`. Update the `amxxr.com` URLs if
the final domain differs.

## Real public content used
- Spotify: https://open.spotify.com/artist/1agA5fqFnuIeibCsM2t4iR
- Apple Music: https://music.apple.com/us/artist/amxxr/1256007782
- Bandcamp: https://amxxr.bandcamp.com/
- SoundCloud: https://soundcloud.com/peaceblvd
- Instagram: https://www.instagram.com/a.m.x.x.r/
- YouTube: official videos (IT'S OK, FRIED HARD, BULLRAP, I SWEAR, SUPER STAR), the
  21 Grams full-album stream, the Peace Beloved pieces and two long-form interviews
- Management/booking reference: https://www.threesixty-entertainment.com/artist/amxxr

Contact emails (`booking@amxxr.com` etc.), event dates, merch products, pricing and the
placeholder stats on the sponsors page are **scaffolding for the team to replace with real
values** — everything is editable in `data.js` or the Content Library panel.
