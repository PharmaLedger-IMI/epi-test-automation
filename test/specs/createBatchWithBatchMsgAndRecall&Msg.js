//const gtinPage = require('../specs/gtinPage.js');
//const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
//const createbatch= require('../specs/createBatch.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
//const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('Batch Recall and Batch Message', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('BatchRecall&Msg_1-should  Create a batch with a batch message and batch recall and recall message', async () => {
    
        allureReporter.startStep('Create a batch with a batch message and batch recall and recall message.')
        allureReporter.addTestId('BatchRecall&Msg_1')
        await batches.Batch();
        await browser.pause(4000)
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await batches.siteName(testData[2]['newBatchDetails'].siteName);
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
        await batches.videoSource(testData[2]['newBatchDetails'].videoSource)
        await wait.setTimeoutwait(4);

        //set serial number
        await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].updateValid)
        await wait.setTimeoutwait(2);
        // await batches.enableResetAllValidSerialNumber()
        // await wait.setTimeoutwait(2);
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(4);
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);


        //enter batch message
        await batches.batchMessage(testData[2]['newBatchDetails'].batchMsg)
        await wait.setTimeoutwait(2);
        info.setBatchMsg(await batches.checkBatchMessage())
        await wait.setTimeoutwait(3);

        //enable batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(2);
        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(2);

        //enter recall message
        await batches.enterRecallMessage(testData[2]['newBatchDetails'].recallMsg)
        await wait.setTimeoutwait(2);
        info.setBatchRecallMsg(await batches.checkBatchRecallMessage()) 
        await wait.setTimeoutwait(2);

        
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(false), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(), info.getBatchMsg(),"", info.getBatchRecallMsg())
        await wait.setTimeoutwait(12);
       
        await batches.createBatch()
        await wait.setTimeoutwait(15);

        matrix.generateImage(info.getProductId(), info.getbatchId(false), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    