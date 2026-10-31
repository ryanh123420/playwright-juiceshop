import { Page, Locator } from "@playwright/test";
import { CreditCard } from "../components/CreditCard"; 

export class PaymentPage {
    readonly page: Page;
    readonly card: Locator;
    readonly paymentDropdown: Locator;

    readonly nameField: Locator;
    readonly cardNumberField: Locator;
    readonly expiryMonthField: Locator;
    readonly expiryYearField: Locator;
    readonly submitCardButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.card = page.getByRole('row').filter({ has: page.getByRole('cell') });
        this.paymentDropdown = page.getByRole('button', { name: 'Add new card Add a credit or debit card'});

        this.nameField = page.getByLabel('Name');
        this.cardNumberField = page.getByLabel('Card Number');
        this.expiryMonthField = page.getByLabel('Expiry Month');
        this.expiryYearField = page.getByLabel('Expiry Year');
        this.submitCardButton = page.getByRole('button', { name: 'Submit'});

        this.continueButton = page.getByRole('button', { name: 'Proceed to review' });
        
    }

    async goto() {
        await this.page.goto('#/payment/shop');
    }

    async selectExpiry(month: string, year: string) {
        await this.expiryMonthField.selectOption(month);
        await this.expiryYearField.selectOption(year);
    }

    async fillCreditCardInfo(
        name: string, 
        cardNumber: number, 
        expiryMonth: string, 
        expiryYear: string
    ) {
        await this.nameField.fill(name);
        await this.cardNumberField.fill(cardNumber + '');
        await this.selectExpiry(expiryMonth, expiryYear);
    }

    cardSelect(name: string): CreditCard {
        return new CreditCard(this.card.filter({ hasText: name }));
    }
}