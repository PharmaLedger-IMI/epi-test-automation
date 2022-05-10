
const LoginPage = require('../pageobjects/login.page');
const info = require('../utility/reusableFile')
const accessAccount = require('../pageobjects/access.Account');
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
          await LoginPage.openEnterpriseWallet();
          await wait.setTimeoutwait(3);
          const handles = await browser.getWindowHandles();
          if (handles.length != 2) {
               console.log("length is " + handles.length)
               if (info.getUser()) {
                    await browser.switchToWindow(handles[5]);
               }
               else {
                    await browser.switchToWindow(handles[4]);
               }
          } else {
               await browser.switchToWindow(handles[1]);
          }

     });
     it('Browser - should open Access Account', async () => {

          allureReporter.addSeverity('Critical');
          allureReporter.addDescription('Valid Login with UserName and Password')
          allureReporter.addStep("Enter username ");
          allureReporter.addStep("Enter password");
          await accessAccount.clickAccessAccount();
          await wait.setTimeoutwait(4);
          await accessAccount.clearUserName();
          await wait.setTimeoutwait(2);
          if (info.getUser()) {
               await accessAccount.enterUserName(testData.login.newEnterpriseUser);
          }
          else {
               await accessAccount.enterUserName(testData.login.automationUserName);
          }
          await wait.setTimeoutwait(2);
          //  await accessAccount.emailId();
          //  await wait.setTimeoutwait(2);
          //  await accessAccount.password();
          //  await wait.setTimeoutwait(2);
          await accessAccount.Enterbutton();
          await wait.setTimeoutwait(18);

          //home page screenshot
          const frame = await browser.$('iframe[frameborder=\'0\']');
          await browser.switchToFrame(frame);
          allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


     });
})