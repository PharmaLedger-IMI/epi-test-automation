
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default



describe('037_Edit batch to reset serial number and scan with invalid serial number ', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("clearInValidSerialNumberTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should clear the invalid serial number in the above batch and scan the 2D matrix with an invalid serial number   ', async () => {
        allureReporter.addDescription('Edit batch and reset serial number and scan with invalid serial number')
        allureReporter.addStep('Clear invalid serial number in the batch')
        allureReporter.addStep('Scan the 2D matrix with an invalid serial number')
        allureReporter.addTestId('SerialNumberChecks_3')

        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //enable checkbox
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(3);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(4);

        const invalidSerialNumber = await batches.serialNum()
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), invalidSerialNumber, " ", utilityFunction.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), invalidSerialNumber)
        await wait.setTimeoutwait(5);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');



    })
})