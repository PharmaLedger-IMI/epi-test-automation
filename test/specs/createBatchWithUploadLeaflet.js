
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');

describe('Update product information -Batch specific', () => {

    if(!process.env.npm_config_browserOnly){
        const util = require('util');
        const exec = util.promisify(require('child_process').exec);

    after(async () => {
        console.log("Starting Mobile Execution");
        const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
        console.log('stdout:', stdout1);
        console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('ProductInfoUpdate_2_1-should verify that the batch specific version is displayed correctly.', async () => {
        allureReporter.addDescription('Create a new batch and upload new leaflet  ')
        allureReporter.startStep('Create a new batch  for the same product above and add a new leaflet at the batch level.')
        allureReporter.addTestId('ProductInfoUpdate_2_1')

        await batches.Batch();
        await wait.setTimeoutwait(2);
        
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        await batches.siteName(testData.newBatchDetails.siteName);
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
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(2);


        //  // await batches.Batch(); 
        //  await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        //  await wait.setTimeoutwait(8);
        //  let editValue = info.getbatchId()
        //  console.log("editValue is "+editValue)
        //  await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        //  await wait.setTimeoutwait(6);
       
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);
        // await batches.enableResetAllValidSerialNumber()
        // await wait.setTimeoutwait(2);
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);

        await batches.addEpi()
        await wait.setTimeoutwait(2);
        // video source
        await batches.videoSourceEpi(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(2);
        //upload epi
        await batches.uploadFile(path.join(__dirname, '/src/Leaflet_BatchLevel'));
        await wait.setTimeoutwait(4);
        //accept upload
        await batches.acceptButton()
        await wait.setTimeoutwait(2);
        // await batches.batchMessage(testData.newBatchDetails.batchMsg)
        // await wait.setTimeoutwait(2);
        
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(),"", await batches.checkBatchMessage(),"", "" )
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(6);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    