const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const testData = require('../testdata/config.json')
const info = require('../utility/reusableFile')
const wait = require('../utility/timeout')
const util = require('util');
const exec = util.promisify(require('child_process').exec);


describe('094_Edit product to check batch is unknown and delete smpc. Pass unknown batch in matrix', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npm run checkTheSmpcIsDeletedFromProductWithBatchIsUnknownTest');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should check If SMPC is deleted from the product and the batch on the barcode is unknown', async () => {
        allureReporter.addStep("Check batch is unknown flag in product")
        allureReporter.addStep("Check If SMPC is deleted from the product")
        allureReporter.addStep("Check batch on the barcode is unknown")
        allureReporter.addTestId('ProductDisplayEpiFlag_7_3')

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(4);
        console.log("prod to edit" + info.getProductId())
        // search the product codes
        await products.searchProductCode(info.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edit
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);


        await products.deleteSecondLanguage()
        await wait.setTimeoutwait(5);

        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);

        //update products
        await products.updateProduct()
        await wait.setTimeoutwait(18);


        //edit batch
        await batches.Batch();
        //created for QA
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);
        //
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);

        //set serial number
        info.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(3);

        // manage serial number accept 
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        const unKnownBatch = info.unKnownBatch()
        console.log('unKnownBatch ' + unKnownBatch)
        await wait.setTimeoutwait(3);

        data.generateExpectationFile(info.getProductId(), unKnownBatch, info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), "", "", "", "", info.getEpiDisplayed())
        await wait.setTimeoutwait(12);

        matrix.generate2dMatrixImage(info.getProductId(), unKnownBatch, info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        // allureReporter.endStep("passed");

    })
})