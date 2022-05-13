
const demiurge = require('../pageobjects/demiurge.page');
const LoginPage = require('../pageobjects/login.page');
const testData = require('../testdata/config.json')
const wait = require('../utility/timeout');
const allureReporter = require('@wdio/allure-reporter').default


describe('100_Demiurge - Add administrator - for a specific company', () => {
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
        await demiurge.enterUserName(testData.login.newDemiurgeUser);
        await wait.setTimeoutwait(3);
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

            //save identity in popup
            await browser.keys('Enter')
            await wait.setTimeoutwait(8)

            await browser.refresh();
            await wait.setTimeoutwait(4);

            //enter user name
            await demiurge.enterUserName(testData.login.newDemiurgeUser);
            await wait.setTimeoutwait(3);

            await demiurge.clickEnter()
            await wait.setTimeoutwait(15);

        }

        //click on my identity tab
        await browser.keys(['\ue004']);
        await wait.setTimeoutwait(3);
        await browser.keys(['\ue004']);
        await wait.setTimeoutwait(3);
        //click on my identities
        await browser.keys('Enter')
        await wait.setTimeoutwait(9)


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

        //copy the user

        const OS = process.platform

        if (OS.includes('win32')) {
            await browser.keys(['\ue009', 'a'])
            await wait.setTimeoutwait(5);
            await browser.keys(['\ue009', 'c'])
            await wait.setTimeoutwait(5);
        }
        else if (OS.includes('darwin')) {
            await browser.keys(['\ue03D', 'a'])
            await wait.setTimeoutwait(5);
            await browser.keys(['\ue03D', 'c'])
            await wait.setTimeoutwait(5);
        }
        else {
            await browser.keys(['\ue009', 'a'])
            await wait.setTimeoutwait(5);
            await browser.keys(['\ue009', 'c'])
            await wait.setTimeoutwait(5);
        }

        //go back and login with devuser
        await browser.refresh();
        await wait.setTimeoutwait(3);

        await demiurge.enterUserName(testData.login.registeredDemiurgeUser);
        await wait.setTimeoutwait(6);

        await demiurge.clickEnter()
        await wait.setTimeoutwait(8);
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
        if (OS.includes('win32')) {
            console.log("platform window " + OS)
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

        //Add member
        await demiurge.clickAddMember()
        await wait.setTimeoutwait(4);

        //close currect window
        await browser.closeWindow()
        await wait.setTimeoutwait(4);
        await browser.switchToWindow(parentWindow)
        await wait.setTimeoutwait(4);

    });

})