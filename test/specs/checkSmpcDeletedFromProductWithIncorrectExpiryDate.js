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

    it('Product - display ePI Flag If SMPC is deleted from the product with incorrect expiry date ', async() => {
        
        allureReporter.startStep("check If SMPC is deleted from the product with incorrect expiry date ")
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
        info.setEpiDisplayed(await products.epiDisplayed())
        await wait.setTimeoutwait(2);
        //update products
        await products.updateProduct()
        await wait.setTimeoutwait(8);  

        const incorrectExpiryDate=info.randomDateExpired()

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), incorrectExpiryDate,  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","", info.getBatchRecallMsg(), info.getEpiDisplayed())
        await wait.setTimeoutwait(12);
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), incorrectExpiryDate, info.getSerialNumber())
        await wait.setTimeoutwait(8);
       
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");



         //scan same batch

    })
})