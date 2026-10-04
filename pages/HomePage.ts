import { Page, Locator} from "@playwright/test";
import { NavBar } from "../components/NavBar";

export class HomePage {
    readonly page: Page;
    readonly navBar: NavBar;
    readonly sideMenuButton: Locator;
    readonly products: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBar = new NavBar(page);
        this.sideMenuButton = page.getByRole('button', { name: 'Open Sidenav'});
        this.products = page.getByRole('article');
    }

    async goto() {
        await this.page.goto('/');
    }

    singleProduct(name: string): Locator {
        return this.products.filter({ hasText: name });
    }

    async addToBasket(name: string) {
        await this.products.filter({ hasText: name})
        .getByRole('button', { name: 'Add to Basket'}).click();
    }
}