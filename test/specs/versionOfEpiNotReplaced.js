

const info = require('../utility/reusableFile')
const wait = require('../utility/timeout')

const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('055_Update product information that the version of ePI is not impacted / not replaced by  the batch specific', () => {

    if (process.env.npm_config_incremental) {

        console.log("This testcase is running for existing product and batch")

    }
    else {
        if (!process.env.npm_config_browserOnly) {


            after(async () => {
                console.log("Starting Mobile Execution");
                const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run versionOfTheEpiNotReplacedTest');
                console.log('stdout:', stdout1);
                console.log('stderr:', stderr1);
            })
        }


        it('Browser - should verify that the version of ePI is not impacted / not replaced by  the batch specific version.', async () => {
            allureReporter.addDescription('Scan previous batch and check version of epi not replaced ')
            allureReporter.addStep('Scan the data matrix of the old  batch created in the previous test case and verify that the version of ePI is not impacted / not replaced by  the batch specific version. ')
            allureReporter.addTestId('ProductInfoUpdate_2_2')

            // await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(),"", await batches.checkBatchMessage(),"", "" )
            // await wait.setTimeoutwait(12);
            info.getExpectationFile()
            await wait.setTimeoutwait(12);
            info.getImage()
            await wait.setTimeoutwait(9);

            allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
            // allureReporter.endStep("passed");

        })
    }
})    