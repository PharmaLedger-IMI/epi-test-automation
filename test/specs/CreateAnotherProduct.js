
const products= require('../pageobjects/products.page');
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');
const moment = require('moment')

// const fs = require('fs');

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
//let data =JSON.parse(fs.readFileSync('test/testData/myjsonFile.json'))
//const testData= require('../test/testdata/myjsonFile.json')


describe('Create Product', () => {
    if (process.argv[incrementalArg].split('=')[1] == "true") {

        console.log("This testcase is running for existing product")
        
    }
    else{
  
it('should verify product page', async() => {      
    
    allureReporter.addFeature('Create Product')
    allureReporter.addSeverity('Critical');
    allureReporter.addTestId('ProdAndBatchSetup_1')
    allureReporter.addDescription('No. of products can be created by Adding Product')
    allureReporter.startStep("Create new product with a valid GTIN, and add the ePI");

    await products.clickProduct();
    await wait.setTimeoutwait(2);
    await products.addProduct();
    await wait.setTimeoutwait(5);
    await products.enterGtinCode(info.getProductId());
    await wait.setTimeoutwait(2);

    var dateStringWithTime = moment().format('DD-MM-YY h:mm:ss');
    console.log(dateStringWithTime)
    await products.brandName(testData[1]['newProductDetails'].brandName + dateStringWithTime) 
    info.setBrandName(await products.checkBrandName()) 
    await wait.setTimeoutwait(2);
    await products.productDescription(testData.newProductDetails.medicinalProductName); 
    await wait.setTimeoutwait(4);
    //Upload product photo
    await products.productPhoto(path.join(__dirname, '/src/entresto.jpg'));
    await wait.setTimeoutwait(1);
    //internal material code
    await products.internalMaterialCode(testData.newProductDetails.internalMaterialCode)
    await wait.setTimeoutwait(1);
    //strength
    await products.addStrength(testData.newProductDetails.addStrength)
    await wait.setTimeoutwait(1);
    // video source
    await products.videoSource(testData.newProductDetails.videoSource)
    await wait.setTimeoutwait(2);
    //enable batch is recalled
    await products.enableBatchIsRecalled(); 
    await wait.setTimeoutwait(1);
    //
    await products.enableExpirationDateIsIncorrect(); 
    await wait.setTimeoutwait(1);
    //
    await products.enableSnIsInRecallList(); 
    await wait.setTimeoutwait(1);
    //
    await products.enableSnIsInDecommissionedList(); 
    await wait.setTimeoutwait(1);
    //
    await products.enableSnIsUnknown(); 
    await wait.setTimeoutwait(1);
     //add english leaflet
     await products.addEpi()
     await wait.setTimeoutwait(3);
     
     //Video source
     await products.videoSourceEpi(testData.newProductDetails.videoSource)
     await wait.setTimeoutwait(1);
     //Upload epi
     const uploadEpiFile=path.join(__dirname, '/src/Leaflet_ProductLevel')
     await products.uploadFile(uploadEpiFile);
     await wait.setTimeoutwait(3);
     //add epi accept
     await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
     await wait.setTimeoutwait(3);
     //add epi
     await products.addEpi()
     await wait.setTimeoutwait(3);
     //select language	
     await products.selectLanguage(testData.newProductDetails.selectLanguage)
     await wait.setTimeoutwait(1);
      // select type
     await products.selectType(testData.newProductDetails.selectType)
     await wait.setTimeoutwait(2);
     //Video source
     await products.videoSourceEpi(testData.newProductDetails.videoSource)
     await wait.setTimeoutwait(1);
     //Upload smpc 
     await products.uploadFile(path.join(__dirname, '/src/Leaflet_ProductLevel'));
     await wait.setTimeoutwait(3);
     //add epi accept
     await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
     await wait.setTimeoutwait(3);

     //Save product
     await products.saveProduct()
     await wait.setTimeoutwait(50);
    
     allureReporter.endStep("passed");
     allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
    
    
 });
}

})