
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('015_Edit batch to undo batch recall with valid SN ', () => {

    if(!process.env.npm_config_browserOnly){
       
    after(async () => {
        console.log("Starting Mobile Execution");
        const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run batchUncheckRecallFlagWithSerializedTest.js');
        console.log('stdout:', stdout1);
        console.log('stderr:', stderr1);
        })

        console.log("Running test suite in incremental mode and browser tests only")

    } else {

        console.log("different flag")

    }


    it('Browser - should verify Batch Recall and Recall Message for serialized batches ', async () => {
        allureReporter.addDescription('Edit batch by updating valid Serial Numbers and unchecking batch recall and clearing recall message')
        allureReporter.startStep('Go back to the Batch on the Enterprise Wallet and undo the batch recall flag for above batch. ')
        allureReporter.addTestId('BatchRecallAndBatchMessage_9_2')

        await batches.Batch(); 
        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        await wait.setTimeoutwait(3);
        //edit batch
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(4);

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //set the serial number and enter
        info.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(3);
        
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
         
        //clear recall msg
        await batches.clearRecallMessage()
        await wait.setTimeoutwait(3);
        //set batch recall msg
        // info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        // await wait.setTimeoutwait(3);

        //undo the batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);

        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(3);

        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","",  "" )
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(12);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(16);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    