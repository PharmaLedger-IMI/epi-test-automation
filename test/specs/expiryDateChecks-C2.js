
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFile')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Expiry date Checks ', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npm run test');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should create a batch with X expiry date that has already passed… choose a date from the past  ', async () => {

        allureReporter.startStep(' create a batch with X expiry date that has already passed… choose a date from the past ')
        allureReporter.addTestId('Expiry date Checks_C2')
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(3);
        await batches.addBatch();
        await wait.setTimeoutwait(3);
        utilityFunction.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(3);
        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(3);


        utilityFunction.setCurrentRandomDate()
        await wait.setTimeoutwait(3);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, utilityFunction.getCurrentRandomDate());
        //
        console.log("different date is" + utilityFunction.randomDate())
        await wait.setTimeoutwait(3);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await selectBox.selectByAttribute('value', utilityFunction.getProductId());
        await wait.setTimeoutwait(3);
        await batches.videoSource(testData.newBatchDetails.videoSource)
        await wait.setTimeoutwait(3);
        utilityFunction.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);

        data.generateExpectationFile(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(12);

        matrix.generate2dMatrixImage(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.randomDateExpired(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(8);

        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");


    })
})