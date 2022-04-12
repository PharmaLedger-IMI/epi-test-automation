const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
//const path= require('path');
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const info=require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile');



describe('Other tests', () => {
   
   
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
    
  it('Other tests_2-Should  Create a data matrix with same GTIN but the batch is invalid and expiry date is also invalid   ', async() => {
    allureReporter.addTestId('Other tests_2')
    allureReporter.startStep("Display ePI when Batch# is unknown flag is un-checked, ePI should not be displayed with message Batch number in barcode could not be found")
   
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(2);
        console.log("prod to edit" + info.getProductId())
       // search the product codes
        await products.searchProductCode(info.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);
       
        //uncheck batch is unknow
        await products.disableBatchNumberUnknown()
        await wait.setTimeoutwait(5);

        // //add epi
        // await products.addEpi()
        // await wait.setTimeoutwait(3);
        // //select language	
        // await products.selectLanguage(testData.newProductDetails.selectLanguage)
        // await wait.setTimeoutwait(1);
        // // select type
        // await products.selectType(testData.newProductDetails.selectType)
        // await wait.setTimeoutwait(2);
        // //Video source
        // await products.videoSourceEpi(testData.newProductDetails.videoSource)
        // await wait.setTimeoutwait(1);
        // //Upload smpc 
        // await products.uploadFile(path.join(__dirname, '/src/SMPC_ProductLevel'));
        // await wait.setTimeoutwait(3);
        // //add epi accept
        // await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
        // await wait.setTimeoutwait(3);


        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);

         //update products
         await products.updateProduct()
         await wait.setTimeoutwait(8); 

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

    const unknownBatch= info.unKnownBatch()
    await wait.setTimeoutwait(2);

    const incorrectExpiryDate=info.randomDateExpired()
    await wait.setTimeoutwait(2);
    
    await data.generateExpectationFile(info.getProductId(), unknownBatch, incorrectExpiryDate,  info.getSerialNumber(), info.getBrandName(), "","","","", await batches.epiDisplayed())
    await wait.setTimeoutwait(6);
 
    //Generate Image
    matrix.generate2dMatrixImage(info.getProductId(), unknownBatch, incorrectExpiryDate, info.getSerialNumber())
    await wait.setTimeoutwait(8);

    //Create batch
    await batches.updateBatchForEdit()
    await wait.setTimeoutwait(15);

    allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
    allureReporter.endStep("passed");

});
    
})

