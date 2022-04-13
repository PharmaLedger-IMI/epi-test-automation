
const batches= require('../pageobjects/batches.page.js');

const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('018_Create a batch with no batch message', () => {

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
   
    it('Browser - should create a batch with no batch message', async () => {
        allureReporter.addDescription("create new batch and don't enter batch message and update valid serial number")
        allureReporter.startStep(' Create a batch with no batch message.')
        allureReporter.addTestId('BatchRecallAndBatchMessage_11_1')
        await batches.Batch();
        await wait.setTimeoutwait(4);
        //add batch
        await batches.addBatch();
        await wait.setTimeoutwait(2);

        // await browser.execute('document.querySelector(`a[href="/batches"]`).click()')
        // await browser.pause(6000)   
        // await browser.execute('document.querySelector(`button[data-tag="add-batch"]`).click()') 
        // await browser.pause(3000)

        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(5);
        //enter date
        info.setCurrentRandomDate()
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
        await wait.setTimeoutwait(3);
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(5); 
        
         //set serial number
         await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
         await wait.setTimeoutwait(2);
         // await batches.enableResetAllValidSerialNumber()
         // await wait.setTimeoutwait(2);
         info.setSerialNumber(await batches.serialNum())
         await batches.enterSerialNumber(info.getSerialNumber())
         await wait.setTimeoutwait(4);
         await batches.acceptSerialNumber()
         await wait.setTimeoutwait(2);
         //no batch msg
        info.setBatchMsg(await batches.checkBatchMessage())
        await wait.setTimeoutwait(3);
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "",info.getBatchMsg(),"", "" )
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(12);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);      

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");



       
    })
})    