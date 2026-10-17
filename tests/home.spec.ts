import { test, expect } from '../fixtures/fixtures';

test.describe('home tests', () => {

    test('add item to basket', async ({ homePage }) => {
        await homePage.goto();
        await expect(homePage.navBar.basketCount).toHaveText('0');
        await expect(homePage.products).not.toHaveCount(0);
        await homePage.addToBasket("Apple Juice");
        await expect(homePage.navBar.basketCount).toHaveText('1');
    });

    test('open product information', async ({ homePage }) => {
        await homePage.goto();    
        await homePage.openProductInfo("Apple Juice");
        await expect(homePage.productInfo.root).toBeVisible();
        await expect(homePage.productInfo.itemName).toContainText("Apple Juice");
        await expect(homePage.productInfo.itemPrice).toHaveText("1.99¤");
        await homePage.closeProductInfo();
        await expect(homePage.productInfo.root).toBeHidden();
    });

    test('search for product', async ({ homePage }) => {
        await homePage.goto();
        await homePage.searchProduct("Apple");
        await expect(homePage.products.filter({ hasNotText: /apple/i })).toHaveCount(0);
        await expect(homePage.products).toHaveCount(3);
    });
});