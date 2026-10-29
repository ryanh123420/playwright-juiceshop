import { test, expect } from '../fixtures/fixtures';
import { apiLogin } from '../helpers/auth';
import { createAddress } from '../helpers/addresses';

test.describe('address page tests', () => {
  test('add a new address', async ({ addressSelectPage, addressCreatePage, user, page }) => {
    await addressSelectPage.goto();
    await addressSelectPage.addAddressButton.click();
    await expect(page).toHaveURL('#/address/create');

    const newAddress = {
      country: "US",
      name: "My new address",
      phone: 1112223333,
      zipcode: '12345',
      address: '123 Road',
      city: 'City',
      state: 'State',
    };
    
    await addressCreatePage.createAddress(
      newAddress.country,
      newAddress.name,
      newAddress.phone,
      newAddress.zipcode,
      newAddress.address,
      newAddress.city,
      newAddress.state,
    );

    await expect(page).toHaveURL('#/address/select');
    await expect(addressSelectPage.address).toContainText("My new address");
  });

  test('select an address from single choice', async ({ addressSelectPage, user, address , page }) => {
    await addressSelectPage.goto();
    await expect(addressSelectPage.continueButton).toBeDisabled();

    const row = addressSelectPage.addressSelect(address.fullName);
    await row.selectButton.check();
    await expect(row.selectButton).toBeChecked();

    await expect(addressSelectPage.continueButton).toBeEnabled();
    await addressSelectPage.continueButton.click();
    await expect(page).toHaveURL('#/delivery-method');
  });

  test('select an address from multiple choices', async ({ addressSelectPage, user, request }) => {
    const token = await apiLogin(request, user.email, user.password);
    const firstAddress = await createAddress(request, token, { fullName: 'First Address'});
    const secondAddress = await createAddress(request, token, { fullName: 'Second Address'});

    await addressSelectPage.goto();
    const firstRow = addressSelectPage.addressSelect(firstAddress.fullName);
    const secondRow = addressSelectPage.addressSelect(secondAddress.fullName);

    await secondRow.selectButton.check();
    await expect(secondRow.selectButton).toBeChecked();
    await expect(firstRow.selectButton).not.toBeChecked();
  });
});