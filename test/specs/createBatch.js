const batches= require('../pageobjects/batches.page.js');
const gtinPage = require('../specs/gtinPage.js');
const path= require('path');

const info=require('../utility/reusableFile')
const allureReporter = require('@wdio/allure-reporter').default
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile');


// const util = require('util');
// const exec = util.promisify(require('child_process').exec);


describe('Create Batch', () => {

    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

it('Should verify batch page ', async() => {
    allureReporter.addFeature('Create Batch')
    allureReporter.addSeverity('Critical');
    allureReporter.addTestId('ProdAndBatchSetup_1')
    allureReporter.addDescription('No. of batches can be created by Adding batch')
    allureReporter.startStep("Create a batch for the recent GTIN with all valid details.")
   
  
    // await batches.Batch(); 
    await browser.execute('document.querySelector(`a[href="/batches"]`).click()')
    await browser.pause(6000)   
    await browser.execute('document.querySelector(`button[data-tag="add-batch"]`).click()')      
    // await batches.addBatch(); 
    await browser.pause(3000)
    //await batches.batchIdValue()
    //take batchid
   // BatchID= await batches.batchIdValue()
    info.setBatchId(await batches.batchIdValue())
    await browser.pause(3000)
    //console.log("Batch value is "+BatchID)
    await batches.siteName("Dolo-650 Tablet 15's"); 
    await browser.pause(5000)
    //let expiryDate = batches.randomDate()
    await browser.execute((date) => {
        (function () {
            let event = new Event('change');
            let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
            datePicker.value = date;
            datePicker.dispatchEvent(event);
        })();
    }, info.randomDate());
    await browser.pause(2000);
    const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
     //await selectBox.selectByAttribute('value', '09088884204609');
     await browser.pause(2000);  
     await selectBox.selectByAttribute('value', gtinPage.gt());
    await browser.pause(3000);
    //enable dateselection
    await batches.enableDaySelection();
    await browser.pause(2000);
    //video source
    await batches.videoSource("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
    await browser.pause(2000);
    //enable incorrect expiration date verification
    await batches.enableIncorrectExpirationDateVerification()
    await browser.pause(2000);
    //expiration date verification       
    await batches.expirationDateVerification()
    // enable serial number verification
    await browser.pause(2000);
    await batches.enableSerialNumberVerification()
    await browser.pause(2000);
    // manage serial numbers dropdown
     await batches.selectUpdateValidSerialFromDropdown('Update Valid')
     await browser.pause(5000);
    //  await batches.selectUpdateValidSerialFromDropdown('Update Recalled')
    //  await browser.pause(5000);
    //  await batches.selectUpdateValidSerialFromDropdown('Update decommissioned')
    //  await browser.pause(5000);
     await batches.enableResetAllValidSerialNumber()
     await browser.pause(2000);
    // await batches.enableResetAllDecommisionedSerialNumber()
    // await browser.pause(1000);
    // manage serial number enter
   // SerialNumber=Math.floor(100000 + Math.random() * 900000)
    info.setSerialNumber(await batches.serialNum())
    await batches.enterSerialNumber(info.getSerialNumber())
   // await batches.enterSerialNumber("123456")
    await browser.pause(5000);
    // await batches.selectStolenReasonFromDropdown('Stolen')
    // manage serial number accept 
    await batches.acceptSerialNumber()
    await browser.pause(1000);
    // cancel button
    // await batches.cancelSerialNumber()
    // await browser.pause(1000);
    // batch msg
    // await batches.batchMessage("Sample")
    // await browser.pause(1000);
    // add epi leaflet
    await batches.addEpi()
    await browser.pause(1000);
    //
    await batches.selectLanguage('German')
    await browser.pause(1000)
    //select type
    await batches.selectType('SMPC')
    await browser.pause(1000)
   // video source
    await batches.videoSourceEpi("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
    await browser.pause(1000);
   // upload leaflet folder
   // await batches.uploadLeafletFolder()
    await browser.$('//input[@type=\'file\']').addValue(path.join(__dirname, '/src/Entresto'));
    await browser.pause(4000);  
    //scrollIntoView
    await batches.acceptButton()
    await browser.pause(5000);
    //checkbox
    // await batches.enableCheckToRecallThisBatch()
    // await browser.pause(3000)
    
    await data.expectData(gtinPage.gt(), info.getbatchId(), info.randomDate(),  info.getSerialNumber(), info.getBrandName(), "","","","")
    await browser.pause(3000)
     
    //Create batch
     await batches.createBatch()

     await browser.pause(40000);

    //Generate Image
   matrix.generateImage(gtinPage.gt(), await batches.batchIdValue(), info.randomDate(), info.getSerialNumber())
   await browser.pause(5000)

    
    allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
    allureReporter.endStep("passed");
    // await batches.cancelButton()
    // await browser.pause(1000)
});



})

