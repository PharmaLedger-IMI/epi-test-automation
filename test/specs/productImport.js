
const products= require('../pageobjects/products.page');
const allureReporter = require('@wdio/allure-reporter').default
const wait=require('../utility/timeout')
const path= require('path');

describe('102_Import product', () => {

    

    it('Browser - create a product via import of Json ', async() => { 
        allureReporter.addTestId('ImportJson_1_1')
        allureReporter.addDescription('Create a product via import of Json  ')
        allureReporter.startStep('1. Use the standard template Json', 
        '2. Fill up the details on the json', 
        '3. Use the import functionality to select the file', 
        '4. Click on import', 
        '5. Check the log for the import operation ')

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(3);
        await products.clickImport()
        await wait.setTimeoutwait(3);

        await products.selectFile(path.join(__dirname,'../testdata/sampleProductImport.json'));
        await wait.setTimeoutwait(5);
    
        await products.import()
        await wait.setTimeoutwait(10);  

 
        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})