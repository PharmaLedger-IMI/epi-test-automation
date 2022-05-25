
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default


describe('008_Edit batch and enable serial number check with invalid SN ', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("enableSnCheckSnIsInValidTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")

    } else {

        console.log("different flag")

    }

    it('Browser - should verify that the serial number check is enabled by default ', async () => {
        allureReporter.addDescription('Edit batch and verify enable serial number verification and update valid serial number. Pass invalid serial number in matrix')
        allureReporter.addStep('Verify that the serial number check is enabled by default in batch')
        allureReporter.addStep('Scan an invalid data matrix code to verify that the serial number check fails.')
        allureReporter.addTestId('BasicAuthFeatureTest_1_2')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(3);

        //edit Batch
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
        //set serial number
        utilityFunction.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(3);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
        //store invalid serial number
        const invalidSerialNumber = await batches.serialNum()
        console.log('invalid serial number ' + invalidSerialNumber)
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), invalidSerialNumber, utilityFunction.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), invalidSerialNumber)
        await wait.setTimeoutwait(9);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


    })
})