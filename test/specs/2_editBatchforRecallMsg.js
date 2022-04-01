const batches= require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Edit batch', () => {

    // after(async () => {
    //     console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run editBatchRecallMsgTest');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdAndBatchSetup_1-Should edit batch for recall message', async() => {
        //allureReporter.addDescription('Check batch recall and enter recall message ')
        allureReporter.startStep("Update any field on the batch and Save the changes")
        allureReporter.addTestId('ProdAndBatchSetup_1')

         await batches.Batch(); 
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        console.log("editValue is "+editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(6);

         //select recalled serial number
         await batches.selectUpdateRecalledSerialFromDropdown(testData[2]['newBatchDetails'].updateRecalled)
         await wait.setTimeoutwait(2);
        //  //enable checkbox
        //  await batches.enableResetAllRecalledSerialNumber()
        //  await wait.setTimeoutwait(2);
         //set the serial number and enter
         info.setSerialNumber(await batches.serialNum())
         await wait.setTimeoutwait(2);
         await batches.enterSerialNumber(info.getSerialNumber())
         await wait.setTimeoutwait(2);
               
         //accept serial number
         await batches.acceptSerialNumber()
         await wait.setTimeoutwait(2);

         //enable checkbox for batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);
        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(2);
        //enter batch msg
        await batches.enterRecallMessage(testData[2]['newBatchDetails'].recallMsg)
        await wait.setTimeoutwait(4);
        info.setBatchRecallMsg(await batches.checkBatchRecallMessage()) 
        await wait.setTimeoutwait(2);

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","", info.getBatchRecallMsg())
        await wait.setTimeoutwait(12);
        
         await batches.updateBatchForEdit()
         await wait.setTimeoutwait(10);
         matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
         await wait.setTimeoutwait(8);
       
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");

    })
})