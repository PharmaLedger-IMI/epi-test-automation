
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);


describe('017_Edit batch to undo batch recall without SN ', () => {

    if(!process.env.npm_config_browserOnly){
       


    after(async () => {
        console.log("Starting Mobile Execution");
        const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run batchUncheckRecallMsgNonSerilaizedWithoutSnTest.js');
        console.log('stdout:', stdout1);
        console.log('stderr:', stderr1);
        })

    console.log("Running test suite in incremental mode and browser tests only")

    } else {

    console.log("different flag")
    } 

    it('Browser - should verify Batch Recall and Recall Message for Non-serialized batches ', async () => {
        allureReporter.addDescription('Edit batch without entering serial number and uncheck batch recall and clear recall message')
        allureReporter.startStep('Go back to the Batch on the Enterprise Wallet and undo the batch recall flag.')
        allureReporter.addTestId('BatchRecallAndBatchMessage_10_2')
       
        await batches.Batch(); 
        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        await wait.setTimeoutwait(2);
        //click on edit batch
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(2);


         //select valid serial number
         await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
         await wait.setTimeoutwait(3);
         //reset the serial number
         await batches.enableResetAllValidSerialNumber()
         await wait.setTimeoutwait(3);
         //accept serial number
         await batches.acceptSerialNumber()
         await wait.setTimeoutwait(3);
        //clear recall message
        await batches.clearRecallMessage()
        await wait.setTimeoutwait(3);
        //undo the batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);
        //set batch recall 
        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(3);
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  "",info.getBrandName(),info.getBatchRecall(), await batches.checkBatchMessage(),"", "" )
        await wait.setTimeoutwait(13);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),"")
        await wait.setTimeoutwait(8);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    