
const products = require('../pageobjects/products.page');
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const testData = require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path = require('path');
const moment = require('moment');



describe('003_Create Product', () => {
    if (process.env.npm_config_incremental) {

        console.log("This testcase is running for existing product")

    }
    else {

        it('Browser - should verify product page', async () => {

            allureReporter.addFeature('Create Product')
            allureReporter.addSeverity('Critical');
            allureReporter.addTestId('ProdAndBatchSetup_1')
            allureReporter.addStep('Create new product with a valid GTIN')
            allureReporter.addStep('Add the ePI and save')
            //click product
            await products.clickProduct();
            await wait.setTimeoutwait(4);
            //add product
            await products.addProduct();
            await wait.setTimeoutwait(5);
            //enter gtin
            await products.enterGtinCode(utilityFunction.getProductId());
            await wait.setTimeoutwait(3);
            //enter brand name
            await products.brandName(testData.newProductDetails.brandName + moment().format('DD-MM-YY h:mm:ss'))
            await wait.setTimeoutwait(4);
            utilityFunction.setBrandName(await products.checkBrandName())
            await wait.setTimeoutwait(2);
            //enter description
            await products.productDescription(testData.newProductDetails.medicinalProductName);
            await wait.setTimeoutwait(4);
            //upload product photo
            await products.productPhoto(path.join(__dirname, '/src/entresto.jpg'));
            await wait.setTimeoutwait(3);
            //internal material code
            await products.internalMaterialCode(testData.newProductDetails.internalMaterialCode)
            await wait.setTimeoutwait(3);
            //strength
            await products.addStrength(testData.newProductDetails.addStrength)
            await wait.setTimeoutwait(3);
            //video source
            await products.videoSource(testData.newProductDetails.videoSource)
            await wait.setTimeoutwait(3);
            //enable batch is recalled
            await products.enableBatchIsRecalled();
            await wait.setTimeoutwait(3);
            //click expiration date is incorrect
            await products.enableExpirationDateIsIncorrect();
            await wait.setTimeoutwait(3);
            //click SN is unknown
            await products.enableSnIsUnknown();
            await wait.setTimeoutwait(3);

            //add epi
            await products.addEpi()
            await wait.setTimeoutwait(3);

            //video source
            await products.videoSourceEpi(testData.newProductDetails.videoSource)
            await wait.setTimeoutwait(3);
            //upload epi
            const uploadEpiFile = path.join(__dirname, '/src/Leaflet_ProductLevel')
            await products.uploadFile(uploadEpiFile);
            await wait.setTimeoutwait(3);
            //add epi accept
            await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
            await wait.setTimeoutwait(3);

            //save product
            await products.saveProduct()
            await wait.setTimeoutwait(60);

            allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


        });
    }

})