const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')

describe('005_Edit batch to set recall message', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("editBatchRecallMsgTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should edit batch for recall message', async () => {
        allureReporter.addDescription('Click on edit batch and enable checkbox for batch recall and enter recall message and update the batch.')
        allureReporter.addStep("Update any field on the batch and Save the changes")
        allureReporter.addTestId('ProdAndBatchSetup_4')

        //click on batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(8);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);

        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);

        //set serial number value
        utilityFunction.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(5);
        //manage serial number accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //enable checkbox for batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);
        utilityFunction.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(3);
        //enter recall msg
        await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        await wait.setTimeoutwait(4);
        utilityFunction.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), "", "", utilityFunction.getBatchRecallMsg())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})