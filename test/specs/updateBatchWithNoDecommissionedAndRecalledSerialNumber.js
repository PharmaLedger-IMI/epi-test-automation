
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const info = require('../utility/reusableFile')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('051_Edit batch to update without decommissioned and recalled serial number', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run updateTheBatchWithoutDecommissionedRecalledSNTest');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should Update the batch to have no decomissioned/ recalled serial numbers ', async () => {
        allureReporter.addDescription('Edit batch and update with no decomissioned/ recalled serial numbers')
        allureReporter.addStep('Update the batch to have no decomissioned and recalled serial number')
        allureReporter.addTestId('SerialNumberChecks_11_5')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(4);

        //edit batch
        let editValue = info.getbatchId()
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //check enable serial number verification
        await batches.enableSerialNumberVerification()
        await wait.setTimeoutwait(3);

        //update decommissioned serial number
        await batches.selectUpdateDecommissionedFromDropdown(testData.newBatchDetails.updateDecommissioned)
        await wait.setTimeoutwait(3);

        //enable checkbox and remove 10 serial number
        await batches.enableResetAllDecommisionedSerialNumber()
        await wait.setTimeoutwait(3);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //update recalled serial number
        await batches.selectUpdateRecalledSerialFromDropdown(testData.newBatchDetails.updateRecalled)
        await wait.setTimeoutwait(3);
        //enable checkbox
        await batches.enableResetAllRecalledSerialNumber()
        await wait.setTimeoutwait(3);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        // info.setEpiDisplayed(await batches.epiDisplayed())
        // await wait.setTimeoutwait(2);

        //generate expectation file              
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), "", info.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(12);

        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), "")
        await wait.setTimeoutwait(9);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})    