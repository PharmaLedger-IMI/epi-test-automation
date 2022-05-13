
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const info = require('../utility/reusableFile')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('021_Create a batch to set batch recall and batch message', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run createTheBatchWithBatchMsgAndRecallMsgTest');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should create a batch with a batch message and batch recall and recall message', async () => {
        allureReporter.addDescription("Create new batch and check batch recall, enter recall message and batch message and update valid serial number")
        allureReporter.addStep('Create a batch with a batch message and batch recall and recall message.')
        allureReporter.addStep('Scan the batch')
        allureReporter.addTestId('BatchRecallAndBatchMessage_11_4')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(4);
        //add batch
        await batches.addBatch();
        await wait.setTimeoutwait(3);
        info.setBatchId(await batches.batchIdValue())
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(5);
        //select date
        info.setCurrentRandomDate()
        await wait.setTimeoutwait(3);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, info.getCurrentRandomDate());
        await wait.setTimeoutwait(4);
        //select product
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(3);
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(4);

        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //enter serial number
        info.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(4);
        //click accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //enter batch message
        await batches.batchMessage(testData.newBatchDetails.batchMsg)
        await wait.setTimeoutwait(3);
        info.setBatchMsg(await batches.checkBatchMessage())
        await wait.setTimeoutwait(3);

        //enable batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);
        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(3);

        //enter recall message
        await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        await wait.setTimeoutwait(3);
        info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(3);

        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), info.getBatchRecall(), info.getBatchMsg(), "", info.getBatchRecallMsg())
        await wait.setTimeoutwait(18);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(12);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})    