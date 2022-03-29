
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Basic Auth feature test ', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run disableSnCheckWithoutSnIsValidTest');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('Basic Auth feature test_4- should Update the setting and disable serial number check ', async () => {
    
        allureReporter.startStep('Update the setting and disable serial number check')
        allureReporter.startStep('Scan a data matrix code without a serial number')
        allureReporter.addTestId('Basic Auth feature test_4')
        await batches.Batch();
        await wait.setTimeoutwait(2);
        
        //edit above batch
        let editValue = info.getbatchId()
       // console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].updateValid)
        await wait.setTimeoutwait(2);

        //enable checkbox and don't pass serial number
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(2);

        // //set serial number
        // info.setSerialNumber(await batches.serialNum())
        // await batches.enterSerialNumber(info.getSerialNumber())
        // await wait.setTimeoutwait(2);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);
                             
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),"",info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(8);
       
        matrix.generate2dMatrix(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate())
        await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");
       
  
    })
})    