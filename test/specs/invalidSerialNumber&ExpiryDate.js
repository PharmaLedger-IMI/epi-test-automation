const batches= require('../pageobjects/batches.page.js');
//const path= require('path');
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const info=require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile');




// const util = require('util');
// const exec = util.promisify(require('child_process').exec);


describe('Other tests', () => {
   
   
    // after(async () => {
    //      console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run addProductBatchTest');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })
    
  it('Other tests_1-Should verify serial number invalid and expiry date invalid ', async() => {
    allureReporter.addTestId('Other tests_1')
    allureReporter.startStep("Scan a data matrix code where the Serial number is invalid and expiry date is also invalid ")
   
   
    // await batches.Batch(); 
    // await wait.setTimeoutwait(3);
    //Created for QA environment
    await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')
    await browser.pause(6000)   
      
      let editValue = info.getbatchId()
      console.log("editValue is " + editValue)
      await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
      await wait.setTimeoutwait(6);

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

    await wait.setTimeoutwait(2);
    const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
    await wait.setTimeoutwait(2); 
    await selectBox.selectByAttribute('value', info.getProductId());
    await wait.setTimeoutwait(2);
   
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

    const invalidSerialNumber=await batches.serialNum()
    console.log('invalid serial number '+invalidSerialNumber)
    await wait.setTimeoutwait(2);

    const incorrectExpiryDate=info.randomDateExpired()
    await wait.setTimeoutwait(2);

    await data.generateExpectationFile(info.getProductId(), info.getbatchId(), incorrectExpiryDate,  invalidSerialNumber, info.getBrandName(), "","","","", await batches.epiDisplayed())
    await wait.setTimeoutwait(6);
 
    //Generate Image
    matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), incorrectExpiryDate, invalidSerialNumber)
    await wait.setTimeoutwait(8);

    //Create batch
    await batches.updateBatchForEdit()
    await wait.setTimeoutwait(15);


    
    allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
    allureReporter.endStep("passed");
    // await batches.cancelButton()
    // await browser.pause(1000)
});
    



})

