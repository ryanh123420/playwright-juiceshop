import { test, expect } from '../fixtures/fixtures';

test.describe('payment page test', () => {
    test('add a credit card', async ({ paymentPage, page, user }) => {
        await paymentPage.goto();
        await paymentPage.paymentDropdown.click();
        await expect(paymentPage.submitCardButton).toBeDisabled();

        await paymentPage.fillCreditCardInfo('New credit card', 2222444466668888, '1', '2080');
        await expect(paymentPage.submitCardButton).toBeEnabled();
        
        await paymentPage.submitCardButton.click();
        await expect(paymentPage.card).toContainText('New credit card');
    });

    test('continue to summary', async ({ paymentPage, page, user, creditCard}) => {
        await paymentPage.goto();

        const row = paymentPage.cardSelect(creditCard.fullName);
        await row.selectButton.check();
        await expect(row.selectButton).toBeChecked();

        await expect(paymentPage.continueButton).toBeEnabled();
        await paymentPage.continueButton.click();
        await expect(page).toHaveURL('#/order-summary');
    })
});