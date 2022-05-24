

const info = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default

describe('055_Update product information that the version of ePI is not impacted / not replaced by  the batch specific', () => {

    if (process.env.npm_config_incremental) {

        console.log("This testcase is running for existing product and batch")

    }
    else {
        if (!process.env.npm_config_browserOnly) {

            after(async () => {
                console.log("Starting Mobile Execution");
                await info.runAppium("versionOfTheEpiNotReplacedTest")
            })
        }


        it('Browser - should verify that the version of ePI is not impacted / not replaced by  the batch specific version.', async () => {
            allureReporter.addDescription('Scan previous batch and check version of epi not replaced ')
            allureReporter.addStep('Scan the data matrix of the old batch created in the previous test case and verify that the version of ePI is not impacted / not replaced by  the batch specific version. ')
            allureReporter.addTestId('ProductInfoUpdate_2_2')

            info.getExpectationFile()
            await wait.setTimeoutwait(12);
            info.getImage()
            await wait.setTimeoutwait(9);

            allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


        })
    }
})