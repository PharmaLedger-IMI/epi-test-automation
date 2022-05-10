
const products = require('../pageobjects/products.page');
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
var randomCountry = require('random-country');

const wait = require('../utility/timeout')
const path = require('path');
const fs = require('fs');

describe('112_Update a product via import of Json to change market id', () => {



    it('Browser - update a product via import of Json ', async () => {
        allureReporter.addTestId('ImportJson_2_8')
        allureReporter.addDescription('Update a product via import of Json to change market id and uploading modified file. View message and click on invalid field info')
        allureReporter.addStep('1. Use the standard template Json')
        allureReporter.addStep('2. Fill up the details on the json')
        allureReporter.addStep('3. Use the import functionality to select the file')
        allureReporter.addStep('4. Click on import')
        allureReporter.addStep('5. Check the log for the import operation ')

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(8);
        await products.clickImport()
        await wait.setTimeoutwait(3);


        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))
        const marketIdValue = rawdata.product.markets[0].marketId
        rawdata.product.markets[0].marketId = randomCountry({ full: true });
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))

        await wait.setTimeoutwait(4);
        await products.selectFile(path.join(__dirname, '../testdata/sampleProductImport.json'));
        await wait.setTimeoutwait(8);

        //click on import
        // await products.import()
        await browser.execute('document.querySelector(`psk-button[data-tag="import"] button[class="btn btn-primary"]`).click()')

        await wait.setTimeoutwait(20);

        //update json file
        rawdata.product.markets[0].marketId = marketIdValue
        fs.writeFileSync(testData.path.productImport, JSON.stringify(rawdata))
        await wait.setTimeoutwait(8);

        //view message
        await products.viewMessageInFailedLogs()
        await wait.setTimeoutwait(5);

        //click invalid field info 
        await products.invalidFieldInfo()
        await wait.setTimeoutwait(5);
        //Read invalid field info
        await products.invalidFieldInfoRequired()
        await wait.setTimeoutwait(5);

        await products.downloadMsgInFailedLogs()
        await wait.setTimeoutwait(10);

        // await products.closeButtonInPopup()
        // await wait.setTimeoutwait(5); 

        //allureReporter.endStep("passed");
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})