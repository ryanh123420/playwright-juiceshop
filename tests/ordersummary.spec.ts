import { test, expect } from '../fixtures/fixtures';

test.describe('order sumamry page test', () => {
    test('confirm order', async ({ orderSummaryPage, page, user }) => {
        await orderSummaryPage.goto();
        
        const checkoutResponse = page.waitForResponse(
            (res) => res.url().includes('/checkout') && res.request().method() === 'POST'
        );
        await orderSummaryPage.placeOrderButton.click();
        const { orderConfirmation } = await (await checkoutResponse).json();

        await expect(page).toHaveURL(`/#/order-completion/${orderConfirmation}`);

    });
});