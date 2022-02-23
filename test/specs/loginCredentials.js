
const LoginPage = require('../pageobjects/login.page');
//const products= require('../pageobjects/products.page');
const accessAccount= require('../pageobjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
describe('Login page', () => {
it('should open ePI landing page', async () => {

    allureReporter.addFeature('Landing Page');
    allureReporter.addSeverity('Critical');
    await LoginPage.open();
    await browser.pause(4000)
    await browser.maximizeWindow();

});

it('should open Enterprise Wallet', async() => {
    allureReporter.addFeature('Enterprise Wallet Login');
    await LoginPage.openEnterpriseWallet();
    await browser.pause(3000);
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    
    
});
it('should open Access Account', async() => {
    //allureReporter.addFeature('Access Account')
     await accessAccount.clickAccessAccount();
     await browser.pause(4000)
     await accessAccount.userNameClrEnt();
     await browser.pause(2000)
     await accessAccount.userNameClrEnt("kpepiwdio");
     await browser.pause(2000)
     await accessAccount.Enterbutton();
     await browser.pause(8000)
   
    
});
})