
const allureReporter = require('@wdio/allure-reporter').default

const info = require('../utility/reusableFile')
const wait = require('../utility/timeout')
const util = require('util');
const exec = util.promisify(require('child_process').exec);



describe('060_Scan previous batch to see the leaflet at product level', () => {


    if (process.env.npm_config_incremental) {

        console.log("This testcase is running for existing product and batch")

    }
    else {
        if (!process.env.npm_config_browserOnly) {


            after(async () => {
                console.log("Starting Mobile Execution");
                const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run scanThePreviousBatchTest');
                console.log('stdout:', stdout1);
                console.log('stderr:', stderr1);
            })
        }

        it('Browser - should scan previous Batch', async () => {
            allureReporter.addDescription('Scan batch 1 - you should still be able to see the leaflet at product level')
            allureReporter.addStep("scan previous Batch ")
            allureReporter.addTestId('ProductInfoUpdate_4_3')
            //generate expectation file
            info.getExpectationFile()
            await wait.setTimeoutwait(12);
            info.getImage()
            await wait.setTimeoutwait(9);

            allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
            // allureReporter.endStep("passed");

        })
    }
})