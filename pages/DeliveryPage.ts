import { Page, Locator } from "@playwright/test";

export class DeliveryPage {
    readonly page: Page;
    readonly backButton: Locator;
    readonly continueButton: Locator;
    readonly oneDayDeliveryButton: Locator;
    readonly threeDayDeliveryButton: Locator;
    readonly fiveDayDeliveryButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backButton = page.getByRole('button', { name: 'Back'});
        this.continueButton = page.getByRole('button', { name: 'Proceed to delivery method selection'});
        
        this.oneDayDeliveryButton = page.getByRole('row', { name: 'One Day Delivery' }).getByRole('radio');
        this.threeDayDeliveryButton = page.getByRole('row', { name: 'Fast Delivery' }).getByRole('radio');
        this.fiveDayDeliveryButton = page.getByRole('row', { name: 'Standard Delivery' }).getByRole('radio');
    }

    async goto() {
        await this.page.goto('/#/delivery-method');
    }
}