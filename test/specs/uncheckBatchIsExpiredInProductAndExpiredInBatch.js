const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const testData = require('../testdata/config.json')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const path = require('path')
const util = require('util');
const exec = util.promisify(require('child_process').exec);


describe('075_Edit product to uncheck batch is expired and edit batch to set expired date', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("uncheckBatchIsExpiredInProductAndExpiredInBatchTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should edit product to uncheck batch is expired and edit batch to set expired date', async () => {

        allureReporter.addStep("Edit product to uncheck batch is expired flag in product")
        allureReporter.addStep("Edit batch to set expired date")
        allureReporter.addTestId('ProductDisplayEpiFlag_3_4')
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

        //uncheck batch is expired
        await products.batchIsExpired()
        await wait.setTimeoutwait(5);

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
        await wait.setTimeoutwait(4);

        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(20);


        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);
        const expiredDate = utilityFunction.randomDateExpired()
        await wait.setTimeoutwait(3);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, expiredDate);
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), expiredDate, utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "", utilityFunction.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), expiredDate, utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(12);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


    })
})