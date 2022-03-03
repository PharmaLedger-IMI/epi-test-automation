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
    it('should verify Combination checks ', async () => {
    
        allureReporter.startStep('2. Create a batch',
        '3. Choose a expiry date such that the batch is expired', 
        '4. Make the batch recalled check flag ')
        allureReporter.addTestId('BatchRecall&Msg_Checks')
        
        
        await data.expectData(gtinPage.gt(), date.getbatchId(), date.randomDateExpired(),  (await batches.serialNum()).toString, "","", await batches.checkBatchRecall(),"", await batches.checkBatchRecallMessage() )
        await browser.pause(12000)
        
        await batches.createBatch()
        await browser.pause(15000);

        matrix.generateImage(gtinPage.gt(), date.getbatchId(), date.randomDate(), await batches.serialNum())
        await browser.pause(5000)
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    