
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('039_Edit batch to reset recalled serial number and scan with recalled serial number ', () => {

    if(!process.env.npm_config_browserOnly){
       

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

    it('Browser - should clear the recalled serial numbers   ', async () => {
        allureReporter.addDescription('Edit batch and reset recalled serial number and scan with recalled serial number')
        allureReporter.startStep('In the batch created above - clear the recalled serial numbers ')
        allureReporter.addTestId('SerialNumberChecks_5')

         await batches.Batch(); 
        // await wait.setTimeoutwait(3);
        //Created for QA environment
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')
        await wait.setTimeoutwait(6);

        let editValue = info.getbatchId()
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(8);

        //select valid serial number
        await batches.selectUpdateRecalledSerialFromDropdown(testData.newBatchDetails.updateRecalled)
        await wait.setTimeoutwait(3);
        //enable checkbox
        await batches.enableResetAllRecalledSerialNumber()
        await wait.setTimeoutwait(3);
        
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

    //      // search the product codes
    //    await products.searchProductCode(info.getProductId())
    //    await wait.setTimeoutwait(3);
    //    await browser.keys('Enter')
    //    await wait.setTimeoutwait(4);
    //    //view or edits
    //    await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
    //    await wait.setTimeoutwait(5);
       
    //    // enable SN is in recall list
    //    await products.enableSnIsInRecallList()
    //    await wait.setTimeoutwait(4);

    //    //update products
    //    await products.updateProduct()
    //    await wait.setTimeoutwait(8);

        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
       //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(8);

         //update batch
         await batches.updateBatchForEdit()
         await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    