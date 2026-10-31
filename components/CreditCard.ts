import { Locator } from "@playwright/test";

export class CreditCard {
    readonly root: Locator;
    readonly selectButton: Locator;
    readonly cardNumber: Locator;
    readonly cardName: Locator;
    readonly cardExpiry: Locator;


    constructor(row: Locator) {
        this.root = row;
        const cells = row.getByRole('cell');

        this.selectButton = row.getByRole('radio');
        this.cardNumber = cells.nth(2);
        this.cardName = cells.nth(3);
        this.cardExpiry = cells.nth(4);
    }
}