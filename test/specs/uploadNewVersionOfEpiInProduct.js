
const products= require('../pageobjects/products.page');
//const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
//const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Update product information ', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdInfoUpdate_1-should verify if the new ePI is displayed in product level  ', async () => {
    
        allureReporter.startStep('Visit the Enterprise wallet and upload a new version of the ePI for the same product at the product level')
        allureReporter.startStep('Scan the batch created previously')
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

        //delete previous version file
        await products.clickDeleteLanguage()
        //add new version epi
        await products.addEpi()
        await wait.setTimeoutwait(3);
        // //select language	
        // await products.selectLanguage(testData[1]['newProductDetails'].selectLanguage)
        // await wait.setTimeoutwait(1);
        // //select type
        // await products.selectType(testData[1]['newProductDetails'].selectType)
        // await wait.setTimeoutwait(2);
        //upload folder
        await batches.uploadFile(path.join(__dirname, '/src/Leaflet_Updated'));
        await wait.setTimeoutwait(5);
        //add epi accept
        await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
        await wait.setTimeoutwait(5);

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);

        //Update product
        await products.updateProduct()
        await wait.setTimeoutwait(8);

        //Scan the previous matrix
       
        // matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        // await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        allureReporter.endStep("passed");

       
  
    })
})    