
const batches= require('../pageobjects/batches.page.js');

const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default

describe('Batch Recall and Batch Message', () => {

    if(!process.env.npm_config_browserOnly){
        const util = require('util');
        const exec = util.promisify(require('child_process').exec);

    after(async () => {
        console.log("Starting Mobile Execution");
        const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
        console.log('stdout:', stdout1);
        console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('BatchRecallAndBatchMessage_11_4-should  Create a batch with a batch message and batch recall and recall message', async () => {
        allureReporter.addDescription("create new batch and check batch recall, enter recall message and batch message and update valid serial number")
        allureReporter.startStep('Create a batch with a batch message and batch recall and recall message.')
        allureReporter.addTestId('BatchRecallAndBatchMessage_11_4')
        await batches.Batch();
        await browser.pause(4000)
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(5);
        info.setCurrentRandomDate()
        await wait.setTimeoutwait(2);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, info.getCurrentRandomDate());
        await wait.setTimeoutwait(4);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');  
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(3);
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(4);

        //set serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(2);
        // await batches.enableResetAllValidSerialNumber()
        // await wait.setTimeoutwait(2);
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(4);
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);


        //enter batch message
        await batches.batchMessage(testData.newBatchDetails.batchMsg)
        await wait.setTimeoutwait(2);
        info.setBatchMsg(await batches.checkBatchMessage())
        await wait.setTimeoutwait(3);

        //enable batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(2);
        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(2);

        //enter recall message
        await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        await wait.setTimeoutwait(2);
        info.setBatchRecallMsg(await batches.checkBatchRecallMessage()) 
        await wait.setTimeoutwait(2);

        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(), info.getBatchMsg(),"", info.getBatchRecallMsg())
        await wait.setTimeoutwait(12);
         //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    