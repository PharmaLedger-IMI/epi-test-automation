const batches= require('../pageobjects/batches.page.js');
const gtinPage = require('../specs/gtinPage.js');
const path= require('path');

let BatchID=""
let SerialNumber=""
let expiryDate = randomDate()
class batchId{
    batchId(){
      return BatchID
  }
    SerialNumber(){
        return SerialNumber
    }

    randomDate(){
        return expiryDate
    }
    
  }
function randomDate() {

    let end = new Date("2029-05-28")
    let start = new Date("2023-01-01")
    var date1 = new Date(+start + Math.random() * (end - start));
    finalD = date1
    let month = finalD.getMonth()
    let date = finalD.getDate()
    if(finalD.getMonth()<10){
        month = "0"+finalD.getMonth()
    }
    if(finalD.getDate()<10){
        date =  "0"+finalD.getDate()
       }
    var date2=finalD.getFullYear() +"-" + month + "-" + date
    console.log(date2)
    return date2

 }
describe('Batch Page', () => {

it('Should verify batch page functionalities', async() => {
    await batches.Batch(); 
    await browser.pause(4000)         
    await batches.addBatch(); 
    await browser.pause(2000)
    BatchID= await batches.batchIdValue()
    console.log("Batch value is "+BatchID)
    await batches.siteName("Dolo-650 Tablet 15's"); 
    await browser.pause(3000)
   // let expiryDate = randomDate()
    await browser.execute((date) => {
        (function () {
            let event = new Event('change');
            let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
            datePicker.value = date;
            datePicker.dispatchEvent(event);
        })();
    }, expiryDate);
    await browser.pause(2000);
    const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
    //  await selectBox.selectByAttribute('value', '10014331120600');
    //  await browser.pause(2000);  
    await selectBox.selectByAttribute('value', gtinPage.gt());
    await browser.pause(3000);
    //enable dateselection
    await batches.enableDaySelection();
    await browser.pause(1000);
    //video source
    await batches.videoSource("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
    await browser.pause(1000);
    //enable incorrect expiration date verification
    await batches.enableIncorrectExpirationDateVerification()
    await browser.pause(1000);
    //expiration date verification       
    await batches.expirationDateVerification()
    // enable serial number verification
    await browser.pause(1000);
    await batches.enableSerialNumberVerification()
    await browser.pause(1000);
    // manage serial numbers dropdown
    //  await batches.selectUpdateValidSerialFromDropdown('Update Valid')
    //  await browser.pause(5000);
    //  await batches.selectUpdateValidSerialFromDropdown('Update Recalled')
    //  await browser.pause(5000);
     await batches.selectUpdateValidSerialFromDropdown('Update decommissioned')
     await browser.pause(5000);
    //  await batches.enableResetAllValidSerialNumber()
    //  await browser.pause(1000);
    //await batches.enableResetAllRecalledSerialNumber()
    await batches.enableResetAllDecommisionedSerialNumber()
    await browser.pause(1000);
    // manage serial number enter
    SerialNumber=Math.floor(100000 + Math.random() * 900000)
    await batches.enterSerialNumber(SerialNumber)
    await browser.pause(4000);
    await batches.selectStolenReasonFromDropdown('Stolen')
    // manage serial number accept 
    await batches.acceptSerialNumber()
    await browser.pause(1000);
    // cancel button
    // await batches.cancelSerialNumber()
    // await browser.pause(1000);
    // batch msg
    await batches.batchMessage("Sample")
    await browser.pause(1000);
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
    await batches.enableCheckToRecallThisBatch()
    await browser.pause(1000)
    //Create batch
    await batches.createBatch()
    await browser.pause(3000);
});

xit('should verify edit for batches page in dashboard', async() => {
    
    let fArry = []
    var i = 10

    for (; await browser.$("div:nth-child(" + i + ")").isExisting() == true; i++) {
        console.log(i)

        fArry.push({ batchId: await browser.$("div:nth-child(" + i + ")").getText(), edit: i + 4 })
        i = i + 6
    }
    let batchValue = "RY4115"
    let rClick = ""
    fArry.map((key, index) => {
        if (key["batchId"] == batchValue) {
            rClick = index
        }

    })
    console.log(fArry)
    console.log(fArry[rClick]["edit"])
    //click on edit
    await browser.execute('document.querySelector("div:nth-child(' + fArry[rClick]["edit"] + ') button:nth-child(1)").click()')
    await browser.pause(2000)
})



})
module.exports = new batchId();
