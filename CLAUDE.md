# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # run ESLint
```

No test suite is configured yet.

## Stack

- **Next.js 16.2.4** with App Router (`src/app/`) — read `node_modules/next/dist/docs/` before writing any Next.js code; APIs differ from prior versions
- **React 19.2.4** with React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- **TypeScript** (strict via `tsconfig.json`)
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `globals.css` and `@theme inline` blocks; no `tailwind.config.*` file
- **ESLint 9** with flat config (`eslint.config.mjs`) using `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`

## Architecture

All routes live under `src/app/` using the App Router file conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, etc.). The root layout (`src/app/layout.tsx`) sets up Geist fonts as CSS variables and applies them globally. Global styles are in `src/app/globals.css`.

CSS custom properties are defined in `:root` and mapped into Tailwind's theme via `@theme inline`, so Tailwind utilities like `bg-background` and `text-foreground` work without a config file.

Because React Compiler is on, avoid manual `useMemo`/`useCallback` — the compiler handles memoization automatically.
