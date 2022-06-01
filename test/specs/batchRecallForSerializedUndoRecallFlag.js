
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default


describe('019_Edit batch to undo batch recall with valid SN ', () => {

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
        allureReporter.addDescription('Edit batch by updating with valid Serial Number and unchecking batch recall and clearing recall message')
        allureReporter.addStep('Edit batch and update with valid Serial Number')
        allureReporter.addStep('Go back to the Batch on the Enterprise Wallet')
        allureReporter.addStep('Undo the batch recall flag for above batch. ')
        allureReporter.addTestId('BatchRecallAndBatchMessage_9_2')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(4);

        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //set the serial number and enter
        utilityFunction.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(3);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //clear recall msg
        await batches.clearRecallMessage()
        await wait.setTimeoutwait(3);

        //undo the batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);

        utilityFunction.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(3);

        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), "", "", "")
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(12);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(16);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');



    })
})