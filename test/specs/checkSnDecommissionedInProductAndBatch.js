const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const testData = require('../testdata/config.json')
const info = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')



describe('082_Edit product to check SN is decommssioned and edit batch to update decommissioned SN.', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await info.runAppium("checkSNDecommissionedInProductAndBatchTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should check Serial number on the barcode is decommissioned', async () => {
        allureReporter.addStep("Check SN is in Decommissioned list flag in product")
        allureReporter.addStep("Check Serial number on the barcode is decommissioned")
        allureReporter.addTestId('ProductDisplayEpiFlag_5_1')
        //click product
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(3);
        console.log("prod to edit" + info.getProductId())
        //search the product code
        await products.searchProductCode(info.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);
        // //check
        // await products.enableSnIsInDecommissionedList()
        // await wait.setTimeoutwait(2);

        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(3);

        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(18);


        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = info.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);
        //update decommissioned serial number
        await batches.selectUpdateDecommissionedFromDropdown(testData.newBatchDetails.updateDecommissioned)
        await wait.setTimeoutwait(5);

        //set serial number value
        info.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(5);
        //manage serial number accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), info.getBatchRecall(), "", "", info.getBatchRecallMsg(), info.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(12);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


    })
})