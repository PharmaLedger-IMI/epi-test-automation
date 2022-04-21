
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
    allureReporter.addTestId('SSO_Tests_1')
   //Open ePI url in browser
    await LoginPage.open();
    await wait.setTimeoutwait(4);
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