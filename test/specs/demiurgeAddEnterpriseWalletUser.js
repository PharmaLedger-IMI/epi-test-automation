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
        await enterprise.enterUserName(testData.login.newEnterpriseUser);
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

        const OS = process.platform

        //double click on user identity
        let isNewUser = await enterprise.doubleClickUserIdentity()
        console.log("dfsdfsdf", isNewUser)
        if (isNewUser) {
            await wait.setTimeoutwait(2);
            //copy user identity
            if (OS.includes('win32')||OS.includes('win64')) {
                await browser.keys(['\ue009', 'c'])
                await wait.setTimeoutwait(4);
            }
            else if (OS.includes('darwin')) {
                await browser.keys(['\ue03D', 'c'])
                await wait.setTimeoutwait(4);
            }
            else {
                await browser.keys(['\ue009', 'c'])
                await wait.setTimeoutwait(4);
            }
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

            const childWindow = await browser.getWindowHandle()
            console.log("childWindow " + childWindow)

            await wait.setTimeoutwait(6);
            // click on access account
            await accessAccount.clickAccessAccount();
            await wait.setTimeoutwait(5);
            //clear and enter dev user

            await enterprise.enterUserName(testData.login.registeredDemiurgeUser);
            await wait.setTimeoutwait(2);
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

            if (OS.includes('win32')) {
                await browser.keys(['\ue009', 'v'])
                await wait.setTimeoutwait(4);
            }
            else if (OS.includes('darwin')) {
                await browser.keys(['\ue03D', 'v'])
                await wait.setTimeoutwait(4);
            }
            else {
                await browser.keys(['\ue009', 'v'])
                await wait.setTimeoutwait(4);
            }


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

            const newUser = testData.login.newEnterpriseUser
            info.setUser(newUser)


        }
        const newUser = testData.login.newEnterpriseUser
        info.setUser(newUser)
        let productPage = await products.homePage()
        console.log("productPage" + productPage)
        if (productPage) {
            await browser.closeWindow()
            await wait.setTimeoutwait(4);
            await browser.switchToWindow(parentWindow)
            await wait.setTimeoutwait(4);
        }

    })

})