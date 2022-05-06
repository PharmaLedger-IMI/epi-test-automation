
const batches= require('../pageobjects/batches.page');
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default

const wait=require('../utility/timeout')
const path= require('path');
const fs = require('fs');

describe('116_Update a batch via import of Json by deleting batch ', () => {

    

    it('Browser - update a batch via import of Json ', async() => { 
        allureReporter.addTestId('ImportJson_4_2')
        allureReporter.addDescription('Update a batch via import of Json by deleting batch elemet and uploading modified file. View message and click on invalid field info')
        allureReporter.startStep('1. Use the standard template Json', 
        '2. Fill up the details on the json', 
        '3. Use the import functionality to select the file', 
        '4. Click on import', 
        '5. Check the log for the import operation ')

        await batches.Batch(); 
        await wait.setTimeoutwait(8);
        await batches.clickImport()
        await wait.setTimeoutwait(3);

       
        let rawdata = JSON.parse(fs.readFileSync(testData.path.batchImport, 'utf8'))
        const batchValue=rawdata.batch.batch
        delete rawdata.batch.batch
        fs.writeFileSync(testData.path.batchImport, JSON.stringify(rawdata))

        await wait.setTimeoutwait(3);
        await batches.selectFile(path.join(__dirname,'../testdata/sampleBatchImport.json'));
        await wait.setTimeoutwait(8);

       
        //click on import
       // await batches.import()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')

        await wait.setTimeoutwait(20); 

        //update json file
        rawdata.batch.batch = batchValue
        fs.writeFileSync(testData.path.batchImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(8);
        
        //view message
        await batches.viewMessageInFailedLogs()
        await wait.setTimeoutwait(5);
        //click invalid field info 
        await batches.invalidFieldInfo()
        await wait.setTimeoutwait(5); 
        //Read invalid field info
        await batches.invalidFieldInfoRequired()
        await wait.setTimeoutwait(5);
        
        await batches.downloadMsgInFailedLogs()
        await wait.setTimeoutwait(10); 
        //close
        // await batches.closeButtonInPopup()
        // await wait.setTimeoutwait(5); 

         

        
        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})