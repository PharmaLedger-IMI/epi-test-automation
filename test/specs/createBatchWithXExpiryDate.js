
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default



describe('029_Create a batch with X expiry date and pass different date Y in matrix ', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("createBatchWithExpiredDateTestRun")

        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - create a batch with X expiry date and create a 2D data matrix with details of above batch but different expiration date Y ', async () => {
        allureReporter.addDescription("create new batch and select future date. Pass different date in matrix")
        allureReporter.addStep('Create a batch with X expiry date')
        allureReporter.addStep('Create a 2D data matrix with details of above batch but different expiration date Y')
        allureReporter.addTestId('ExpiryDateChecks_1_1')
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
        //select site name
        utilityFunction.setCurrentRandomDate()
        await wait.setTimeoutwait(3);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, utilityFunction.getCurrentRandomDate());
        await wait.setTimeoutwait(3);
        console.log("different date is" + utilityFunction.randomDate())
        //select product
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await selectBox.selectByAttribute('value', utilityFunction.getProductId());
        await wait.setTimeoutwait(2);
        //video source
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(3);
        //update valid serial number
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
        //generate future date
        const futureDate = utilityFunction.randomDate()
        console.log("future date is " + futureDate)
        utilityFunction.setDateChange(futureDate, "day")
        utilityFunction.setDateChange(futureDate, "month")
        utilityFunction.setDateChange(futureDate, "year")
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), await batches.batchIdValue(), futureDate, utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(12);

        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), await batches.batchIdValue(), futureDate, utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(15);

        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})