import { Locator } from "@playwright/test";

export class Address {
    readonly root: Locator;
    readonly selectButton: Locator;
    readonly name: Locator;
    readonly address: Locator;
    readonly country: Locator;


    constructor(row: Locator) {
        this.root = row;
        const cells = row.getByRole('cell');

        this.selectButton = row.getByRole('radio');
        this.name = cells.nth(2);
        this.address = cells.nth(3);
        this.country = cells.nth(4);
    }
}