const gtinPage = require('./gtinPage.js');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
//const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Batch Recall and Recall Message for serialized batches ', () => {
    // after(async () => {
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
        await browser.pause(3000)

        // //Clear recall msg
        // await batches.clearRecallMessage()
        // await browser.pause(3000);
        //Check and set batch Recall Msg is displayed
         

        info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await browser.pause(4000)

        //undo the batch recall
        await batches.enableCheckToRecallThisBatch()
        await browser.pause(4000)


        info.setBatchRecall(await batches.checkBatchRecall())
        await browser.pause(4000)

       

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","",  await batches.checkBatchRecallMessage() )
        await browser.pause(15000)

        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await browser.pause(12000)

        //update batch
        await batches.updateBatchForEdit()
        await browser.pause(40000);
       

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    