
const products = require('../pageobjects/products.page');
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const wait = require('../utility/timeout')
const path = require('path');
const fs = require('fs');
//const { assert } = require('console');
const expect = require('chai').expect


describe('111_Update a product via import of Json by deleting name of medicinal product ', () => {



    it('Browser - update a product via import of Json ', async () => {
        allureReporter.addTestId('ImportJson_2_3')
        allureReporter.addDescription('Update a product via import of Json by deleting name of medicinal product element and upload modified file. View message and click on invalid field info')
        allureReporter.addStep('1. Use the standard template Json')
        allureReporter.addStep('2. Delete name of medicinal product in the json')
        allureReporter.addStep('3. Use the import functionality to select the file')
        allureReporter.addStep('4. Click on import')
        allureReporter.addStep('5. Check the log for the import operation')
        //click product
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(8);
        //click import
        await products.clickImport()
        await wait.setTimeoutwait(4);


        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))
        const nameMedicinalProductValue = rawdata.product.nameMedicinalProduct
        delete rawdata.product.nameMedicinalProduct
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(5);
        //select file
        await products.selectFile(path.join(__dirname, '../testdata/sampleProductImport.json'));
        await wait.setTimeoutwait(8);


        //click on import
        // await products.clickImportFile()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')
        await wait.setTimeoutwait(20);

        //update json file
        rawdata.product.nameMedicinalProduct = nameMedicinalProductValue
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))
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
        await products.clickViewMessageInFailedLog()
        await wait.setTimeoutwait(5);
        //click invalid field info
        await products.invalidFieldInfo()
        await wait.setTimeoutwait(5);
        //read invalid field info
        // await products.invalidFieldInfoRequired(["nameMedicinalProduct - Required field"])
        // await wait.setTimeoutwait(5);
        try {
            const nameMedicinalProduct = await products.firstRow()
            await wait.setTimeoutwait(5);
            console.log("req text is " + expect(nameMedicinalProduct).to.equal(testData.json.nameMedicinalProduct))
            await wait.setTimeoutwait(5);

        }
        catch (e) {
            console.log(e)
            await products.closeButtonInPopup()
            await wait.setTimeoutwait(5);
            expect(JSON.stringify(e)).to.equal(0, `${testData.json.nameMedicinalProduct} not found in failed logs`)

        }

        //download message
        await products.clickDownloadMsgInFailedLog()
        await wait.setTimeoutwait(10);
        //expect(2).to.equal(3)
        //assert.fail("failed")
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})