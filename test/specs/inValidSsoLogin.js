
const LoginPage = require('../pageobjects/login.page');
const allureReporter = require('@wdio/allure-reporter').default
const testData = require('../testdata/config.json')
const wait = require('../utility/timeout');


describe('127_Verify invalid SSO login', () => {
    it('Browser - should verify invalid SSO login', async () => {

        allureReporter.addStep('1. Open ePI url in browser')
        allureReporter.addStep('2. ePI home page is shown momentarily and then redirect to SSO login page.')
        allureReporter.addStep('3. Provide Invalid credentails in SSO login screens.')
        allureReporter.addTestId('SSOTests_1')
        //Open ePI url in browser
        // await LoginPage.open();
        // await wait.setTimeoutwait(4);
        await browser.maximizeWindow();

        await LoginPage.openMicrosoftUrl();
        await wait.setTimeoutwait(3);
        // await browser.maximizeWindow();

        await LoginPage.microsoftEmail(testData.login.ssoInvalidEmail)
        await wait.setTimeoutwait(3);
        await LoginPage.microsoftNext();
        await wait.setTimeoutwait(3);
        // await LoginPage.microsoftPassword(testData.login.invalidPassword)
        // await wait.setTimeoutwait(4);
        // await LoginPage.microsoftNext();
        // await wait.setTimeoutwait(3);


    });



})