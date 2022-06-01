
const batches = require('../pageobjects/batches.page');
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const wait = require('../utility/timeout')
const path = require('path');
const fs = require('fs');


describe('127_Update a batch via import of Json to change batch recall message flag  ', () => {



    it('Browser - update a batch via import of Json ', async () => {
        allureReporter.addTestId('ImportJson_4_8')
        allureReporter.addDescription('Update a batch via import of Json to change batch recall message flag and uploading modified file. View message and click on invalid field info')
        allureReporter.addStep('1. Use the standard template Json')
        allureReporter.addStep('2. Fill up the details on the json')
        allureReporter.addStep('3. Use the import functionality to select the file')
        allureReporter.addStep('4. Click on import')
        allureReporter.addStep('5. Check the log for the import operation ')
        //click batch
        await batches.clickBatchFromSideNav()
        await wait.setTimeoutwait(10);
        //click import
        await batches.clickImport()
        await wait.setTimeoutwait(3);


        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))
        const flagEnableBatchRecallMessageValue = rawdata.product.flagEnableBatchRecallMessage
        rawdata.product.flagEnableBatchRecallMessage = !flagEnableBatchRecallMessageValue
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(3);
        //select file
        await batches.selectFile(path.join(__dirname, '../testdata/sampleBatchImport.json'));
        await wait.setTimeoutwait(10);

        //click on import
        await batches.clickImportFile()
        await wait.setTimeoutwait(20);

        //update json file
        rawdata.product.flagEnableBatchRecallMessage = flagEnableBatchRecallMessageValue
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(8);

        //view message
        await batches.clickViewMessageInSuccessLog()
        await wait.setTimeoutwait(10);
        //download message
        await batches.clickDownloadMsgInSuccessLog()
        await wait.setTimeoutwait(10);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})