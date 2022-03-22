// const gtinPage = require('./gtinPage.js');
//const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
//const createbatch= require('../specs/createBatch.js');

const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
//const path= require('path');

describe('Batch Recall and Recall Message for Non-serialized batches ', () => {
    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })
    it('Batch recall for non-serialized_1-should verify Batch Recall and Recall Message for Non-serialized batches ', async () => {
    
        allureReporter.startStep('Create a batch for any product. Do not add any serial numners.  Set the batch to recall it and add a display message for the same.')
       // allureReporter.startStep('Go back to the Batch on the Enterprise Wallet and undo the batch recall flag. ')
        allureReporter.addTestId('Batch recall for non-serialized_1')
        await batches.Batch();
        await wait.setTimeoutwait(4);
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        await batches.siteName(testData[2]['newBatchDetails'].siteName);
        await wait.setTimeoutwait(2);
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

        await wait.setTimeoutwait(2);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']'); 
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);
        await batches.videoSource(testData[2]['newBatchDetails'].videoSource)
        await wait.setTimeoutwait(2);
        
        await batches.createBatch()
        await wait.setTimeoutwait(15);

        let editValue = info.getbatchId()
        //click on edit 
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(2);
        
        //click on checkbox
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(2);
        //display recall msg
        await batches.enterRecallMessage(testData[2]['newBatchDetails'].recallMsg)
        await wait.setTimeoutwait(2);

        //serial Number
        info.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(2);
        //Generate expectation file
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), await batches.checkBatchRecall(), await batches.checkBatchMessage(), "", await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(12);
        //Generate 2d Matrix
        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(12);
        
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(6);

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    