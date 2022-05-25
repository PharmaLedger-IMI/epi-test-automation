
const products = require('../pageobjects/products.page');
const matrix = require('../utility/2dMatrixPage')
const data = require('../utility/expectationFile')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default
const path = require('path');


describe('053_Edit product to upload a new version of the ePI ', () => {

    if (!process.env.npm_config_browserOnly) {

        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("uploadNewVersionEpiInProductTestRun")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should verify if the new ePI is displayed in product level  ', async () => {
        allureReporter.addDescription('Edit product and delete existing version and upload new version of epi ')
        allureReporter.addStep('Visit the enterprise wallet and upload a new version of the ePI for the same product at the product level')
        allureReporter.addStep('Scan the batch')
        allureReporter.addTestId('ProductInfoUpdate_1_2')

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

        //delete previous version file
        await products.clickDeleteLanguage()
        await wait.setTimeoutwait(3);
        //add new version epi
        await products.addEpi()
        await wait.setTimeoutwait(3);
        //upload folder
        await products.uploadFile(path.join(__dirname, '/src/Leaflet_UpdatedAtProductLevel'));
        await wait.setTimeoutwait(5);

        //add epi accept
        await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
        await wait.setTimeoutwait(5);
        //check file exists or not
        utilityFunction.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);
        //generate expectation file
        data.generateExpectationFile(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "", utilityFunction.getEpiDisplayed())
        await wait.setTimeoutwait(13);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(utilityFunction.getProductId(), utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(9);

        //Update product
        await products.updateProduct()
        await wait.setTimeoutwait(18);
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})