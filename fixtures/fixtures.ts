import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { BasketPage } from "../pages/BasketPage";
import { createUser } from "../helpers/users";
import { AddressSelectPage } from "../pages/AddressSelectPage";
import { AddressCreatePage } from "../pages/AddressCreatePage";
import { type AddressData, createAddress } from "../helpers/addresses";
import { apiLogin } from "../helpers/auth";

type MyFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  homePage: HomePage;
  basketPage: BasketPage;
  addressSelectPage: AddressSelectPage;
  addressCreatePage: AddressCreatePage;
  user: { email: string, password: string};
  token: string;
  address: AddressData;
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

  token: async ({ request, user }, use) => {
    await use(await apiLogin(request, user.email, user.password));
  },

  address: async ({ request, token }, use) => {
    await use(await createAddress(request, token));
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

  addressSelectPage: async ({ page }, use) => {
    await use(new AddressSelectPage(page));
  },

  addressCreatePage: async ({ page }, use) => {
    await use(new AddressCreatePage(page));
  },
});

export { expect } from "@playwright/test";
