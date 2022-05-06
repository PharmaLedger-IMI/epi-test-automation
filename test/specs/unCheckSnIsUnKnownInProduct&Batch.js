const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const testData=require('../testdata/config.json')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const path=require('path')
const util = require('util');
const exec = util.promisify(require('child_process').exec);


describe('090_Edit product to uncheck SN is unknown and edit batch to have valid SN and pass invalid SN in matrix', () => {

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

    it('Browser - should uncheck Serial number on the batch is unknown', async() => {
        
        allureReporter.startStep("uncheck Serial number and SN on the batch is unknown")
        allureReporter.addTestId('ProductDisplayEpiFlag_6_4')

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(4);
        console.log("prod to edit" + info.getProductId())
       // search the product codes
        await products.searchProductCode(info.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);

        //uncheck sn is unknown
        await products.enableSnIsUnknown()
        await wait.setTimeoutwait(5);
       
        // //add epi
        await products.addEpi()
        await wait.setTimeoutwait(3);
        //select language	
        await products.selectLanguage(testData.newProductDetails.selectLanguage)
        await wait.setTimeoutwait(3);
        // select type
        await products.selectType(testData.newProductDetails.selectType)
        await wait.setTimeoutwait(3);
        //Video source
        // await products.videoSourceEpi(testData.newProductDetails.videoSource)
        // await wait.setTimeoutwait(3);
        //Upload smpc 
        await products.uploadFile(path.join(__dirname, '/src/SMPC_ProductLevel'));
        await wait.setTimeoutwait(4);
        //add epi accept
        await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
        await wait.setTimeoutwait(3);
        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(3);

        //update products
        await products.updateProduct()
        await wait.setTimeoutwait(25);  


         //edit batch
        await batches.Batch(); 
         //created for QA
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        console.log("editValue is "+editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);
        //
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(5);

         //set serial number
         info.setSerialNumber(await batches.serialNum())
         await wait.setTimeoutwait(3);
         await batches.enterSerialNumber(info.getSerialNumber())
         await wait.setTimeoutwait(3);

         // manage serial number accept 
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(3);

        const unKnownSerialNumber = await batches.serialNum()
        console.log('unknown serial number ' + unKnownSerialNumber)
        await wait.setTimeoutwait(3);
        

        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  unKnownSerialNumber,info.getBrandName(), "","","", "",info.getEpiDisplayed() )
        await wait.setTimeoutwait(12);

        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), unKnownSerialNumber)
        await wait.setTimeoutwait(10);

        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);   
       
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");

    })
})