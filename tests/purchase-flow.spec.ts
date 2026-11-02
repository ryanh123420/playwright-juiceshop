import { test, expect } from '../fixtures/fixtures';

test('user can buy a product from login to order completion', async ({ 
    page, 
    loginPage, 
    homePage, 
    basketPage, 
    addressSelectPage, 
    deliveryPage, 
    paymentPage, 
    orderSummaryPage,
    user, 
    address, 
    creditCard,
}) => {
  await test.step('log in', async () => {
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    
    await expect(page).toHaveURL('#/search');
  });

  await test.step('add item to basket', async () => {
    await expect(homePage.navBar.basketCount).toHaveText('0');
    await expect(homePage.products).not.toHaveCount(0);
    await homePage.addToBasket("Apple Juice (1000ml)");
    await expect(homePage.navBar.basketCount).toHaveText('1');
    await homePage.navBar.basketButton.click();
    await expect(page).toHaveURL('#/basket');
  });

  await test.step('checkout basket', async () => {
    await basketPage.checkoutButton.click();
    await expect(page).toHaveURL('#/address/select');
  });

  await test.step('choose address', async () => {
    const row = addressSelectPage.addressSelect(address.fullName);
    await row.selectButton.check();
    await expect(row.selectButton).toBeChecked();

    await expect(addressSelectPage.continueButton).toBeEnabled();
    await addressSelectPage.continueButton.click();
    await expect(page).toHaveURL('#/delivery-method');
  });

  await test.step('choose delivery method', async () => {
    await deliveryPage.oneDayDeliveryButton.click();
    await expect(deliveryPage.continueButton).toBeEnabled();

    await deliveryPage.continueButton.click();
    await expect(page).toHaveURL('#/payment/shop');
  });

await test.step('choose payment method', async () => {
    const row = paymentPage.cardSelect(creditCard.fullName);
    await row.selectButton.check();
    await expect(row.selectButton).toBeChecked();

    await expect(paymentPage.continueButton).toBeEnabled();
    await paymentPage.continueButton.click();
    await expect(page).toHaveURL('#/order-summary');
  });

  await test.step('place order and land on completion page', async () => {
    const checkoutResponse = page.waitForResponse(
        (res) => res.url().includes('/checkout') && res.request().method() === 'POST'
    );
    await orderSummaryPage.placeOrderButton.click();
    const { orderConfirmation } = await (await checkoutResponse).json();

    await expect(page).toHaveURL(`/#/order-completion/${orderConfirmation}`);
  });
});