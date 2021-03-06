
const batches = require('../pageobjects/batches.page');
const testData = require('../testData/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const wait = require('../utility/timeout')
const path = require('path');
const fs = require('fs');
// const { expect } = require('chai')
const expect = require('chai').expect


describe('125_Update a batch via import of Json by deleting product code and expiry date', () => {



    it('Browser - update a batch via import of Json ', async () => {
        allureReporter.addTestId('ImportJson_4_5')
        allureReporter.addDescription('Update a batch via import of Json by deleting product code and expiry date element and upload modified file. View message and click on invalid field info')
        allureReporter.addStep('1. Use the standard template Json')
        allureReporter.addStep('2. Deleting product code and expiry date in the json')
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
        const productCodeValue = rawdata.batch.productCode
        const expiryDateValue = rawdata.batch.expiryDate
        delete rawdata.batch.productCode
        delete rawdata.batch.expiryDate
        fs.writeFileSync(testData.path.batchImport, JSON.stringify(rawdata))

        await wait.setTimeoutwait(3);
        //select file
        await batches.selectFile(path.join(__dirname, '../testdata/sampleBatchImport.json'));
        await wait.setTimeoutwait(8);

        //click on import
        //await batches.clickImportFile()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')
        await wait.setTimeoutwait(20);

        //update json file
        rawdata.batch.productCode = productCodeValue
        rawdata.batch.expiryDate = expiryDateValue
        fs.writeFileSync(testData.path.batchImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(8);

        await browser.keys(['\ue004']);
        await wait.setTimeoutwait(2);
        await browser.keys(['\ue004']);
        await wait.setTimeoutwait(2);
        await browser.keys(['\ue004']);
        await wait.setTimeoutwait(2);
        await browser.keys(['\ue004']);
        await wait.setTimeoutwait(2);
        await browser.keys(['\ue004']);
        await wait.setTimeoutwait(2);
        await browser.keys(['\ue004']);
        await wait.setTimeoutwait(2);
        await browser.keys(['\ue004']);
        await wait.setTimeoutwait(2);

        //failed logs
        await browser.keys('Enter')
        await wait.setTimeoutwait(15)


        //view message
        await batches.clickViewMessageInFailedLog()
        await wait.setTimeoutwait(5);
        //click invalid field info
        await batches.invalidFieldInfo()
        await wait.setTimeoutwait(5);

        //read invalid field info
        //await batches.invalidFieldInfoRequired("productCode - Required field expiryDate - Required field")
        try {
            const productCode = await batches.firstRow()
            await wait.setTimeoutwait(5);
            const expiryDate = await batches.secondRow()
            await wait.setTimeoutwait(5);
            console.log("req text is " + expect(productCode).to.equal(testData.json.productCode))
            await wait.setTimeoutwait(5);
            console.log("req text is " + expect(expiryDate).to.equal(testData.json.expiryDate))

        }
        catch (e) {
            await batches.closeButtonInPopup()
            await wait.setTimeoutwait(5);
            expect(JSON.stringify(e)).to.have.lengthOf(0, `${testData.json.productCode}, ${testData.json.expiryDate} not found in failed logs`)

        }
        //downlaod message
        await batches.clickDownloadMsgInFailedLog()
        await wait.setTimeoutwait(10);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})