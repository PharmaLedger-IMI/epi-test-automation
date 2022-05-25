
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default

describe('020_Create a batch to set batch recall and recall message', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("createBatchWithBatchRecallMsgTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should create a batch with a batch recall and message', async () => {
        allureReporter.addDescription("create new batch and check batch recall and enter recall message and update valid serial number")
        allureReporter.addStep('Create a batch with a batch recall and message.')
        allureReporter.addStep('Scan the batch')
        allureReporter.addTestId('BatchRecallAndBatchMessage_11_3')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(4);
        //add batch
        await batches.addBatch();
        await wait.setTimeoutwait(3);

        utilityFunction.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(3);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(5);
        //select date
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
        await wait.setTimeoutwait(4);
        //select product
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await selectBox.selectByAttribute('value', utilityFunction.getProductId());
        await wait.setTimeoutwait(3);
        //video sourec
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(5);
        //update serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //enter serial number
        utilityFunction.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(4);
        //click accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //check batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);
        //enter recall msg
        await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        await wait.setTimeoutwait(3);

        utilityFunction.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(3);
        utilityFunction.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), " ", "", utilityFunction.getBatchRecallMsg())
        await wait.setTimeoutwait(18);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(12);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


    })
})