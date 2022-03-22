
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Expiry date Checks ', () => {

    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('Serial Number Checks_4- should Create a batch and enable serial number verification and set recalled serial numbers ', async () => {
    
        allureReporter.startStep('Create a batch and enable serial number verification and set recalled serial numbers')
        allureReporter.addTestId('Serial Number Checks_4')
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
        
        console.log("different date is"+ info.randomDate())
        await wait.setTimeoutwait(2);
       
        //select product from dropdown
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']'); 
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);
        //check enable serial number verification
        await batches.enableSerialNumberVerification()
        await wait.setTimeoutwait(2);
        //select recalled serial number
        await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].updateRecalled)
        await wait.setTimeoutwait(2);
        //enable checkbox
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(2);
        //set the serial number and enter
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);
       
       
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(8);
       
        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    