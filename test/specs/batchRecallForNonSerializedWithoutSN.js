
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testData/config.json')
const allureReporter = require('@wdio/allure-reporter').default


describe('020_Edit batch to set batch recall without SN ', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("editBatchRecallWithNonSerializedWithoutSNTest")
        })

        console.log("Running test suite in incremental mode and browser tests only")

    } else {

        console.log("different flag")

    }
    it('Browser - should verify Batch Recall and Recall Message for Non-serialized batches ', async () => {
        allureReporter.addDescription('Edit batch without serial number and check batch recall and display recall message')
        allureReporter.addStep('Update batch by not adding any serial numners.')
        allureReporter.addStep('Set the batch to recall it')
        allureReporter.addStep('Add a display message for the same.')
        allureReporter.addTestId('BatchRecallAndBatchMessage_10_1')

        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        //click on edit
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(3);
        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //without serial number
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(3);
        //click accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //click on checkbox
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);
        //display recall msg
        await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        await wait.setTimeoutwait(3);

        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), "", utilityFunction.getBrandName(), await batches.checkBatchRecall(), await batches.checkBatchMessage(), "", await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), "")
        await wait.setTimeoutwait(12);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(16);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})