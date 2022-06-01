
const LoginPage = require('../pageobjects/login.page');
const accessAccount = require('../pageobjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
const testData = require('../testdata/config.json')
const wait = require('../utility/timeout')

describe('131_Verify invalid login', () => {
  it('Browser - should open ePI landing page', async () => {

    allureReporter.addTestId('Login_1')
    allureReporter.addStep('Open the ePI URL')
    allureReporter.addStep('Navigate to the Enterprise Wallet')
    allureReporter.addStep("Enter invalid username and password");
    //open epi url
    await LoginPage.open();
    await wait.setTimeoutwait(3);
    await browser.maximizeWindow();
    const parentWindow = await browser.getWindowHandle()
    console.log("parentWindow " + parentWindow)

    //open enterprise wallet
    await LoginPage.openEnterpriseWallet();
    await wait.setTimeoutwait(3);

    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    await wait.setTimeoutwait(3);
    //click access account
    await accessAccount.clickAccessAccount();
    await wait.setTimeoutwait(4);
    //enter invalid username
    await accessAccount.enterUserName(testData.login.invalidUserName);
    await wait.setTimeoutwait(2);
    //enter invalid password
    await accessAccount.enterPassword(testData.login.invalidPassword);
    await wait.setTimeoutwait(2);
    //click enter button
    await accessAccount.clickEnter();
    await wait.setTimeoutwait(15);
    //close tab
    await browser.closeWindow()
    await wait.setTimeoutwait(4);
    await browser.switchToWindow(parentWindow)
    await wait.setTimeoutwait(4);

    allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

  });
})