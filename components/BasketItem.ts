import { Locator } from "@playwright/test"; 

export class BasketItem {
    readonly root: Locator;
    readonly name: Locator;
    readonly quantity: Locator;
    readonly price: Locator;
    readonly decreaseButton: Locator;
    readonly increaseButton: Locator;
    readonly deleteButton: Locator;


    constructor(row: Locator) {
        this.root = row;
        const cells = row.getByRole('cell');
        const icon = (name: string) => row.page().locator(`[data-icon="${name}"]`);
        
        this.name = cells.nth(1);
        this.quantity = cells.nth(2);
        this.price = cells.nth(3);
        this.decreaseButton = row.getByRole('button').filter({ has: icon('minus-square') });
        this.increaseButton = row.getByRole('button').filter({ has: icon('plus-square') });
        this.deleteButton = row.getByRole('button').filter({ has: icon('trash-alt') });
    }
}