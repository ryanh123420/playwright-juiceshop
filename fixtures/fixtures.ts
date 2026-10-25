import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { BasketPage } from "../pages/BasketPage";
import { createUser } from "../helpers/users";

type MyFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  homePage: HomePage;
  basketPage: BasketPage;
  user: { email: string, password: string};
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

  user: async ({ request, loginPage, page }, use) => {
    const user = await createUser(request);
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await expect(page).toHaveURL(/#\/search/);
    await use(user);
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
