
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);


describe('008_Edit batch and enable serial number check with invalid SN ', () => {

    if(!process.env.npm_config_browserOnly){
        


    after(async () => {
        console.log("Starting Mobile Execution");
        const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run enableSnCheckSnIsInValidTest');
        console.log('stdout:', stdout1);
        console.log('stderr:', stderr1);
        }) 
    console.log("Running test suite in incremental mode and browser tests only")
        
        } else {
        
        console.log("different flag")
        
        }  

    it('Browser - should verify that the serial number check is enabled by default ', async () => {
        allureReporter.addDescription('Edit batch and verify enable serial number verification and update valid serial number. Pass invalid serial number in matrix')
        allureReporter.startStep('Verify that the serial number check is enabled by default in batch')
        allureReporter.startStep('Scan an invalid data matrix code to verify that the serial number check fails.')
        allureReporter.addTestId('BasicAuthFeatureTest_1_2')
        await batches.Batch();
        await wait.setTimeoutwait(1_2);
        
        //edit Batch
        let editValue = info.getbatchId()
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //check enable serial number verification
        await batches.enableSerialNumberVerification()
        await wait.setTimeoutwait(2);
        
        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(2);
        //set serial number
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);
        //store invalid serial number
        const invalidSerialNumber=await batches.serialNum()
        console.log('invalid serial number '+invalidSerialNumber)
        await wait.setTimeoutwait(2);
        //generate expectation file               
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  invalidSerialNumber,info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        //generate 2d matrix image 
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), invalidSerialNumber)
        await wait.setTimeoutwait(5);
         //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(8);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");
       
  
    })
})    