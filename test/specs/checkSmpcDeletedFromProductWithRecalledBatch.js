const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')


describe('063_Edit product to check batch is recalled and delete smpc. Edit batch to have recall message', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("checkSmpcDeletedFromProductWithRecalledBatchTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - if SMPC is deleted from the product with recalled batch', async () => {
        allureReporter.addDescription('Edit product and delete SMPC.')
        allureReporter.addStep("Check batch is recalled flag in product")
        allureReporter.addStep("check If SMPC is deleted from the product with recalled batch")
        allureReporter.addTestId('ProductDisplayEpiFlag_1_3')
        //click product
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(4);
        console.log("prod to edit" + utilityFunction.getProductId())
        //search the product code
        await products.searchProductCode(utilityFunction.getProductId())
        await wait.setTimeoutwait(3);
        //click enter
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);

        // await products.enableBatchIsRecalled()
        // await wait.setTimeoutwait(4);

        //delete file
        await products.deleteSecondLanguage()
        await wait.setTimeoutwait(4);
        utilityFunction.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);
        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(18);

        //click batch
        await batches.clickBatchFromSideNav();
        // await wait.setTimeoutwait(3);
        //Created for QA environment
        // await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')
        await wait.setTimeoutwait(6);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);

        utilityFunction.setCurrentRandomDate()
        await wait.setTimeoutwait(2);
        //select date
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, utilityFunction.getCurrentRandomDate());

        await wait.setTimeoutwait(2);
        //update recalled serial number
        await batches.selectUpdateRecalledSerialFromDropdown(testData.newBatchDetails.updateRecalled)
        await wait.setTimeoutwait(5);

        //set serial number value
        utilityFunction.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(5);
        //manage serial number accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);


        //check batch recall
        // await batches.enableCheckToRecallThisBatch()
        // await wait.setTimeoutwait(2);
        // info.setBatchRecall(await batches.checkBatchRecall())
        // await wait.setTimeoutwait(2);
        //enter recall msg
        //  await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        //  await wait.setTimeoutwait(4);
        //  info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        //  await wait.setTimeoutwait(2);

        utilityFunction.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(3);
        utilityFunction.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(3);


        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), "", "", utilityFunction.getBatchRecallMsg(), utilityFunction.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(8);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


    })
})