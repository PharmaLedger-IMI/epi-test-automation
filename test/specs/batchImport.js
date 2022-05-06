
const batches= require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default

const wait=require('../utility/timeout')
const path= require('path');

describe('114_Create a batch via import of Json', () => {


    it('Browser - create a batch via import of Json ', async() => { 
        allureReporter.addTestId('ImportJson_1_3')
        allureReporter.addDescription('Create a batch via import of Json')
        allureReporter.startStep('1. Use the standard template Json', 
        '2. Fill up the details on the json', 
        '3. Use the import functionality to select the file', 
        '4. Click on import', 
        '5. Check the log for the import operation ')

        await batches.Batch(); 
        await wait.setTimeoutwait(8);
        await batches.clickImport()
        await wait.setTimeoutwait(3);

        await batches.selectFile(path.join(__dirname,'../testdata/sampleBatchImport.json'));
        await wait.setTimeoutwait(5);
    
        //await batches.import()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')

        await wait.setTimeoutwait(10); 
        
        //view message
        await batches.viewMessageInSuccessLogs()
        await wait.setTimeoutwait(5); 

        await batches.downloadMsgInSuccessLogs()
        await wait.setTimeoutwait(10); 

        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})