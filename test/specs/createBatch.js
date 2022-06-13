const batches = require('../pageobjects/batches.page.js');
const path = require('path');
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const utilityFunction = require('../utility/reusableFunctions')
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile');
const moment = require('moment')

describe('004_Create Batch', () => {

    if (process.env.npm_config_incremental) {

        console.log("This testcase is running for existing batch")
    }
    else {
        if (!process.env.npm_config_browserOnly) {

            after(async () => {
                console.log("Starting Mobile Execution");
                await utilityFunction.runAppium("addProductBatchTest")
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
        utilityFunction.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(3);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(5);

        //select date
        utilityFunction.setCurrentRandomDate()
        await wait.setTimeoutwait(2);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, utilityFunction.getCurrentRandomDate());
        await wait.setTimeoutwait(2);
        //select product
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await wait.setTimeoutwait(2);
        await selectBox.selectByAttribute('value', utilityFunction.getProductId());
        await wait.setTimeoutwait(2);
        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);

        //set serial number value
        utilityFunction.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
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
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "", await batches.epiDisplayed())
        await wait.setTimeoutwait(12);

        //generate 2d matrix Image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(12);

        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    });

})

