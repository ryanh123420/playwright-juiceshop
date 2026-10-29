import { Page, Locator } from "@playwright/test";
import { Address } from "../components/Address";

export class AddressSelectPage {
    readonly page: Page;
    readonly address: Locator;
    readonly addAddressButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.address = page.getByRole('row').filter({ has: page.getByRole('cell') }); 
        this.addAddressButton = page.getByRole('button', { name: 'Add a new address' });
        this.continueButton = page.getByRole('button', { name: 'Proceed to payment selection' });
    }

    async goto() {
        await this.page.goto('#/address/select');
    }

    addressSelect(name: string): Address {
        return new Address(this.address.filter({ hasText: name }));
    }
}