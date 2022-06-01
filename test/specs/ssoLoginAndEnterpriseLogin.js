
const LoginPage = require('../pageobjects/login.page');
const accessAccount = require('../pageobjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
const testData = require('../testdata/config.json')
const wait = require('../utility/timeout');


describe('136_Verify SSO relogin and login to the Enterprise Wallet', () => {
    it('Browser - should verify SSO relogin and login to the Enterprise Wallet', async () => {

        allureReporter.addStep('1. Provide valid credentails in SSO login screens.')
        allureReporter.addStep('2. Open the ePI  URL  and navigate to the Enterprise Wallet')
        allureReporter.addStep('3. Login to the Enterprise Wallet successfully ')

        allureReporter.addTestId('SSOTests_5')
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

        await LoginPage.open();
        await wait.setTimeoutwait(4);

        await LoginPage.openEnterpriseWallet();
        await wait.setTimeoutwait(3);

        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);

        await accessAccount.clickAccessAccount();
        await wait.setTimeoutwait(4);
        await accessAccount.clearUserName();
        await wait.setTimeoutwait(2);
        await accessAccount.enterUserName(testData.login.userName);
        await wait.setTimeoutwait(2);
        await accessAccount.Enterbutton();
        await wait.setTimeoutwait(15);

        //  allureReporter.endStep("passed");
        //  allureReporter.endStep("passed");
        //  allureReporter.endStep("passed");


    });

})