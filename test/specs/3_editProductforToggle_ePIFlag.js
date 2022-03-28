
const products= require('../pageobjects/products.page');
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('Edit product', () => {

    // after(async () => {
    //     console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run updateProductSnRecallTest');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdAndBatchSetup_1-Check SN is in recalled list', async() => { 
        allureReporter.addTestId('ProdAndBatchSetup_1')
        //allureReporter.addDescription('Can edit product for toggle ePI ')
        allureReporter.startStep("Update Product information in the products page. ")

        await products.clickProductFromSideNav()

        await wait.setTimeoutwait(2);

        console.log("prod to edit"+info.getProductId())
    
       // search the product codes
       await products.searchProductCode(info.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);
        
        // enable SN is in recall list
        await products.enableSnIsInRecallList()
        await wait.setTimeoutwait(4);
      
        //expectation file
        await data.generateExpectationFile(info.getProductId(),  info.getbatchId(false), info.getCurrentRandomDate(),  info.getSerialNumber(), info.getBrandName(), " ", " ", await products.checkSnIsInRecallList()," ")
        await wait.setTimeoutwait(15);
        //update products
        await products.updateProduct()
        await wait.setTimeoutwait(8);
        matrix.generateImage(info.getProductId(), info.getbatchId(false), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait();
        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})