
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default



describe('Expiry date Checks ', () => {

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

    it('ExpiryDateChecks_1_1- create a batch with X expiry date and Create a 2D data matrix with details of above batch but different expiration date Y ', async () => {
        allureReporter.addDescription("create new batch and select future date. Pass different date in matrix")
        allureReporter.startStep('create a batch with X expiry date and Create a 2D data matrix with details of above batch but different expiration date Y')
        allureReporter.addTestId('ExpiryDateChecks_1_1')
        await batches.Batch();
        await wait.setTimeoutwait(2);
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(2);
      
        info.setCurrentRandomDate()
        await browser.pause(2000)
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, info.getCurrentRandomDate());
        await wait.setTimeoutwait(2);
        console.log("different date is"+ info.randomDate())

        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']'); 
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(2);
        //valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);

        //set serial number value
        info.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(5);
        // manage serial number accept 
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(1);
        //generate future date
        const futureDate=info.randomDate()
        console.log("future date is "+futureDate)
        info.setDateChange(futureDate,"day")
        info.setDateChange(futureDate,"month")
        info.setDateChange(futureDate,"year")
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), futureDate,  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        
         //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), futureDate, info.getSerialNumber())
        await wait.setTimeoutwait(5);

         //create batch
         await batches.createBatch()
         await wait.setTimeoutwait(8);
      
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    