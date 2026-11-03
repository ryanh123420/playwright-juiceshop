import { Page, Locator } from "@playwright/test";

export class OrderSummaryPage {
    readonly page: Page;
    readonly basketItems: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // The page also has a price summary table, so only look inside the basket component
        this.basketItems = page.locator('app-purchase-basket').getByRole('row').filter({ has: page.getByRole('cell') });
        this.placeOrderButton = page.getByRole('button', { name: 'Complete your purchase'});
    }

    async goto() {
        await this.page.goto('#/order-summary');
    }

}