
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
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        await batches.siteName(testData[2]['newBatchDetails'].siteName);
        await wait.setTimeoutwait(2);
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
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');  
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);
        await batches.videoSource(testData[2]['newBatchDetails'].videoSource)
        await wait.setTimeoutwait(2);
        //Enter batch message
        await batches.batchMessage(testData[2]['newBatchDetails'].batchMsg)
        await wait.setTimeoutwait(2);
        //Add german smpc
        await batches.addEpi()
        await wait.setTimeoutwait(2);
        await batches.selectLanguage(testData[2]['newBatchDetails'].selectLanguage)
        await wait.setTimeoutwait(2);
        await batches.selectType(testData[2]['newBatchDetails'].selectType)
        await wait.setTimeoutwait(2);
        // video source
        await batches.videoSourceEpi(testData[2]['newBatchDetails'].videoSource)
        await wait.setTimeoutwait(2);
        // upload leaflet folder
        await browser.$('//input[@type=\'file\']').addValue(path.join(__dirname, '/src/Entresto'));
        await wait.setTimeoutwait(2);
        //accept
        await batches.acceptButton()
        await wait.setTimeoutwait(5);
        // //set serial number
        // info.setSerialNumber(await batches.serialNum())


        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(),"", await batches.checkBatchMessage(),"", "" )
        await wait.setTimeoutwait(12);
        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
       
        await batches.createBatch()
        await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    