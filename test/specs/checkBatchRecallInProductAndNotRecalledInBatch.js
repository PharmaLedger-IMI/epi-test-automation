
//const batches = require('../pageobjects/batches.page.js');
const products = require('../pageobjects/products.page.js')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const path = require('path')

describe('065_Edit product to check batch is recalled and edit batch to uncheck batch recall ', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("checkBatchRecallInProductAndNotRecallInBatchTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should check batch is not recalled', async () => {
        allureReporter.addDescription('Edit product and check batch is recalled flag. Edit batch and check batch is not recalled ')
        allureReporter.addStep("Check batch is recalled flag in product")
        allureReporter.addStep("Check batch is not recalled in batch")
        allureReporter.addTestId('ProductDisplayEpiFlag_1_1')
        //click product
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(4);
        console.log("prod to edit" + utilityFunction.getProductId())
        //search the product code
        await products.searchProductCode(utilityFunction.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);
        //check batch is recalled
        //await products.enableBatchIsRecalled()
        //await wait.setTimeoutwait(5);

        //delete updated leaflet and SMPC
        await products.deleteAllFile()
        await wait.setTimeoutwait(5);

        //add leaflet
        await products.addEpi()
        await wait.setTimeoutwait(3);
        //upload leaflet
        await products.uploadFile(path.join(__dirname, '/src/Leaflet_ProductLevel'));
        await wait.setTimeoutwait(4);
        //accept
        await products.acceptButton()
        await wait.setTimeoutwait(5);

        //add smpc
        await products.addEpi()
        await wait.setTimeoutwait(3);

        await products.selectLanguage(testData.newBatchDetails.selectLanguage)
        await wait.setTimeoutwait(3);
        await products.selectType(testData.newBatchDetails.selectType)
        await wait.setTimeoutwait(3);

        //upload smpc
        await products.uploadFile(path.join(__dirname, '/src/SMPC_ProductLevel'));
        await wait.setTimeoutwait(4);

        //scrollIntoView
        await products.acceptButton()
        await wait.setTimeoutwait(5);

        utilityFunction.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(3);

        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(40);

        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), "", "", utilityFunction.getBatchRecallMsg(), utilityFunction.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(8);
        // //update batch
        // await batches.updateBatchForEdit()
        // await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})