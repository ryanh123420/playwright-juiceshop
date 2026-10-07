import { Page, Locator } from "@playwright/test";
import { NavBar } from "../components/NavBar";

export class LoginPage {
    readonly page: Page;
    readonly navBar: NavBar;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBar = new NavBar(page);
        this.username = page.getByLabel('Text field for the login email');
        this.password = page.getByLabel('Text field for the login password');
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true});
    }

    async goto() {
        await this.page.goto('/#/login');
    }

    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);

        await this.loginButton.click();
    }
}