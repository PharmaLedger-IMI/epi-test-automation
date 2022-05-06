const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const testData=require('../testdata/config.json')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const util = require('util');
const exec = util.promisify(require('child_process').exec);


describe('086_Edit product to uncheck SN is decommissioned and edit batch to reset decommissioned SN', () => {

    if(!process.env.npm_config_browserOnly){
       

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

    it('Browser - should uncheck Serial number is not decommissioned', async() => {
        
        allureReporter.startStep("uncheck Serial number is not decommissioned")
        allureReporter.addTestId('ProductDisplayEpiFlag_5_5')

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(3);
        console.log("prod to edit" + info.getProductId())
       // search the product codes
        await products.searchProductCode(info.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);

        //serial number unchecked
       
        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(3);

         //update products
         await products.updateProduct()
         await wait.setTimeoutwait(18);  


         //edit batch
         await batches.Batch(); 
         //created for QA
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        await wait.setTimeoutwait(3);
        console.log("editValue is "+editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);
        //
        await batches.selectUpdateDecommissionedFromDropdown(testData.newBatchDetails.updateDecommissioned)
        await wait.setTimeoutwait(5);

        await batches.enableResetAllDecommisionedSerialNumber()
        await wait.setTimeoutwait(3);
        // manage serial number accept 
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  "",info.getBrandName(), "","","", "",info.getEpiDisplayed() )
        await wait.setTimeoutwait(12);

        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),"")
        await wait.setTimeoutwait(10);

        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);   
       
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");

    })
})