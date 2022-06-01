
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default


describe('053_Edit batch to reset the serial Numbers', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("updateBatchToResetSerialNumberTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should update the batch to reset the serial Numbers  ', async () => {
        allureReporter.addDescription('Edit batch and reset valid serial number')
        allureReporter.addStep('Update the above batch to reset the serial Numbers ')
        allureReporter.addTestId('SerialNumberChecks_11_3')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(4);

        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //check enable serial number verification
        await batches.enableSerialNumberVerification()
        await wait.setTimeoutwait(3);
        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //enable checkbox and remove 10 serial number
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(3);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), "", utilityFunction.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(12);

        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), "")
        await wait.setTimeoutwait(5);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})