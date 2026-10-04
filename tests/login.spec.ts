import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from "../pages/LoginPage"
import { createUser } from "../helpers/users"

test('Test user login', async ({ page, request }) => {
    const user = await createUser(request);
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    await expect(page).toHaveURL('#/search');
});