
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const info = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default
const testData = require('../testdata/config.json')


describe('027_change only the year on the new data matrix ', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await info.runAppium("changeYearOnDateInBatchTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    if (process.env.npm_config_incremental) {

        it('Browser - should Retest above by changing only the year on the new data matrix Y ', async () => {

            console.log("date value is " + testData.incrementalTest.expiryDate)
            info.setDateChange(testData.incrementalTest.expiryDate, "year")
            //generate expectation file
            data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getDateChange("year"), info.getSerialNumber(), info.getBrandName(), "", "", "", "")
            await wait.setTimeoutwait(12);
            //generate 2d matrix image
            matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getDateChange("year"), info.getSerialNumber())
            await wait.setTimeoutwait(2);
        })
    }
    else {

        it('Browser - should Retest above by changing only the year on the new data matrix Y ', async () => {
            allureReporter.addDescription("Change only year on the date in matrix Y")
            allureReporter.addStep('Retest above by changing only the year on the new data matrix Y')
            allureReporter.addTestId('ExpiryDateChecks_1_4')
            //generate expectation file
            data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getDateChange("year"), info.getSerialNumber(), info.getBrandName(), "", "", "", "")
            await wait.setTimeoutwait(12);
            //generate 2d matrix image
            matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getDateChange("year"), info.getSerialNumber())
            await wait.setTimeoutwait(12);
            allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


        })
    }
})