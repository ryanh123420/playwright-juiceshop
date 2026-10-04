import { test, expect } from '../fixtures/fixtures';
import { HomePage } from '../pages/HomePage.ts';

/**
 * Tests to add:
 * 
 */


test('add item to basket', async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.goto();
    await expect(homepage.navBar.basketCount).toHaveText('0');
    await expect(page.locator('mat-card')).not.toHaveCount(0);
    await homepage.addToBasket("Apple Juice");
    await expect(homepage.navBar.basketCount).toHaveText('1');
});