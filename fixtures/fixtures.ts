import { test as base } from '@playwright/test';

export const test = base.extend({
  // Override the built-in `context` fixture: take the normal one,
  // add the cookies, then hand it on to the test.
  context: async ({ context }, use) => {
    await context.addCookies([
      { name: 'welcomebanner_status', value: 'dismiss', domain: 'localhost', path: '/' },
      { name: 'cookieconsent_status', value: 'dismiss', domain: 'localhost', path: '/' },
    ]);
    await use(context);
  },
});

export { expect } from '@playwright/test';