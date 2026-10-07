import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { BasketPage } from "../pages/BasketPage";

type MyFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  homePage: HomePage;
  basketPage: BasketPage;
};

export const test = base.extend<MyFixtures>({
  // Override the built-in `context` fixture: take the normal one,
  // add the cookies, then hand it on to the test.
  context: async ({ context }, use) => {
    await context.addCookies([
      {
        name: "welcomebanner_status",
        value: "dismiss",
        domain: "localhost",
        path: "/",
      },
      {
        name: "cookieconsent_status",
        value: "dismiss",
        domain: "localhost",
        path: "/",
      },
    ]);
    await use(context);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  basketPage: async ({ page }, use) => {
    await use(new BasketPage(page));
  },
});

export { expect } from "@playwright/test";
