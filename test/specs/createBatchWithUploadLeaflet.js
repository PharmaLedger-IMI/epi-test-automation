const gtinPage = require('../specs/gtinPage.js');
const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const createbatch= require('../specs/createBatch.js');
const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');
describe('Product Information Update', () => {
    it('should Create a batch and upload Leaflet', async () => {
    
        allureReporter.startStep('Create a batch and upload Leaflet')
        allureReporter.addTestId('ProdInfoUpdate_1')
        // await batches.Batch();
        // await browser.pause(4000)
        await batches.addBatch();
        await browser.pause(2000)
        BatchID = await batches.batchIdValue()
        console.log("Batch value is " + BatchID)
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
        }, batches.randomDate());
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
        await batches.enterSerialNumber(createbatch.SerialNumber())
        await browser.pause(5000);
        await batches.acceptSerialNumber()
        await browser.pause(2000);

        await batches.addEpi()
        await browser.pause(2000);
        // video source
        await batches.videoSourceEpi("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
        await browser.pause(1000);
        //upload
        await browser.$('//input[@type=\'file\']').addValue(path.join(__dirname, '/src/Entresto'));
        await browser.pause(4000);
        //accept upload
        await batches.acceptButton()
        await browser.pause(5000);
        await batches.batchMessage("Sample")
        await browser.pause(1000);
       
        await batches.createBatch()
        await browser.pause(5000);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    