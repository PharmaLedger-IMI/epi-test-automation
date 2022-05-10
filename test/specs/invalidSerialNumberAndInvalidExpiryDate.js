const batches = require('../pageobjects/batches.page.js');
//const path= require('path');
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const info = require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile');
const util = require('util');
const exec = util.promisify(require('child_process').exec);



describe('097_Edit batch to verify serial number invalid and expiry date invalid', () => {


  if (!process.env.npm_config_browserOnly) {


    after(async () => {
      console.log("Starting Mobile Execution");
      const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npm run inValidSerialNumberAndTheInvalidExpiryDateTest');
      console.log('stdout:', stdout1);
      console.log('stderr:', stderr1);
    })
    console.log("Running test suite in incremental mode and browser tests only")
  } else {

    console.log("different flag")

  }

  it('Browser - should verify serial number invalid and expiry date invalid ', async () => {
    allureReporter.addDescription("Edit batch and pass invalid serial number and expiry date in matrix")
    allureReporter.addTestId('OtherTests_1')
    allureReporter.addStep("Scan a data matrix code where the Serial number is invalid and expiry date is also invalid ")


    await batches.Batch();
    // await wait.setTimeoutwait(3);
    //Created for QA environment
    // await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')
    await wait.setTimeoutwait(8);

    let editValue = info.getbatchId()
    console.log("editValue is " + editValue)
    await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
    await wait.setTimeoutwait(6);

    info.setCurrentRandomDate()
    await wait.setTimeoutwait(3);
    await browser.execute((date) => {
      (function () {
        let event = new Event('change');
        let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
        datePicker.value = date;
        datePicker.dispatchEvent(event);
      })();
    }, info.getCurrentRandomDate());

    await wait.setTimeoutwait(3);


    await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
    await wait.setTimeoutwait(5);

    //set serial number value
    info.setSerialNumber(await batches.serialNum())
    //enter serial number
    await batches.enterSerialNumber(info.getSerialNumber())
    await wait.setTimeoutwait(5);
    // manage serial number accept 
    await batches.acceptSerialNumber()
    await wait.setTimeoutwait(3);

    const invalidSerialNumber = await batches.serialNum()
    console.log('invalid serial number ' + invalidSerialNumber)
    await wait.setTimeoutwait(3);

    const incorrectExpiryDate = info.randomDateExpired()
    await wait.setTimeoutwait(3);

    data.generateExpectationFile(info.getProductId(), info.getbatchId(), incorrectExpiryDate, invalidSerialNumber, info.getBrandName(), "", "", "", "", "")
    await wait.setTimeoutwait(12);

    //generate Image
    matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), incorrectExpiryDate, invalidSerialNumber)
    await wait.setTimeoutwait(12);

    //update batch
    await batches.updateBatchForEdit()
    await wait.setTimeoutwait(18);



    allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
    // allureReporter.endStep("passed");
    // await batches.cancelButton()
    // await browser.pause(1000)
  });




})

