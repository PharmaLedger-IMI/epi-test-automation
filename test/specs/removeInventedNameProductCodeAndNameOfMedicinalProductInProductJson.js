
const products = require('../pageobjects/products.page');
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default

const wait = require('../utility/timeout')
const path = require('path');
const fs = require('fs');

describe('109_Update a product via import of Json by deleting invented name, product code & name of medicinal product ', () => {



    it('Browser - update a product via import of Json ', async () => {
        allureReporter.addTestId('ImportJson_2_5')
        allureReporter.addDescription('Update a product via import of Json by deleting invented name, product code & name of medicinal product element and uploading modified file. View message and click on invalid field info')
        allureReporter.addStep('1. Use the standard template Json')
        allureReporter.addStep('2. Fill up the details on the json')
        allureReporter.addStep('3. Use the import functionality to select the file')
        allureReporter.addStep('4. Click on import')
        allureReporter.addStep('5. Check the log for the import operation')

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(10);
        await products.clickImport()
        await wait.setTimeoutwait(10);


        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))
        const inventedNameValue = rawdata.product.inventedName
        const productCodeValue = rawdata.product.productCode
        const nameMedicinalProductValue = rawdata.product.nameMedicinalProduct
        delete rawdata.product.inventedName
        delete rawdata.product.productCode
        delete rawdata.product.nameMedicinalProduct
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))

        await wait.setTimeoutwait(2);
        await products.selectFile(path.join(__dirname, '../testdata/sampleProductImport.json'));
        await wait.setTimeoutwait(10);

        //click on import
        // await products.import()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')

        await wait.setTimeoutwait(20);

        //update json file
        rawdata.product.inventedName = inventedNameValue
        rawdata.product.productCode = productCodeValue
        rawdata.product.nameMedicinalProduct = nameMedicinalProductValue
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(8);

        //view message
        await products.viewMessageInFailedLogs()
        await wait.setTimeoutwait(5);
        await products.invalidFieldInfo()
        await wait.setTimeoutwait(5);
        await products.invalidFieldInfoRequired()
        await wait.setTimeoutwait(5);

        await products.downloadMsgInFailedLogs()
        await wait.setTimeoutwait(10);

        // await products.closeButtonInPopup()
        // await wait.setTimeoutwait(5); 




        // allureReporter.endStep("passed");
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})