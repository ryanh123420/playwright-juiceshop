import { test, expect } from '../fixtures/fixtures';
import { PRODUCTS } from '../helpers/basket';

test.describe('order summary page test', () => {
    test('confirm order', async ({ orderSummaryPage, page, request, token, basket, address, creditCard }) => {
        // The earlier checkout pages save these choices in sessionStorage, and the order
        // summary page reads them when placing the order. We skip those pages, so set them here.
        // page.evaluate runs the function inside the browser. The `user` fixture already left
        // us on the app, and goto() below only changes the #/ route, so the page doesn't reload
        // and these values stay in place.
        await page.evaluate(({ addressId, paymentId }) => {
            sessionStorage.setItem('addressId', String(addressId));
            sessionStorage.setItem('paymentId', String(paymentId));
            sessionStorage.setItem('deliveryMethodId', '1'); // One Day Delivery
        }, { addressId: address.id, paymentId: creditCard.id });

        await orderSummaryPage.goto();
        await expect(orderSummaryPage.basketItems).toHaveCount(1);
        await expect(orderSummaryPage.basketItems).toContainText(PRODUCTS.appleJuice.name);

        const checkoutResponse = page.waitForResponse(
            (res) => res.url().includes('/checkout') && res.request().method() === 'POST'
        );
        await orderSummaryPage.placeOrderButton.click();
        const { orderConfirmation } = await (await checkoutResponse).json();

        await expect(page).toHaveURL(`/#/order-completion/${orderConfirmation}`);

        // Check the saved order through the API, so we know it used our address, card and basket
        const historyResponse = await request.get('/rest/order-history', {
            headers: { Authorization: `Bearer ${token}` },
        });
        expect(historyResponse.ok()).toBeTruthy();
        const { data: orders } = await historyResponse.json();

        expect(orders).toHaveLength(1);
        expect(orders[0]).toMatchObject({
            orderId: orderConfirmation,
            addressId: String(address.id),
            paymentId: String(creditCard.id),
            products: [{ id: basket.ProductId, quantity: basket.quantity }],
        });
    });
});
