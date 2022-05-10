const batches = require('../pageobjects/batches.page.js');
const products = require('../pageobjects/products.page');
//const path= require('path');
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const info = require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile');
const util = require('util');
const exec = util.promisify(require('child_process').exec);



describe('099_Edit product and verify epi displayed. Edit batch and pass invalid serial number in matrix', () => {


  if (!process.env.npm_config_browserOnly) {


    after(async () => {
      console.log("Starting Mobile Execution");
      const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npm run inValidSerialNumberWithTheBatchRecalledTest');
      console.log('stdout:', stdout1);
      console.log('stderr:', stderr1);
    })
    console.log("Running test suite in incremental mode and browser tests only")
  } else {

    console.log("different flag")

  }

  it('Browser - should verify Serial number invalid and batch recalled  ', async () => {
    allureReporter.addDescription("Edit product and verify epi displayed. Edit batch and pass invalid serial number in matrix")
    allureReporter.addTestId('OtherTests_3')
    allureReporter.addStep("Edit batch.")
    allureReporter.addStep("Add serial numbers to the batch and Save")

    await products.clickProductFromSideNav()
    await wait.setTimeoutwait(3);
    console.log("prod to edit" + info.getProductId())
    // search the product codes
    await products.searchProductCode(info.getProductId())
    await wait.setTimeoutwait(3);
    await browser.keys('Enter')
    await wait.setTimeoutwait(4);
    //view or edits
    await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
    await wait.setTimeoutwait(5);

    info.setEpiDisplayed(await products.epiDisplayed())
    await wait.setTimeoutwait(3);

    //update products
    await products.updateProduct()
    await wait.setTimeoutwait(18);

    await batches.Batch();
    // await wait.setTimeoutwait(3);
    //Created for QA environment
    //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')
    await wait.setTimeoutwait(6);

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

    //enable recall checkbox
    // await batches.enableCheckToRecallThisBatch()
    // await wait.setTimeoutwait(2);
    // //set batch recall
    // info.setBatchRecall(await batches.checkBatchRecall())
    // await wait.setTimeoutwait(2);
    // await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
    // await wait.setTimeoutwait(2);
    // //set batch recall msg
    // info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
    // await wait.setTimeoutwait(2);

    const invalidSerialNumber = await batches.serialNum()
    console.log('invalid serial number ' + invalidSerialNumber)
    await wait.setTimeoutwait(2);
    //generate expectation file 
    data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), invalidSerialNumber, info.getBrandName(), "", "", "", "", info.getEpiDisplayed())
    await wait.setTimeoutwait(12);

    //generate 2d matrix image
    matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), invalidSerialNumber)
    await wait.setTimeoutwait(12);

    //update batch
    await batches.updateBatchForEdit()
    await wait.setTimeoutwait(18);



    allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
    // allureReporter.endStep("passed");
    // allureReporter.endStep("passed");

  });




})

