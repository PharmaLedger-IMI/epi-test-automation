
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const info = require('../utility/reusableFile')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
describe('058_Leaflet updates on the product Batch specific version', () => {


    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run createBatchWithUploadLeafletAndSMPCTest');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
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
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(2);
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
        await wait.setTimeoutwait(4);
        //select product
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(3);
        //video source
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(3);

        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
       
        //set the serial number and enter
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
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

        info.setEpiDisplayed(await batches.epiDisplayed())
        await wait.setTimeoutwait(3);

        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), "", await batches.checkBatchMessage(), "", "")
        await wait.setTimeoutwait(13);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(8);
        // create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        
    })
})    