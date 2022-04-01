const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')

const allureReporter = require('@wdio/allure-reporter').default

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Serial Number checks ', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('Serial Number Checks_5- should clear the valid serial numbers in the above batch  ', async () => {
    
        allureReporter.startStep('In the batch created above - clear the valid serial numbers ')
        allureReporter.addTestId('Serial Number Checks_5')
        

        let editValue = info.getbatchId()
        console.log("editValue is "+editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(8);

        //select valid serial number
        await batches.selectUpdateValidSerialFromDropdown(testData[2]['newBatchDetails'].updateRecalled)
        await wait.setTimeoutwait(2);
        //enable checkbox
        await batches.enableResetAllValidSerialNumber()
        await wait.setTimeoutwait(2);
        
        //accept serial number
        await batches.acceptSerialNumber()
        await wait.setTimeoutwait(2);

         //update batch
         await batches.updateBatchForEdit()
         await wait.setTimeoutwait(10);
       


    //      // search the product codes
    //    await products.searchProductCode(info.getProductId())
    //    await wait.setTimeoutwait(3);
    //    await browser.keys('Enter')
    //    await wait.setTimeoutwait(4);
    //    //view or edits
    //    await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
    //    await wait.setTimeoutwait(5);
       
    //    // enable SN is in recall list
    //    await products.enableSnIsInRecallList()
    //    await wait.setTimeoutwait(4);

    //    //update products
    //    await products.updateProduct()
    //    await wait.setTimeoutwait(8);
       
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
       
       
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    