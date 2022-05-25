const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const testData = require('../testdata/config.json')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')


describe('095_Edit product to uncheck batch is unknown and edit batch to have valid batch and pass invalid batch in matrix', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("unCheckBatchIsUnKnownInProductWithInvalidBatchRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should uncheck batch is unknown and batch  on the barcode is unknown', async () => {
        allureReporter.addDescription("Edit product and verify epi displayed and uncheck batch is unknown. Edit batch and pass unknown batch on matrix")
        allureReporter.addStep("Uncheck batch is unknown flag in product")
        allureReporter.addStep("Batch on the barcode is unknown")
        allureReporter.addTestId('ProductDisplayEpiFlag_7_4')
        //click product
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(3);
        console.log("prod to edit" + utilityFunction.getProductId())
        //search the product code
        await products.searchProductCode(utilityFunction.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);
        //uncheck batch is unknown
        await products.disableBatchNumberUnknown()
        await wait.setTimeoutwait(3);


        //add epi
        await products.addEpi()
        await wait.setTimeoutwait(4);
        //select language
        await products.selectLanguage(testData.newProductDetails.selectLanguage)
        await wait.setTimeoutwait(4);
        // select type
        await products.selectType(testData.newProductDetails.selectType)
        await wait.setTimeoutwait(4);
        //Video source
        await products.videoSourceEpi(testData.newProductDetails.videoSource)
        await wait.setTimeoutwait(4);
        //Upload smpc
        await products.uploadFile(path.join(__dirname, '/src/SMPC_ProductLevel'));
        await wait.setTimeoutwait(4);
        //add epi accept
        await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
        await wait.setTimeoutwait(4);

        utilityFunction.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(3);

        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(18);


        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);
        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);

        //set serial number
        utilityFunction.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(3);

        //manage serial number accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        const unKnownBatch = utilityFunction.unKnownBatch()
        console.log('unKnownBatch ' + unKnownBatch)
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), unKnownBatch, utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), "", "", utilityFunction.getBatchRecallMsg(), utilityFunction.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), unKnownBatch, utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


    })
})