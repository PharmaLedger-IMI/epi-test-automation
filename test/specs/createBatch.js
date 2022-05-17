const batches = require('../pageobjects/batches.page.js');
const path = require('path');
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const info = require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile');
const moment = require('moment')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('004_Create Batch', () => {

    if (process.env.npm_config_incremental) {

        console.log("This testcase is running for existing batch")
    }
    else {
        if (!process.env.npm_config_browserOnly) {

            after(async () => {
                console.log("Starting Mobile Execution");
                const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run addProductBatchTest');
                console.log('stdout:', stdout1);
                console.log('stderr:', stderr1);
            })
        }
    }
    it('Browser - should verify batch page ', async () => {
        allureReporter.addFeature('Create Batch')
        allureReporter.addSeverity('Critical');
        allureReporter.addTestId('ProdAndBatchSetup_1')
        allureReporter.addStep('Click on batch')
        allureReporter.addStep("Click on add batch and create for the recent GTIN with all valid details.")

        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(4);

        //add batch
        await batches.addBatch();
        await wait.setTimeoutwait(3);
        //set batch value
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(3);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(5);
        
        //select date
        info.setCurrentRandomDate()
        await wait.setTimeoutwait(2);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, info.getCurrentRandomDate());
        await wait.setTimeoutwait(2);
        //select product
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await wait.setTimeoutwait(2);
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);
        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);

        //set serial number value
        info.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(5);
        //manage serial number accept 
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //add epi leaflet
        await batches.addEpi()
        await wait.setTimeoutwait(5);

        //video source
        await batches.videoSourceEpi(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(4);
        //upload epi
        await batches.uploadFile(path.join(__dirname, '/src/Leaflet_BatchLevel'));
        await wait.setTimeoutwait(4);
        //scrollIntoView
        await batches.acceptButton()
        await wait.setTimeoutwait(5);
        //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), "", "", "", "", await batches.epiDisplayed())
        await wait.setTimeoutwait(12);

        //generate 2d matrix Image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(12);

        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    });

})

