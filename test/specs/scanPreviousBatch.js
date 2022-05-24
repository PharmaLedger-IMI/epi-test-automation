
const allureReporter = require('@wdio/allure-reporter').default
const info = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')



describe('060_Scan previous batch to see the leaflet at product level', () => {


    if (process.env.npm_config_incremental) {

        console.log("This testcase is running for existing product and batch")

    }
    else {
        if (!process.env.npm_config_browserOnly) {


            after(async () => {
                console.log("Starting Mobile Execution");
                await info.runAppium("scanPreviousBatchTestRun")

            })
        }

        it('Browser - should scan previous Batch', async () => {
            allureReporter.addDescription('Scan batch 1 - you should still be able to see the leaflet at product level')
            allureReporter.addStep("scan previous batch and see the leaflet at product level ")
            allureReporter.addTestId('ProductInfoUpdate_4_3')
            //generate expectation file
            info.getExpectationFile()
            await wait.setTimeoutwait(12);
            //generate 2d matrix image
            info.getImage()
            await wait.setTimeoutwait(9);

            allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

        })
    }
})