// const gtinPage = require('./gtinPage.js');
// const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
//const wait=require('../utility/timeout')
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

    it('Expiry date Checks_3- should create a batch with only MonthYear as expiry date ', async () => {
    
        allureReporter.startStep('Create a batch with only MonthYear as expiry date')
        allureReporter.addTestId('Expiry date Checks_3')
        await batches.Batch();
        await browser.pause(4000)
        await batches.addBatch();
        await browser.pause(2000)
        info.setBatchId(await batches.batchIdValue())
        await browser.pause(3000)
        await batches.siteName(testData[2]['newBatchDetails'].siteName);
        await browser.pause(5000)
        //let expiryDate = info.randomDate()
        await batches.enableDaySelectionClick()
        await browser.pause(2000)
        //set the date
        let expiryDate = info.setCurrentRandomDate()
        let mmYYYY=expiryDate.substring(0, expiryDate.length - 3);
        let ddMMYYYY=mmYYYY+("-00")
        console.log("dayMonthYear "+ddMMYYYY)
        await browser.pause(2000)
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, mmYYYY);
        await browser.pause(2000);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']'); 
        await selectBox.selectByAttribute('value', info.getProductId());
        await browser.pause(3000);
        await batches.videoSource(testData[2]['newBatchDetails'].videoSource)
        await browser.pause(1000);
        info.setSerialNumber(await batches.serialNum())
        await browser.pause(2000);
       
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), ddMMYYYY,  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await browser.pause(12000)
        matrix.generateImage(info.getProductId(), info.getbatchId(), ddMMYYYY, info.getSerialNumber())
        await browser.pause(5000)
        //create batch
        await batches.createBatch()
        await browser.pause(8000);
       

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    