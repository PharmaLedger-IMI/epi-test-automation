const products = require('../pageobjects/products.page');
const batches = require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const testData = require('../testdata/config.json')
const info = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const path = require('path')


describe('070_Edit product to uncheck incorrect expiry date and edit batch to have valid expiry date and pass incorrect expiry date in matrix', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await info.runAppium("uncheckIncorrectExpiryDateInProductAndBatchTest")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should check Expiration Date is incorrect', async () => {

        allureReporter.addStep("Uncheck expiration date is incorrect flag in product")
        allureReporter.addStep("Scan the code with incorrect expiry date")
        allureReporter.addTestId('ProductDisplayEpiFlag_2_4')
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

        //uncheck enableExpirationDateIsIncorrect
        await products.enableExpirationDateIsIncorrect();
        await wait.setTimeoutwait(3);

        //add epi
        await products.addEpi()
        await wait.setTimeoutwait(3);
        //select language
        await products.selectLanguage(testData.newProductDetails.selectLanguage)
        await wait.setTimeoutwait(3);
        //select type
        await products.selectType(testData.newProductDetails.selectType)
        await wait.setTimeoutwait(3);
        //video source
        await products.videoSourceEpi(testData.newProductDetails.videoSource)
        await wait.setTimeoutwait(5);
        //upload smpc
        await products.uploadFile(path.join(__dirname, '/src/SMPC_ProductLevel'));
        await wait.setTimeoutwait(5);
        //add epi accept
        await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
        await wait.setTimeoutwait(3);

        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);

        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(18);


        //click batch
        await batches.clickBatchFromSideNav();
        await wait.setTimeoutwait(8);
        //edit batch
        let editValue = info.getbatchId()
        await wait.setTimeoutwait(3);
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
        const incorrectExpiryDate = info.randomDateExpired()
        await wait.setTimeoutwait(3);

        //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), incorrectExpiryDate, info.getSerialNumber(), info.getBrandName(), info.getBatchRecall(), "", "", info.getBatchRecallMsg(), info.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), incorrectExpiryDate, info.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})