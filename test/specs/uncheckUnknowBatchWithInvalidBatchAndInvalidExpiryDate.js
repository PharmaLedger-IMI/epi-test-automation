const products = require('../pageobjects/products.page');
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


describe('099_Edit product to uncheck batch is unknown and edit batch to update valid SN and pass invalid batch and incorrect date', () => {


  if (!process.env.npm_config_browserOnly) {


    after(async () => {
      console.log("Starting Mobile Execution");
      const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run test');
      console.log('stdout:', stdout1);
      console.log('stderr:', stderr1);
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
    console.log("prod to edit" + info.getProductId())
    //search the product code
    await products.searchProductCode(info.getProductId())
    await wait.setTimeoutwait(3);
    await browser.keys('Enter')
    await wait.setTimeoutwait(4);
    //view or edits
    await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
    await wait.setTimeoutwait(5);

    //uncheck batch is unknown
    await products.disableBatchNumberUnknown()
    await wait.setTimeoutwait(5);

    info.setEpiDisplayed(await products.epiDisplayed())
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
    let editValue = info.getbatchId()
    console.log("editValue is " + editValue)
    await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
    await wait.setTimeoutwait(6);
    //select date
    info.setCurrentRandomDate()
    await wait.setTimeoutwait(2);
    await browser.execute((date) => {
      (function () {
        let event = new Event('change');
        let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
        datePicker.value = date;
        datePicker.dispatchEvent(event);
      })();
    }, info.getCurrentRandomDate());

    await wait.setTimeoutwait(3);
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
    await wait.setTimeoutwait(3);

    const unknownBatch = info.unKnownBatch()
    await wait.setTimeoutwait(2);

    const incorrectExpiryDate = info.randomDateExpired()
    await wait.setTimeoutwait(3);
    //generate expectation file 
    data.generateExpectationFile(info.getProductId(), unknownBatch, incorrectExpiryDate, info.getSerialNumber(), info.getBrandName(), "", "", "", "", await batches.epiDisplayed())
    await wait.setTimeoutwait(12);

    //generate 2d matrix image
    matrix.generate2dMatrixImage(info.getProductId(), unknownBatch, incorrectExpiryDate, info.getSerialNumber())
    await wait.setTimeoutwait(9);

    //update batch
    await batches.updateBatchForEdit()
    await wait.setTimeoutwait(15);

    allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

  });

})
