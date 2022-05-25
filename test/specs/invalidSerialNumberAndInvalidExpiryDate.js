const batches = require('../pageobjects/batches.page.js')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const utilityFunction = require('../utility/reusableFunctions')
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile');


describe('097_Edit batch to verify serial number invalid and expiry date invalid', () => {


  if (!process.env.npm_config_browserOnly) {

    after(async () => {
      console.log("Starting Mobile Execution");
      await utilityFunction.runAppium("inValidSerialNumberAndInvalidExpiryDateTestRun")
    })
    console.log("Running test suite in incremental mode and browser tests only")
  } else {

    console.log("different flag")

  }

  it('Browser - should verify serial number invalid and expiry date invalid ', async () => {
    allureReporter.addDescription("Edit batch and pass invalid serial number and expiry date in matrix")
    allureReporter.addTestId('OtherTests_1')
    allureReporter.addStep("Scan a data matrix code where the serial number is invalid and expiry date is also invalid ")

    //click batch
    await batches.clickBatchFromSideNav();
    await wait.setTimeoutwait(8);
    //edit batch
    let editValue = utilityFunction.getbatchId()
    await wait.setTimeoutwait(3);
    console.log("editValue is " + editValue)
    await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
    await wait.setTimeoutwait(6);
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
    }, utilityFunction.getCurrentRandomDate());

    await wait.setTimeoutwait(3);

    //update valid serial number
    await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
    await wait.setTimeoutwait(5);

    //set serial number value
    utilityFunction.setSerialNumber(await batches.serialNum())
    //enter serial number
    await batches.enterSerialNumber(utilityFunction.getSerialNumber())
    await wait.setTimeoutwait(5);
    //manage serial number accept
    await batches.acceptSerialNumber()
    await wait.setTimeoutwait(3);

    const invalidSerialNumber = await batches.serialNum()
    console.log('invalid serial number ' + invalidSerialNumber)
    await wait.setTimeoutwait(3);

    const incorrectExpiryDate = utilityFunction.randomDateExpired()
    await wait.setTimeoutwait(3);
    //generate expectation file
    data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), incorrectExpiryDate, invalidSerialNumber, utilityFunction.getBrandName(), "", "", "", "", "")
    await wait.setTimeoutwait(12);
    //generate Image
    matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), incorrectExpiryDate, invalidSerialNumber)
    await wait.setTimeoutwait(12);
    //update batch
    await batches.updateBatchForEdit()
    await wait.setTimeoutwait(18);

    allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

  });




})

