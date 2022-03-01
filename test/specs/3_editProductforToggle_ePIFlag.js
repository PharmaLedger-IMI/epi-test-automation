const products= require('../pageobjects/products.page');
const allureReporter = require('@wdio/allure-reporter').default
describe('Edit product for ePI', () => {

    it('Edit product for toggle ePI', async() => { 
        allureReporter.addTestId('ProdAndBatchSetup_1')
        allureReporter.addDescription('Can edit product for toggle ePI ')
        allureReporter.startStep("Update Product information in the products page. ")

        await products.enableSnIsInRecallList()
        await browser.pause(2000);
        await products.updateProduct()
        await browser.pause(4000);
        allureReporter.endStep("passed");
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

   

    })
})