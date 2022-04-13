
const products= require('../pageobjects/products.page');
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default

const wait=require('../utility/timeout')
const path= require('path');
const fs = require('fs');

describe('108_Update a product via import of Json by deleting product code & name of medicinal product', () => {

    

    it('Browser - update a product via import of Json ', async() => { 
        allureReporter.addTestId('ImportJson_2_6')
        allureReporter.addDescription('Update a product via import of Json by deleting product code & name of medicinal product elemet and uploading modified file. View message and click on invalid field info')
        allureReporter.startStep('1. Use the standard template Json', 
        '2. Fill up the details on the json', 
        '3. Use the import functionality to select the file', 
        '4. Click on import', 
        '5. Check the log for the import operation ')

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(4);
        await products.clickImport()
        await wait.setTimeoutwait(3);

       
        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))
        const productCodeValue=rawdata.product.productCode
        const nameMedicinalProductValue=rawdata.product.nameMedicinalProduct
        delete rawdata.product.productCode
        delete rawdata.product.nameMedicinalProduct
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))

        await wait.setTimeoutwait(2);
        await products.selectFile(path.join(__dirname,'../testdata/sampleProductImport.json'));
        await wait.setTimeoutwait(8);
       
        //click on import
        await products.import()
        await wait.setTimeoutwait(20); 

        //update json file
        rawdata.product.productCode = productCodeValue
        rawdata.product.nameMedicinalProduct = nameMedicinalProductValue
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(8);
        
        //view message
        await products.viewMessage()
        await wait.setTimeoutwait(5); 
        await products.invalidFieldInfo()
        await wait.setTimeoutwait(5); 
        await products.invalidFieldInfoRequired()
        await wait.setTimeoutwait(5); 

        await products.closeButtonInPopup()
        await wait.setTimeoutwait(5); 

         

        
        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})