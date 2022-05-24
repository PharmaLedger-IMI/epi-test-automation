const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const testData = require('../testdata/config.json')
const info = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')

describe('089_Edit product to check SN is unknown and delete smpc. Pass unknown SN in matrix', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await info.runAppium("checkSmpcIsDeletedFromProductWithSnIsUnknownTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should check If SMPC is deleted from the product and the serial number on the batch is unknown', async () => {
        allureReporter.addStep("Check SN is unknown flag in product")
        allureReporter.addStep("Check If SMPC is deleted from the product")
        allureReporter.addStep("Check serial number on the batch is unknown")
        allureReporter.addTestId('ProductDisplayEpiFlag_6_3')
        //click product
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(4);
        console.log("prod to edit" + info.getProductId())
        //search the product code
        await products.searchProductCode(info.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);
        //delete second language
        await products.deleteSecondLanguage()
        await wait.setTimeoutwait(4);
        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);

        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(18);


        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(9);
        //edit batch
        let editValue = info.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);
        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);

        //set serial number
        info.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(3);

        //manage serial number accept
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        const unknownSerialNumber = await batches.serialNum()
        console.log('unknown serial number ' + unknownSerialNumber)
        await wait.setTimeoutwait(3);

        //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), unknownSerialNumber, info.getBrandName(), "", "", "", "", info.getEpiDisplayed())
        await wait.setTimeoutwait(15);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), unknownSerialNumber)
        await wait.setTimeoutwait(12);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


    })
})