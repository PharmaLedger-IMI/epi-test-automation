
const demiurge = require('../pageobjects/demiurge.page');
const LoginPage = require('../pageobjects/login.page');
const accessAccount= require('../pageobjects/access.Account');
const testData=require('../testdata/config.json')
const wait=require('../utility/timeout');
const allureReporter = require('@wdio/allure-reporter').default

describe('Demiurge - Add administrator - for a specific company', () => {
it('should open ePI landing page', async () => {

    // allureReporter.addFeature('Landing Page');
    allureReporter.addSeverity('Critical');
    allureReporter.startStep('Open the ePI  URL')
    allureReporter.startStep('Navigate to the demiurge Wallet and register the user')
    allureReporter.startStep('Go back and login with dev user and add member in admin group')
    allureReporter.startStep('go to enterprise wallet and login with new user')
    allureReporter.addTestId('DemiurgeWallet_1')
    await LoginPage.open();
    await wait.setTimeoutwait(3);
    
    await browser.maximizeWindow();
      
    //open demiurge wallet
    await demiurge.openDemiurgeWallet();
    await wait.setTimeoutwait(3);
   
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    //click on new account
    await demiurge.newAccount();
    await wait.setTimeoutwait(2);
    //clear username
    await demiurge.clearUserName();
    await wait.setTimeoutwait(2);
    //enter user name
    await demiurge.enterUserName(testData.login.demiurgeUser);
    await wait.setTimeoutwait(2);
    //click register
    await demiurge.register();
    await wait.setTimeoutwait(5);
    //open wallet
    await demiurge.openWallet()
    await wait.setTimeoutwait(2);
    //login
    await demiurge.enterButton()
    await wait.setTimeoutwait(8);  
   //switch to frame
    const frame = await browser.$('iframe[frameborder=\'0\']');
    await browser.switchToFrame(frame); 
    //click on my identity tab
    await demiurge.myIdentity()
    await wait.setTimeoutwait(4); 
    //click on current identity and copy
    await demiurge.clickCurrentIdentity()
    await wait.setTimeoutwait(2);
    await browser.keys(['\ue009', 'a'])
    await wait.setTimeoutwait(2);
    await browser.keys(['\ue009', 'c'])
    await wait.setTimeoutwait(2);
     //go back and login with devuser
    await browser.back();
    await wait.setTimeoutwait(5); 
    await browser.back();
    await wait.setTimeoutwait(5);
    //login with dev user
    await accessAccount.clickAccessAccount();
    await wait.setTimeoutwait(5);
    await demiurge.clearUserName();
    await wait.setTimeoutwait(2);
    await demiurge.enterUserName(testData.login.devUser);
    await wait.setTimeoutwait(2);
    //  await demiurge.emailId();
    //  await wait.setTimeoutwait(2);
    //  await demiurge.password();
    //  await wait.setTimeoutwait(2);
    await demiurge.enterButton()
    await wait.setTimeoutwait(5);
    //swicth to frame 
    const frameGroup = await browser.$('iframe[frameborder=\'0\']');
    await browser.switchToFrame(frameGroup); 
    // go to groups
    await demiurge.groups()
    await wait.setTimeoutwait(5);
    // click on admin group
    await demiurge.adminGroup()
    await wait.setTimeoutwait(2);
    //click on memeber id textbox and paste the id
    await demiurge.memeberId()
    await wait.setTimeoutwait(2);
    await browser.keys(['\ue009', 'v'])
    await wait.setTimeoutwait(4);
    //Add member
    await demiurge.addMember()
    await wait.setTimeoutwait(4);

    //go to demiurge wallet and login with new user
    await browser.back();
    await wait.setTimeoutwait(5);
    await browser.back();
    await wait.setTimeoutwait(5);
    await accessAccount.clickAccessAccount();
    await wait.setTimeoutwait(5);
    // await demiurge.clearUserName();
    // await wait.setTimeoutwait(2);
    // await demiurge.enterUserName(testData.login.demiurgeUser);
    // await wait.setTimeoutwait(2);
    await demiurge.enterButton()
    await wait.setTimeoutwait(15);
    allureReporter.endStep("passed");
    allureReporter.endStep("passed");
    allureReporter.endStep("passed");
    allureReporter.endStep("passed");
       
    
});

})