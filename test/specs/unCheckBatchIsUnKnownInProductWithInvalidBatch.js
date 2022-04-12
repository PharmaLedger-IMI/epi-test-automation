const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const testData=require('../testdata/config.json')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')



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

    it('ProductDisplayEpiFlag_7_4-Should uncheck batch is unknown and batch  on the barcode is unknown', async() => {
        allureReporter.addDescription("Edit product and verify epi displayed and uncheck batch is unknown. Edit batch and pass unknown batch on matrix")
        allureReporter.startStep("uncheck batch is unknown and batch  on the barcode is unknown")
        allureReporter.addTestId('ProductDisplayEpiFlag_7_4')

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
        //uncheck batch is unknown
        await products.disableBatchNumberUnknown()
        await wait.setTimeoutwait(2);
       
        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);

        //update products
        await products.updateProduct()
        await wait.setTimeoutwait(8);  


         //edit batch
        await batches.Batch(); 
         //created for QA
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);
        //update valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);

        //set serial number
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);

        // manage serial number accept 
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(1);

        const unKnownBatch=info.unKnownBatch()
        console.log('unKnownBatch '+unKnownBatch)
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), unKnownBatch, info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","", info.getBatchRecallMsg(),info.getEpiDisplayed() )
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), unKnownBatch, info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(10);   
       
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");

    })
})