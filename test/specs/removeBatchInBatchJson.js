
const batches = require('../pageobjects/batches.page');
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const wait = require('../utility/timeout')
const path = require('path');
const fs = require('fs');

describe('116_Update a batch via import of Json by deleting batch ', () => {



    it('Browser - update a batch via import of Json ', async () => {
        allureReporter.addTestId('ImportJson_4_2')
        allureReporter.addDescription('Update a batch via import of Json by deleting batch element and upload modified file. View message and click on invalid field info')
        allureReporter.addStep('1. Use the standard template Json')
        allureReporter.addStep('2. Delete batch in the json')
        allureReporter.addStep('3. Use the import functionality to select the file')
        allureReporter.addStep('4. Click on import')
        allureReporter.addStep('5. Check the log for the import operation')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //click import
        await batches.clickImport()
        await wait.setTimeoutwait(3);


        let rawdata = JSON.parse(fs.readFileSync(testData.path.batchImport, 'utf8'))
        const batchValue = rawdata.batch.batch
        delete rawdata.batch.batch
        fs.writeFileSync(testData.path.batchImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(3);
        //select file
        await batches.selectFile(path.join(__dirname, '../testdata/sampleBatchImport.json'));
        await wait.setTimeoutwait(8);


        //click on import
        // await batches.clickImportFile()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')
        await wait.setTimeoutwait(20);

        //update json file
        rawdata.batch.batch = batchValue
        fs.writeFileSync(testData.path.batchImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(8);

        //view message
        await batches.clickViewMessageInFailedLog()
        await wait.setTimeoutwait(5);
        //click invalid field info
        await batches.invalidFieldInfo()
        await wait.setTimeoutwait(5);
        //read invalid field info
        await batches.invalidFieldInfoRequired()
        await wait.setTimeoutwait(5);
        //download message
        await batches.clickDownloadMsgInFailedLog()
        await wait.setTimeoutwait(10);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})