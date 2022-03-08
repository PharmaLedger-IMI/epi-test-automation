const gtinPage = require('../specs/gtinPage.js');
//const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const createbatch= require('../specs/createBatch.js');
//const editBatch = require('../specs/editBatch.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const date=require('../utility/randomDate')
const allureReporter = require('@wdio/allure-reporter').default
//const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

describe('Batch Recall and Recall Message for serialized batches ', () => {
    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })
    it('BatchRecall&Msg_1-BatchRecall&Msgs_1-should verify Batch Recall and Recall Message for serialized batches ', async () => {
    
        allureReporter.startStep('Create a batch for any product. Upload Valid Serial Numbers for the same')
        //allureReporter.startStep('Update the batch to recall it and add a display message for the same.')
        allureReporter.addTestId('BatchRecall&Msg_1')
        await batches.Batch();
        await browser.pause(4000)
        await batches.addBatch();
        await browser.pause(3000)
        date.setBatchId(await batches.batchIdValue())
        // BatchID = await batches.batchIdValue()
        // console.log("Batch value is " + BatchID)
        await batches.siteName("Dolo-650 Tablet 15's");
        await browser.pause(6000)
        
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, date.randomDate());

        await browser.pause(2000);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']'); 
        await selectBox.selectByAttribute('value', gtinPage.gt());
        await browser.pause(3000);
        await batches.videoSource("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
        await browser.pause(1000);
        await batches.selectUpdateValidSerialFromDropdown('Update Valid')
        await browser.pause(5000);
        await batches.enableResetAllValidSerialNumber()
        await browser.pause(1000);
        date.setSerialNumber(await batches.serialNum())
        await batches.enterSerialNumber(date.getSerialNumber())
        await browser.pause(5000);
        await batches.acceptSerialNumber()
        await browser.pause(1000);
       
        await batches.createBatch()
        await browser.pause(12000);
        
        let editValue = date.getbatchId()
        //click on edit 
        await browser.execute('document.querySelector("div:nth-child(' + await date.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await browser.pause(5000)
        
        //click on checkbox
        await batches.enableCheckToRecallThisBatch()
        await browser.pause(1000)
        //display recall msg
        await batches.enterRecallMessage("Sample")
        await browser.pause(1000);
        //update batch
        await batches.updateBatchForEdit()
        await browser.pause(12000);
        //Again click on edit batch
        await browser.execute('document.querySelector("div:nth-child(' + await date.editBatchRow(editValue) + ') button:nth-child(1)").click()')       
        await browser.pause(3000)
        //undo the batch recall
        await batches.enableCheckToRecallThisBatch()
        await browser.pause(3000)

        await data.expectData(gtinPage.gt(), date.getbatchId(), date.randomDate(),  date.getSerialNumber(), await batches.checkBatchMessage(),"", await batches.checkBatchRecall(),"", await batches.checkBatchRecallMessage() )
        await browser.pause(12000)

        //update batch
        await batches.updateBatchForEdit()
        await browser.pause(8000);

        matrix.generateImage(gtinPage.gt(), date.getbatchId(), date.randomDate(), date.getSerialNumber())
        await browser.pause(5000)



        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
  
    })
})    