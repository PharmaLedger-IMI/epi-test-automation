
const LoginPage = require('../pageobjects/login.page');
//const products= require('../pageobjects/products.page');
const accessAccount= require('../pageobjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
describe('ePI landing page', () => {
it('should open ePI landing page', async () => {

    allureReporter.addFeature('Landing Page');
    allureReporter.addSeverity('Critical');
    allureReporter.startStep('Open the ePI  URL')
    await LoginPage.open();
    await browser.pause(4000)
    allureReporter.endStep("passed");
    await browser.maximizeWindow();

});

it('should open Enterprise Wallet', async() => {
   // allureReporter.addFeature('Enterprise Wallet Login');
    allureReporter.startStep('Navigate to the Enterprise Wallet')
    await LoginPage.openEnterpriseWallet();
    await browser.pause(3000);
    allureReporter.endStep("passed");
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    
});
it('should open Access Account', async() => {
     
     allureReporter.addSeverity('Critical');
     allureReporter.addDescription('Valid Login with UserName and Password')
     allureReporter.startStep("Enter UserName and Password");
     await accessAccount.clickAccessAccount();
     await browser.pause(4000)
     await accessAccount.userNameClrEnt();
     await browser.pause(2000)
     //await accessAccount.userNameClrEnt(accessAccount.userNameclt())
     await accessAccount.userNameClrEnt("kpepiwdio");
     await browser.pause(2000)
     await accessAccount.Enterbutton();
     await browser.pause(20000)
     
     //home page screenshot
     allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
     const frame = await browser.$('iframe[frameborder=\'0\']');
     await browser.switchToFrame(frame);
     allureReporter.endStep("passed");
       
});
})