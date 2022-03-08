const gtinPage = require('../specs/gtinPage.js');
//const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
//const createbatch= require('../specs/createBatch.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const date=require('../utility/randomDate')
const allureReporter = require('@wdio/allure-reporter').default
//const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('Combination checks ', () => {

     // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })
    
    it('BatchRecall&Msg_Checks-should verify Combination checks-1 ', async () => {
    
        allureReporter.startStep('2. Create a batch 3. Add Valid serial number 4. Add valid expiry date 5. Add a recall message')
        allureReporter.addTestId('BatchRecall&Msg_Checks')
        await batches.Batch();
        await browser.pause(4000)
        await batches.addBatch();
        await browser.pause(2000)
        date.setBatchId(await batches.batchIdValue())
        // BatchID = await batches.batchIdValue()
        // console.log("Batch value is " + BatchID)
        await batches.siteName("Dolo-650 Tablet 15's");
        await browser.pause(5000)
        // let expiryDate = randomDate()
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, date.randomDate());
        await browser.pause(4000);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');  
        await selectBox.selectByAttribute('value', gtinPage.gt());
        await browser.pause(3000);
        await batches.videoSource("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
        await browser.pause(5000); 
       
        //Add valid serial number
        await batches.selectUpdateValidSerialFromDropdown('Update Valid')
        await browser.pause(5000);
        await batches.enableResetAllValidSerialNumber()
        await browser.pause(3000);
        date.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(date.getSerialNumber())
        await browser.pause(5000);
        await batches.acceptSerialNumber()
        await browser.pause(2000);
        await batches.enableCheckToRecallThisBatch()
        await browser.pause(1000)

        date.setBatchRecall(await batches.checkBatchRecall())
        await browser.pause(2000)
        await batches.enterRecallMessage("Tim said its recall")
        await browser.pause(2000) 
        date.setBatchRecallMsg(await batches.checkBatchRecallMessage()) 
        await browser.pause(2000) 
        await data.expectData(gtinPage.gt(), date.getbatchId(), date.randomDate(),  date.getSerialNumber(), "","", date.getBatchRecall(),"", date.getBatchRecallMsg())
        await browser.pause(12000)
        
        await batches.createBatch()
        await browser.pause(15000);

        matrix.generateImage(gtinPage.gt(), date.getbatchId(), date.randomDate(), date.getSerialNumber())
        await browser.pause(8000)
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    