const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default



describe('Expiry date Checks ', () => {

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

    it('SerialNumberChecks_6- should Create a batch and enable serial number verification and set decommissioned serial numbers and reason code ', async () => {
        allureReporter.addDescription('Edit product and check decommissioned flag. Crete new batch and select decommissioned serial number and scan with decommissioned serial number')
        allureReporter.startStep('Create a batch and enable serial number verification and set decommissioned serial numbers and reason code')
        allureReporter.addTestId('SerialNumberChecks_6')

         // search the product codes
         await products.searchProductCode(info.getProductId())
         await wait.setTimeoutwait(3);
         await browser.keys('Enter')
         await wait.setTimeoutwait(4);
         //view or edits
         await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
         await wait.setTimeoutwait(5);
 
         // enable SN is in decommissioned list
         await products.enableSnIsInDecommissionedList()
         await wait.setTimeoutwait(4);
 
         //update products
         await products.updateProduct()
         await wait.setTimeoutwait(8);
       // create a batch 
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
        
        console.log("different date is"+ info.randomDate())
        await wait.setTimeoutwait(2);
       
        //select product from dropdown
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']'); 
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);
        //check enable serial number verification
        await batches.enableSerialNumberVerification()
        await wait.setTimeoutwait(2);
        //select decommisioned serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateDecommissioned)
        await wait.setTimeoutwait(2);
        // //enable checkbox
        // await batches.enableResetAllValidSerialNumber()
        // await wait.setTimeoutwait(2);
        //set the serial number and enter
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);
        //Enter reason
        await batches.selectLostReasonFromDropdown(testData.newBatchDetails.updateDecommissionedWithLostReason)
        await wait.setTimeoutwait(2);
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);
     
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
         //create batch
         await batches.createBatch()
         await wait.setTimeoutwait(8);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    