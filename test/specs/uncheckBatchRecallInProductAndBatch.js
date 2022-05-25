const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')

describe('065_Edit product to uncheck batch is recalled and edit batch to uncheck batch recall', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("unCheckBatchRecallInProductAndBatchTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - same recalled batch is updated for not recalled now', async () => {
        allureReporter.addDescription('Edit product and uncheck batch is recalled flag. Edit batch and check batch is not recalled ')
        allureReporter.addStep("Uncheck batch is recalled flag in product")
        allureReporter.addStep("Batch is not recalled in batch")
        allureReporter.addTestId('ProductDisplayEpiFlag_1_5')
        //click product
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(4);
        console.log("prod to edit" + utilityFunction.getProductId())
        //search the product code
        await products.searchProductCode(utilityFunction.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);

        // //uncheck batch is recalled
        // await products.enableBatchIsRecalled();
        // await wait.setTimeoutwait(1);

        utilityFunction.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(3);

        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(18);



        //unchecked the batch is recalled in product level in above testcase


        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);

        //update recalled serial number
        await batches.selectUpdateRecalledSerialFromDropdown(testData.newBatchDetails.updateRecalled)
        await wait.setTimeoutwait(3);

        //set the serial number and enter
        utilityFunction.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(3);
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //clear recall message
        await batches.clearRecallMessage()
        await wait.setTimeoutwait(4);
        utilityFunction.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(4);

        //uncheck batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(4);
        utilityFunction.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(4);

        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), "", "", utilityFunction.getBatchRecallMsg(), utilityFunction.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(22);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})