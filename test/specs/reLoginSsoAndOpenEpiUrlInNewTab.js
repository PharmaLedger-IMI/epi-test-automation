
const LoginPage = require('../pageobjects/login.page');
const allureReporter = require('@wdio/allure-reporter').default
const testData = require('../testdata/config.json')
const wait = require('../utility/timeout');


describe('134_Verify SSO relogin and open ePI in new tab', () => {
    it('Browser - should verify SSO relogin and open ePI in new tab', async () => {

        allureReporter.addStep('1. Provide valid credentails in SSO login screens.')
        allureReporter.addStep('2. Open ePI url in new tab')
        allureReporter.addTestId('SSOTests_3')
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

        await browser.newWindow('');
        await wait.setTimeoutwait(4);
        await LoginPage.open()
        await wait.setTimeoutwait(4);

        // allureReporter.endStep("passed");
        // allureReporter.endStep("passed");


    });

})