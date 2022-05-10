
const LoginPage = require('../pageobjects/login.page');
//const accessAccount= require('../pageobjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
const testData = require('../testdata/config.json')
const wait = require('../utility/timeout');


describe('128_Verify valid SSO login', () => {
    it('Browser - should verify valid SSO login', async () => {

        allureReporter.startStep('1. Open ePI url in browser')
        allureReporter.startStep('2. ePI home page is shown momentarily and then redirect to SSO login page.')
        allureReporter.startStep('3. Provide valid credentails in SSO login screens.')
        allureReporter.addTestId('SSOTests_2')
        //Open ePI url in browser
        // await LoginPage.open();
        // await wait.setTimeoutwait(4);
        await browser.maximizeWindow();

        await LoginPage.openMicrosoftUrl();
        await wait.setTimeoutwait(3);
        // await browser.maximizeWindow();

        await LoginPage.microsoftEmail(testData.login.ssoValidEmail)
        await wait.setTimeoutwait(3);
        await LoginPage.microsoftNext();
        await wait.setTimeoutwait(3);
        await LoginPage.microsoftPassword(testData.login.ssoValidPassword)
        await wait.setTimeoutwait(4);
        await LoginPage.microsoftNext();
        await wait.setTimeoutwait(3);
        await LoginPage.stayNo();
        await wait.setTimeoutwait(6);
        // allureReporter.endStep("passed");
        // allureReporter.endStep("passed");
        // allureReporter.endStep("passed");


    });



})