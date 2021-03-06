
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path = require('path');

describe('062_Leaflet updates on the product Batch specific version', () => {


    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("createBatchWithUploadLeafletAndSMPCTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should create a new batch 2 and upload ePI and SMPC at Batch level ', async () => {
        allureReporter.addDescription('Create a new batch by uploading ePI and SMPC and update valid serial number.')
        allureReporter.addStep('Create a new batch 2 and upload ePI and SMPC at Batch level ')
        allureReporter.addStep('Scan the batch 2 and you should be able to see the leaflet that was uploaded at batch level')
        allureReporter.addTestId('ProductInfoUpdate_4_1')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(4);
        //add batch
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        utilityFunction.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(2);
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
        await wait.setTimeoutwait(4);
        //select product
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await selectBox.selectByAttribute('value', utilityFunction.getProductId());
        await wait.setTimeoutwait(3);
        //video source
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(3);

        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);

        //set the serial number and enter
        utilityFunction.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(3);
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
        //add epi
        await batches.addEpi()
        await wait.setTimeoutwait(3);

        //upload epi
        await batches.uploadFile(path.join(__dirname, '/src/Leaflet_BatchLevel'));
        await wait.setTimeoutwait(3);
        //accept upload
        await batches.acceptButton()
        await wait.setTimeoutwait(5);

        //upload smpc
        await batches.addEpi()
        await wait.setTimeoutwait(3);
        await batches.selectLanguage(testData.newBatchDetails.selectLanguage)
        await wait.setTimeoutwait(3);
        await batches.selectType(testData.newBatchDetails.selectType)
        await wait.setTimeoutwait(3);
        //upload epi
        await batches.uploadFile(path.join(__dirname, '/src/SMPC_BatchLevel'));
        await wait.setTimeoutwait(3);
        //scrollIntoView
        await batches.acceptButton()
        await wait.setTimeoutwait(5);

        utilityFunction.setEpiDisplayed(await batches.epiDisplayed())
        await wait.setTimeoutwait(3);

        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", await batches.checkBatchMessage(), "", "")
        await wait.setTimeoutwait(13);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(8);
        // create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})