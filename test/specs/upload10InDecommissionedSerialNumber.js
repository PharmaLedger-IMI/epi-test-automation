
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Expiry date Checks ', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('Serial Number Checks_9- should Remove 10 serial numbers from valid and upload 10 in recalled serial numbers ', async () => {
    
        allureReporter.startStep('Remove 10 serial numbers from valid and upload 10 in decommissioned serial numbers')
        allureReporter.addTestId('Serial Number Checks_9')
        await batches.Batch();
        await wait.setTimeoutwait(2);
        //edit above batch
        let editValue = info.getbatchId(true)
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //check enable serial number verification
        await batches.enableSerialNumberVerification()
        await wait.setTimeoutwait(2);
        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].updateValid)
        await wait.setTimeoutwait(2);
        //enable checkbox and remove 10 serial number
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(2);
    
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);


         //select decommisioned serial number
         await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].UpdateDecommissioned)
         await wait.setTimeoutwait(2);
        //  //enable checkbox
        //  await batches.enableResetAllDecommisionedSerialNumber()
        //  await wait.setTimeoutwait(2);
         //set the serial number and enter
         info.setSerialNumber(info.serialNum10())
         await batches.enterSerialNumber(info.getSerialNumber())
         await wait.setTimeoutwait(2);
         //Enter reason
         await batches.selectLostReasonFromDropdown(testData[2]['newBatchDetails'].Lost)
         await wait.setTimeoutwait(2);
         //accept serial number
         await batches.acceptSerialNumber()
         await wait.setTimeoutwait(2);
       
       
       
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(true), info.getCurrentRandomDate(),  info.getSerialNumber().split(',')[0],info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(8);
       
        matrix.generateImage(info.getProductId(), info.getbatchId(true), info.getCurrentRandomDate(), info.getSerialNumber().split(',')[0])
        await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    