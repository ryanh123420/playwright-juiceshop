import { Page, Locator} from "@playwright/test";

export class NavBar {
    readonly root: Locator;
    readonly homeButton: Locator;
    readonly searchButton: Locator;
    readonly accountButton: Locator;
    readonly basketButton: Locator;
    readonly basketCount: Locator;

    constructor(page: Page) {
        this.root = page.locator('mat-toolbar');
        this.homeButton = this.root.getByRole('button', { name: 'Back to homepage'});
        this.searchButton = this.root.getByRole('button', { name: 'Open search'});
        this.accountButton = this.root.getByRole('button', { name: 'Show/hide account menu'});
        this.basketButton = this.root.getByRole('button', { name: 'Show the shopping cart' });
        this.basketCount = this.basketButton.locator('.fa-layers-counter');
    }
}