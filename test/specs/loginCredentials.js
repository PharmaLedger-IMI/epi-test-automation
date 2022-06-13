
const LoginPage = require('../pageobjects/login.page');
const utilityFunction = require('../utility/reusableFunctions')
const accessAccount = require('../pageObjects/access.Account');
const allureReporter = require('@wdio/allure-reporter').default
const testData = require('../testdata/config.json')
const wait = require('../utility/timeout')

describe('002_Access ePI portal', () => {
     it('Browser - should open ePI landing page', async () => {

          allureReporter.addFeature('Landing Page');
          allureReporter.addSeverity('Critical');
          allureReporter.addStep('Open the ePI  URL')
          await LoginPage.open();
          await wait.setTimeoutwait(3);
          await browser.maximizeWindow();

     });
     it('Browser - should open Enterprise Wallet', async () => {

          allureReporter.addStep('Navigate to the Enterprise Wallet')
          //click enterprise wallet
          await LoginPage.openEnterpriseWallet();
          await wait.setTimeoutwait(3);
          const handles = await browser.getWindowHandles();
          await browser.switchToWindow(handles[1]);


     });
     it('Browser - should open Access Account', async () => {

          allureReporter.addSeverity('Critical');
          allureReporter.addDescription('Valid login with username and password')
          allureReporter.addStep("Enter username ");
          allureReporter.addStep("Enter password");
          //click access account
          await accessAccount.clickAccessAccount();
          await wait.setTimeoutwait(4);

          if (utilityFunction.getUser()) {
               await accessAccount.enterUserName(testData.login.enterpriseLoginDetails.newEnterpriseUser);
          }
          else {
               await accessAccount.enterUserName(testData.login.automationUserName);
          }
          await wait.setTimeoutwait(2);

          //click enter
          await accessAccount.clickEnter();
          await wait.setTimeoutwait(18);

          //home page screenshot
          const frame = await browser.$('iframe[frameborder=\'0\']');
          await browser.switchToFrame(frame);
          allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


     });
})