
const enterprise = require('../pageobjects/demiurge.page');
const LoginPage = require('../pageobjects/login.page');
const accessAccount= require('../pageobjects/access.Account');
const testData=require('../testdata/config.json')
const wait=require('../utility/timeout');
const allureReporter = require('@wdio/allure-reporter').default


describe('Demiurge - Add Read and write user   for specific company', () => {

it('should open eneterprise wallet ', async() => {
    allureReporter.startStep('Open the ePI  URL')
    allureReporter.startStep('Navigate to the eneterprise Wallet and register the user')
    allureReporter.startStep('Go back and login with dev user and add member in write group')
    allureReporter.startStep('go to enterprise wallet and login with new user')
    allureReporter.addTestId('DemiurgeWallet_2')

    await LoginPage.open();
    await wait.setTimeoutwait(3);
    await browser.maximizeWindow();

    await LoginPage.openEnterpriseWallet();
    await wait.setTimeoutwait(8);
    
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    await wait.setTimeoutwait(4);
       
    await enterprise.newAccount()
    await wait.setTimeoutwait(4);
    await enterprise.clearUserName();
    await wait.setTimeoutwait(2);
    await enterprise.enterUserName(testData.login.enterpriseUser);
    await wait.setTimeoutwait(2);
    await enterprise.register();
    await wait.setTimeoutwait(5);
    //open wallet
    await enterprise.openWallet()
    await wait.setTimeoutwait(4);
    await enterprise.enterButton()
    await wait.setTimeoutwait(15);
    
    //switch to frame
    const frame = await browser.$('iframe[frameborder=\'0\']');
    await browser.switchToFrame(frame); 
    //double click on user identity
    await enterprise.doubleClickUserIdentity()
    await wait.setTimeoutwait(2);
    //copy user identity
    await browser.keys(['\ue009', 'c'])
    await wait.setTimeoutwait(4);
    //go back to authorization page
    await browser.back();
    await wait.setTimeoutwait(5);

    //go to ePI landing page
    await browser.switchToWindow(handles[0]);
    await wait.setTimeoutwait(6);
    
    //open demiurge wallet
    await enterprise.openDemiurgeWallet();
    await wait.setTimeoutwait(6);
    //go to 2nd window
    const tab = await browser.getWindowHandles();
    await browser.switchToWindow(tab[2]);
    await wait.setTimeoutwait(6);
   // click on access account
    await accessAccount.clickAccessAccount();
    await wait.setTimeoutwait(5);
    //clear and enter dev user
    await enterprise.clearUserName();
    await wait.setTimeoutwait(2);
    await enterprise.enterUserName(testData.login.devUser);
    await wait.setTimeoutwait(2);
    await enterprise.enterButton()
    await wait.setTimeoutwait(5);
    //swicth to frame 
    const frameGroup = await browser.$('iframe[frameborder=\'0\']');
    await browser.switchToFrame(frameGroup); 
    //click on groups
    await enterprise.groups()
    await wait.setTimeoutwait(5);
    //click on write group
    await enterprise.writeGroup()
    await wait.setTimeoutwait(2);
    //click and paste the id
    await enterprise.memeberId()
    await wait.setTimeoutwait(2);
    await browser.keys(['\ue009', 'v'])
    await wait.setTimeoutwait(2);
    //add memeber
    await enterprise.addMember()
    await wait.setTimeoutwait(5);

    //go to enterprise wallet
    await browser.switchToWindow(handles[1]);
    await wait.setTimeoutwait(8);
    // click on access account
    await accessAccount.clickAccessAccount();
    await wait.setTimeoutwait(5);
    //clear and enter new user
    await enterprise.clearUserName();
    await wait.setTimeoutwait(2);
    await enterprise.enterUserName(testData.login.enterpriseUser);
    await wait.setTimeoutwait(2);
    await enterprise.enterButton()
    await wait.setTimeoutwait(15);
    allureReporter.endStep("passed");
    allureReporter.endStep("passed");
    allureReporter.endStep("passed");
    allureReporter.endStep("passed");


})

})