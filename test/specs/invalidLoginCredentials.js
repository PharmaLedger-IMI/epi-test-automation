
const LoginPage = require('../pageobjects/login.page');
//const products= require('../pageobjects/products.page');
const accessAccount= require('../pageobjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
const testData=require('../testdata/config.json')
const wait=require('../utility/timeout')

describe('_Access ePI portal', () => {
it('Browser - should open ePI landing page', async () => {

    allureReporter.addFeature('Landing Page');
    allureReporter.addSeverity('Critical');
    allureReporter.startStep('Open the ePI  URL')
    await LoginPage.open();
    await wait.setTimeoutwait(3);
    allureReporter.endStep("passed");
    await browser.maximizeWindow();

});

it('Browser - should open Enterprise Wallet', async() => {
   // allureReporter.addFeature('Enterprise Wallet Login');
    allureReporter.startStep('Navigate to the Enterprise Wallet')
    await LoginPage.openEnterpriseWallet();
    await wait.setTimeoutwait(3);
    allureReporter.endStep("passed");
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    
});
it('Browser - should open Access Account', async() => {
     
     allureReporter.addSeverity('Critical');
     allureReporter.addDescription('Valid Login with UserName and Password')
     allureReporter.startStep("Enter user name and password");
     await accessAccount.clickAccessAccount();
     await wait.setTimeoutwait(4);
     await accessAccount.clearUserName();
     await wait.setTimeoutwait(2);
     await accessAccount.enterUserName(testData.login.invalidUserName);
     await wait.setTimeoutwait(2);
    //  await accessAccount.emailId();
    //  await wait.setTimeoutwait(2);
     await accessAccount.password(testData.login.invalidPassword);
     await wait.setTimeoutwait(2);
     await accessAccount.Enterbutton();
     await wait.setTimeoutwait(15);
     
    //  //home page screenshot
    //  const frame = await browser.$('iframe[frameborder=\'0\']');
    //  await browser.switchToFrame(frame);
     allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

     allureReporter.endStep("passed");
       
});
})