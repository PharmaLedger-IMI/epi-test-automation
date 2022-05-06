
const products= require('../pageobjects/products.page');
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default


const wait=require('../utility/timeout')
const path= require('path');
const fs = require('fs');

describe('113_Update a product via import of Json to enter incorrect batch expired flag', () => {

    

    it('Browser - update a product via import of Json ', async() => { 
        allureReporter.addTestId('ImportJson_2_8')
        allureReporter.addDescription('Update a product via import of Json to enter incorrect batch expired flag and uploading modified file. View message and click on invalid field info')
        allureReporter.startStep('1. Use the standard template Json', 
        '2. Fill up the details on the json', 
        '3. Use the import functionality to select the file', 
        '4. Click on import', 
        '5. Check the log for the import operation ')

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(8);
        await products.clickImport()
        await wait.setTimeoutwait(3);

       
        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))
        const flagDisplayEPI_BatchExpiredValue=rawdata.product.flagDisplayEPI_BatchExpired
        rawdata.product.flagDisplayEPI_BatchExpired=  Math.random().toString(36).substring(2, 5)
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))

        await wait.setTimeoutwait(4);
        await products.selectFile(path.join(__dirname,'../testdata/sampleProductImport.json'));
        await wait.setTimeoutwait(8);
       
        //click on import
        // await products.import()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')

        await wait.setTimeoutwait(20);
        
         //update json file
         rawdata.product.flagDisplayEPI_BatchExpired = flagDisplayEPI_BatchExpiredValue
         fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))
         await wait.setTimeoutwait(8);
         
        //view message
        await products.viewMessageInFailedLogs()
        await wait.setTimeoutwait(5); 

         //click invalid field info 
         await products.invalidFieldInfo()
         await wait.setTimeoutwait(5); 
         //Read invalid field info
         await products.invalidFieldInfoRequired()
         await wait.setTimeoutwait(5); 
 
         await products.downloadMsgInFailedLogs()
         await wait.setTimeoutwait(10); 
        
        // await products.closeButtonInPopup()
        // await wait.setTimeoutwait(5); 

        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})