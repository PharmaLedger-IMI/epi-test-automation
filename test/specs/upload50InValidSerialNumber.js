
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default


describe('046_Edit batch to upload 50K valid serial numbers ', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("editBatchUncheckRecallWithSerializedTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should upload 50K serial numbers ', async () => {
        allureReporter.addDescription('Edit batch and upload 50k serial numbers')
        allureReporter.addStep('Upload 50K serial numbers and scan with valid serial number')
        allureReporter.addTestId('SerialNumberChecks_10')
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(3);

        //edit above batch
        let editValue = utilityFunction.getbatchId()
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(8);

        //check enable serial number verification
        await batches.enableSerialNumberVerification()
        await wait.setTimeoutwait(3);
        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(3);
        //enable checkbox and remove 10 serial number
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(3);

        //set the serial number and enter
        const serialNumber = utilityFunction.serialNum50K()
        await wait.setTimeoutwait(3);
        await batches.enterSerialNumber(serialNumber)
        await wait.setTimeoutwait(3);

        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), serialNumber.split(',')[0], utilityFunction.getBrandName(), "", "", "", "")
        await wait.setTimeoutwait(13);

        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), serialNumber.split(',')[0])
        await wait.setTimeoutwait(5);
        //create batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');



    })
})