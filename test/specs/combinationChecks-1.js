// const gtinPage = require('../specs/gtinPage.js');
//const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
//const createbatch= require('../specs/createBatch.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
//const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('Combination checks ', () => {

     // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })
    
    it('BatchRecall&Msg_Checks-should verify Combination checks-1 ', async () => {
    
        allureReporter.startStep('2. Create a batch 3. Add Valid serial number 4. Add valid expiry date 5. Add a recall message')
        allureReporter.addTestId('BatchRecall&Msg_Checks')
        await batches.Batch();
        await wait.setTimeoutwait(2);
        await batches.addBatch();
        await wait.setTimeoutwait(2);
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
        await wait.setTimeoutwait(4);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');  
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);
        await batches.videoSource(testData[2]['newBatchDetails'].videoSource)
        await wait.setTimeoutwait(2);
       
        //Add valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].updateValid)
        await wait.setTimeoutwait(5);
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(2);
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);

        //enable recall checkbox
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(2);
        //set batch recall
        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(2);
        await batches.enterRecallMessage(testData[2]['newBatchDetails'].recallMsg)
        await wait.setTimeoutwait(2);
        //set batch recall msg
        info.setBatchRecallMsg(await batches.checkBatchRecallMessage()) 
        await wait.setTimeoutwait(2);
        //Generate expectation file
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall()," ","", info.getBatchRecallMsg())
        await wait.setTimeoutwait(12);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(12);

        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(12);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    