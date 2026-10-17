import { Page, Locator} from "@playwright/test";

export class NavBar {
    readonly root: Locator;
    readonly homeButton: Locator;
    readonly openSearchButton: Locator;
    readonly closeSearchButton: Locator;
    readonly searchField: Locator;
    readonly accountButton: Locator;
    readonly basketButton: Locator;
    readonly basketCount: Locator;

    constructor(page: Page) {
        this.root = page.locator('mat-toolbar');
        this.homeButton = this.root.getByRole('button', { name: 'Back to homepage'});
        this.openSearchButton = this.root.getByRole('button', { name: 'Open search'});
        this.closeSearchButton = this.root.getByRole('button', { name: 'Close search'});
        this.searchField = this.root.getByRole('textbox');
        this.accountButton = this.root.getByRole('button', { name: 'Show/hide account menu'});
        this.basketButton = this.root.getByRole('button', { name: 'Show the shopping cart' });
        this.basketCount = this.basketButton.locator('.fa-layers-counter');
    }
}