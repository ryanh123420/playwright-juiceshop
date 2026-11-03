# playwright-juiceshop

[![Playwright Tests](https://github.com/ryanh123420/playwright-juiceshop/actions/workflows/playwright.yml/badge.svg)](https://github.com/ryanh123420/playwright-juiceshop/actions/workflows/playwright.yml)

End-to-end tests for [OWASP Juice Shop](https://github.com/juice-shop/juice-shop), written with [Playwright](https://playwright.dev) and TypeScript. The tests run in Chromium, Firefox, and WebKit against Juice Shop v20.2.0 in Docker.

I built this project to learn Playwright and TypeScript. It covers the shopping flow from browsing products to placing an order.

## What is tested

| Area | Spec | Covers |
| --- | --- | --- |
| Home | `tests/home.spec.ts` | Add a product to the basket, open product details, search |
| Registration | `tests/register.spec.ts` | Fill in and submit the registration form |
| Login | `tests/login.spec.ts` | Valid login, invalid login error |
| Basket | `tests/basket.spec.ts` | Change quantity and total, remove items, checkout as guest and as a logged-in user |
| Address | `tests/address.spec.ts` | Add an address, select one from one or several |
| Delivery | `tests/delivery.spec.ts` | Pick a delivery speed and continue |
| Payment | `tests/payment.spec.ts` | Add a credit card, select a card and continue |
| Order summary | `tests/ordersummary.spec.ts` | Place an order and reach the confirmation page |
| Full purchase | `tests/purchase-flow.spec.ts` | One test from login to order completion, split into `test.step`s |

## Requirements

- Node.js (LTS)
- Docker with Docker Compose

## Setup

```bash
git clone https://github.com/ryanh123420/playwright-juiceshop.git
cd playwright-juiceshop
npm ci
npx playwright install --with-deps
```

Start Juice Shop on http://localhost:3000. The tests don't start it for you.

```bash
docker compose up -d --wait
```

## Running the tests

```bash
npx playwright test                         # all tests, all three browsers
npx playwright test --project=chromium      # one browser
npx playwright test tests/basket.spec.ts    # one file
npx playwright test -g "add a new address"  # tests whose title matches
npx playwright test --ui                    # interactive UI mode
npx playwright show-report                  # open the last HTML report
```

To create a throwaway account for poking around the app by hand:

```bash
npm run create-user
```

## Project structure

```
pages/        Page objects, one class per screen (LoginPage, BasketPage, PaymentPage, ...)
components/   UI parts used on several pages or repeated in a table (NavBar, BasketItem, Address, CreditCard, ProductInfo)
fixtures/     The extended Playwright `test` with page-object and test-data fixtures
helpers/      API calls that create test data: users, login tokens, addresses, cards
data/         Fixed values the UI expects, such as the security question text
tests/        The specs
scripts/      Standalone scripts (create-user)
```

## How it is built

**Page objects and components.** Each page class holds its locators and actions. Pieces that appear on several pages, like the nav bar, are separate component classes that a page holds as a property (`basketPage.navBar.basketCount`). Table rows such as basket items, addresses, and cards are also components, built from a row locator, so a test can write `basketPage.item('Apple Juice').increaseButton.click()`.

**Fixtures.** Specs import `test` and `expect` from `fixtures/fixtures.ts` instead of `@playwright/test`. The custom `test`:

- sets cookies so the welcome and cookie-consent banners never appear,
- gives each test ready-made page objects (`loginPage`, `basketPage`, ...),
- provides data fixtures that build on each other: `user` creates an account and logs in, `token` gets an API token for that user, and `address` and `creditCard` save an address or card to the account through the API.

A test asks only for what it needs. For example, `async ({ paymentPage, creditCard }) => ...` starts logged in with a saved card.

**API for setup, UI for the thing under test.** Users, addresses, and cards are created with API calls instead of clicking through forms. This keeps tests fast and means a broken registration page fails only the registration test, not every test that needs an account.

**Accessible locators.** Locators use `getByRole` and `getByLabel` with Juice Shop's `aria-label` text, not CSS classes, so they match what a user or screen reader sees.

**Parallel-safe data.** All tests run in parallel across three browsers against one Juice Shop instance, so every test creates its own user with a unique email.

## CI

GitHub Actions (`.github/workflows/playwright.yml`) runs on every push and pull request to `main`. It starts Juice Shop with Docker Compose, waits for the health check, runs the suite, and uploads the HTML report as a build artifact. If the run fails, it also prints the container's health status and logs.

## Juice Shop quirks worth knowing

- The app is an Angular single-page app with hash routes, so URLs look like `/#/login`.
- The security-question dropdown on the registration page ignores input until `/api/SecurityQuestions` has loaded. `RegisterPage.goto()` waits for that response. Without the wait the test only fails under parallel load.
- A guest can add items to the basket; logging in is only required at checkout.
