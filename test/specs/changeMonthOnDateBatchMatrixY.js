
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const info = require('../utility/reusableFile')
const wait = require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default
const testData = require('../testdata/config.json')
const util = require('util');
const exec = util.promisify(require('child_process').exec);


describe('026_change only the month on the new data matrix ', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npm run changeMonthOnDateInBatchTest');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    if (process.env.npm_config_incremental) {

        it('Browser - should Retest above by changing only the month on the new data matrix Y ', async () => {
            //     await batches.Batch(); 
            //     //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

            //     await wait.setTimeoutwait(8);
            //     let editValue = info.getbatchId()
            //     console.log("editValue is "+editValue)
            //     await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
            //     await wait.setTimeoutwait(6);
            //     info.setCurrentRandomDate()
            //     await wait.setTimeoutwait(2);
            //     await browser.execute((date) => {
            //     (function () {
            //         let event = new Event('change');
            //         let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
            //         datePicker.value = date;
            //         datePicker.dispatchEvent(event);
            //     })();
            //  }, info.getCurrentRandomDate());
            //     await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
            //     await wait.setTimeoutwait(5);

            //     //set serial number value
            //     info.setSerialNumber(await batches.serialNum())
            //     await wait.setTimeoutwait(5);
            //     //enter serial number
            //     await batches.enterSerialNumber(info.getSerialNumber())
            //     await wait.setTimeoutwait(5);
            //     // manage serial number accept 
            //     await batches.acceptSerialNumber()
            //     await wait.setTimeoutwait(1);


            //     //Update the batch
            //     await batches.updateBatchForEdit()
            //     await wait.setTimeoutwait(10);

            console.log("date value is " + testData.incrementalTest.expiryDate)
            info.setDateChange(testData.incrementalTest.expiryDate, "month")
            //generate expectation file
            data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getDateChange("month"), info.getSerialNumber(), info.getBrandName(), "", "", "", "")
            await wait.setTimeoutwait(12);
            //generate 2d matrix image      
            matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getDateChange("month"), info.getSerialNumber())
            await wait.setTimeoutwait(2);
        })
    }
    else {

        it('Browser - should Retest above by changing only the month on the new data matrix Y ', async () => {
            allureReporter.addDescription("Change only month on the date in matrix Y")
            allureReporter.addStep('Retest above by changing only the month on the new data matrix Y')
            allureReporter.addTestId('ExpiryDateChecks_1_3')

            //generate expectation file 
            data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getDateChange("month"), info.getSerialNumber(), info.getBrandName(), "", "", "", "")
            await wait.setTimeoutwait(12);
            //generate 2d matrix image      
            matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getDateChange("month"), info.getSerialNumber())
            await wait.setTimeoutwait(5);
            allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
            //allureReporter.endStep("passed");


        })
    }
})      