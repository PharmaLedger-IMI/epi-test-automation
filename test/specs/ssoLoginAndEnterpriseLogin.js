
const LoginPage = require('../pageobjects/login.page');
//const products= require('../pageobjects/products.page');
const accessAccount= require('../pageobjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
const testData=require('../testdata/config.json')
const wait=require('../utility/timeout');


describe('_', () => {
it('Browser - should open microsoft signin page', async () => {

   // allureReporter.addFeature('Landing Page');
   // allureReporter.addSeverity('Critical');
    allureReporter.addTestId('SSO_Tests_5')
   //Open ePI url in browser
    await LoginPage.open();
    await wait.setTimeoutwait(4);
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
    allureReporter.endStep("passed");
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
  

});

})