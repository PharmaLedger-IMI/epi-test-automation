// const gtinPage = require('./gtinPage.js');
// const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')

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

    it('BasicAuthFeatureTest_2_2- should  Verify that the expiry date check is enabled by default', async () => {
        allureReporter.addDescription('Edit batch and verify that the expiry date check is enabled. Pass invalid expiry date in matrix')
        allureReporter.startStep(' Verify that the expiry date check is enabled by default in batch')
        allureReporter.startStep(' Scan a data matrix code  with wrong expiry date to verify that the expiry date check fails. ')
        allureReporter.addTestId('BasicAuthFeatureTest_2_2')
        
        await batches.Batch();
        await wait.setTimeoutwait(2);
        
        //edit batch
        let editValue = info.getbatchId()
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);
        
        //check expiry date is in enabled state
        await batches.expirationDateVerification()
        await wait.setTimeoutwait(2);
        const incorrectExpiryDate=info.randomDateExpired()
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), incorrectExpiryDate,  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        //generate 2d matrix image 
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), incorrectExpiryDate, info.getSerialNumber())
        await wait.setTimeoutwait(5);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(8);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");
       
  
    })
})    