const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const products= require('../pageobjects/products.page');
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
describe('057_Edit product to upload SMPC with another leaflet', () => {

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

    it('Browser - should update the product and replace the SMPC with another leaflet ', async () => {
        allureReporter.addDescription('Edit product and upload SMPC with another leaflet. Edit batch with valid serial number and scan the matrix.')
        allureReporter.startStep(' Update the product and replace the SMPC with another leaflet ')
        allureReporter.startStep('Scan the code to see if the SMPC got updated.')
        allureReporter.addTestId('ProductInfoUpdate_3_2')

         //click product from sidenav
         await products.clickProductFromSideNav()
         await wait.setTimeoutwait(2);
 
         //search the product code
         await products.searchProductCode(info.getProductId())
         await wait.setTimeoutwait(5);
         await browser.keys('Enter')
         await wait.setTimeoutwait(2);
         //view or edit
         //await products.clickViewEdit()
         await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
         await wait.setTimeoutwait(5);

         //delete smpc
         await products.deleteSecondLanguage()
         await wait.setTimeoutwait(2);
         //add new version epi
         await products.addEpi()
         await wait.setTimeoutwait(3);
         //select language	
         await products.selectLanguage(testData.newProductDetails.selectLanguage)
         await wait.setTimeoutwait(1);
         //select SMPC type
         await products.selectType(testData.newProductDetails.selectType)
         await wait.setTimeoutwait(2);
         //upload folder
         await products.uploadFile(path.join(__dirname, '/src/SMPC_UpdatedAtProductLevel'));
         await wait.setTimeoutwait(5);

         await products.acceptButton()
         await wait.setTimeoutwait(2);

          //Update product
          await products.updateProduct()
          await wait.setTimeoutwait(18);

        await batches.Batch();
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        console.log("editValue is " + editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')
        await wait.setTimeoutwait(6);

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData.newBatchDetails.updateValid)
        await wait.setTimeoutwait(2);
        // //enable checkbox
        // await batches.enableResetAllValidSerialNumber()
        // await wait.setTimeoutwait(2);
        //set the serial number and enter
        info.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);

        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), "", "", "", "", info.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);

        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(18);

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");


        })
    })    