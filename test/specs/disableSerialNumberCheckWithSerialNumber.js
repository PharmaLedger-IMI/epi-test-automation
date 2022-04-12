
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default


describe('Basic Auth feature test ', () => {

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

    it('BasicAuthFeatureTest_1_3- should Update the setting and disable serial number check ', async () => {
        allureReporter.addDescription('Edit batch and disable serial number verification and update valid serial number.')
        allureReporter.startStep('Update the setting and disable serial number check in batch')
        allureReporter.startStep('Scan a data matrix code with serial number')
        allureReporter.addTestId('BasicAuthFeatureTest_1_3')
        await batches.Batch();
        await wait.setTimeoutwait(2);
        
        //Edit batch
        let editValue = info.getbatchId()
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //Diable serial number verification
        await batches.disableSerialNumberVerification()
        await wait.setTimeoutwait(2);

        //Select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(2);
        //Set serial number
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);
        //Accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);
        //Generate expectation file                     
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        //Generate 2d matrix image 
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
        //Update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(8);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");
       
  
    })
})    