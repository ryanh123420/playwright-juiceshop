import { test, expect } from '../fixtures/fixtures';

test.describe('delivery page tests', () => {
    test('select a delivery option', async ( { deliveryPage, page }) => {
        await deliveryPage.goto();
        await expect(deliveryPage.continueButton).toBeDisabled();

        await deliveryPage.oneDayDeliveryButton.click();
        await expect(deliveryPage.continueButton).toBeEnabled();

        await deliveryPage.threeDayDeliveryButton.click();
        await expect(deliveryPage.oneDayDeliveryButton).not.toBeChecked();

        await deliveryPage.fiveDayDeliveryButton.click();
        await expect(deliveryPage.threeDayDeliveryButton).not.toBeChecked();

        await deliveryPage.continueButton.click();
        await expect(page).toHaveURL('#/payment/shop');
  });

});