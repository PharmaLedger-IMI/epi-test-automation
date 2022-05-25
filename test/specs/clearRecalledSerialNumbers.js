
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default

describe('039_Edit batch to reset recalled serial number and scan with recalled serial number ', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("checkClearRecalledSerialNumberTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should clear the recalled serial numbers   ', async () => {
        allureReporter.addDescription('Edit batch and reset recalled serial number and scan with recalled serial number')
        allureReporter.addStep('Edit batch')
        allureReporter.addStep('Clear the recalled serial numbers in batch')
        allureReporter.addStep('Scan with recalled serial number')
        allureReporter.addTestId('SerialNumberChecks_5')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(6);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //select valid serial number
        await batches.selectUpdateRecalledSerialFromDropdown(testData.newBatchDetails.updateRecalled)
        await wait.setTimeoutwait(3);
        //enable checkbox
        await batches.enableResetAllRecalledSerialNumber()
        await wait.setTimeoutwait(3);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "")
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