// const gtinPage = require('../specs/gtinPage.js');
const batches= require('../pageobjects/batches.page.js');
const matrix=require('../utility/2dMatrixPage')
const data=require('../utility/expectationFile')
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
const testData=require('../testdata/config.json')
const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
describe('Product Information Update', () => {


    // after(async () => {
    //     const { stdout1, stderr1 } =await exec('cd ../epi-mobileapp-test-automation && npm run test');
    //     console.log('stdout:', stdout1);
    //     console.log('stderr:', stderr1);
    //     })

    it('ProdInfoUpdate_1-should Create a batch and upload Leaflet/SMPC', async () => {
    
        allureReporter.startStep('Create a batch and upload Leaflet/SMPC')
        allureReporter.addTestId('ProdInfoUpdate_1')
        // await batches.Batch();
        // await browser.pause(4000)
        await batches.addBatch();
        await wait.setTimeoutwait(2);
        info.setBatchId(await batches.batchIdValue())
        await wait.setTimeoutwait(2);
        await batches.siteName(testData[2]['newBatchDetails'].siteName);
        await wait.setTimeoutwait(2);
        info.setCurrentRandomDate()
        await wait.setTimeoutwait(2);
        await browser.execute((date) => {
            (function () {
                let event = new Event('change');
                let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                datePicker.value = date;
                datePicker.dispatchEvent(event);
            })();
        }, info.getCurrentRandomDate());
        await wait.setTimeoutwait(4);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');  
        await selectBox.selectByAttribute('value', info.getProductId());
        await wait.setTimeoutwait(2);
        await batches.videoSource(testData[2]['newBatchDetails'].videoSource)
        await wait.setTimeoutwait(2);   

        await batches.addEpi()
        await wait.setTimeoutwait(2);
        // // video source
        // await batches.videoSourceEpi(testData[2]['newBatchDetails'].videoSource)
        // await wait.setTimeoutwait(2);
        //upload
        await browser.$('//input[@type=\'file\']').addValue(path.join(__dirname, '/src/Entresto'));
        await wait.setTimeoutwait(4);
        //accept upload
        await batches.acceptButton()
        await wait.setTimeoutwait(5);
        
        await batches.addEpi()
        await wait.setTimeoutwait(1);
        await batches.selectLanguage(testData[2]['newBatchDetails'].selectLanguage)
        await wait.setTimeoutwait(1);
        await batches.selectType(testData[2]['newBatchDetails'].selectType)
        await wait.setTimeoutwait(1);
        // video source
        // await batches.videoSourceEpi("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
        // await wait.setTimeoutwait(1);
        await browser.$('//input[@type=\'file\']').addValue(path.join(__dirname, '/src/Entresto'));
        await wait.setTimeoutwait(3);
        //scrollIntoView
        await batches.acceptButton()
        await wait.setTimeoutwait(5);
       
        // await batches.batchMessage(testData[2]['newBatchDetails'].batchMsg)
        // await wait.setTimeoutwait(2);
        // info.setSerialNumber(await batches.serialNum())
        // await wait.setTimeoutwait(2);
        await data.generateExpectationFile(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(),  info.getSerialNumber(),info.getBrandName(),"", await batches.checkBatchMessage(),"", "" )
        await wait.setTimeoutwait(12);
        matrix.generateImage(info.getProductId(), info.getbatchId(), info.getCurrentRandomDate(), info.getSerialNumber())
        await wait.setTimeoutwait(5);
       
        await batches.createBatch()
        await wait.setTimeoutwait(15);
        allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
        allureReporter.endStep("passed");
       
    })
})    