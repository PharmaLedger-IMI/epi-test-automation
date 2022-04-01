const batches= require('../pageobjects/batches.page.js');
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
// const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')


// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Leaflet updates on the product Batch specific version', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npx kill-port 4723 && npm run editBatchRecallMsgTest');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdAndBatchSetup_1-Should Delete the ePI and SMPC', async() => {
       
        allureReporter.startStep("Delete the ePI and SMPC at Batch 2 - scan the product - you should be able to see the product level leaflet and same when you scan Batch 1 ")
        allureReporter.addTestId('ProdAndBatchSetup_1')

        // await batches.Batch(); 
        await browser.execute('document.querySelector(`webc-app-menu-item:nth-child(4) stencil-route-link:nth-child(1) a:nth-child(1)`).click()')

        await wait.setTimeoutwait(8);
        let editValue = info.getbatchId()
        console.log("editValue is "+editValue)
        await browser.execute('document.querySelector("div:nth-child(' + await info.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await wait.setTimeoutwait(6);

        //delete epi and SMPC 
        await batches.deleteAllFile()
        await wait.setTimeoutwait(5);

        await batches.updateBatchForEdit()
        await wait.setTimeoutwait(15);

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(),"", await batches.checkBatchMessage(),"", "" )
        await wait.setTimeoutwait(12);
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
       
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        


    })
})