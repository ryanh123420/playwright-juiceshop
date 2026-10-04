# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Playwright + TypeScript end-to-end test suite for OWASP Juice Shop. There is no application code here; the system under test runs as a Docker container.

This is a learning project. The owner is learning Playwright and TypeScript at the same time, knows basic JavaScript, and is new to TypeScript. When writing or reviewing code:

- Explain TypeScript features that don't exist in plain JS when they come up (types and annotations, `readonly`, `as const`, `import { type ... }`, generics), briefly and in plain terms.
- Explain why a Playwright pattern is used (web-first assertions, auto-waiting, locator choice, fixtures like `page` and `request`), not just what to type.
- Prefer small changes the owner can follow over large rewrites, and point out bugs with an explanation rather than silently fixing them.
- Keep code idiomatic for current Playwright and TypeScript so the owner learns good habits.

## Commands

```bash
# Start Juice Shop (pinned to v20.2.0) on http://localhost:3000
docker compose up -d

# Run all tests (chromium, firefox, webkit)
npx playwright test

# Run one file / one test by title / one browser
npx playwright test tests/login.spec.ts
npx playwright test -g "Test user login"
npx playwright test --project=chromium

# Debug and reports
npx playwright test --ui
npx playwright test --debug
npx playwright show-report
```

There are no npm scripts, no linter, and no separate type-check step; Playwright compiles the TypeScript itself.

Juice Shop must be running before tests start. `playwright.config.ts` has `baseURL: http://localhost:3000` and the `webServer` block is commented out, so Playwright will not start the app. The GitHub Actions workflow (`.github/workflows/playwright.yml`) also does not start the container, so CI runs will fail until a step is added for that.

## Structure

- `pages/` — Page Object classes (`HomePage`, `LoginPage`, `RegisterPage`). Each takes a `Page`, defines `readonly` `Locator` fields in the constructor, and exposes `goto()` plus action methods. Juice Shop is an Angular SPA with hash routing, so routes look like `/#/login`.
- `tests/` — specs that build page objects and hold the assertions.
- `helpers/users.ts` — `createUser(request)` creates a user through `POST /api/Users` with a unique email, so tests that need an account (e.g. login) skip the UI registration flow. Use this for test setup instead of registering through the UI.
- `data/SecurityQuestionOptions.ts` — `SECURITYOPTIONS`, the exact security-question strings shown in the registration dropdown. Option text must match the app exactly, since it is selected by accessible name.

## Conventions and app quirks

- Locators use accessible roles and labels (`getByRole`, `getByLabel`) matched against Juice Shop's `aria-label` text, e.g. `'Text field for the login email'`, `'Button to complete the registration'`.
- A welcome banner covers the page on first visit; dismiss it with the "Close Welcome Banner" button (`RegisterPage.closeBanner()`) before interacting.
- Items can be added to the basket without logging in (the app keeps an anonymous basket); login is only required at checkout.
- Tests run fully in parallel across three browsers against one shared Juice Shop instance, so data a test creates must be unique (see `uniqueEmail()`). `tests/register.spec.ts` currently uses a hard-coded email, which fails once that user exists, until the container is recreated (`docker compose down && docker compose up -d`).
