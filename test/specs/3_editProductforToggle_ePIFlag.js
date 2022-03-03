const products= require('../pageobjects/products.page');
const gtinPage = require('../specs/gtinPage.js')
const allureReporter = require('@wdio/allure-reporter').default
describe('Edit product for ePI', () => {

    it('Edit product for toggle ePI', async() => { 
        allureReporter.addTestId('ProdAndBatchSetup_1')
        allureReporter.addDescription('Can edit product for toggle ePI ')
        allureReporter.startStep("Update Product information in the products page. ")

        await products.clickProductFromSideNav()
   
        // await products.clickProduct();
        await browser.pause(2000);
    
       // search the product codes
        await products.searchProductCode(gtinPage.gt())
        // await products.searchProductCode(testData.prodCode)
        // await browser.pause(2000);
        await browser.keys('Enter')
        await browser.pause(2000);
        //view or edit
        //await products.clickViewEdit()
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await browser.pause(5000);
        
        // enable SN is in recall list
        await products.enableSnIsInRecallList()
        await browser.pause(2000);
        await products.updateProduct()
        await browser.pause(4000);
        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

   

    })
})