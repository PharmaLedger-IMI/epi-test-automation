const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
//const path= require('path');
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const utilityFunction = require('../utility/reusableFunctions')
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile');


describe('099_Edit product to uncheck batch is unknown and edit batch to update valid SN and pass invalid batch and incorrect date', () => {


  if (!process.env.npm_config_browserOnly) {

    after(async () => {
      console.log("Starting Mobile Execution");
      await utilityFunction.runAppium("editBatchUncheckRecallWithSerializedTest")
    })
    console.log("Running test suite in incremental mode and browser tests only")
  } else {

    console.log("different flag")

  }

  it('Browser - should create a data matrix with same GTIN but the batch is invalid and expiry date is also invalid   ', async () => {
    allureReporter.addStep("Uncheck batch is unknown flag in product")
    allureReporter.addStep("Check batch number on barcode is unknow")
    allureReporter.addStep("Check expiry date is invalid")
    allureReporter.addTestId('Other tests_2')
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

    //uncheck batch is unknown
    await products.disableBatchNumberUnknown()
    await wait.setTimeoutwait(5);

    utilityFunction.setEpiDisplayed(await products.epiDisplayed())
    await wait.setTimeoutwait(3);

    //update product
    await products.updateProduct()
    await wait.setTimeoutwait(18);

    await batches.clickBatchFromSideNav();
    // await wait.setTimeoutwait(3);
    //Created for QA environment
    //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')
    await wait.setTimeoutwait(6);
    //click batch
    let editValue = utilityFunction.getbatchId()
    await wait.setTimeoutwait(3);
    console.log("editValue is " + editValue)
    await browser.execute('document.querySelector("div:nth-child(' + await utilityFunction.editBatchRow(editValue) + ') button:nth-child(1)").click()')
    await wait.setTimeoutwait(6);
    //select date
    utilityFunction.setCurrentRandomDate()
    await wait.setTimeoutwait(2);
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

    const unknownBatch = utilityFunction.unKnownBatch()
    await wait.setTimeoutwait(2);

    const incorrectExpiryDate = utilityFunction.randomDateExpired()
    await wait.setTimeoutwait(3);
    //generate expectation file
    data.generateExpectationFile(utilityFunction.getProductId(), unknownBatch, incorrectExpiryDate, utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "", await batches.epiDisplayed())
    await wait.setTimeoutwait(12);

    //generate 2d matrix image
    matrix.generate2dMatrixImage(utilityFunction.getProductId(), unknownBatch, incorrectExpiryDate, utilityFunction.getSerialNumber())
    await wait.setTimeoutwait(9);

    //update batch
    await batches.updateBatchForEdit()
    await wait.setTimeoutwait(15);

    allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

  });

})

