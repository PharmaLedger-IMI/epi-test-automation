
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default

describe('018_Create a batch with no batch message', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("createBatchWithNoBatchMsgTestRun")

        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should create a batch with no batch message', async () => {
        allureReporter.addDescription("Create new batch and don't enter batch message and update valid serial number")
        allureReporter.addStep('Create a batch with no batch message.')
        allureReporter.addStep('Scan the batch')
        allureReporter.addTestId('BatchRecallAndBatchMessage_11_1')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(4);
        //add batch
        await batches.addBatch();
        await wait.setTimeoutwait(2);

        utilityFunction.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(5);
        //select date
        utilityFunction.setCurrentRandomDate()
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, utilityFunction.getCurrentRandomDate());
        await wait.setTimeoutwait(4);
        //select product
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await selectBox.selectByAttribute('value', utilityFunction.getProductId());
        await wait.setTimeoutwait(3);
        //video source
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(5);

        //set serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //enter serial number
        utilityFunction.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(4);
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);
        //no batch msg
        utilityFunction.setBatchMsg(await batches.checkBatchMessage())
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", utilityFunction.getBatchMsg(), "", "")
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(12);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})