
const products= require('../pageobjects/products.page');
//const batches= require('../pageobjects/batches.page.js');
// const gtinPage = require('../specs/gtinPage.js')
const allureReporter = require('@wdio/allure-reporter').default
// const matrix=require('../utility/2dMatrixPage')
// const data=require('../utility/expectationFile')
 const info=require('../utility/reusableFile')
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('Edit product for ePI', () => {

    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdAndBatchSetup_1-Edit product for toggle ePI', async() => { 
        allureReporter.addTestId('ProdAndBatchSetup_1')
        allureReporter.addDescription('Can edit product for toggle ePI ')
        allureReporter.startStep("Update Product information in the products page. ")


        
        await products.clickProductFromSideNav()
        await browser.pause(3000);

        await products.searchProductCode(await info.editProduct())
        await browser.pause(2000);

        await browser.keys('Enter')
        await browser.pause(2000);

        await browser.$("div:nth-child(12) button:nth-child(1)").click()
        //await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await browser.pause(5000);
        
        // enable SN is in recall list
        await products.enableSnIsInRecallList()
        await browser.pause(4000);
        //expectation file
        // await data.expectData(gtinPage.gt(),  info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(), info.getBrandName(), " ", " ", await products.checkSnIsInRecallList()," ")
        // await browser.pause(15000)
        //update products
        await products.updateProduct()
        await browser.pause(8000);
        // matrix.generateImage(gtinPage.gt(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        // await browser.pause(5000)
        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

   

    })
})