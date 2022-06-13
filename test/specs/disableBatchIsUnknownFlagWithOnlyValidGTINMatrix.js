
const allureReporter = require('@wdio/allure-reporter').default
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const data = require('../utility/expectationFile')
const matrix = require('../utility/2dMatrixPage')



describe('106_Scan the code which contains only gtin when batch unknown flag is unchecked', () => {


    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("disableBatchIsUnknownFlagWithOnlyValidGTINMatrixTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }
    it('Browser - should Scan the code which contains only valid gtin', async () => {
        allureReporter.addDescription('Scan the code which contains only gtin')
        allureReporter.addStep("Uncheck batch unknown flag in product ")
        allureReporter.addStep("Scan the code which contains only gtin")
        allureReporter.addTestId('gtin_2')
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), "", "", "")
        await wait.setTimeoutwait(12);

        //generate 2d matrix Image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), "", "", "")
        await wait.setTimeoutwait(12);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })

})