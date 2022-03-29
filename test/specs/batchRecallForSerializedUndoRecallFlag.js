// const gtinPage = require('./gtinPage.js');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
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
    
        allureReporter.startStep('Go back to the Batch on the Enterprise Wallet and undo the batch recall flag for above batch. ')
        
        allureReporter.addTestId('BatchRecall&Msg_1')

        let editValue = info.getbatchId()
    
        //Again click on edit batch
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(2);
         
        //set batch recall msg
        info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(2);

        //undo the batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(2);

        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(2);

       
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","",  await batches.checkBatchRecallMessage() )
        await wait.setTimeoutwait(12);

        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(12);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(12);
       

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    