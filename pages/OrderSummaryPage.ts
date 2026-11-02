import { Page, Locator } from "@playwright/test";

export class OrderSummaryPage {
    readonly page: Page;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.placeOrderButton = page.getByRole('button', { name: 'Complete your purchase'});
    }

    async goto() {
        await this.page.goto('#/order-summary');
    }

}