
const LoginPage = require('../pageobjects/login.page');
const info=require('../utility/reusableFile')
const accessAccount= require('../pageobjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
const testData=require('../testdata/config.json')
const wait=require('../utility/timeout')

describe('126_Verify invalid login', () => {
it('Browser - should open ePI landing page', async () => {

    allureReporter.addTestId('Login_1')
    allureReporter.startStep('Open the ePI URL')
    await LoginPage.open();
    await wait.setTimeoutwait(3);
    allureReporter.endStep("passed");
    await browser.maximizeWindow();

});

it('Browser - should open Enterprise Wallet', async() => {
   
    allureReporter.startStep('Navigate to the Enterprise Wallet')
    await LoginPage.openEnterpriseWallet();
    await wait.setTimeoutwait(3);
    allureReporter.endStep("passed");
    const handles = await browser.getWindowHandles();

    if( handles.length!=2){
        console.log( "length is "+handles.length)
          if(info.getUser()) { 
        await browser.switchToWindow(handles[4]);
          }
          else{
            await browser.switchToWindow(handles[3]);
          }
 }
 else{
    await browser.switchToWindow(handles[1]);
 }
    
});
it('Browser - should open Access Account', async() => {
     
    
     allureReporter.addDescription('Invalid username and password ')
     allureReporter.startStep("Enter invalid username and password");
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