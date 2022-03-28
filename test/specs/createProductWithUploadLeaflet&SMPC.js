const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('SMPC update on the product Non- batch specific version', () => {

    // after(async () => {
        // console.log("Starting Mobile Execution"); 
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdInfoUpdate_1-should verify SMPC update on the product Non- batch specific version', async () => {
    
        allureReporter.startStep('upload SMPC for existing product')
        allureReporter.startStep('Create a batch , and scan the code. The app must display the same information that was uploaded in step 1.')
        allureReporter.addTestId('ProdInfoUpdate_1')

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
         //add new version epi
         await products.addEpi()
         await wait.setTimeoutwait(3);
         //select language	
         await products.selectLanguage(testData[1]['newProductDetails'].selectLanguage)
         await wait.setTimeoutwait(1);
         //select SMPC type
         await products.selectType(testData[1]['newProductDetails'].selectType)
         await wait.setTimeoutwait(2);
         //upload folder
         await batches.uploadFile(path.join(__dirname, '/src/Leaflet_ProductLevel'));
         await wait.setTimeoutwait(5);

         await products.acceptButton()
         await wait.setTimeoutwait(2);
 
         //Update product
         await products.updateProduct()
         await wait.setTimeoutwait(8);
 
        //create batch and scan
        await batches.Batch();
        await browser.pause(4000)
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        await batches.siteName(testData[2]['newBatchDetails'].siteName);
        await wait.setTimeoutwait(2);
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
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(false), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(),"", await batches.checkBatchMessage(),"", "" )
        await wait.setTimeoutwait(12);
        matrix.generateImage(info.getProductId(), info.getbatchId(false), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
       //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");
       
    })
})    