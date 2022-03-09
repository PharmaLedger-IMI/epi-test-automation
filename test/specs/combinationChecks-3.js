const gtinPage = require('../specs/gtinPage.js');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
//const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('Combination checks ', () => {

     // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })
    it('BatchRecall&Msg_Checks-should verify Combination checks ', async () => {
    
        allureReporter.startStep('2. Create a batch',
        '3. Choose a expiry date such that the batch is expired', 
        '4. Make the batch recalled check flag ',
        '5. Enter a serial number',
        '6. Save the batch')
        allureReporter.addTestId('BatchRecall&Msg_Checks')
        

        
        await data.expectData(gtinPage.gt(), info.getbatchId(), info.randomDateExpired(),  info.getSerialNumber(), info.getBatchRecall(),"","", info.getBatchRecallMsg())
        await browser.pause(12000)


        matrix.generateImage(gtinPage.gt(), info.getbatchId(), info.randomDateExpired(), await batches.serialNum())
        await browser.pause(5000)
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    