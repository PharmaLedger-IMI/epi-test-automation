const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const testData = require('../testdata/config.json')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')



describe('083_Edit product to check SN is decommssioned and edit batch to reset decommissioned SN', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("checkSNDecommissionedInProductAndNotInBatchTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should edit product to check SN is decommssioned and edit batch to reset decommissioned SN ', async () => {
        allureReporter.addStep("Check SN is in Decommissioned list flag in product")
        allureReporter.addStep("Edit batch to reset decommissioned SN")
        allureReporter.addTestId('ProductDisplayEpiFlag_5_2')
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

        // //check
        // await products.enableSnIsInDecommissionedList()
        // await wait.setTimeoutwait(2);

        utilityFunction.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);

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
        //update decommissioned serial number
        await batches.selectUpdateDecommissionedFromDropdown(testData.newBatchDetails.updateDecommissioned)
        await wait.setTimeoutwait(5);
        //reset decommissioned serial number
        await batches.enableResetAllDecommisionedSerialNumber()
        await wait.setTimeoutwait(2);
        //manage serial number accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(4);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), "", utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), "", "", utilityFunction.getBatchRecallMsg(), utilityFunction.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), "")
        await wait.setTimeoutwait(9);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


    })
})