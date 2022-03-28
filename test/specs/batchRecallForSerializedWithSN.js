// const gtinPage = require('./gtinPage.js');
const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
//const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Batch Recall and Recall Message for serialized batches ', () => {
    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })
    it('BatchRecall&Msgs_1-should verify Batch Recall and Recall Message for serialized batches ', async () => {
    
        allureReporter.startStep('Create a batch for any product. Upload Valid Serial Numbers for the same and Update the batch to recall it and add a display message for the same.')
        allureReporter.addTestId('BatchRecall&Msg_1')

        await batches.Batch();
        await wait.setTimeoutwait(2);
        await batches.addBatch();
        await wait.setTimeoutwait(2);

        // await browser.execute('document.querySelector(`a[href="/batches"]`).click()')
        // await browser.pause(6000)   
        // await browser.execute('document.querySelector(`button[data-tag="add-batch"]`).click()') 
        // await browser.pause(3000)

        //Set batch value after add batch
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
        await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].updateValid)
        await wait.setTimeoutwait(2);
        // await batches.enableResetAllValidSerialNumber()
        // await wait.setTimeoutwait(2);
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(4);
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);
       
        await batches.createBatch()
        await wait.setTimeoutwait(15);
        
        let editValue = info.getbatchId(false)
        //click on edit 
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(5);
        
        //click on Batch Recall checkbox
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(2);
        //Check and set batch Recall is in enabled state
        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(2);

        //Display recall msg
        await batches.enterRecallMessage(testData[2]['newBatchDetails'].recallMsg)
        await wait.setTimeoutwait(2);
         //Check and set batch Recall Msg is displayed
        info.setBatchRecallMsg(await batches.checkBatchRecallMessage()) 
        await wait.setTimeoutwait(2);

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(false), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","", info.getBatchRecallMsg() )
        await wait.setTimeoutwait(12);

        matrix.generateImage(info.getProductId(), info.getbatchId(false), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(2);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(12);  

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    