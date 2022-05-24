const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
//const path= require('path');
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const info = require('../utility/reusableFunctions')
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile');



describe('098_Edit product to check batch is unknown and pass invalid batch and invalid expiry date', () => {


  if (!process.env.npm_config_browserOnly) {


    after(async () => {
      console.log("Starting Mobile Execution");
      await info.runAppium("checkUnknownBatchWithInvalidBatchAndInvalidExpiryDateTestRun")
    })
    console.log("Running test suite in incremental mode and browser tests only")
  } else {

    console.log("different flag")

  }

  it('Browser - should verify expiry date is invalid and invalid Batch with valid GTIN Only ', async () => {
    allureReporter.addDescription("Edit product and verify epi is displayed. Edit batch and pass unknow batch and invalid expiry date in matrix")
    allureReporter.addStep("Check batch is unknown flag in product")
    allureReporter.addStep("Check batch number in barcode is unknow")
    allureReporter.addStep("Check expiry date is invalid")
    allureReporter.addTestId('OtherTests_2')
    //click product
    await products.clickProductFromSideNav()
    await wait.setTimeoutwait(4);
    console.log("prod to edit" + info.getProductId())
    //search the product code
    await products.searchProductCode(info.getProductId())
    await wait.setTimeoutwait(3);
    await browser.keys('Enter')
    await wait.setTimeoutwait(4);
    //view or edits
    await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
    await wait.setTimeoutwait(5);

    //check batch is unknown
    await products.disableBatchNumberUnknown()
    await wait.setTimeoutwait(5);

    info.setEpiDisplayed(await products.epiDisplayed())
    await wait.setTimeoutwait(3);

    //update product
    await products.updateProduct()
    await wait.setTimeoutwait(18);


    //click batch
    await batches.clickBatchFromSideNav();
    await wait.setTimeoutwait(6);
    //edit batch
    let editValue = info.getbatchId()
    await wait.setTimeoutwait(3);
    console.log("editValue is " + editValue)
    await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
    await wait.setTimeoutwait(6);

    info.setCurrentRandomDate()
    await wait.setTimeoutwait(2);
    //select date
    await browser.execute((date) => {
      (function () {
        let event = new Event('change');
        let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
        datePicker.value = date;
        datePicker.dispatchEvent(event);
      })();
    }, info.getCurrentRandomDate());

    await wait.setTimeoutwait(2);

    //update valid serial number
    await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
    await wait.setTimeoutwait(5);

    //set serial number value
    info.setSerialNumber(await batches.serialNum())
    //enter serial number
    await batches.enterSerialNumber(info.getSerialNumber())
    await wait.setTimeoutwait(5);
    //manage serial number accept
    await batches.acceptSerialNumber()
    await wait.setTimeoutwait(4);

    const unknownBatch = info.unKnownBatch()
    await wait.setTimeoutwait(3);

    const incorrectExpiryDate = info.randomDateExpired()
    await wait.setTimeoutwait(3);

    //generate expectation file
    data.generateExpectationFile(info.getProductId(), unknownBatch, incorrectExpiryDate, info.getSerialNumber(), info.getBrandName(), "", "", "", "", info.getEpiDisplayed())
    await wait.setTimeoutwait(12);

    //generate 2d matrix image
    matrix.generate2dMatrixImage(info.getProductId(), unknownBatch, incorrectExpiryDate, info.getSerialNumber())
    await wait.setTimeoutwait(10);

    //update batch
    await batches.updateBatchForEdit()
    await wait.setTimeoutwait(18);

    allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


  });

})

