import assert = require('assert');

describe('Registration', () => {
    it('should not register new user due to reCapcha verification fails', async () => {
        browser.url('/account/create')
        const registrationForm = await $('form[name=customer_form]')


        const username = await registrationForm.$('input[name="username"]')
        await username.setValue('eliz')
        const emailAdress = await registrationForm.$('input[name="email"]')
        //generate unique email
        const uniqueEmail = await `email${new Date().getTime() / 1000}@test.com`
        await emailAdress.setValue(uniqueEmail)
        const password = await registrationForm.$('input[name="password"]')
        await password.setValue('Password123')
        const confirmedPassword = await registrationForm.$('input[name="confirmed_password"]')
        await confirmedPassword.setValue('Password123')
        const privacyPolicySelect = await registrationForm.$('input[name="privacy_policy"]')
        await privacyPolicySelect.click()
        const checkboxState = await registrationForm.$('input[name="privacy_policy"]')
        console.log(`checkboxState: $(checkboxState)`)
        const iframeReCapcha = $('iframe[title="reCAPTCHA"]');
        await iframeReCapcha.click({ x: 30, y: 30 });
        const createAcctBtn = await registrationForm.$('button[name="create_account"]')
        await createAcctBtn.click()
        const alert = $('#notices .alert-danger')
        const alertText = await alert.getText()
        const expectedText = 'reCAPTCHA failed verifying a human, try again'
        assert(alertText.includes(expectedText), 
            `Alert text "${alertText}" must includes "${expectedText}"`)

    });
});