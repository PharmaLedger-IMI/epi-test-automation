const products = require('../pageobjects/products.page.js')
const allureReporter = require('@wdio/allure-reporter').default
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const data = require('../utility/expectationFile')
const matrix = require('../utility/2dMatrixPage')



describe('107_Scan the code which contains only gtin when batch unknown flag is checked', () => {


    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("checkBatchIsUnknownFlagWithOnlyValidGTINMatrixTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }
    it('Browser - should Scan the code which contains only valid gtin', async () => {
        allureReporter.addDescription('Scan the code which contains only gtin')
        allureReporter.addStep("check batch unknown flag in product ")
        allureReporter.addStep("Scan the code which contains only gtin")
        allureReporter.addTestId('gtin_3')

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

        //check batch unknown flag
        await products.disableBatchNumberUnknown()
        await wait.setTimeoutwait(5);

        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(40);


        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), "", "", "")
        await wait.setTimeoutwait(12);

        //generate 2d matrix Image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), "", "", "")
        await wait.setTimeoutwait(12);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })

})