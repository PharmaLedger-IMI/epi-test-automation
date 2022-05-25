
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default


describe('014_Edit batch to set batch recall with valid SN', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("editBatchUncheckRecallWithSerializedTest")
        })

        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }
    it('Browser - should verify Batch Recall and Recall Message for serialized batches ', async () => {
        allureReporter.addDescription('Edit batch by updating valid Serial Numbers, batch recall check and display recall message')
        allureReporter.addStep('Edit batch and update with valid Serial Number')
        allureReporter.addStep('Update the batch to recall it')
        allureReporter.addStep('Add a display message in the batch.')
        allureReporter.addTestId('BatchRecallAndBatchMessage_9_1')

        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(5);
        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(2);
        //set the serial number
        utilityFunction.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(4);
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);

        //click on Batch Recall checkbox
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(2);
        //check and set batch Recall is in enabled state
        utilityFunction.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(2);

        //display recall msg
        await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        await wait.setTimeoutwait(2);
        //check and set batch Recall Msg is displayed
        utilityFunction.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(2);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), "", "", utilityFunction.getBatchRecallMsg())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(2);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(12);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})