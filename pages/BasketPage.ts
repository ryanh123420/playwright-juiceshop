import { Page, Locator } from "@playwright/test";
import { NavBar } from "../components/NavBar";

export class BasketPage {
    readonly page: Page;
    readonly navBar: NavBar;
    readonly checkoutButton: Locator;
    readonly totalPrice: Locator;
    //readonly bonusPoints: Locator;
    //readonly basketItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBar = new NavBar(page);
        this.checkoutButton = page.getByLabel('Checkout');
        this.totalPrice = page.getByText('Total Price:');
        //this.bonusPoints = page.getByRole();
        //this.basketItems = page.getByRole();
    }
}