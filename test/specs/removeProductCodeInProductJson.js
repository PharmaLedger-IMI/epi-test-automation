
const products = require('../pageobjects/products.page');
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const wait = require('../utility/timeout')
const path = require('path');
const fs = require('fs');

describe('104_Update a product via import of Json by deleting product code ', () => {



    it('Browser - update a product via import of Json ', async () => {
        allureReporter.addTestId('ImportJson_2_2')
        allureReporter.addDescription('Update a product via import of Json by deleting product code element and upload modified file. View message and click on invalid field info')
        allureReporter.addStep('1. Use the standard template Json')
        allureReporter.addStep('2. Delete the product code in the json')
        allureReporter.addStep('3. Use the import functionality to select the file')
        allureReporter.addStep('4. Click on import')
        allureReporter.addStep('5. Check the log for the import operation')
        //click product
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(8);
        //click import
        await products.clickImport()
        await wait.setTimeoutwait(10);


        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))
        const productCodeValue = rawdata.product.productCode
        delete rawdata.product.productCode
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(4);
        //select file
        await products.selectFile(path.join(__dirname, '../testdata/sampleProductImport.json'));
        await wait.setTimeoutwait(8);

        //click on import
        // await products.clickImportFile()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')
        await wait.setTimeoutwait(20);

        //update json file
        rawdata.product.productCode = productCodeValue
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(8);

        //view message
        await products.clickViewMessageInFailedLog()
        await wait.setTimeoutwait(5);
        //click invalid field info
        await products.invalidFieldInfo()
        await wait.setTimeoutwait(5);
        //read text
        await products.invalidFieldInfoRequired()
        await wait.setTimeoutwait(5);
        //download message
        await products.clickDownloadMsgInFailedLog()
        await wait.setTimeoutwait(10);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})