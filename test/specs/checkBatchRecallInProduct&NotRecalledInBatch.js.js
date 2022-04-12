
const batches= require('../pageobjects/batches.page.js');
const products=require('../pageobjects/products.page.js')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
// const path=require('path')


describe('Product - display ePI Flag', () => {

    if(!process.env.npm_config_browserOnly){
        const util = require('util');
        const exec = util.promisify(require('child_process').exec);

    after(async () => {
        console.log("Starting Mobile Execution");
        const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
        console.log('stdout:', stdout1);
        console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('ProductDisplayEpiFlag_1_1-Should check batch is not recalled', async() => {
        allureReporter.addDescription('Edit product and check batch is recalled flag. Edit batch and check batch is not recalled ')
        allureReporter.startStep("check batch is not recalled")
        allureReporter.addTestId('ProductDisplayEpiFlag_1_1')

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(2);
        console.log("prod to edit" + info.getProductId())
       // search the product codes
        await products.searchProductCode(info.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);
        // //check batch is recalled
        // await products.enableBatchIsRecalled()
        // await wait.setTimeoutwait(5);

        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(5);
        
        // add smpc
        await batches.addEpi()
        await wait.setTimeoutwait(1);

        await batches.selectLanguage(testData.newBatchDetails.selectLanguage)
        await wait.setTimeoutwait(2);
        await batches.selectType(testData.newBatchDetails.selectType)
        await wait.setTimeoutwait(2);
        
        // upload leaflet folder
        await products.uploadFile(path.join(__dirname, '/src/SMPC_ProductLevel'));
        await wait.setTimeoutwait(4);
        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);
        //scrollIntoView
        await batches.acceptButton()
        await wait.setTimeoutwait(5);

         //update products
         await products.updateProduct()
         await wait.setTimeoutwait(8);  


        await batches.Batch();
        // await wait.setTimeoutwait(3);
        //Created for QA environment
        // await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')
        await wait.setTimeoutwait(6);

        await batches.addBatch();
        await wait.setTimeoutwait(3);

        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(3);

        await batches.siteName(testData.newBatchDetails.siteName);
        await wait.setTimeoutwait(5);

        info.setBrandName(await batches.checkBrandName())
        await wait.setTimeoutwait(3);

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

        await wait.setTimeoutwait(2);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        await wait.setTimeoutwait(2);
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);

        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);

        //set serial number value
        info.setSerialNumber(await batches.serialNum())
        //enter serial number
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(5);
        // manage serial number accept 
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(1);

        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(2);

        //generate expectation file
        data.generateExpectationFile(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), info.getBatchRecall(), "", "", info.getBatchRecallMsg(), info.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), await batches.batchIdValue(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(10);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");

    })
})