# Peace Beloved — Shopify Online Store 2.0 Theme

A premium streetwear theme for **Peace Beloved Clothing**.
_"Take the unloved and make it beloved."_

New York-inspired, basketball-adjacent, editorial, spiritually confident — built
entirely on native Shopify functionality (dynamic collections, products, cart,
checkout, variant picker, inventory, and customer forms). No hard-coded products.

## Design language

| Token | Value | Use |
|-------|-------|-----|
| `--pb-blue` | `#0057B8` | Primary royal blue |
| `--pb-orange` | `#F58426` | Accent orange |
| `--pb-cream` | `#F7F2EA` | Soft light sections |
| `--pb-black` | `#101010` | Dark contrast sections |
| `--pb-white` | `#FFFFFF` | Base |
| `--pb-gray` | `#E7E2D9` | Warm neutral |
| `--pb-dark-blue` | `#003B7A` | Deep blue |
| `--pb-soft-orange` | `#FFB36A` | Highlights on dark |

Colors, fonts, layout width, button radius, animation preference, and socials are
all editable in **Theme settings**. Every section is editable in the theme editor.

## Structure

```
peace-beloved-theme/
├── assets/          base.css, animations.css, theme.js
├── config/          settings_schema.json, settings_data.json
├── layout/          theme.liquid
├── sections/        header/footer + homepage/product/collection/content sections
├── snippets/        product-card, price, button, icon-arrow
├── templates/       index, product, collection, page.about/lookbook/contact
└── locales/         en.default.json
```

## Setup after install

1. **Navigation** — create a `main-menu` (Home, Shop, Lookbook, Our Story,
   Contact) and a `footer` menu, then select them in the Header/Footer settings.
2. **Collections** — point the *Featured drop* section at your collection
   (e.g. the NYPB Collection). Nothing is hard-coded.
3. **Pages** — create pages with the `about`, `lookbook`, and `contact`
   templates and assign them.
4. **Images** — add hero, manifesto, lookbook, and Instagram images via the
   theme editor image pickers. Placeholders render until you do.
5. **Product story (optional)** — set product metafields
   `custom.story_heading`, `custom.story_body`, `custom.story_image` to let each
   product tell its own story; otherwise the section defaults are used.
6. **Newsletter** — the footer and email-signup sections use Shopify's native
   customer form and tag subscribers `newsletter` / `beloved-list`.

## Notes

- Mobile-first CSS with breakpoints at 480 / 768 / 990 / 1200px.
- JavaScript is minimal (`theme.js`): mobile nav, sticky-header state, scroll
  reveal, optional quick-add, product gallery, and quantity stepper.
- Respects `prefers-reduced-motion` and the theme-level animation toggle.
- Uses responsive `image_url` filters and lazy loading below the fold.
