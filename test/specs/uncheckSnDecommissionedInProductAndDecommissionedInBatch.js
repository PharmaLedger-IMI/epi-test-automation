const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const testData = require('../testdata/config.json')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const path = require('path')


describe('085_Edit product to uncheck SN is decommissioned and edit batch to have decommissioned SN', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("unCheckTheSnDecommissionedInProductAndDecommissionedInBatchTestRun")

        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should uncheck Serial number is decommissioned', async () => {
        allureReporter.addStep("Uncheck SN is decommissioned flag in product")
        allureReporter.addStep("Update decommissioned serial number in batch")
        allureReporter.addTestId('ProductDisplayEpiFlag_5_4')
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

        //uncheck SN is in recall list
        await products.enableSnIsInDecommissionedList()
        await wait.setTimeoutwait(3);
        // //add epi
        await products.addEpi()
        await wait.setTimeoutwait(3);
        //select language
        await products.selectLanguage(testData.newProductDetails.selectLanguage)
        await wait.setTimeoutwait(3);
        // select type
        await products.selectType(testData.newProductDetails.selectType)
        await wait.setTimeoutwait(3);
        //Video source
        // await products.videoSourceEpi(testData.newProductDetails.videoSource)
        // await wait.setTimeoutwait(3);
        //Upload smpc
        await products.uploadFile(path.join(__dirname, '/src/SMPC_ProductLevel'));
        await wait.setTimeoutwait(3);
        //add epi accept
        await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
        await wait.setTimeoutwait(3);
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
        //update decommissioned
        await batches.selectUpdateDecommissionedFromDropdown(testData.newBatchDetails.updateDecommissioned)
        await wait.setTimeoutwait(5);

        //set serial number value
        utilityFunction.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(5);
        //manage serial number accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "", utilityFunction.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(10);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(20);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})