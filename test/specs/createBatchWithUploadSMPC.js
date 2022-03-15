//const gtinPage = require('../specs/gtinPage.js');
//const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('Product Information Update', () => {

    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdInfoUpdate_1-should Create a batch and upload SMPC', async () => {
    
        allureReporter.startStep('Create a batch and upload SMPC')
        allureReporter.addTestId('ProdInfoUpdate_1')
        // await batches.Batch();
        // await browser.pause(4000)
        await batches.addBatch();
        await browser.pause(2000)
        info.setBatchId(await batches.batchIdValue())
        await browser.pause(2000)
        await batches.siteName(testData[2]['newBatchDetails'].siteName);
        await browser.pause(5000)
        let expiryDate = info.setCurrentRandomDate()
        // info.setCurrentRandomDate(expiryDate)
        await browser.pause(2000)
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, expiryDate);
        await browser.pause(3000);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');  
        await selectBox.selectByAttribute('value', info.getProductId());
        await browser.pause(3000);
        await batches.videoSource(testData[2]['newBatchDetails'].videoSource)
        await browser.pause(1000);
        //Enter batch message
        await batches.batchMessage(testData[2]['newBatchDetails'].batchMsg)
        await browser.pause(1000);
        await batches.addEpi()
        await browser.pause(1000);
        await batches.selectLanguage(testData[2]['newBatchDetails'].selectLanguage)
        await browser.pause(1000)
        await batches.selectType(testData[2]['newBatchDetails'].selectType)
        await browser.pause(1000)
        // video source
        await batches.videoSourceEpi(testData[2]['newBatchDetails'].videoSource)
        await browser.pause(1000);
        // upload leaflet folder
        // await batches.uploadLeafletFolder()
        await browser.$('//input[@type=\'file\']').addValue(path.join(__dirname, '/src/Entresto'));
        await browser.pause(4000);
        //scrollIntoView
        await batches.acceptButton()
        await browser.pause(5000);

        info.setSerialNumber(await batches.serialNum())


        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(),"", await batches.checkBatchMessage(),"", "" )
        await browser.pause(12000)
        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await browser.pause(5000)
       
        await batches.createBatch()
        await browser.pause(5000);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    