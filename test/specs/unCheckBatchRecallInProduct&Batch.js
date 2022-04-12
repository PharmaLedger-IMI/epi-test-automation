
const batches= require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')



describe('Product - display ePI Flag', () => {

    if(!process.env.npm_config_browserOnly){
        const util = require('util');
        const exec = util.promisify(require('child_process').exec);

    after(async () => {
        console.log("Starting Mobile Execution");
        const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
        console.log('stdout:', stdout1);
        console.log('stderr:', stderr1);
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('ProductDisplayEpiFlag_1_5 -The same recalled batch is updated for not recalled now', async() => {
        allureReporter.addDescription('Edit product and uncheck batch is recalled flag. Edit batch and check batch is not recalled ')
        allureReporter.startStep("Uncheck batch is not recalled")
        allureReporter.addTestId('ProductDisplayEpiFlag_1_5')

        //unchecked the batch is recalled in product level in above testcase  


          //edit batch
         // await batches.Batch(); 
         await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

         await wait.setTimeoutwait(8);
         let editValue = info.getbatchId()
         console.log("editValue is "+editValue)
         await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
         await wait.setTimeoutwait(6);
 
        //uncheck batch recall
         await batches.enableCheckToRecallThisBatch()
         await wait.setTimeoutwait(3);
         info.setBatchRecall(await batches.checkBatchRecall())
         await wait.setTimeoutwait(2);
          
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","", info.getBatchRecallMsg() )
        await wait.setTimeoutwait(12);
        //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(8);

        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(3);
       
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");


    })
})