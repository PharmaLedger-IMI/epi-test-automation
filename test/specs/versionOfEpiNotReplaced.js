
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')

const allureReporter = require('@wdio/allure-reporter').default

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('Update product information -Batch specific', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdInfoUpdate_1-should verify that the version of ePI is not impacted / not replaced by  the batch specific version.', async () => {
    
        allureReporter.startStep('Scan the data matrix of the old  batch created in the previous test case and verify that the version of ePI is not impacted / not replaced by  the batch specific version. ')
        allureReporter.addTestId('ProdInfoUpdate_1')

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(true), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(),"", await batches.checkBatchMessage(),"", "" )
        await wait.setTimeoutwait(12);
        matrix.generateImage(info.getProductId(), info.getbatchId(true), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
       
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    