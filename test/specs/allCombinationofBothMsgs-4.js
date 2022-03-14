const gtinPage = require('../specs/gtinPage.js');
//const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
//const createbatch= require('../specs/createBatch.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
//const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('Batch Recall and Batch Message', () => {

    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('BatchRecall&Msg_1-should  Create a batch with a batch message and batch recall and recall message', async () => {
    
        allureReporter.startStep('Create a batch with a batch message and batch recall and recall message.')
        allureReporter.addTestId('BatchRecall&Msg_1')
        // await batches.Batch();
        // await browser.pause(4000)
        await batches.addBatch();
        await browser.pause(2000)
        info.setBatchId(await batches.batchIdValue())
        await batches.siteName("Dolo-650 Tablet 15's");
        await browser.pause(5000)
        let expiryDate = info.setCurrentRandomDate()
        // info.setCurrentRandomDate(expiryDate)
        await browser.pause(2000)
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, expiryDate);
        await browser.pause(4000);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');  
        await selectBox.selectByAttribute('value', gtinPage.gt());
        await browser.pause(3000);
        await batches.videoSource("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
        await browser.pause(5000); 


        //enter batch message
        await batches.batchMessage("Sample")
        await browser.pause(2000);

        //enable batch recall
        await batches.enableCheckToRecallThisBatch()
        await browser.pause(2000)

        //enter recall message
        await batches.enterRecallMessage("Tim said its recall")
        await browser.pause(2000)

        //serial Number
        info.setSerialNumber(await batches.serialNum())
        await browser.pause(2000)

        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(), await batches.checkBatchRecall(), await batches.checkBatchMessage(),"", await batches.checkBatchRecallMessage() )
        await browser.pause(12000)
       
        await batches.createBatch()
        await browser.pause(15000);

        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await browser.pause(5000)

        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    