// const gtinPage = require('./gtinPage.js');
// const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')

const allureReporter = require('@wdio/allure-reporter').default

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Basic Auth feature test ', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('Basic Auth feature test_1- should Update the setting and disable expiry date check', async () => {
    
        allureReporter.startStep(' Update the setting and disable expiry date check ')
        allureReporter.startStep(' Scan a data matrix code with wrong expiry date and verify that expiration check doesnt occur')
        allureReporter.addTestId('Basic Auth feature test_1')
        await batches.Batch();
        await wait.setTimeoutwait(2);
       
        //edit the batch
        let editValue = info.getbatchId(true)
        console.log("editValue is "+editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(8);

        //Disable expiry date check and don't show leaflet
        await batches.expirationDateVerificationClick()
        await wait.setTimeoutwait(2);
            
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(true), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
        //create batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(8);
       
        matrix.generateImage(info.getProductId(), info.getbatchId(true), info.randomDateExpired(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");
       
  
    })
})    