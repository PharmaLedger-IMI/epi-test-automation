
const batches = require('../pageobjects/batches.page')
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);


describe('023_Edit batch to select expired date', () => {

    if(!process.env.npm_config_browserOnly){
       

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
    it('Browser - should verify Combination checks ', async () => {
        allureReporter.addDescription("Edit batch and check batch recall, enter recall message and select expired date")
        allureReporter.startStep('1. Edit a batch')
        allureReporter.startStep('2. Choose a expiry date such that the batch is expired') 
        allureReporter.startStep('3. Make the batch recalled check flag ')
        allureReporter.addTestId('BatchRecallAndBatchMessage_12_2')
        
        
         await batches.Batch(); 
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        console.log("editValue is "+editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(6);

        const expiredDate=info.randomDateExpired()
        await wait.setTimeoutwait(3);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, expiredDate);

        // //enable recall checkbox
        // await batches.enableCheckToRecallThisBatch()
        // await wait.setTimeoutwait(3);
        // //set batch recall
        // info.setBatchRecall(await batches.checkBatchRecall())
        // await wait.setTimeoutwait(3);
        // await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        // await wait.setTimeoutwait(3);
        // //set batch recall msg
        // info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        // await wait.setTimeoutwait(3);

        
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), expiredDate,  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","", info.getBatchRecallMsg())
        await wait.setTimeoutwait(13);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), expiredDate, info.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");
       
    })
})    