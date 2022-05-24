
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const info = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default



describe('007_Edit batch and enable serial number check with valid SN', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await info.runAppium("enableSnCheckSnIsValidTestRun")
        })

        console.log("Running test suite in incremental mode and browser tests only")

    } else {

        console.log("different flag")

    }

    it('Browser - should verify that the serial number check is enabled by default ', async () => {
        allureReporter.addDescription('Click on edit batch and clear recall message and uncheck batch recall. Verify enable serial number verification and update valid serial number.')
        allureReporter.addStep('Verify that the serial number check is enabled by default in batch')
        allureReporter.addStep('Scan the valid data matrix code and verify that the serial number is valid.')
        allureReporter.addTestId('BasicAuthFeatureTest_1_1')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(3);

        //edit batch
        let editValue = info.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(10);

        //clear recall message
        await batches.clearRecallMessage()
        await wait.setTimeoutwait(4);
        info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(4);

        //uncheckbox batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);
        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(3);

        //check enable serial number verification
        await batches.enableSerialNumberVerification()
        await wait.setTimeoutwait(3);

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //set serial number
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(4);
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), info.getBatchRecall(), "", "", info.getBatchRecallMsg())
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