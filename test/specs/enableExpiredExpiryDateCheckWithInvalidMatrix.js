
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default


describe('016_Edit batch and enable expired expiry date check with invalid expiry date ', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("enableExpiredFlagWithInValidExpiryDateTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")
    }

    it('Browser - should verify that the expired expiry date check is enabled by default', async () => {
        allureReporter.addDescription('Edit batch and verify that the expired expiry date check is enabled. Pass invalid expiry date in matrix')
        allureReporter.addStep(' Verify that the expired expiry date check is enabled by default in batch')
        allureReporter.addStep(' Scan a data matrix code with wrong expiry date')
        allureReporter.addTestId('BasicAuthFeatureTest_2_5')
        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(3);

        //edit batch
        let editValue = utilityFunction.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //check expired expiry date is in enabled state
        await batches.expirationDateVerification()
        await wait.setTimeoutwait(3);
        //select date
        utilityFunction.setCurrentRandomDate()
        await wait.setTimeoutwait(3);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, utilityFunction.randomDateExpired());
        await wait.setTimeoutwait(4);
        const differentExpiredDate = utilityFunction.randomDate()
        await wait.setTimeoutwait(3);
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), differentExpiredDate, utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(13);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), differentExpiredDate, utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(5);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');



    })
})