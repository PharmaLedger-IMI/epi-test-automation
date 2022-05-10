const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const info = require('../utility/reusableFile')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('005_Edit batch to set recall message', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npm run editBatchRecallMsgTest');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should edit batch for recall message', async () => {
        allureReporter.addDescription('Click on edit batch and enable checkbox for batch recall and enter recall message and update the batch.')
        allureReporter.addStep("Update any field on the batch and Save the changes")
        allureReporter.addTestId('ProdAndBatchSetup_4')


        //     await products.clickProductFromSideNav()
        //     await wait.setTimeoutwait(2);

        //     console.log("prod to edit"+info.getProductId())

        //    //search the product codes
        //     await products.searchProductCode(info.getProductId())
        //     await wait.setTimeoutwait(3);
        //     await browser.keys('Enter')
        //     await wait.setTimeoutwait(4);
        //     //click on edit button
        //     await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        //     await wait.setTimeoutwait(5);
        //      //enable batch is recalled
        //      await products.enableBatchIsRecalled(); 
        //      await wait.setTimeoutwait(1);

        //      //update product
        //      await products.updateProduct()
        //      await wait.setTimeoutwait(8);

        //click on batch
        await batches.Batch();
        // created for QA environment
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        await wait.setTimeoutwait(8);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);
        //enable checkbox for batch recall
        await batches.enableCheckToRecallThisBatch()
        await wait.setTimeoutwait(3);
        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(3);
        //enter recall msg
        await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        await wait.setTimeoutwait(4);
        info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), info.getBatchRecall(), "", "", info.getBatchRecallMsg())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image 
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update the batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        // allureReporter.endStep("passed");

    })
})