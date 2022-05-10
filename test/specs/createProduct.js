
const products = require('../pageobjects/products.page');
const info = require('../utility/reusableFile')
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
            //allureReporter.addDescription('No. of products can be created by Adding Product')
            allureReporter.addStep('Create new product with a valid GTIN')
            allureReporter.addStep('Add the ePI and save')

            await products.clickProduct();
            await wait.setTimeoutwait(4);
            await products.addProduct();
            await wait.setTimeoutwait(5);
            await products.enterGtinCode(info.getProductId());
            await wait.setTimeoutwait(3);

            // var dateStringWithTime = moment().format('DD-MM-YY h:mm:ss');
            // console.log(dateStringWithTime)
            await products.brandName(testData.newProductDetails.brandName + moment().format('DD-MM-YY h:mm:ss'))
            await wait.setTimeoutwait(4);
            info.setBrandName(await products.checkBrandName())
            await wait.setTimeoutwait(2);
            await products.productDescription(testData.newProductDetails.medicinalProductName);
            await wait.setTimeoutwait(4);
            //Upload product photo
            await products.productPhoto(path.join(__dirname, '/src/entresto.jpg'));
            await wait.setTimeoutwait(3);
            //internal material code
            await products.internalMaterialCode(testData.newProductDetails.internalMaterialCode)
            await wait.setTimeoutwait(3);
            //strength
            await products.addStrength(testData.newProductDetails.addStrength)
            await wait.setTimeoutwait(3);
            // video source
            await products.videoSource(testData.newProductDetails.videoSource)
            await wait.setTimeoutwait(3);
            //enable batch is recalled
            await products.enableBatchIsRecalled();
            await wait.setTimeoutwait(3);
            //
            await products.enableExpirationDateIsIncorrect();
            await wait.setTimeoutwait(3);
            //
            await products.enableSnIsUnknown();
            await wait.setTimeoutwait(3);

            // await products.enableSnIsInRecallList() 
            // await wait.setTimeoutwait(3);

            // await products.enableSnIsInDecommissionedList()
            // await wait.setTimeoutwait(3);
            // await products.batchIsExpired()
            // await wait.setTimeoutwait(3);
            // await products.disableBatchNumberUnknown()
            // await wait.setTimeoutwait(3);



            //add epi
            await products.addEpi()
            await wait.setTimeoutwait(3);
            //select language	
            //  await products.selectLanguage(testData.newProductDetails.selectLanguage)
            //  await wait.setTimeoutwait(1);
            //select type
            //  await products.selectType(testData.newProductDetails.selectType)
            //  await wait.setTimeoutwait(2);
            //Video source
            await products.videoSourceEpi(testData.newProductDetails.videoSource)
            await wait.setTimeoutwait(3);
            //Upload epi
            const uploadEpiFile = path.join(__dirname, '/src/Leaflet_ProductLevel')
            await products.uploadFile(uploadEpiFile);
            await wait.setTimeoutwait(3);
            //add epi accept
            await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
            await wait.setTimeoutwait(3);

            //Save product
            await products.saveProduct()
            await wait.setTimeoutwait(45);

            //  allureReporter.endStep("passed");
            allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');


        });
    }

})