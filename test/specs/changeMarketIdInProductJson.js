
const products = require('../pageobjects/products.page');
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
var randomCountry = require('random-country');
const wait = require('../utility/timeout')
const path = require('path');
const fs = require('fs');
const expect = require('chai').expect

describe('118_Update a product via import of Json to change market id', () => {



    it('Browser - update a product via import of Json ', async () => {
        allureReporter.addTestId('ImportJson_2_8')
        allureReporter.addDescription('Update a product via import of Json to change market id and uploading modified file. View message and click on invalid field info')
        allureReporter.addStep('1. Use the standard template Json')
        allureReporter.addStep('2. Change market id in the json')
        allureReporter.addStep('3. Use the import functionality to select the file')
        allureReporter.addStep('4. Click on import')
        allureReporter.addStep('5. Check the log for the import operation ')
        //click product
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(8);
        //click import
        await products.clickImport()
        await wait.setTimeoutwait(3);


        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))
        const marketIdValue = rawdata.product.markets[0].marketId
        rawdata.product.markets[0].marketId = randomCountry({ full: true });
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
        rawdata.product.markets[0].marketId = marketIdValue
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
        //Read invalid field info
        // await products.invalidFieldInfoRequired(["marketId - not recognized"])
        // await wait.setTimeoutwait(5);
        try {
            const marketId = await products.firstRow()
            await wait.setTimeoutwait(5);

            await wait.setTimeoutwait(5);
            console.log("req text is " + expect(marketId).to.equal(testData.json.marketId))
            await wait.setTimeoutwait(5);


        }
        catch (e) {
            console.log(e)
            await products.closeButtonInPopup()
            await wait.setTimeoutwait(5);
            expect(JSON.stringify(e)).to.equal(0, `${testData.json.marketId} not found in failed logs`)

        }
        //download message
        await products.clickDownloadMsgInFailedLog()
        await wait.setTimeoutwait(10);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})