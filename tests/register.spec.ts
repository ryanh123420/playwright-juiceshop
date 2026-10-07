import { test, expect } from '../fixtures/fixtures';
import { SECURITYOPTIONS } from "../data/SecurityQuestionOptions";


test.describe('registration tests', () => {


    test('Register user for juice shop', async({ page, registerPage })=> {
        await registerPage.goto();
        
        await expect(registerPage.registerButton).toBeDisabled();

        await registerPage.fillForm("ryan@ryanh.com", "RyanPassword123!", SECURITYOPTIONS.favoriteBook, "Book123");

        await expect(registerPage.username).toHaveValue("ryan@ryanh.com");
        await expect(registerPage.password).toHaveValue("RyanPassword123!");
        await expect(registerPage.repeatPassword).toHaveValue("RyanPassword123!");
        await expect(page.getByRole('listbox')).toBeHidden();
        await expect(registerPage.securityQuestion).toContainText(SECURITYOPTIONS.favoriteBook);
        await expect(registerPage.securityAnswer).toHaveValue("Book123");
        await expect(registerPage.registerButton).toBeEnabled();

        await registerPage.submitForm();
        await expect(page).toHaveURL('#/login');
    });
});