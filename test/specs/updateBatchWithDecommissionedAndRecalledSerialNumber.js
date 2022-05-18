
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const info = require('../utility/reusableFile')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('050_Edit batch to update with decommissioned and recalled serial number', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run updateBatchWithDecommissionedAndRecalledSNTest');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should Update the batch with only decomissioned/ recalled serial numbers ', async () => {
        allureReporter.addDescription('Edit batch and update with only decomissioned/ recalled serial numbers')
        allureReporter.addStep('Update the batch with only decomissioned and recalled serial number')
        allureReporter.addTestId('SerialNumberChecks_11_4')
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
        //update decommisioned serial number
        await batches.selectUpdateDecommissionedFromDropdown(testData.newBatchDetails.updateDecommissioned)
        await wait.setTimeoutwait(3);

        //set serial number
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(3);
        //enter reason
        await batches.selectLostReasonFromDropdown(testData.newBatchDetails.updateDecommissionedWithLostReason)
        await wait.setTimeoutwait(3);
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //update recalled serial number
        await batches.selectUpdateRecalledSerialFromDropdown(testData.newBatchDetails.updateRecalled)
        await wait.setTimeoutwait(3);

        //set the serial number and enter
        info.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(3);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(12);

        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(9);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})    