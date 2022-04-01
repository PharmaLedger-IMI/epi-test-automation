// const gtinPage = require('./gtinPage.js');
// const products= require('../pageobjects/products.page');
// const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Expiry date Checks ', () => {

    // after(async () => {
        //console.log("Starting Mobile Execution");
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })
    if((process.argv[incrementalArg].split('=')[1]== "true")){
    it('Expiry date Checks_C1.6- should Retest above by changing only the day on the new data matrix Y ', async () => {
        console.log("date value is " + testData[3]['incrementalTest'].expiryDate)
       //return info.setDateChange(testData[3]['incrementalTest'].expiryDate,"day")
      info.setDateChange(testData[3]['incrementalTest'].expiryDate,"day") 

      await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getDateChange("day"),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
      await wait.setTimeoutwait(12);
            
      matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getDateChange("day"), info.getSerialNumber())
      await wait.setTimeoutwait(2);
    } )
}else{

    it('Expiry date Checks_C1.4- should Retest above batch by changing only the date on the new data matrix Y ', async () => {
    
        allureReporter.startStep('Retest above by changing only the date on the new data matrix Y')
        allureReporter.addTestId('Expiry date Checks_C1.4')
        
       
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getDateChange("day"),  info.getSerialNumber(),info.getBrandName(), "","","", "" )
        await wait.setTimeoutwait(12);
              
        matrix.generate2dMatrixImage(info.getProductId(), info.getbatchId(), info.getDateChange("day"), info.getSerialNumber())
        await wait.setTimeoutwait(12);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
}
})      