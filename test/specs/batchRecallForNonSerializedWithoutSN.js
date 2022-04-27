
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('016_Edit batch to set batch recall without SN ', () => {

    if(!process.env.npm_config_browserOnly){
      
    after(async () => {
        console.log("Starting Mobile Execution");
        const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run batchRecallNonSerializedWithoutSnTest.js');
        console.log('stdout:', stdout1);
        console.log('stderr:', stderr1);
        })
        
        console.log("Running test suite in incremental mode and browser tests only")

    } else {

        console.log("different flag")
        
        }
    it('Browser - should verify Batch Recall and Recall Message for Non-serialized batches ', async () => {
        allureReporter.addDescription('Edit batch without serial number and check batch recall and display recall message')
        allureReporter.startStep('Update batch by not adding any serial numners.  Set the batch to recall it and add a display message for the same.')
        allureReporter.addTestId('BatchRecallAndBatchMessage_10_1')


        await batches.Batch();
        //created for QA
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')
        await wait.setTimeoutwait(8);

        let editValue = info.getbatchId()
        await wait.setTimeoutwait(3);
        //click on edit 
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(3);

        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //without serial number
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(3);
        
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
       
        //click on checkbox
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);
        //display recall msg
        await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        await wait.setTimeoutwait(3);

        //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), "", info.getBrandName(), await batches.checkBatchRecall(), await batches.checkBatchMessage(), "", await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),"" )
        await wait.setTimeoutwait(12);
        
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(16);

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    