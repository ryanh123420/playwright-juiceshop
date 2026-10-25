import { Page, Locator } from "@playwright/test";
import { NavBar } from "../components/NavBar";
import { BasketItem } from "../components/BasketItem";

export class BasketPage {
    readonly page: Page;
    readonly navBar: NavBar;
    readonly basketItems: Locator;
    readonly checkoutButton: Locator;
    readonly totalPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBar = new NavBar(page);
        this.basketItems = page.getByRole('row').filter({ has: page.getByRole('cell') });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout'});
        this.totalPrice = page.getByText('Total Price:');
    }

    async goto() {
        await this.page.goto('#/basket');
    }

    item(productName: string): BasketItem {
        return new BasketItem(this.basketItems.filter({ hasText: productName }));
    }
}