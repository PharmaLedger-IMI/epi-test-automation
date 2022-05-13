
const feature = require('../pageobjects/userAsHolder');

describe('Disable feature', () => {
    if (process.argv[incrementalArg].split('=')[1] == "true") {

        console.log("This testcase is running for existing product")

    }
    else {

        it('Browser - should verify product page', async () => {

            allureReporter.addFeature('Create Product')
            allureReporter.addSeverity('Critical');
            allureReporter.addTestId('ProdAndBatchSetup_1')
            allureReporter.addDescription('No. of products can be created by Adding Product')
            allureReporter.startStep("Create new product with a valid GTIN, and add the ePI");


            await LoginPage.open();
            await wait.setTimeoutwait(3);
            await browser.maximizeWindow();

            await LoginPage.openEnterpriseWallet();
            await wait.setTimeoutwait(3);
            const handles = await browser.getWindowHandles();
            await browser.switchToWindow(handles[1]);

            //click access account
            await accessAccount.clickAccessAccount();
            await wait.setTimeoutwait(4);

            if (info.getUser()) {
                await accessAccount.enterUserName(testData.login.newEnterpriseUser);
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

            await feature.clickUserAsHolder();
            await wait.setTimeoutwait(4);

            await feature.clickWalletSettingsEditButton();
            await wait.setTimeoutwait(4);

            await feature.clickDisablePatientLeaflet();
            await wait.setTimeoutwait(4);

            await feature.clickDisableShowleafletIfBatchExpired();
            await wait.setTimeoutwait(4);

            await feature.clickDisableShowLeafletIfBatchUnknown();
            await wait.setTimeoutwait(4);

            await feature.clickDisableHealthcarePractitionerInfo();
            await wait.setTimeoutwait(4);

            await feature.clickDisableVideoSource();
            await wait.setTimeoutwait(4);

            await feature.clickDisableAdverseEventsReporting();
            await wait.setTimeoutwait(4);

            await feature.clickDisableAntiCounterfeitingFunctions();
            await wait.setTimeoutwait(4);

            await feature.clickDisableBatchMessage();
            await wait.setTimeoutwait(4);

        });
    }

})