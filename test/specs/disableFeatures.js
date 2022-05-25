const products = require('../pageobjects/products.page');
const feature = require('../pageobjects/disableFeature.page');
const utilityFunction = require('../utility/reusableFile')
const LoginPage = require('../pageobjects/login.page');
const accessAccount = require('../pageobjects/access.Account');
const testData = require('../testdata/config.json')
const wait = require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default

describe('Disable feature', () => {
    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run test');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

        it('Browser - should verify product page', async () => {

            allureReporter.addFeature('Disable feature')
            allureReporter.addSeverity('Critical');
            allureReporter.startStep("");


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

            if (utilityFunction.getUser()) {
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
            await wait.setTimeoutwait(3);

            await feature.clickWalletSettingsEditButton();
            await wait.setTimeoutwait(3);


            await feature.clickDisablePatientLeaflet();
            await wait.setTimeoutwait(3);

            await feature.clickDisableShowleafletIfBatchExpired();
            await wait.setTimeoutwait(3);

            await feature.clickAccept()
            await wait.setTimeoutwait(3);


            await products.clickProductFromSideNav();
            await wait.setTimeoutwait(3);
            //add product
            await products.addProduct();
            await wait.setTimeoutwait(5);
            //enter gtin
            await products.enterGtinCode(utilityFunction.getProductId());
            await wait.setTimeoutwait(3);

            //enable batch is recalled
            await products.batchIsExpired();
            await wait.setTimeoutwait(3);

            //add epi
            await products.addEpi()
            await wait.setTimeoutwait(3);

            await products.selectType(testData.newProductDetails.selectType)
            await wait.setTimeoutwait(3);

            await products.acceptButton()
            await wait.setTimeoutwait(3);

            // await products.saveProduct()
            // await wait.setTimeoutwait(3);



            // await feature.clickDisableShowLeafletIfBatchUnknown();
            // await wait.setTimeoutwait(4);

            // await feature.clickDisableHealthcarePractitionerInfo();
            // await wait.setTimeoutwait(4);

            // await feature.clickDisableVideoSource();
            // await wait.setTimeoutwait(4);

            // await feature.clickDisableAdverseEventsReporting();
            // await wait.setTimeoutwait(4);

            // await feature.clickDisableAntiCounterfeitingFunctions();
            // await wait.setTimeoutwait(4);

            // await feature.clickDisableBatchMessage();
            // await wait.setTimeoutwait(4);

        });
    })

