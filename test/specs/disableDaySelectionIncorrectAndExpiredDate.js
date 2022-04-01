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
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('Expiry date Checks_C3.2- should create a batch by disabling day selection, incorrect and expired date ', async () => {
    
        allureReporter.startStep('Create a batch by disabling day selection, incorrect and expired date')
        allureReporter.addTestId('Expiry date Checks_C3.2')
        await batches.Batch();
        await wait.setTimeoutwait(2);
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        await batches.siteName(testData[2]['newBatchDetails'].siteName);
        await wait.setTimeoutwait(2);
        //click on day selection
        await batches.enableDaySelectionClick()
        await wait.setTimeoutwait(2);
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
        await wait.setTimeoutwait(2);
        //click on Incorrect Expiration Date Verification
        await batches.enableIncorrectExpirationDateVerificationClick()
        await wait.setTimeoutwait(2);
        //click on Enable Expired Expiration Date Verification
        await batches.expirationDateVerificationClick()
        await wait.setTimeoutwait(2);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']'); 
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);
        await batches.videoSource(testData[2]['newBatchDetails'].videoSource)
        await wait.setTimeoutwait(2);
        //update serial number
        await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].updateValid)
        await wait.setTimeoutwait(5);

        //set serial number value
        info.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(5);
        // manage serial number accept 
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(1);
       
        await data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), ddMMYYYY,  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), ddMMYYYY, info.getSerialNumber())
        await wait.setTimeoutwait(5);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(8);
       

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    