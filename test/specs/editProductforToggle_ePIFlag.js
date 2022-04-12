
const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')

describe('Edit product', () => {

    if(!process.env.npm_config_browserOnly){
        const util = require('util');
        const exec = util.promisify(require('child_process').exec);
        after(async () => {
            console.log("Starting Mobile Execution");
            const { stdout1, stderr1 } = await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run updateProductSnRecallTest');
            console.log('stdout:', stdout1);
            console.log('stderr:', stderr1);
        })
        
        console.log("Running test suite in incremental mode and browser tests only")

    } else {

        console.log("different flag")

    }
    it('ProdAndBatchSetup_2-Check SN is in recalled list', async() => { 
        allureReporter.addTestId('ProdAndBatchSetup_2')
        allureReporter.addDescription('Go to product page and search product code and enter. Edit product by enabling SN is in recall list flag.', 
       'Edit batch by entering recalled serial number')
        allureReporter.startStep("Update Product information in the products page. ")

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(2);

        console.log("prod to edit"+info.getProductId())
    
       //search the product codes
        await products.searchProductCode(info.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //click on edit button
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);
        
        //enable SN is in recall list
        await products.enableSnIsInRecallList()
        await wait.setTimeoutwait(4);
        info.setSnIsinRecallList(await products.checkSnIsInRecallList())
        await wait.setTimeoutwait(2);
        //check ePI is displayed
        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);
      
        //update product
        await products.updateProduct()
        await wait.setTimeoutwait(8);

        //click on batch
        await batches.Batch(); 
        // created for QA environment
        //await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        console.log("editValue is "+editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(6);

         //select recalled serial number
         await batches.selectUpdateRecalledSerialFromDropdown(testData.newBatchDetails.updateRecalled)
         await wait.setTimeoutwait(2);
         //set the serial number and enter
         info.setSerialNumber(await batches.serialNum())
         await wait.setTimeoutwait(2);
         await batches.enterSerialNumber(info.getSerialNumber())
         await wait.setTimeoutwait(2);      
         //accept serial number
         await batches.acceptSerialNumber()
         await wait.setTimeoutwait(2);

        //generate expectation file
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber(), info.getBrandName(), " ", " ",  info.getSnIsinRecallList(), " ", info.getEpiDisplayed())
        await wait.setTimeoutwait(15);
        //generate 2d matrix image 
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(8);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(10);
         
        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})