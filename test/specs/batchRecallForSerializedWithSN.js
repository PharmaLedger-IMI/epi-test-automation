// const gtinPage = require('./gtinPage.js');
//const products= require('../pageobjects/products.page');
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
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        
        let editValue = info.getbatchId()
        //click on edit 
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(5);

        await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].updateValid)
        await wait.setTimeoutwait(2);
        // await batches.enableResetAllValidSerialNumber()
        // await wait.setTimeoutwait(2);
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(4);
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);
        
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

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","", info.getBatchRecallMsg() )
        await wait.setTimeoutwait(12);

        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(2);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(12);  

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    