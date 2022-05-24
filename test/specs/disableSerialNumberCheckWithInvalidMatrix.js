
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const info = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default

describe('010_Edit batch and disable serial number check with invalid SN ', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await info.runAppium("enableTheSnCheckSnIsInValidTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")

    } else {

        console.log("different flag")

    }

    it('Browser - should verify that the serial number check is disabled ', async () => {
        allureReporter.addDescription('Edit batch and verify disable serial number verification and update valid serial number. Pass invalid serial number in matrix')
        allureReporter.addStep('Verify that the serial number check is disabled in batch')
        allureReporter.addStep('Scan an invalid data matrix code')
        allureReporter.addTestId('BasicAuthFeatureTest_1_5')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(3);

        //edit Batch
        let editValue = info.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //uncheck serial number verification
        await batches.enableSerialNumberVerification()
        await wait.setTimeoutwait(3);

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //set serial number
        info.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(3);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
        //store invalid serial number
        const invalidSerialNumber = await batches.serialNum()
        console.log('invalid serial number ' + invalidSerialNumber)
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), invalidSerialNumber, info.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), invalidSerialNumber)
        await wait.setTimeoutwait(9);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})