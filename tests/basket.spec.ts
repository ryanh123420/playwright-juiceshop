import { test, expect } from '../fixtures/fixtures';

test.describe('basket page tests', () => { 
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
        await homePage.addToBasket("Apple Juice");
        await expect(homePage.navBar.basketCount).toHaveText('1');
    });
    
    test('change item quantity', async ({ basketPage}) => {
        await basketPage.goto();
        const item = basketPage.item("Apple Juice");
        await expect(item.quantity).toHaveText('1');
        await expect(basketPage.totalPrice).toContainText('1.99¤');
        await item.increaseButton.click();
        await expect(item.quantity).toHaveText('2');
        await expect(basketPage.totalPrice).toContainText('3.98¤');
        await item.increaseButton.click();
        await expect(item.quantity).toHaveText('3');
        await expect(basketPage.totalPrice).toContainText('5.97¤');        
        await item.decreaseButton.click();
        await expect(item.quantity).toHaveText('2');
        await expect(basketPage.totalPrice).toContainText('3.98¤');
        await item.decreaseButton.click();
        await expect(item.quantity).toHaveText('1');
        await expect(basketPage.totalPrice).toContainText('1.99¤');
    });

    test('delete product from basket, basket empty', async ({ basketPage }) => {
        await basketPage.goto();
        await expect(basketPage.navBar.basketCount).toHaveText('1');
        const item = basketPage.item("Apple Juice");
        await expect(item.quantity).toHaveText('1');
        await item.deleteButton.click();
        await expect(basketPage.basketItems).toHaveCount(0);
        await expect(basketPage.navBar.basketCount).toHaveText('0');
    });

    test('delete product from basket, other products remain', async ({ basketPage, homePage }) => {
        await homePage.addToBasket("Banana Juice");
        await expect(homePage.navBar.basketCount).toHaveText('2');

        await basketPage.goto();
        await expect(basketPage.navBar.basketCount).toHaveText('2');
        const item = basketPage.item("Apple Juice");
        await expect(item.quantity).toHaveText('1');
        await item.deleteButton.click();
        await expect(basketPage.basketItems).toHaveCount(1);
        await expect(basketPage.navBar.basketCount).toHaveText('1');
        await expect(item.root).toHaveCount(0);
        await expect(basketPage.item("Banana Juice").root).toBeVisible();
    });

    test('checkout products, anonymous user', async ({ basketPage, page }) => {
        await basketPage.goto();
        await basketPage.checkoutButton.click();
        await expect(page).toHaveURL('#/login?redirectUrl=%2Fbasket');
    });

    test('checkout products, logged in user', async ({ user, basketPage, page }) => {
        await basketPage.goto();
        await basketPage.checkoutButton.click();
        await expect(page).toHaveURL('#/address/select');
    });
});