
const demiurge = require('../pageobjects/demiurge.page');
const LoginPage = require('../pageobjects/login.page');
//const accessAccount= require('../pageobjects/access.Account');
const testData=require('../testdata/config.json')
const wait=require('../utility/timeout');
const allureReporter = require('@wdio/allure-reporter').default


describe('100_Demiurge - Add administrator - for a specific company', () => {
it('Browser - should open ePI landing page', async () => {

    // allureReporter.addFeature('Landing Page');
    allureReporter.addSeverity('Critical');
    allureReporter.startStep('Open the ePI  URL')
    allureReporter.startStep('Navigate to the demiurge Wallet and register the user')
    allureReporter.startStep('Go back and login with dev user and add member in admin group')
    allureReporter.startStep('go to enterprise wallet and login with new user')
    allureReporter.addTestId('DemiurgeWallet_1')
    
    // await browser.switchToWindow(handles[0]);
    // await wait.setTimeoutwait(4);
    // await browser.closeWindow();
    // await wait.setTimeoutwait(5);

    await LoginPage.open();
    await wait.setTimeoutwait(3);
    
     await browser.maximizeWindow();
      
    //open demiurge wallet

    await demiurge.openDemiurgeWallet();
    await wait.setTimeoutwait(3);

    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);

   //const tab = await browser.getWindowHandles();
   // await browser.switchToWindow(tab[2]);
    //click on new account
    await demiurge.newAccount();
    await wait.setTimeoutwait(4);
    //clear username
    await demiurge.clearUserName();
    await wait.setTimeoutwait(3);
    //enter user name
    await demiurge.enterUserName(testData.login.newDemiurgeUser);
    await wait.setTimeoutwait(3);
    //click register
    await demiurge.register();
    await wait.setTimeoutwait(5);
    //open wallet
    await demiurge.openWallet()
    await wait.setTimeoutwait(3);
    //login
    await demiurge.enterButton()
    await wait.setTimeoutwait(10);  
   //switch to frame
    const frame = await browser.$('iframe[frameborder=\'0\']');
    await browser.switchToFrame(frame); 

    let isNewUser = await demiurge.bootingTitle()
    await wait.setTimeoutwait(5);
    if(isNewUser){

    //click on tab
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);

    //create identity
    await browser.keys('Enter')
    await wait.setTimeoutwait(8)
    //copy the admin identity
    // await demiurge.copyAdminIdentity()
    // await wait.setTimeoutwait(4);

    // await browser.keys(['\ue009', 'a'])
    // await wait.setTimeoutwait(3);
    // await browser.keys(['\ue009', 'c'])
    // await wait.setTimeoutwait(3);

    //on popup
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);

    //save identity in popup
    await browser.keys('Enter')
    await wait.setTimeoutwait(8)

    await browser.refresh();
    await wait.setTimeoutwait(4);

    await demiurge.clearUserName();
    await wait.setTimeoutwait(3);
    //enter user name
    await demiurge.enterUserName(testData.login.newDemiurgeUser);
    await wait.setTimeoutwait(3);

    await demiurge.enterButton()
    await wait.setTimeoutwait(15);

}

    //click on my identity tab

    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    //click on my identities
    await browser.keys('Enter')
    await wait.setTimeoutwait(8)


    // await demiurge.myIdentity()
    // await wait.setTimeoutwait(4); 
    //click on current identity and copy
    // await demiurge.clickCurrentIdentity()
    // await wait.setTimeoutwait(5);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue004']);
    await wait.setTimeoutwait(3);
    //copy the user
    await browser.keys(['\ue009', 'a'])
    await wait.setTimeoutwait(5);
    await browser.keys(['\ue009', 'c'])
    await wait.setTimeoutwait(5);
     //go back and login with devuser
    await browser.refresh();
    await wait.setTimeoutwait(3); 
    // await browser.back();
    // await wait.setTimeoutwait(2);
    //login with dev user
    // await accessAccount.clickAccessAccount();
    // await wait.setTimeoutwait(5);
    await demiurge.clearUserName();
    await wait.setTimeoutwait(3);

    await demiurge.enterUserName(testData.login.registeredDemiurgeUser);
    
    await wait.setTimeoutwait(6);
    //  await demiurge.emailId();
    //  await wait.setTimeoutwait(3);
    //  await demiurge.password();
    //  await wait.setTimeoutwait(3);
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
    await wait.setTimeoutwait(3);
    //click on memeber id textbox and paste the id
    await demiurge.memeberId()
    await wait.setTimeoutwait(3);
    await browser.keys(['\ue009', 'v'])
    await wait.setTimeoutwait(4);
    //Add member
    await demiurge.addMember()
    await wait.setTimeoutwait(4);

    //go to demiurge wallet and login with new user
    // await browser.back();
    // await wait.setTimeoutwait(5);
    // await browser.back();
    // await wait.setTimeoutwait(5);
    // await accessAccount.clickAccessAccount();
    // await wait.setTimeoutwait(5);
        // await demiurge.clearUserName();
        // await wait.setTimeoutwait(3);
        // await demiurge.enterUserName(testData.login.demiurgeUser);
        // await wait.setTimeoutwait(3);
    // await demiurge.enterButton()
    // await wait.setTimeoutwait(15);

    // await browser.switchToWindow(handles[0]);

    // await browser.quit()
    //await browser.closeWindow()
     await wait.setTimeoutwait(3);
    allureReporter.endStep("passed");
    allureReporter.endStep("passed");
    allureReporter.endStep("passed");
    allureReporter.endStep("passed");
    
    
});

})