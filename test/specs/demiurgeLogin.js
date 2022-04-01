
const demiurge = require('../pageobjects/demiurge.page');
const LoginPage = require('../pageobjects/login.page');
//const products= require('../pageobjects/products.page');
//const accessAccount= require('../pageobjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
const testData=require('../testdata/config.json')
const wait=require('../utility/timeout')
describe('ePI landing page', () => {
it('should open ePI landing page', async () => {

    allureReporter.addFeature('Landing Page');
    allureReporter.addSeverity('Critical');
    allureReporter.startStep('Open the ePI  URL')
    await LoginPage.open();
    await wait.setTimeoutwait(3);
    allureReporter.endStep("passed");
    await browser.maximizeWindow();

});

it('should open demiurge Wallet', async() => {
   // allureReporter.addFeature('Enterprise Wallet Login');
    allureReporter.startStep('Navigate to the Enterprise Wallet')
    await demiurge.openDemiurgeWallet();
    await wait.setTimeoutwait(3);
    allureReporter.endStep("passed");
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    
});
it('should open new Account and register', async() => {
     
     allureReporter.addSeverity('Critical');
     allureReporter.addDescription('Valid Login with UserName and Password')
     allureReporter.startStep("Enter UserName and Password");
     await demiurge.newAccount();
     await browser.pause(4000)
     await demiurge.clearUserName();
     await wait.setTimeoutwait(2);
     await demiurge.enterUserName(testData[0]['login'].newUser);
     await wait.setTimeoutwait(2);
     await demiurge.register();
     await wait.setTimeoutwait(15);
     
     //home page screenshot
     allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
     const frame = await browser.$('iframe[frameborder=\'0\']');
     await browser.switchToFrame(frame);
     allureReporter.endStep("passed");
       
});
})