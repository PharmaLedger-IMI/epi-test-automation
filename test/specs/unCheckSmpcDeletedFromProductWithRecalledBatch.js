const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')

describe('066_Edit product to uncheck batch recall and delete SMPC and edit batch to have batch recall', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("uncheckSmpcDeletedFromProductWithRecalledBatchTestRun")

        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - uncheck if SMPC is deleted from the product with recalled batch', async () => {
        allureReporter.addDescription('Edit product and delete SMPC. Edit batch and check batch is recalled ')
        allureReporter.addStep("Uncheck batch is recalled in product")
        allureReporter.addStep("Check If SMPC is deleted from the product with recalled batch")
        allureReporter.addTestId('ProductDisplayEpiFlag_1_6')
        //click product
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(3);
        console.log("prod to edit" + utilityFunction.getProductId())
        //search the product code
        await products.searchProductCode(utilityFunction.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);
        //delete smpc
        await products.deleteSecondLanguage()
        await wait.setTimeoutwait(4);
        utilityFunction.setEpiDisplayed(await products.epiDisplayed())
        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(18);


        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);

        await batches.selectUpdateRecalledSerialFromDropdown(testData.newBatchDetails.updateRecalled)
        await wait.setTimeoutwait(5);

        //set serial number value
        utilityFunction.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(5);
        // manage serial number accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //check batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);
        utilityFunction.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(3);
        //enter recall message
        await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        await wait.setTimeoutwait(3);
        utilityFunction.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(3);

        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), "", "", utilityFunction.getBatchRecallMsg(), utilityFunction.getEpiDisplayed())
        await wait.setTimeoutwait(13);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})