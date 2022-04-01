// const gtinPage = require('../specs/gtinPage.js');
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
describe('Leaflet updates on the product Batch specific version', () => {


    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdInfoUpdate_1-should Create a new batch 2 and upload ePI and SMPC at Batch level ', async () => {
    
        allureReporter.startStep('Create a new batch 2 and upload ePI and SMPC at Batch level ')
        allureReporter.startStep('Scan the batch 2 and you should be able to see the leaflet that was uploaded at batch level')
        allureReporter.addTestId('ProdInfoUpdate_1')
        await batches.Batch();
        await browser.pause(4000)
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
        await wait.setTimeoutwait(4);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');  
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);
        await batches.videoSource(testData[2]['newBatchDetails'].videoSource)
        await wait.setTimeoutwait(2);   

        await batches.addEpi()
        await wait.setTimeoutwait(2);
        
        //upload epi
        await batches.uploadFile(path.join(__dirname, '/src/Leaflet_BatchLevel'));
        await wait.setTimeoutwait(3);
        //accept upload
        await batches.acceptButton()
        await wait.setTimeoutwait(5);
        //upload smpc
        await batches.addEpi()
        await wait.setTimeoutwait(1);
        await batches.selectLanguage(testData[2]['newBatchDetails'].selectLanguage)
        await wait.setTimeoutwait(1);
        await batches.selectType(testData[2]['newBatchDetails'].selectType)
        await wait.setTimeoutwait(1);
        //upload epi
        await batches.uploadFile(path.join(__dirname, '/src/SMPC_BatchLevel'));
        await wait.setTimeoutwait(3);
        //scrollIntoView
        await batches.acceptButton()
        await wait.setTimeoutwait(5);
       
        await data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(),"", await batches.checkBatchMessage(),"", "" )
        await wait.setTimeoutwait(12);
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
       
        await batches.createBatch()
        await wait.setTimeoutwait(15);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");

        //Scan batch 1 - you should still be able to see the leaflet at product level 

       
    })
})    