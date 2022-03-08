const gtinPage = require('../specs/gtinPage.js');
//const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
//const createbatch= require('../specs/createBatch.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const date=require('../utility/randomDate')
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
    it('BatchRecall&Msg_Checks-should verify Combination checks-2 ', async () => {
    
        allureReporter.startStep('2. Create a batch',
        '3. Choose a expiry date such that the batch is expired', 
        '4. Make the batch recalled check flag ')
        allureReporter.addTestId('BatchRecall&Msg_Checks')
        

        
        await data.expectData(gtinPage.gt(), date.getbatchId(), date.randomDateExpired(),  date.getSerialNumber(), date.getBatchRecall(),"","", date.getBatchRecallMsg())
        await browser.pause(12000)


        matrix.generateImage(gtinPage.gt(), date.getbatchId(), date.randomDateExpired(), date.getSerialNumber())
        await browser.pause(5000)
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    