

const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default



describe('Update product information ', () => {

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

    it('ProductInfoUpdate_1_1-should Verify that the product displayed in the mobile app - has all the details as uploaded.  ', async () => {
        allureReporter.addDescription('Create a new batch without any ePI files and update with valid serial numbers ')
        allureReporter.startStep('Create a batch and add serial number, choose the existing product with all valid details.')
        allureReporter.startStep('Scan the product using mobile app')
        allureReporter.startStep('Verify that the product displayed in the mobile app - has all the details as uploaded. ')
        allureReporter.addTestId('ProductInfoUpdate_1_1')



        await batches.Batch();
        await wait.setTimeoutwait(4);
        //add batch
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(3);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(5);
        
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

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(2);
        // //enable checkbox
        // await batches.enableResetAllValidSerialNumber()
        // await wait.setTimeoutwait(2);
        //set the serial number and enter
        info.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(2);
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);      
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);

        info.setEpiDisplayed()
        await wait.setTimeoutwait(2);
        //generate expectation file 
        const expectationFile = data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "", info.getEpiDisplayed() )
        info.setExpectationFile(expectationFile)
        console.log("expectationFile is "+expectationFile)
        await wait.setTimeoutwait(12);
       //generate 2d matrix image
        const batch= matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber())
        info.setImage(batch) 
        console.log("2dMatrixImage is"+batch)
        await wait.setTimeoutwait(5);

        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");
       
  
    })
})    