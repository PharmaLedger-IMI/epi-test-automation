
const editBatch = require('../specs/editBatch.js');
const batches= require('../pageobjects/batches.page.js');
const products= require('../pageobjects/products.page');
const allureReporter = require('@wdio/allure-reporter').default
const testData= require('../testdata/myjsonFile.json')
describe('Edit batch for recall message', () => {

    it('Should edit batch for recall message', async() => {
        allureReporter.addDescription('Can edit batch for recall message ')
        //allureReporter.startStep("Update any field on the batch")
        //allureReporter.startStep("Save the changes to the batch")

        await browser.execute('document.querySelector("div:nth-child(' + editBatch.editbatchRow() + ') button:nth-child(1)").click()')       
        await browser.pause(5000)


       
       // await batches.enterRecallMessage("Sample")
        await batches.enableCheckToRecallThisBatch()
        await browser.pause(2000)
        await batches.enterRecallMessage(testData.batchMessage)
        await browser.pause(2000)
        await batches.updateBatchForEdit()
        await browser.pause(10000)
        //allureReporter.endStep("passed");
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        

    })
})