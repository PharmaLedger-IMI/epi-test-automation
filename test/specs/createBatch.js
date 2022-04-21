const batches= require('../pageobjects/batches.page.js');
const path= require('path');
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const info=require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile');
const moment = require('moment')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('004_Create Batch', () => {
   
    if(process.env.npm_config_incremental){

        console.log("This testcase is running for existing batch")
    }
   else{
    if(!process.env.npm_config_browserOnly){

        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run addProductBatchTest');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
        })
    }
        it('Browser - should verify batch page ', async () => {
            allureReporter.addFeature('Create Batch')
            allureReporter.addSeverity('Critical');
            allureReporter.addTestId('ProdAndBatchSetup_1')
            //allureReporter.addDescription('No. of batches can be created by adding batch')
            allureReporter.startStep("Create a batch for the recent GTIN with all valid details.")


            await batches.Batch(); 
            await wait.setTimeoutwait(4);
            //Created for QA environment
            // await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')
            // await wait.setTimeoutwait(6);

            await batches.addBatch();
            await wait.setTimeoutwait(3);

            info.setBatchId(await batches.batchIdValue())
            await wait.setTimeoutwait(3);

            await batches.siteName(testData.newBatchDetails.siteName);
            await wait.setTimeoutwait(5);

            info.setBrandName(await batches.checkBrandName())
            await wait.setTimeoutwait(3);

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
            await wait.setTimeoutwait(2);
            await selectBox.selectByAttribute('value', info.getProductId());
            await wait.setTimeoutwait(2);

            await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
            await wait.setTimeoutwait(5);

            //set serial number value
            info.setSerialNumber(await batches.serialNum())
            //enter serial number
            await batches.enterSerialNumber(info.getSerialNumber())
            await wait.setTimeoutwait(5);
            // manage serial number accept 
            await batches.acceptSerialNumber()
            await wait.setTimeoutwait(1);


            // add epi leaflet
            await batches.addEpi()
            await wait.setTimeoutwait(5);

            // video source
            await batches.videoSourceEpi(testData.newBatchDetails.videoSource)
            await wait.setTimeoutwait(4);
            //upload epi
            await batches.uploadFile(path.join(__dirname, '/src/Leaflet_BatchLevel'));
           await wait.setTimeoutwait(4);
            //scrollIntoView
            await batches.acceptButton()
            await wait.setTimeoutwait(5);

            data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), "", "", "", "", await batches.epiDisplayed())
            await wait.setTimeoutwait(6);

            //generate Image
            matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
            await wait.setTimeoutwait(8);

             //create batch
             await batches.createBatch()
             await wait.setTimeoutwait(20);


            allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
            allureReporter.endStep("passed");

        });
    

    }


})

