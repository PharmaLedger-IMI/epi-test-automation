// const batches= require('../pageobjects/batches.page.js');
// const matrix=require('../utility/2dMatrixPage')
// const data=require('../utility/expectationFile')
const products= require('../pageobjects/products.page');
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('SMPC update on the product Non- batch specific version', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdInfoUpdate_1-should Update the product and replace the SMPC with another leaflet ', async () => {
    
        allureReporter.startStep(' Update the product and replace the SMPC with another leaflet ')
        allureReporter.startStep('Scan the code to see if the SMPC got updated.')
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

         //delete smpc
         await products.deleteSecondLanguage()
         await wait.setTimeoutwait(2);
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
         await browser.$('(//input[@type=\'file\'])[2]').addValue(path.join(__dirname, '/src/SMPC_UpdatedAtProductLevel'));
         await wait.setTimeoutwait(5);

         await products.acceptButton()
         await wait.setTimeoutwait(2);
 
         //Update product
         await products.updateProduct()
         await wait.setTimeoutwait(8);

         //scan the above batch


        })
    })    