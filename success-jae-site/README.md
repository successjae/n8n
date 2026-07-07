# Success Jae — Personal Brand Website

Premium animated personal brand site for **Jared "Success Jae" Vincent** — AI automation
consultant, AI integration specialist, cloud solutions builder, and digital systems strategist.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- Tailwind CSS 3
- Framer Motion (scroll reveals, rotating hero text, tab/marquee transitions)
- Custom `<canvas>` AI-network hero background (glowing nodes, connection lines, grid, pulsing light)

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm typecheck  # TypeScript check
```

## Structure

```
app/
  layout.tsx        # SEO metadata, viewport, global shell
  page.tsx          # Section composition
  globals.css       # Design tokens, glassmorphism/button utilities
components/
  Navbar.tsx        # Sticky glass nav + mobile menu + Book a Call CTA
  Hero.tsx          # Cinematic hero, parallax, floating dashboard cards
  NetworkCanvas.tsx # Animated node-network background (reduced-motion aware)
  RotatingText.tsx  # Rotating keyword animation
  AuthorityStrip.tsx
  AISolutions.tsx   # 6 service cards (includes #cloud-systems anchor)
  AutomationExamples.tsx
  IndustrySystems.tsx  # Tabbed industry examples
  NetworkWall.tsx   # Filterable dual-direction marquee wall
  MyStory.tsx       # Timeline + Black Enterprise press card
  ConnectHub.tsx    # Content grid with embed placeholders
  LeadMagnet.tsx    # AI Automation Checklist + lead capture form
  BookingCTA.tsx    # Final CTA + Calendly placeholder
  Footer.tsx
lib/
  data.ts           # All site copy/content in one editable place
```

## Placeholders to wire up

- **Headshot**: drop an image at `public/images/headshot.jpg` and add it to the hero
  (the current hero uses the typographic layout by design).
- **Network wall logos**: `NetworkTile` in `components/NetworkWall.tsx` renders a monogram
  tile; swap in official logos/images per entry as they become available.
- **Connect Hub embeds**: replace `EmbedPlaceholder` in `components/ConnectHub.tsx` with
  real YouTube iframes, short-form clips, and press links.
- **Booking**: replace the placeholder card in `components/BookingCTA.tsx` with a Calendly
  inline embed.
- **Lead form**: `components/LeadMagnet.tsx` `handleSubmit` — connect to your form
  backend / CRM / email platform.
- **Social links + contact email**: `components/Footer.tsx`.

All copy lives in `lib/data.ts`, so sections can be edited without touching components.
