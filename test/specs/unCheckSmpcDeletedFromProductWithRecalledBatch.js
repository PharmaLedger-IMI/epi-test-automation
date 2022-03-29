const products= require('../pageobjects/products.page');
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Product - display ePI Flag', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run editBatchRecallMsgTest');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('Product - display ePI Flag If SMPC is deleted from the product with recalled batch', async() => {
        
        allureReporter.startStep("unCheck If SMPC is deleted from the product with recalled batch")
        allureReporter.addTestId('Product - display ePI Flag')

        await products.clickProductFromSideNav()
        await wait.setTimeoutwait(2);
        console.log("prod to edit" + info.getProductId())
       // search the product codes
        await products.searchProductCode(info.getProductId())
        await wait.setTimeoutwait(3);
        await browser.keys('Enter')
        await wait.setTimeoutwait(4);
        //view or edits
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await wait.setTimeoutwait(5);

        await products.deleteSecondLanguage()
        await wait.setTimeoutwait(4);
        //update products
        await products.updateProduct()
        await wait.setTimeoutwait(8);  


        //edit batch
         // await batches.Batch(); 
         await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

         await wait.setTimeoutwait(8);
         let editValue = info.getbatchId()
         console.log("editValue is "+editValue)
         await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
         await wait.setTimeoutwait(6);
 
        //check
         await batches.enableCheckToRecallThisBatch()
         await wait.setTimeoutwait(3);
         
         await batches.updateBatchForEdit()
         await wait.setTimeoutwait(3);

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","", info.getBatchRecallMsg() )
        await wait.setTimeoutwait(12);
        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(8);
       
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");



         //scan same batch

    })
})