const batches = require('../pageobjects/batches.page.js');
const products = require('../pageobjects/products.page');
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const utilityFunction = require('../utility/reusableFunctions')
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile');


describe('104_Edit product and verify epi displayed. Edit batch and pass invalid serial number in matrix', () => {


  if (!process.env.npm_config_browserOnly) {

    after(async () => {
      console.log("Starting Mobile Execution");
      await utilityFunction.runAppium("inValidSerialNumberWithBatchRecalledTestRun")
    })
    console.log("Running test suite in incremental mode and browser tests only")
  } else {

    console.log("different flag")

  }

  it('Browser - should verify Serial number invalid and batch recalled  ', async () => {
    allureReporter.addDescription("Edit product and verify epi displayed. Edit batch and pass invalid serial number in matrix")
    allureReporter.addTestId('OtherTests_3')
    allureReporter.addStep("Edit batch.")
    allureReporter.addStep("Add serial number to the batch and Save")
    //click product
    await products.clickProductFromSideNav()
    await wait.setTimeoutwait(3);
    console.log("prod to edit" + utilityFunction.getProductId())
    //search the product code
    await products.searchProductCode(utilityFunction.getProductId())
    await wait.setTimeoutwait(3);
    await browser.keys('Enter')
    await wait.setTimeoutwait(4);
    //view or edits
    await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
    await wait.setTimeoutwait(5);

    utilityFunction.setEpiDisplayed(await products.epiDisplayed())
    await wait.setTimeoutwait(3);

    //update product
    await products.updateProduct()
    await wait.setTimeoutwait(18);

    //click batch
    await batches.clickBatchFromSideNav();
    await wait.setTimeoutwait(6);
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

    //enable recall checkbox
    await batches.enableCheckToRecallThisBatch()
    await wait.setTimeoutwait(2);
    //set batch recall
    utilityFunction.setBatchRecall(await batches.checkBatchRecall())
    await wait.setTimeoutwait(2);
    // await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
    // await wait.setTimeoutwait(2);
    // //set batch recall msg
    // info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
    // await wait.setTimeoutwait(2);

    const invalidSerialNumber = await batches.serialNum()
    console.log('invalid serial number ' + invalidSerialNumber)
    await wait.setTimeoutwait(2);
    //generate expectation file
    data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), invalidSerialNumber, utilityFunction.getBrandName(), "", "", "", "", utilityFunction.getEpiDisplayed())
    await wait.setTimeoutwait(12);

    //generate 2d matrix image
    matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), invalidSerialNumber)
    await wait.setTimeoutwait(12);

    //update batch
    await batches.updateBatchForEdit()
    await wait.setTimeoutwait(18);

    allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


  });




})

