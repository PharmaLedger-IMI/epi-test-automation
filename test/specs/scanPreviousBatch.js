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
   
    if ((process.argv[incrementalArg].split('=')[1] == "true")) {
        it('ProdAndBatchSetup_1-Should scan previous Batch', async() => {
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(),"", "","", "" )
        await wait.setTimeoutwait(12);
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(2);
    })

}
    else{

    it('ProdAndBatchSetup_1-Should scan previous Batch', async() => {
       
        allureReporter.startStep("scan previous Batch ")
        allureReporter.addTestId('ProdAndBatchSetup_1')

        info.getExpectationFile()
        await wait.setTimeoutwait(12);
        info.getImage() 
        await wait.setTimeoutwait(5);
       
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
        


    })
}
})