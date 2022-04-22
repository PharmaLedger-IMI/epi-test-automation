
const LoginPage = require('../pageobjects/login.page');
//const products= require('../pageobjects/products.page');
const accessAccount= require('../pageobjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
const testData=require('../testdata/config.json')
const wait=require('../utility/timeout');


describe('129_Verify SSO relogin and Clear Browser cookies and history and open ePI url in browser', () => {
it('Browser - should verify SSO relogin and Clear Browser cookies and history and open ePI url in browser', async () => {

    allureReporter.startStep('1. Provide valid credentails in SSO login screens.')
    allureReporter.startStep('2. Clear Browser cookies and history and open ePI url in browser')
    allureReporter.addTestId('SSOTests_4')
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
    let cookies = await browser.getCookies()
    console.log("before deletion"+cookies)

    await browser.deleteCookies()
    cookies = await browser.getCookies()
    console.log("after deletion"+cookies)

    await LoginPage.open()
    await wait.setTimeoutwait(4);
    allureReporter.endStep("passed");
     allureReporter.endStep("passed");
   
  

});



})