
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default

describe('022_Create a batch with valid SN, expiry date and recall message', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("createBatchWithValidSnExpiryDateRecallMsgTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should verify Combination checks ', async () => {
        allureReporter.addDescription("create a new batch by adding valid serial number, expiry date and recall message")
        allureReporter.addStep('1. Create a batch')
        allureReporter.addStep('2. Add Valid serial number')
        allureReporter.addStep('3. Add valid expiry date')
        allureReporter.addStep('4. Add a recall message')
        allureReporter.addStep('5. Scan the batch')
        allureReporter.addTestId('BatchRecallAndBatchMessage_12_1')
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
        await wait.setTimeoutwait(2);
        //select date
        utilityFunction.setCurrentRandomDate()
        await wait.setTimeoutwait(2);
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
        await wait.setTimeoutwait(2);
        //video source
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(2);

        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);
        //enter serial number
        utilityFunction.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(2);
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //enable recall checkbox
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(2);
        //set batch recall
        utilityFunction.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(2);
        //enter recall message
        await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        await wait.setTimeoutwait(2);
        //set batch recall msg
        utilityFunction.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(2);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), " ", "", utilityFunction.getBatchRecallMsg())
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