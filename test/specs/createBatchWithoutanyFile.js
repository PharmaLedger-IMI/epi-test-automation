
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

describe('Product Information Update ', () => {

    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdInfoUpdate_1-should Upload new version in product page ', async () => {
    
        allureReporter.startStep('Create a batch without any leaflet/smpc and upload new version of ePI in product level')
        allureReporter.addTestId('ProdInfoUpdate_1')
        await batches.Batch();
        await browser.pause(4000)
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(3);
   
        await batches.siteName(testData[2]['newBatchDetails'].siteName);
        await wait.setTimeoutwait(5);
        
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

        //select recalled serial number
        await batches.selectUpdateRecalledSerialFromDropdown(testData[2]['newBatchDetails'].updateRecalled)
        await wait.setTimeoutwait(2);
        //enable checkbox
        await batches.enableResetAllRecalledSerialNumber()
        await wait.setTimeoutwait(2);
        //set the serial number and enter
        info.setSerialNumber(await batches.serialNum())
        await wait.setTimeoutwait(2);
        await batches.enterSerialNumber(info.getSerialNumber())
        await wait.setTimeoutwait(2);      
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);

        //create batch
        await batches.createBatch()
        await wait.setTimeoutwait(40);
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

        //delete previous version file
        await products.clickDeleteLanguage()
        //add new version epi
        await products.addEpi()
        await wait.setTimeoutwait(3);
        //select language	
        await products.selectLanguage(testData[1]['newProductDetails'].selectLanguage)
        await wait.setTimeoutwait(1);
        //select type
        await products.selectType(testData[1]['newProductDetails'].selectType)
        await wait.setTimeoutwait(2);
        //upload folder
        await browser.$('(//input[@type=\'file\'])[2]').addValue(path.join(__dirname, '/src/Entresto'));
        await wait.setTimeoutwait(5);
        //add epi accept
        await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
        await wait.setTimeoutwait(5);
        
        // info.setSerialNumber(await batches.serialNum())

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);

        //Update product
        await products.updateProduct()
        await wait.setTimeoutwait(8);
       
        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    