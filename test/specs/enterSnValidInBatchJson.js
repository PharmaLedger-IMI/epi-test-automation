
const batches= require('../pageobjects/batches.page');
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default

const wait=require('../utility/timeout')
const path= require('path');
const fs = require('fs');


describe('124_Update a product via import of Json to enter valid serial number flag  ', () => {

    

    it('Browser - update a product via import of Json ', async() => { 
        allureReporter.addTestId('ImportJson_4_11')
        allureReporter.addDescription('Update a product via import of Json to enter valid serial number and uploading modified file. View message and click on invalid field info')
        allureReporter.startStep('1. Use the standard template Json', 
        '2. Fill up the details on the json', 
        '3. Use the import functionality to select the file', 
        '4. Click on import', 
        '5. Check the log for the import operation ')

        await batches.Batch()
        await wait.setTimeoutwait(4);

       
        await batches.clickImport()
        // await wait.setTimeoutwait(3);

       
        let rawdata = JSON.parse(fs.readFileSync(testData.path.batchImport, 'utf8'))
        const snValidValue= rawdata.batch.snValid
        if( rawdata.batch.snValid==''){
            rawdata.batch.snValid=[parseInt(testData.incrementalTest.serialNumber)]
            console.log("valid serial number is "+ rawdata.batch.snValid)
    }
    else{
        console.log("serial number exists in json"+ rawdata.batch.snValid)
    }
      
        fs.writeFileSync(testData.path.batchImport, JSON.stringify(rawdata))

        await wait.setTimeoutwait(2);
        await batches.selectFile(path.join(__dirname,'../testdata/sampleBatchImport.json'));
        await wait.setTimeoutwait(8);
       
        //click on import
        await batches.import()
        await wait.setTimeoutwait(20);
        
         //update json file
         rawdata.batch.snValid= snValidValue
       
         fs.writeFileSync(testData.path.batchImport, JSON.stringify(rawdata))
         await wait.setTimeoutwait(8);
         
        //view message
        await batches.viewMessageInSuccessLogs()
        await wait.setTimeoutwait(5); 
         
        await batches.downloadMsgInSuccessLogs()
        await wait.setTimeoutwait(5); 

        // await batches.closeButtonInPopup()
        // await wait.setTimeoutwait(5); 

        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})