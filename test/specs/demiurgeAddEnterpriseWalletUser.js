const products = require('../pageobjects/products.page');
const enterprise = require('../pageobjects/demiurge.page');
const LoginPage = require('../pageobjects/login.page');
const info = require('../utility/reusableFile')
const accessAccount = require('../pageobjects/access.Account');
const testData = require('../testdata/config.json')
const wait = require('../utility/timeout');
const allureReporter = require('@wdio/allure-reporter').default


describe('101_Demiurge - Add Read and write user   for specific company', () => {

    it('Browser - should open eneterprise wallet ', async () => {
        allureReporter.addStep('Open the ePI  URL')
        allureReporter.addStep('Navigate to the eneterprise Wallet and register the user')
        allureReporter.addStep('Go back and login with dev user and add member in write group')
        allureReporter.addStep('Go to enterprise wallet and login with new user')
        allureReporter.addTestId('DemiurgeWallet_2')

        await LoginPage.open();
        await wait.setTimeoutwait(3);
        await browser.maximizeWindow();

        const parentWindow = await browser.getWindowHandle()
        console.log("parentWindow " + parentWindow)

        await LoginPage.openEnterpriseWallet();
        await wait.setTimeoutwait(8);

        var handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await wait.setTimeoutwait(4);
        //click new account
        await enterprise.clickNewAccount()
        await wait.setTimeoutwait(4);
        //enter username
        await enterprise.enterUserName(testData.login.enterpriseLoginDetails.newEnterpriseUser);
        await wait.setTimeoutwait(2);
        //enter email id
        await enterprise.enterEmailId(testData.login.enterpriseLoginDetails.emailId);
        await wait.setTimeoutwait(2);

        //enter password
        await enterprise.enterPassword(testData.login.enterpriseLoginDetails.validPassword);
        await wait.setTimeoutwait(2);

        //enter conifrm password
        await enterprise.enterConfirmPassword(testData.login.enterpriseLoginDetails.confirmPassword);
        await wait.setTimeoutwait(2);
        //click register
        await enterprise.clickRegister();
        await wait.setTimeoutwait(5);
        //open wallet
        await enterprise.openWallet()
        await wait.setTimeoutwait(4);
        //click enter
        await enterprise.clickEnter()
        await wait.setTimeoutwait(15);

        //switch to frame
        const frame = await browser.$('iframe[frameborder=\'0\']');
        await browser.switchToFrame(frame);


        //double click on user identity
        let isNewUser = await enterprise.doubleClickUserIdentity()
        console.log("dfsdfsdf", isNewUser)
        if (isNewUser) {
            await wait.setTimeoutwait(2);

            //go to ePI landing page
            await browser.switchToWindow(handles[0]);
            await wait.setTimeoutwait(6);

            //open demiurge wallet
            await enterprise.openDemiurgeWallet();
            await wait.setTimeoutwait(6);

            //go to 2nd window
            const tab = await browser.getWindowHandles();
            await browser.switchToWindow(tab[2]);
            await wait.setTimeoutwait(3);

            const childWindow = await browser.getWindowHandle()
            console.log("childWindow " + childWindow)

            await wait.setTimeoutwait(6);
            // click on access account
            await accessAccount.clickAccessAccount();
            await wait.setTimeoutwait(5);

            //clear and enter new demiurge user
            await enterprise.enterUserName(testData.login.demiurgeLoginDetails.newDemiurgeUser);
            await wait.setTimeoutwait(2);
            //click enter
            await enterprise.clickEnter()
            await wait.setTimeoutwait(5);
            //swicth to frame 
            const frameGroup = await browser.$('iframe[frameborder=\'0\']');
            await browser.switchToFrame(frameGroup);
            //click on groups
            await enterprise.clickGroups()
            await wait.setTimeoutwait(5);
            //click on write group
            await enterprise.clickWriteGroup()
            await wait.setTimeoutwait(5);
            //click and paste the id
            await enterprise.memeberId()
            await wait.setTimeoutwait(5);

            let didString = "did:ssi:name:" + testData.login.vault + ":" + testData.login.enterpriseLoginDetails.newEnterpriseUser
            console.log(didString + "  didString ")
            await wait.setTimeoutwait(3);
            //paste user
            await browser.keys([didString])
            await wait.setTimeoutwait(4);

            //add member
            await enterprise.clickAddMember()
            await wait.setTimeoutwait(7);


            await browser.switchToWindow(handles[1]);
            await browser.closeWindow()
            await wait.setTimeoutwait(4);

            await browser.switchToWindow(childWindow);
            await browser.closeWindow()
            await wait.setTimeoutwait(4);

            await browser.switchToWindow(parentWindow)
            await wait.setTimeoutwait(4);

            const newUser = testData.login.enterpriseLoginDetails.newEnterpriseUser
            await wait.setTimeoutwait(3);
            info.setUser(newUser)


        }
        const newUser = testData.login.enterpriseLoginDetails.newEnterpriseUser
        await wait.setTimeoutwait(3);
        info.setUser(newUser)
        await wait.setTimeoutwait(3);
        let productPage = await products.homePage()
        await wait.setTimeoutwait(4);
        console.log("productPage" + productPage)
        if (productPage) {
            await browser.closeWindow()
            await wait.setTimeoutwait(4);
            await browser.switchToWindow(parentWindow)
            await wait.setTimeoutwait(4);
        }

    })

})