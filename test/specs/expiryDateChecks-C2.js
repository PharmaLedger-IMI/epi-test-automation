// const gtinPage = require('./gtinPage.js');
// const products= require('../pageobjects/products.page');
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

    it('Expiry date Checks_C2- should create a batch with X expiry date ', async () => {
    
        allureReporter.startStep('create a batch with X expiry date and Create a 2D data matrix with details of above batch but different expiration date Y')
        allureReporter.addTestId('Expiry date Checks_C2')
        await batches.Batch();
        await browser.pause(4000)
        await batches.addBatch();
        await browser.pause(2000)
        info.setBatchId(await batches.batchIdValue())
        await browser.pause(3000)
        await batches.siteName(testData[2]['newBatchDetails'].siteName);
        await browser.pause(5000)
        //let expiryDate = info.randomDate()
      
        let expiryDate = info.setCurrentRandomDate()
        await browser.pause(2000)
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, expiryDate);
        //
        console.log("different date is"+ info.randomDate())
        await browser.pause(2000);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']'); 
        await selectBox.selectByAttribute('value', info.getProductId());
        await browser.pause(3000);
        await batches.videoSource(testData[2]['newBatchDetails'].videoSource)
        await browser.pause(1000);
        info.setSerialNumber(await batches.serialNum())
        await browser.pause(2000);
       
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await browser.pause(12000)
        //create batch
        await batches.createBatch()
        await browser.pause(8000);
       
        matrix.generateImage(info.getProductId(), info.getbatchId(), info.randomDateExpired(), info.getSerialNumber())
        await browser.pause(5000)
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    