
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

    it('SerialNumberChecks_9- should Remove 10 serial numbers from valid and upload 10 in decommissioned serial numbers ', async () => {
        allureReporter.addDescription('Edit batch by resetting valid serial number and uploading 10 in decommissioned serial number')
        allureReporter.startStep('Remove 10 serial numbers from valid and upload 10 in decommissioned serial numbers')
        allureReporter.addTestId('SerialNumberChecks_9')
        await batches.Batch();
        await wait.setTimeoutwait(2);
        //edit above batch
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
        //enable checkbox and remove 10 serial number
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(2);
    
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);


         //select decommisioned serial number
         await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateDecommissioned)
         await wait.setTimeoutwait(2);
        //  //enable checkbox
        //  await batches.enableResetAllDecommisionedSerialNumber()
        //  await wait.setTimeoutwait(2);
         //set the serial number and enter
        const serialNumber=info.serialNum10()
        await wait.setTimeoutwait(2);
        await batches.enterSerialNumber(serialNumber)
        await wait.setTimeoutwait(2);
         //Enter reason
         await batches.selectLostReasonFromDropdown(testData.newBatchDetails.updateDecommissionedWithLostReason)
         await wait.setTimeoutwait(2);
         //accept serial number
         await batches.acceptSerialNumber()
         await wait.setTimeoutwait(2);
       
       
        //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  serialNumber.split(',')[0],info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(8);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), serialNumber.split(',')[0])
        await wait.setTimeoutwait(5);
         //create batch
         await batches.createBatch()
         await wait.setTimeoutwait(8);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    