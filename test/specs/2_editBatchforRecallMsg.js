const gtinPage = require('../specs/gtinPage.js')
//const editBatch = require('../specs/editBatch.js');
const batches= require('../pageobjects/batches.page.js');
//const products= require('../pageobjects/products.page');
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const date=require('../utility/randomDate')

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Edit batch for recall message', () => {

    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('Should edit batch for recall message', async() => {
        allureReporter.addDescription('Can edit batch for recall message ')
        allureReporter.startStep("Update any field on the batch and Save the changes")
        allureReporter.addTestId('ProdAndBatchSetup_1')

        await batches.Batch(); 
        await browser.pause(4000) 
        let editValue = date.getbatchId()
        await browser.execute('document.querySelector("div:nth-child(' + await date.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await browser.pause(8000)
        await batches.enterRecallMessage("Sample")
        await browser.pause(4000)
        await data.expectData(gtinPage.gt(), date.getbatchId(), date.randomDate(),  (await batches.serialNum()).toString, "","","", await batches.checkBatchRecallMessage() )
        await browser.pause(12000)
        
        // await batches.enableCheckToRecallThisBatch()
        // await browser.pause(2000)
        // await batches.enterRecallMessage(testData.batchMessage)
         await browser.pause(2000)
         await batches.updateBatchForEdit()
         await browser.pause(10000)
         matrix.generateImage(gtinPage.gt(), date.getbatchId(), date.randomDate(), await batches.serialNum())
        await browser.pause(5000)
       
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");

    })
})