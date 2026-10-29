import { Page, Locator } from "@playwright/test"; 

export class ProductInfo {
    readonly root: Locator;
    readonly itemName: Locator;
    readonly itemPrice: Locator;
    readonly closeButton: Locator;
    readonly submitButton: Locator;
    
    constructor(page: Page) {
        this.root = page.getByRole('dialog');
        this.itemName = this.root.getByRole('heading', { level: 1});
        this.itemPrice = this.root.locator('.item-price');
        this.closeButton = this.root.getByRole('button', { name: 'Close Dialog' });
        this.submitButton = this.root.getByRole('button', { name: 'Send the review'});
    }

    async close() {
        await this.closeButton.click();
    }
} 