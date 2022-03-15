//const LoginPage = require('../pageobjects/login.page');
//const gtinPage = require('../specs/gtinPage.js');
//const digits= require('../pageobjects/digit.cal.js');
const products= require('../pageobjects/products.page');
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');
// const fs = require('fs');

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
//let data =JSON.parse(fs.readFileSync('test/testData/myjsonFile.json'))
//const testData= require('../test/testdata/myjsonFile.json')


describe('Create Product', () => {
  
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

    await products.brandName(testData[1]['newProductDetails'].brandName);
    info.setBrandName(await products.checkBrandName()) 
    await wait.setTimeoutwait(2);
    await products.productDescription(testData[1]['newProductDetails'].productDescription); 
    await wait.setTimeoutwait(4);
    //Upload product photo
    const filePath = path.join(__dirname, '/src/entresto.jpg');
    await products.productPhoto(filePath);
    await wait.setTimeoutwait(1);
    //internal material code
    await products.internalMaterialCode(testData[1]['newProductDetails'].internalMaterialCode)
    await wait.setTimeoutwait(1);
    //strength
    await products.addStrength(testData[1]['newProductDetails'].addStrength)
    await wait.setTimeoutwait(1);
    // video source
    await products.videoSource(testData[1]['newProductDetails'].videoSource)
    await wait.setTimeoutwait(2);
    await products.enableBatchIsRecalled(); 
    await wait.setTimeoutwait(1);
     //add epi
     await products.addEpi()
     await wait.setTimeoutwait(3);
     //select language	
    //  await products.selectLanguage(testData[1]['newProductDetails'].selectLanguage)
    //  await wait.setTimeoutwait(1);
       //select type
    //  await products.selectType(testData[1]['newProductDetails'].selectType)
    //  await wait.setTimeoutwait(2);
     //Video source
     await products.videoSourceEpi(testData[1]['newProductDetails'].videoSource)
     await wait.setTimeoutwait(1);
     await browser.$('(//input[@type=\'file\'])[2]').addValue(path.join(__dirname, '/src/Entresto'));
     await wait.setTimeoutwait(3);
     //add epi accept
     await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
     await wait.setTimeoutwait(3);

    //  await wait.waitforelement(await products.saveProduct());
     //Save product
     await products.saveProduct()
     await wait.setTimeoutwait(15);
    
     allureReporter.endStep("passed");
     allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
    
    
 });

})