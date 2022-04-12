
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')

const allureReporter = require('@wdio/allure-reporter').default

describe('Combination checks ', () => {

    if(!process.env.npm_config_browserOnly){
        const util = require('util');
        const exec = util.promisify(require('child_process').exec);

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
    it('BatchRecallAndBatchMessage_12_3-should verify Combination checks ', async () => {
        allureReporter.addDescription("Edit batch and check batch recall, enter recall message and pass wrong serial number in matrix")
        allureReporter.startStep('2. Create a batch',
        '3. Choose a expiry date such that the batch is expired', 
        '4. Make the batch recalled check flag ',
        '5. Enter a serial number',
        '6. Save the batch',
        '7. Scan the "Wrong" serial number')
        allureReporter.addTestId('BatchRecallAndBatchMessage_12_3')        

        // await batches.Batch(); 
        await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        console.log("editValue is "+editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(6);

        const expiredDate=info.randomDateExpired()
        await wait.setTimeoutwait(2);
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
        // await wait.setTimeoutwait(2);
        // //set batch recall
        // info.setBatchRecall(await batches.checkBatchRecall())
        // await wait.setTimeoutwait(2);
        // await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        // await wait.setTimeoutwait(2);
        // //set batch recall msg
        // info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        // await wait.setTimeoutwait(2);

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(2);
        // //enable checkbox
        // await batches.enableResetAllValidSerialNumber()
        // await wait.setTimeoutwait(2);
        //set the serial number and enter
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);

        const invalidSerialNumber=await batches.serialNum()
        console.log('invalid serial number '+invalidSerialNumber)
        await wait.setTimeoutwait(2);

         //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), expiredDate,  invalidSerialNumber,info.getBrandName(), info.getBatchRecall(),"","", info.getBatchRecallMsg())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), expiredDate, invalidSerialNumber)
        await wait.setTimeoutwait(12);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(2);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    