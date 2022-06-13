
const accessAccount = require('../pageObjects/access.Account');
const demiurge = require('../pageobjects/demiurge.page');
const LoginPage = require('../pageobjects/login.page');
const testData = require('../testdata/config.json')
const wait = require('../utility/timeout');
const allureReporter = require('@wdio/allure-reporter').default


describe('107_Demiurge - Add administrator - for a specific company', () => {
    it('Browser - should open ePI landing page', async () => {


        allureReporter.addSeverity('Critical');
        allureReporter.addStep('Open the ePI  URL')
        allureReporter.addStep('Navigate to the demiurge Wallet and register the user')
        allureReporter.addStep('Go back and login with dev user and add member in admin group')
        allureReporter.addTestId('DemiurgeWallet_1')

        await LoginPage.open();
        await wait.setTimeoutwait(3);
        await browser.maximizeWindow();

        const parentWindow = await browser.getWindowHandle()
        console.log("parentWindow " + parentWindow)
        //open demiurge wallet
        await demiurge.openDemiurgeWallet();
        await wait.setTimeoutwait(3);

        const handles = await browser.getWindowHandles();
        console.log("handles" + handles)
        await browser.switchToWindow(handles[1]);

        //click on new account
        await demiurge.clickNewAccount();
        await wait.setTimeoutwait(4);
        //enter user name
        await demiurge.enterUserName(testData.login.demiurgeLoginDetails.newDemiurgeUser);
        await wait.setTimeoutwait(3);

        //enter email id
        await demiurge.enterEmailId(testData.login.demiurgeLoginDetails.emailId);
        await wait.setTimeoutwait(2);

        //enter company name
        await demiurge.enterCompanyName(testData.login.demiurgeLoginDetails.companyName);
        await wait.setTimeoutwait(2);

        //enter password
        await demiurge.enterPassword(testData.login.demiurgeLoginDetails.validPassword);
        await wait.setTimeoutwait(2);

        //enter conifrm password
        await demiurge.enterConfirmPassword(testData.login.demiurgeLoginDetails.confirmPassword);
        await wait.setTimeoutwait(2);

        //click register
        await demiurge.clickRegister();
        await wait.setTimeoutwait(5);
        //open wallet
        await demiurge.openWallet()
        await wait.setTimeoutwait(3);
        //login
        await demiurge.clickEnter()
        await wait.setTimeoutwait(10);
        //switch to frame
        const frame = await browser.$('iframe[frameborder=\'0\']');
        await browser.switchToFrame(frame);

        let isNewUser = await demiurge.bootingTitle()
        await wait.setTimeoutwait(5);
        if (isNewUser) {

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

            //on popup
            await browser.keys(['\ue004']);
            await wait.setTimeoutwait(3);
            await browser.keys(['\ue004']);
            await wait.setTimeoutwait(3);
            await browser.keys(['\ue004']);
            await wait.setTimeoutwait(3);
            await browser.keys(['\ue004']);
            await wait.setTimeoutwait(3);

            //save identity
            await browser.keys('Enter')
            await wait.setTimeoutwait(8)

        }

        await browser.switchToWindow(handles[0]);
        await wait.setTimeoutwait(3);
        //open demiurge wallet
        await demiurge.openDemiurgeWallet();
        await wait.setTimeoutwait(3);

        const tab = await browser.getWindowHandles();
        console.log(tab + "tab ")
        await browser.switchToWindow(tab[2]);
        await wait.setTimeoutwait(3);

        const childWindow = await browser.getWindowHandle()
        console.log("childWindow " + childWindow)

        //click access account
        await accessAccount.clickAccessAccount();
        await wait.setTimeoutwait(4);

        //enter registered demiurge user name
        await demiurge.enterUserName(testData.login.demiurgeLoginDetails.registeredDemiurgeUser);
        await wait.setTimeoutwait(3);

        //login
        await demiurge.clickEnter()
        await wait.setTimeoutwait(10);

        //swicth to frame
        const frameGroup = await browser.$('iframe[frameborder=\'0\']');
        await browser.switchToFrame(frameGroup);
        // go to groups
        await demiurge.clickGroups()
        await wait.setTimeoutwait(5);
        // click on admin group
        await demiurge.clickAdminGroup()
        await wait.setTimeoutwait(3);
        //click on memeber id textbox and paste the id
        await demiurge.memeberId()
        await wait.setTimeoutwait(3);
        //paste user

        let didString = "did:ssi:name:" + testData.login.vault + ":" + testData.login.demiurgeLoginDetails.newDemiurgeUser
        console.log(didString + "  didString")
        await wait.setTimeoutwait(3);
        await browser.keys([didString])
        await wait.setTimeoutwait(4);

        //Add member
        await demiurge.clickAddMember()
        await wait.setTimeoutwait(4);

        await browser.switchToWindow(handles[1]);
        await browser.closeWindow()
        await wait.setTimeoutwait(4);

        await browser.switchToWindow(childWindow);
        await browser.closeWindow()
        await wait.setTimeoutwait(4);

        await browser.switchToWindow(parentWindow)
        await wait.setTimeoutwait(4);

    });

})