import { Locator, Page } from "@playwright/test";
import { NavBar } from "../components/NavBar";

export class RegisterPage {
    readonly page: Page;
    readonly navBar: NavBar;
    readonly username: Locator;
    readonly password: Locator;
    readonly repeatPassword: Locator;
    readonly securityQuestion: Locator;
    readonly securityAnswer: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBar = new NavBar(page);
        this.username = page.getByLabel('Email');
        this.password = page.getByLabel('Field for the password');
        this.repeatPassword = page.getByLabel('Field to confirm the password');
        this.securityQuestion = page.getByRole('combobox', { name: 'Selection list for the security question' });
        this.securityAnswer = page.getByLabel('Field for the answer to the security question');
        this.registerButton = page.getByRole('button', { name: 'Button to complete the registration'});
    }


    async goto() {
        await this.page.goto('/#/register');
    }

    async selectSecurityOption(question: string) {
        await this.securityQuestion.press('Enter');
        await this.page.getByRole('option', { name: question }).click(); 
    }

    async fillForm(user: string, pass: string, question: string, answer: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.repeatPassword.fill(pass);
        await this.selectSecurityOption(question);
        await this.securityAnswer.fill(answer);
    }

    async submitForm() {
        await this.registerButton.click();
    }
}