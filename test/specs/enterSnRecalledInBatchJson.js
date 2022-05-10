
const batches = require('../pageobjects/batches.page');
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const wait = require('../utility/timeout')
const path = require('path');
const fs = require('fs');




describe('123_Update a batch via import of Json to enter recalled serial number flag  ', () => {



    it('Browser - update a batch via import of Json ', async () => {
        allureReporter.addTestId('ImportJson_4_9')
        allureReporter.addDescription('Update a batch via import of Json to enter recalled serial number and uploading modified file. View message and click on invalid field info')
        allureReporter.addStep('1. Use the standard template Json')
        allureReporter.addStep('2. Fill up the details on the json')
        allureReporter.addStep('3. Use the import functionality to select the file')
        allureReporter.addStep('4. Click on import')
        allureReporter.addStep('5. Check the log for the import operation')

        await batches.Batch()
        await wait.setTimeoutwait(8);


        await batches.clickImport()
        // await wait.setTimeoutwait(3);


        let rawdata = JSON.parse(fs.readFileSync(testData.path.batchImport, 'utf8'))
        const snRecalledValue = rawdata.batch.snRecalled
        const snValidValue = rawdata.batch.snValid
        rawdata.batch.snValid = []
        rawdata.batch.snRecalled = [parseInt(testData.incrementalTest.serialNumber)]

        fs.writeFileSync(testData.path.batchImport, JSON.stringify(rawdata))

        await wait.setTimeoutwait(3);
        await batches.selectFile(path.join(__dirname, '../testdata/sampleBatchImport.json'));
        await wait.setTimeoutwait(8);

        //click on import
        //await batches.import()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')

        await wait.setTimeoutwait(20);

        //update json file
        rawdata.batch.snValid = snValidValue
        rawdata.batch.snRecalled = snRecalledValue
        fs.writeFileSync(testData.path.batchImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(8);

        //view message
        await batches.viewMessageInSuccessLogs()
        await wait.setTimeoutwait(5);

        await batches.downloadMsgInSuccessLogs()
        await wait.setTimeoutwait(10);

        // await batches.closeButtonInPopup()
        // await wait.setTimeoutwait(5); 

        // allureReporter.endStep("passed");
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})