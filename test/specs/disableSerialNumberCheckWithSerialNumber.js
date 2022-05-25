
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default


describe('009_Edit batch and disable serial number check with valid SN ', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("disableTheSnCheckSnIsValidTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should update the setting and disable serial number check ', async () => {
        allureReporter.addDescription('Edit batch and disable serial number verification and update valid serial number.')
        allureReporter.addStep('Update the setting and disable serial number check in batch')
        allureReporter.addStep('Scan a data matrix code with serial number')
        allureReporter.addTestId('BasicAuthFeatureTest_1_3')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(3);

        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //diable serial number verification
        await batches.disableSerialNumberVerification()
        await wait.setTimeoutwait(3);

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //set serial number
        utilityFunction.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(3);
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(9);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


    })
})