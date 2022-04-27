
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);



describe('037_Edit batch to reset serial number and scan with invalid serial number ', () => {

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

    it('Browser - should clear the invalid serial number in the above batch and Scan the 2D matrix with an invalid serial number   ', async () => {
        allureReporter.addDescription('Edit batch and reset serial number and scan with invalid serial number')
        allureReporter.startStep('should clear the invalid serial number in the above batch and Scan the 2D matrix with an invalid serial number ')
        allureReporter.addTestId('SerialNumberChecks_3')
        

        
        await batches.Batch(); 
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        console.log("editValue is "+editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(8);

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //enable checkbox
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(3);
        
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(4);

        const invalidSerialNumber=await batches.serialNum()
        await wait.setTimeoutwait(3);
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),invalidSerialNumber, " ",info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        //generate 2d matrix image     
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), invalidSerialNumber)
        await wait.setTimeoutwait(5);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    