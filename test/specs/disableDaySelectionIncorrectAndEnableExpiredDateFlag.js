
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default




describe('035_Create a batch with MonthYear as expiry date and disable day selection, incorrect and enable expired date flag', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("disableDaySelectionAndIncorrectEnableExpiredDateFlagTestRun")

        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {
        console.log("different flag")
    }

    it('Browser - should create a batch and disable day selection, incorrect and enable expired date flag ', async () => {
        allureReporter.addDescription("create new batch and disable day selection, incorrect and enable expired date flag")
        allureReporter.addStep('Create a batch with MonthYear as expiry date')
        allureReporter.addStep('Disable day selection, incorrect and enable expired date')
        allureReporter.addTestId('ExpiryDateChecks_3_3')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(3);
        //add batch
        await batches.addBatch();
        await wait.setTimeoutwait(3);
        utilityFunction.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(3);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(3);
        //click on day selection
        await batches.enableDaySelectionClick()
        await wait.setTimeoutwait(3);
        //set the date
        let expiryDate = utilityFunction.randomDateExpired()
        let mmYYYY = expiryDate.substring(0, expiryDate.length - 3);
        let ddMMYYYY = mmYYYY + ("-00")
        console.log("dayMonthYear " + ddMMYYYY)
        await wait.setTimeoutwait(3);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, mmYYYY);
        await wait.setTimeoutwait(3);
        //click on Incorrect Expiration Date Verification
        await batches.enableIncorrectExpirationDateVerificationClick()
        await wait.setTimeoutwait(3);
        //select product
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await selectBox.selectByAttribute('value', utilityFunction.getProductId());
        await wait.setTimeoutwait(3);
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(3);
        //update serial number
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
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), await batches.batchIdValue(), ddMMYYYY, utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(13);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), await batches.batchIdValue(), ddMMYYYY, utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(8);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');



    })
})