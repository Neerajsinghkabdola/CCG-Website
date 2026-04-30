# CCG Website

A Next.js website built with React, TypeScript, Tailwind CSS v4, and Framer Motion.

## Setup

```bash
npm install
npm run dev
```

## Build & Deploy (Vercel)

```bash
npm run build
```

## ⚠️ Important: Animation Frames

The scroll animation in `ScrollSequence.tsx` requires **240 image frames** placed at:

```
public/images/ezgif-frame-001.jpg
public/images/ezgif-frame-002.jpg
...
public/images/ezgif-frame-240.jpg
```

These are not included in the repo. Export your animation frames and place them in `public/images/` before deploying.

## Fixes Applied

- Upgraded `next` from non-existent `16.1.6` → `15.3.1`
- Upgraded `eslint-config-next` to match
- Downgraded `framer-motion` to stable `^11.0.0`
- Fixed React Rules of Hooks violation in `ScrollSequence.tsx` (hooks were called inside `.map()` callback)
- Added `next.config.ts`
- Moved static assets to `public/` folder (Next.js requirement)
- Removed stale static HTML files from root
