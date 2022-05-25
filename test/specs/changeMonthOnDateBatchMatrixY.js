
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default
const testData = require('../testdata/config.json')



describe('026_change only the month on the new data matrix ', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("changeMonthOnDateInBatchTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    if (process.env.npm_config_incremental) {

        it('Browser - should Retest above by changing only the month on the new data matrix Y ', async () => {

            console.log("date value is " + testData.incrementalTest.expiryDate)
            utilityFunction.setDateChange(testData.incrementalTest.expiryDate, "month")
            //generate expectation file
            data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getDateChange("month"), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "")
            await wait.setTimeoutwait(12);
            //generate 2d matrix image
            matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getDateChange("month"), utilityFunction.getSerialNumber())
            await wait.setTimeoutwait(2);
        })
    }
    else {

        it('Browser - should Retest above by changing only the month on the new data matrix Y ', async () => {
            allureReporter.addDescription("Change only month on the date in matrix Y")
            allureReporter.addStep('Retest above by changing only the month on the new data matrix Y')
            allureReporter.addTestId('ExpiryDateChecks_1_3')

            //generate expectation file
            data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getDateChange("month"), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "")
            await wait.setTimeoutwait(12);
            //generate 2d matrix image
            matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getDateChange("month"), utilityFunction.getSerialNumber())
            await wait.setTimeoutwait(5);
            allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

        })
    }
})