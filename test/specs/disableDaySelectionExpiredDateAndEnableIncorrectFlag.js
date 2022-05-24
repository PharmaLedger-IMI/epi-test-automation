
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const info = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default

describe('031_Create a batch with MonthYear as expiry date and disable day selection, enable incorrect and disable expired date flag', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await info.runAppium("disableDaySelectionExpiryDateCheckIncorrectTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should create a batch and disable day selection, enable incorrect and disable expired date ', async () => {
        allureReporter.addDescription("create new batch and disable day selection, enable incorrect and disable expired date")
        allureReporter.addStep('Create a batch with MonthYear as expiry date')
        allureReporter.addStep('Disable day selection, enable incorrect and disable expired date')
        allureReporter.addTestId('ExpiryDateChecks_3_4')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(3);
        //add batch
        await batches.addBatch();
        await wait.setTimeoutwait(3);
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(3);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(3);
        //click on day selection
        await batches.enableDaySelectionClick()
        await wait.setTimeoutwait(3);
        //set the date
        let expiryDate = info.setCurrentRandomDate()
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
        //click on Enable Expired Expiration Date Verification
        await batches.expirationDateVerificationClick()
        await wait.setTimeoutwait(3);
        //select product
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(3);
        //video source
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(3);
        //update serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);

        //set serial number value
        info.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(5);
        // manage serial number accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
        const incorrectExpiryDate = info.setCurrentRandomDate()
        await wait.setTimeoutwait(3);
        let differentDate = incorrectExpiryDate.substring(0, incorrectExpiryDate.length - 3);
        let differentExpiryDate = differentDate + ("-00")
        //generate expectation file
        data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), differentExpiryDate, info.getSerialNumber(), info.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), differentExpiryDate, info.getSerialNumber())
        await wait.setTimeoutwait(8);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


    })
})