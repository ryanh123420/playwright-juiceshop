import { test, expect } from '../fixtures/fixtures';
import { createUser } from "../helpers/users"

test.describe('login tests', () => {

    test('Test user login', async ({ loginPage, page, request }) => {
        const user = await createUser(request);

        await loginPage.goto();
        await loginPage.login(user.email, user.password);

        await expect(page).toHaveURL('#/search');
    });

    test('Invalid user login', async({ loginPage, page }) => {
        const username = 'invalid@notarealemail.com'
        const password = 'notAPassword'

        await loginPage.goto();
        await loginPage.login(username, password);

        await expect(loginPage.invalidLogin).toBeVisible();
        await expect(page).toHaveURL('#/login');
    });
});