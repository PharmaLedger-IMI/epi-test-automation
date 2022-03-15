const batches= require('../pageobjects/batches.page.js');
const gtinPage = require('../specs/gtinPage.js');
const path= require('path');
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const info=require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile');


// const util = require('util');
// const exec = util.promisify(require('child_process').exec);


describe('Create Batch', () => {

    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

it('Should verify batch page ', async() => {
    allureReporter.addFeature('Create Batch')
    allureReporter.addSeverity('Critical');
    allureReporter.addTestId('ProdAndBatchSetup_1')
    allureReporter.addDescription('No. of batches can be created by Adding batch')
    allureReporter.startStep("Create a batch for the recent GTIN with all valid details.")
   
  
    await batches.Batch(); 
    await wait.setTimeoutwait(3);
    // await browser.execute('document.querySelector(`a[href="/batches"]`).click()')
    // await browser.pause(6000)   
    // await browser.execute('document.querySelector(`button[data-tag="add-batch"]`).click()')      
    await batches.addBatch(); 
    await wait.setTimeoutwait(3);
    
    info.setBatchId(await batches.batchIdValue())
    await wait.setTimeoutwait(3);
   
    await batches.siteName(testData[2]['newBatchDetails'].siteName); 
    await wait.setTimeoutwait(5);
    let expiryDate = info.setCurrentRandomDate()
    // info.setCurrentRandomDate(expiryDate)
    await wait.setTimeoutwait(2);
    await browser.execute((date) => {
        (function () {
            let event = new Event('change');
            let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
            datePicker.value = date;
            datePicker.dispatchEvent(event);
        })();
    }, expiryDate);

    await wait.setTimeoutwait(2);
    const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
     //await selectBox.selectByAttribute('value', '09088884204609');
    await wait.setTimeoutwait(2); 
    await selectBox.selectByAttribute('value', info.getProductId());
    await wait.setTimeoutwait(2);
    //enable dateselection
    await batches.enableDaySelection();
    await wait.setTimeoutwait(2);
    
    //enable incorrect expiration date verification
    await batches.enableIncorrectExpirationDateVerification()
    await wait.setTimeoutwait(2);
    //expiration date verification       
    await batches.expirationDateVerification()
    // enable serial number verification
    await wait.setTimeoutwait(2);
    await batches.enableSerialNumberVerification()
    await wait.setTimeoutwait(2);
    // manage serial numbers dropdown
     await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].updateValid)
     await wait.setTimeoutwait(5);
    //enable valid serial number
     await batches.enableResetAllValidSerialNumber()
     await wait.setTimeoutwait(2);
    //set serial number value
    info.setSerialNumber(await batches.serialNum())
    //enter serial number
    await batches.enterSerialNumber(info.getSerialNumber())
   // await batches.enterSerialNumber("123456")
    await wait.setTimeoutwait(5);
    // await batches.selectStolenReasonFromDropdown('Stolen')
    // manage serial number accept 
    await batches.acceptSerialNumber()
    await wait.setTimeoutwait(1);
    // cancel button
    // await batches.cancelSerialNumber()
    // await browser.pause(1000);
    // batch msg
    // await batches.batchMessage("Sample")
    // await browser.pause(1000);
    // add epi leaflet
    await batches.addEpi()
    await wait.setTimeoutwait(1);
    //
    await batches.selectLanguage(testData[2]['newBatchDetails'].selectLanguage)
    await wait.setTimeoutwait(2);
    //select type
    await batches.selectType(testData[2]['newBatchDetails'].selectType)
    await wait.setTimeoutwait(2);
   // video source
    await batches.videoSourceEpi(testData[2]['newBatchDetails'].videoSource)
    await wait.setTimeoutwait(2);
   // upload leaflet folder
    await browser.$('//input[@type=\'file\']').addValue(path.join(__dirname, '/src/Entresto'));
    await wait.setTimeoutwait(4); 
    //scrollIntoView
    await batches.acceptButton()
    await wait.setTimeoutwait(5);
    //checkbox
    // await batches.enableCheckToRecallThisBatch()
    // await browser.pause(3000)
    
    await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(), info.getBrandName(), "","","","")
    await wait.setTimeoutwait(3);
     
    //Create batch
     await batches.createBatch()

     await wait.setTimeoutwait(15);

    //Generate Image
   matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
   await wait.setTimeoutwait(8);

    
    allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
    allureReporter.endStep("passed");
    // await batches.cancelButton()
    // await browser.pause(1000)
});



})

