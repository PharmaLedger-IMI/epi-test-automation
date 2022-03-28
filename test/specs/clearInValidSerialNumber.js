

const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')


const allureReporter = require('@wdio/allure-reporter').default

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Serial Number checks ', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('Serial Number Checks_3- should clear the invalid serial number in the above batch and Scan the 2D matrix with an invalid serial number   ', async () => {
    
        allureReporter.startStep('should clear the invalid serial number in the above batch and Scan the 2D matrix with an invalid serial number ')
        allureReporter.addTestId('Serial Number Checks_3')
        

        //Passing invalid serial number in 2dmatrix as serial number is cleared in above batch
       
       
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(true), info.getCurrentRandomDate(),info.getSerialNumber(), " ",info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        // //update batch
        // await batches.updateBatchForEdit()
        // await wait.setTimeoutwait(10);
       
        matrix.generateImage(info.getProductId(), info.getbatchId(true), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    