import { test, expect } from '../fixtures/fixtures';

test.describe('home tests', () => {

    test('add item to basket', async ({ homePage, page }) => {
        await homePage.goto();
        await expect(homePage.navBar.basketCount).toHaveText('0');
        await expect(page.locator('mat-card')).not.toHaveCount(0);
        await homePage.addToBasket("Apple Juice");
        await expect(homePage.navBar.basketCount).toHaveText('1');
    });
});