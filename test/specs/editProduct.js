const products= require('../pageobjects/products.page');
const gtinPage = require('../specs/gtinPage.js');
const allureReporter = require('@wdio/allure-reporter').default
const testData= require('../testdata/myjsonFile.json')
const batches= require('../pageobjects/batches.page.js');

describe('Edit Product', () => {
it('ProdAndBatchSetup_1-should verify View/Edit for products in dashboard page', async() => {

    allureReporter.addTestId('ProdAndBatchSetup_1')
    //allureReporter.startStep("Click on edit button ")


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
    await products.enableBatchIsRecalled()
    await browser.pause(5000);
    
    //allureReporter.endStep("passed");
 }) 
}) 