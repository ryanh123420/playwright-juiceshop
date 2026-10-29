import { Page, Locator } from "@playwright/test";

export class AddressCreatePage {
    readonly page: Page;
    readonly country: Locator;
    readonly name: Locator;
    readonly phone: Locator;
    readonly zipcode: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly backButton: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.country = page.getByLabel('Country');
        this.name = page.getByLabel('Name');
        this.phone = page.getByLabel('Mobile Number');
        this.zipcode = page.getByLabel('ZIP Code');
        this.address = page.getByLabel('Address');
        this.city = page.getByLabel('City');
        this.state = page.getByLabel('State');
        this.backButton = page.getByRole('button', { name: 'Back'});
        this.submitButton = page.getByRole('button', { name: 'Submit'});
    }

    async goto() {
        await this.page.goto('#/address/create');
    }

    async createAddress(
        country: string, 
        name: string,
        phone: number,
        zipcode: string,
        address: string,
        city: string,
        state: string,
    ) {
        await this.country.fill(country);
        await this.name.fill(name);
        await this.phone.fill(phone + "");
        await this.zipcode.fill(zipcode);
        await this.address.fill(address);
        await this.city.fill(city);
        await this.state.fill(state);
        await this.submitButton.click();
    }
}