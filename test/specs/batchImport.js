
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default

const wait = require('../utility/timeout')
const path = require('path');

describe('119_Create a batch via import of Json', () => {


    it('Browser - create a batch via import of Json ', async () => {
        allureReporter.addTestId('ImportJson_1_3')
        allureReporter.addDescription('Create a batch via import of Json')
        allureReporter.addStep('1. Use the standard template Json')
        allureReporter.addStep('2. Fill up the details on the json')
        allureReporter.addStep('3. Use the import functionality to select the file')
        allureReporter.addStep('4. Click on import')
        allureReporter.addStep('5. Check the log for the import operation')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //click import
        await batches.clickImport()
        await wait.setTimeoutwait(3);
        //select file
        await batches.selectFile(path.join(__dirname, '../testdata/sampleBatchImport.json'));
        await wait.setTimeoutwait(5);

        //await batches.clickImportFile()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')
        await wait.setTimeoutwait(10);

        //view message
        await batches.clickViewMessageInSuccessLog()
        await wait.setTimeoutwait(5);
        //download message
        await batches.clickDownloadMsgInSuccessLog()
        await wait.setTimeoutwait(10);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})