import { test, expect } from '../fixtures/fixtures';
import { SECURITYOPTIONS } from "../data/SecurityQuestionOptions";
import { uniqueEmail } from '../helpers/users';


test.describe('registration tests', () => {


    test('Register user for juice shop', async({ page, registerPage })=> {
        const email = uniqueEmail();
        const password = 'Password123!';
        const question = SECURITYOPTIONS.favoriteBook;
        const answer = 'Book123';

        await registerPage.goto();

        await expect(registerPage.registerButton).toBeDisabled();

        await registerPage.fillForm(email, password, question, answer);

        await expect(registerPage.username).toHaveValue(email);
        await expect(registerPage.password).toHaveValue(password);
        await expect(registerPage.repeatPassword).toHaveValue(password);
        await expect(page.getByRole('listbox')).toBeHidden();
        await expect(registerPage.securityQuestion).toContainText(question);
        await expect(registerPage.securityAnswer).toHaveValue(answer);
        await expect(registerPage.registerButton).toBeEnabled();

        await registerPage.submitForm();
        await expect(page).toHaveURL('#/login');
    });
});