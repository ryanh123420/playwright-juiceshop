import { Page, Locator} from "@playwright/test";
import { NavBar } from "../components/NavBar";
import { ProductInfo } from "../components/ProductInfo";

export class HomePage {
    readonly page: Page;
    readonly navBar: NavBar;
    readonly productInfo: ProductInfo;
    readonly sideMenuButton: Locator;
    readonly products: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBar = new NavBar(page);
        this.productInfo = new ProductInfo(page);
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
        await this.singleProduct(name)
        .getByRole('button', { name: 'Add to Basket'}).click();
    }

    async openProductInfo(name: string) {
        await this.singleProduct(name).click();
    }

    async closeProductInfo() {
        await this.productInfo.closeButton.click();
    }

    async searchProduct(name: string) {
        await this.navBar.openSearchButton.click();
        await this.navBar.searchField.fill(name);
        await this.navBar.searchField.press('Enter');
    }
}