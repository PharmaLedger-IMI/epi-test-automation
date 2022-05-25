const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('056_SMPC update on the product Non- batch specific version', () => {

    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("createProductWithUploadLeafletAndSMPCTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should verify SMPC update on the product Non-batch specific version', async () => {
        allureReporter.addDescription('Edit product and upload SMPC. Create a new batch with valid serial number and scan the matrix.')
        allureReporter.addStep('Upload SMPC for existing product')
        allureReporter.addStep('Create a batch and scan the code. The app must display the same information that was uploaded in step 1.')
        allureReporter.addTestId('ProductInfoUpdate_3_1')

        //click product from sidenav
        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(4);

        //search the product code
        await products.searchProductCode(utilityFunction.getProductId())
        await wait.setTimeoutwait(5);
        await browser.keys('Enter')
        await wait.setTimeoutwait(3);
        //view or edit
        //await products.clickViewEdit()
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);

        //add new version epi
        await products.addEpi()
        await wait.setTimeoutwait(3);
        //select language
        await products.selectLanguage(testData.newProductDetails.selectLanguage)
        await wait.setTimeoutwait(4);
        //select SMPC type
        await products.selectType(testData.newProductDetails.selectType)
        await wait.setTimeoutwait(4);
        //upload folder
        await products.uploadFile(path.join(__dirname, '/src/SMPC_ProductLevel'));
        await wait.setTimeoutwait(5);
        //click accept
        await products.acceptButton()
        await wait.setTimeoutwait(3);

        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(25);

        //create batch and scan
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(4);
        //add batch
        await batches.addBatch();
        await wait.setTimeoutwait(3);
        utilityFunction.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(3);
        //enter site name
        await batches.siteName(testData.newBatchDetails.siteName);
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
        }, utilityFunction.getCurrentRandomDate());
        await wait.setTimeoutwait(2);
        //select dropdown
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await selectBox.selectByAttribute('value', utilityFunction.getProductId());
        await wait.setTimeoutwait(2);

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(2);

        //set the serial number and enter
        utilityFunction.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(4);
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);
        //generate expectation file
        const expectationFile = data.generateExpectationFile(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", await batches.checkBatchMessage(), "", "")
        utilityFunction.setExpectationFile(expectationFile)
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        const batch = matrix.generate2dMatrixImage(utilityFunction.getProductId(), await batches.batchIdValue(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        utilityFunction.setImage(batch)
        await wait.setTimeoutwait(15);
        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})