const gtinPage = require('./gtinPage.js');
const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')

const allureReporter = require('@wdio/allure-reporter').default

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Expiry date Checks ', () => {

    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('Expiry date Checks_C1.5- should Retest above by changing only the month on the new data matrix Y ', async () => {
    
        allureReporter.startStep('Retest above by changing only the month on the new data matrix Y')
        allureReporter.addTestId('Expiry date Checks_C1.5')
        
       
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await browser.pause(12000)
              
        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getMonthChange(), info.getSerialNumber())
        await browser.pause(5000)
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})      