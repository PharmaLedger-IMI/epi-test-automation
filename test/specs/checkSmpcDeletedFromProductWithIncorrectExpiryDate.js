const products = require('../pageobjects/products.page');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')


describe('073_Edit product to check expiration date is incorrect and delete smpc. Pass incorrect expiry date in matrix', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("checkSmpcDeletedInProductWithIncorrectExpiryDateTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - if SMPC is deleted from the product with incorrect expiry date ', async () => {
        allureReporter.addStep("Check expiration date is incorrect flag in product")
        allureReporter.addStep("Check If SMPC is deleted from the product")
        allureReporter.addStep("Pass incorrect expiry date in matrix")
        allureReporter.addTestId('ProductDisplayEpiFlag_2_3')
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
        //delete second language
        await products.deleteSecondLanguage()
        await wait.setTimeoutwait(4);
        utilityFunction.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);


        const incorrectExpiryDate = utilityFunction.randomDateExpired()
        await wait.setTimeoutwait(2);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), incorrectExpiryDate, utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), utilityFunction.getBatchRecall(), "", "", utilityFunction.getBatchRecallMsg(), utilityFunction.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), incorrectExpiryDate, utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(8);

        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(40);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        //scan same batch

    })
})