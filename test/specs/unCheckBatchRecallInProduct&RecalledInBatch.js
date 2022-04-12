const products= require('../pageobjects/products.page');
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

    it('ProductDisplayEpiFlag_1_4-Should unCheck batch is recalled', async() => {
        allureReporter.addDescription('Edit product and uncheck batch is recalled flag. Edit batch and check batch is recalled ')
        allureReporter.startStep("unCheck batch is recalled")
        allureReporter.addTestId('ProductDisplayEpiFlag_1_4')

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
        
        //uncheck batch is recalled
        await products.enableBatchIsRecalled(); 
        await wait.setTimeoutwait(1);

        //add epi
        await products.addEpi()
        await wait.setTimeoutwait(3);
        //select language	
        await products.selectLanguage(testData.newProductDetails.selectLanguage)
        await wait.setTimeoutwait(1);
        // select type
        await products.selectType(testData.newProductDetails.selectType)
        await wait.setTimeoutwait(2);
        //Video source
        await products.videoSourceEpi(testData.newProductDetails.videoSource)
        await wait.setTimeoutwait(1);
        //Upload smpc 
        await products.uploadFile(path.join(__dirname, '/src/SMPC_ProductLevel'));
        await wait.setTimeoutwait(3);
        //add epi accept
        await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
        await wait.setTimeoutwait(3);



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

        // //enable checkbox for batch recall
        // await batches.enableCheckToRecallThisBatch()
        // await wait.setTimeoutwait(3);
        info.setBatchRecall(await batches.checkBatchRecall())
        await wait.setTimeoutwait(2);
        // //enter recall msg
        // await batches.enterRecallMessage(testData.newBatchDetails.recallMsg)
        // await wait.setTimeoutwait(4);
        info.setBatchRecallMsg(await batches.checkBatchRecallMessage())
        await wait.setTimeoutwait(2);
        //generate expectation file 
        data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), info.getBatchRecall(),"","", info.getBatchRecallMsg() )
        await wait.setTimeoutwait(12);
        //update batch
        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(10);   
       //generate 2d matrix image
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(8);
       
        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");

    })
})