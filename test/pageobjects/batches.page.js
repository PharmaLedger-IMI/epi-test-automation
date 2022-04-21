
const expectChai = require('chai').expect;
const testData=require('../testdata/config.json')
const path = require('path')
const  {URL}  = require('url')
const assert = require('assert');
const fs = require('fs')

let isChecked=false
class batchesPage{

   

    get batchFromSideNav(){
        //return  $("=Batches")
        return $("//a[normalize-space()='Batches']")
    }
    get addbatchbutton(){
        return $("//button[normalize-space()='ADD BATCH']")
    }
    get batchIdValue1(){
        return $('//input[@placeholder=\'Add batch id\']')
    }
    
    
    get addsitename(){
        return $("//input[@placeholder='Add site name']")
    }
    get brand()
    {
        return $("//input[@placeholder='Add site name']")
    }
    get enableDaySelectionCheckbox(){
        return $("//label[normalize-space()='Enable day selection']")
    }
    get videoSourceEnter(){
        return $("//textarea[@placeholder='Add video source']")
    }
    get enableIncorrectExpirationDateVerificationCheckbox(){
        return $("//label[normalize-space()='Enable Incorrect Expiration Date Verification']")
    }
    get expirationDateVerificationCheckbox(){
        return $("//label[normalize-space()='Enable Expired Expiration Date Verification']")
    }
    get enableSerialNumberVerificationCheckbox(){
        return $("//label[normalize-space()='Enable Serial Number Verification']")
    }
    get selectOptionFromDropdown(){
        return $('//psk-select[@class=\'hydrated\']//select[@class=\'form-control\']')
    }
    get resetAllValidSerialNumberCheckbox(){
        return $('//input[@id=\'update-valid-serial\']')
    }
    get resetAllRecalledSerialNumberCheckbox(){
        return $("//input[@id='update-recalled-serial']")
    }
    get resetAllDecommisionedSerialNumberCheckbox(){
        return $("//input[@id='update-decommissioned-serial']")
    }
    get enterSerialNumberField(){
        return $('//textarea[@value=\'@actionModalModel.serialNumbers\']')         
    }
    get selectReasonFromDropdown(){
        return $("//psk-select[@view-model='@actionModalModel.reason']//select[@class='form-control']")
        
    }
    // get selectUpdateRecalledSerial(){
    //     return $("//option[@value='update-recalled-serial']")
    // }
    get serialNumberAcceptButton(){
        return $("//button[normalize-space()='Accept']")
    }
    get serialNumberCancelButton(){
        return $("//psk-button[@class='marketplace-manager-button hydrated']//button[@class='btn btn-primary'][normalize-space()='Cancel']")
    }
    get batchMessageEnter(){
        return $("//textarea[@placeholder='This text will be displayed to user after Barcode is scanned']")
    }
    get addEpiButton(){
        return $("//button[normalize-space()='+ Add ePI']")
    }
    get selectLanguageDropdown(){
        return $('//select[@id=\'language\']')
    }
    get selectTypeDropdown(){
        return $('//select[@id=\'type\']')
    }
    get videoSourceEpiEnter(){
        return $("//textarea[@value='@modalData.product.videoSource']")
    }
    get uploadEpiFile(){
        return $('//input[@type=\'file\']')
    }
    get epiFileDisplayed(){
        return $("//li[@class='d-flex flex-row overflow-auto']")
    }
    get addEpiAcceptButton(){
        return $("//button[normalize-space()='Accept']")
    }
    get enableRecallThisBatch(){
        //return $("//input[@id='recalled']")
        return $("//input[@type='checkbox'][@id='recalled']")
    }
    get enterRecallMessageInTextbox(){
        return $("//textarea[@placeholder='This text will be displayed to user after Barcode is scanned if batch is recalled']")
    }
    get updateBatchForEditButton(){
        return $("//button[normalize-space()='Update batch']")
    }
    get cancelButtonForBatch(){
        return $("//button[normalize-space()='Cancel']")       
    }

    get createBatchButton(){
        return $("//button[normalize-space()='Add batch']")
    }
    get importButton(){
        return $('//button[normalize-space()="IMPORT"]')
    }
    get importFile(){
        return $('//input[@type="file"]')
    }
    get importF(){
        return $('//button[normalize-space()="Import"]')
    }
    get clickViewMessageInFailedLogs(){
        return $("(//button[@class='btn btn-link p-0 col align-self-center text-left'][contains(text(),'View')])[16]")
    }
    get clickViewMessageInSuccessLogs(){
        return $('div:nth-child(14) button:nth-child(1)')
    }
    get clickDownloadMsg(){
        return $('//button[normalize-space()="Download message"]')
    }
    get clickInvalidFieldInfo(){
        return $('psk-accordion-item[title="Invalid fields info"]')
    }
    get requiredFields(){
        return $('ul[data-for="@actionModalModel.secondMessageData"]')
    }
    get closeButtonInPopupClick(){
        return $("//button[normalize-space()='Close']")
    }
    

    ///////
    async Batch(){
        
        await this.batchFromSideNav.click();
    }
    async addBatch(){

        await this.addbatchbutton.click();
        
    }
    async batchIdValue(){
       
        const batchId = await this.batchIdValue1.getValue();
        
        console.log(batchId)
        return batchId

    }
   

    async serialNum(){
      const  SerialNumber=  (Math.floor(100000 + Math.random() * 900000)).toString()
      return SerialNumber
    }


    async checkBrandName() {
        if (await this.brand.isDisplayed() == true) {
            let brandDisplayed = (await this.brand.getValue()).toString()
            return brandDisplayed
        }
        else {
            let brandDisplayed = "No Message"
            return brandDisplayed
        }
    }
    async siteName(site){
        
        await this.addsitename.click();
        await this.addsitename.setValue(site)
    }
    async enableDaySelection(){
        await this.enableDaySelectionCheckbox.isEnabled()
        await expect(this.enableDaySelectionCheckbox).toBeEnabled();
    }
    async enableDaySelectionClick(){
        await this.enableDaySelectionCheckbox.click()
    }

    async videoSource(link1){
        await this.videoSourceEnter.setValue(link1)
    }
    async enableIncorrectExpirationDateVerification(){
        await this.enableIncorrectExpirationDateVerificationCheckbox.isEnabled()
        await expect(this.enableIncorrectExpirationDateVerificationCheckbox).toBeEnabled();
    }
    async enableIncorrectExpirationDateVerificationClick(){
        await this.enableIncorrectExpirationDateVerificationCheckbox.click()
    }
    async expirationDateVerification(){
        await this.expirationDateVerificationCheckbox.isEnabled()
        await expect(this.expirationDateVerificationCheckbox).toBeEnabled();
    }
    
    async expirationDateVerificationClick(){
        await this.expirationDateVerificationCheckbox.click()
    }
    async enableSerialNumberVerification(){

        await this.enableSerialNumberVerificationCheckbox.isEnabled()
        await expect(this.enableSerialNumberVerificationCheckbox).toBeEnabled();
    }
    async disableSerialNumberVerification(){

        await this.enableSerialNumberVerificationCheckbox.click()
       
    }
    async selectUpdateValidSerialFromDropdown(updateValidSerialValue){
        await this.selectOptionFromDropdown.selectByVisibleText(updateValidSerialValue)
    } 
    async enableResetAllValidSerialNumber(){
        await this.resetAllValidSerialNumberCheckbox.click()
    }
    async enableResetAllRecalledSerialNumber(){
        await this.resetAllRecalledSerialNumberCheckbox.click()
    }
    async enableResetAllDecommisionedSerialNumber(){
        await this.resetAllDecommisionedSerialNumberCheckbox.click()
    }
    async selectUpdateRecalledSerialFromDropdown(updateRecalledSerialValue){
        await this.selectOptionFromDropdown.selectByVisibleText(updateRecalledSerialValue)
    }
    async selectUpdateDecommissionedFromDropdown(updateDecommissionedValue){
        await this.selectOptionFromDropdown.selectByVisibleText(updateDecommissionedValue)
    }
    async selectLostReasonFromDropdown(Lost){
        await this.selectReasonFromDropdown.selectByVisibleText(Lost)
    }
    async selectStolenReasonFromDropdown(Stolen){
        await this.selectReasonFromDropdown.selectByVisibleText(Stolen)
    }
    async selectDamagedReasonFromDropdown(Damaged){
        await this.selectReasonFromDropdown.selectByVisibleText(Damaged)
    }

    
    // async serialNumber(){

       
    //     const  SerialNumber=Math.floor(100000 + Math.random() * 900000)
    //     return SerialNumber

    // }

    async enterSerialNumber(serialNumber){
        await this.enterSerialNumberField.setValue(serialNumber)
    }
    async acceptSerialNumber(){
        await this.serialNumberAcceptButton.click()
    }
    async cancelSerialNumber(){
        await this.serialNumberCancelButton.click()
    }
    async batchMessage(message){
        await this.batchMessageEnter.setValue(message)
    }

    async checkBatchMessage()  {   
        if(await this.batchMessageEnter.isDisplayed()==true){
           let batchMessageDisplayed="Sample"
           return batchMessageDisplayed
        }
        else{
            let batchMessageDisplayed="No Message"
           return batchMessageDisplayed
        }
    }
    async addEpi(){
        await this.addEpiButton.click()
    }
    async selectLanguage(country){
        await this.selectLanguageDropdown.selectByVisibleText(country)
    }
    async selectType(type){
        await this.selectTypeDropdown.selectByVisibleText(type)
    }
    async videoSourceEpi(link){
        await this.videoSourceEpiEnter.setValue(link)
    }
    async uploadFile(uploadEpi){
        await this.uploadEpiFile.addValue(uploadEpi);
    }
    async epiDisplayed(){
        if(await this.epiFileDisplayed.isExisting()==true){
            let epiDisplayed="true"
            console.log("epiDisplayed is "+epiDisplayed)
            return epiDisplayed 
        }
        else{
            let epiDisplayed="false"
            console.log("epiDisplayed is "+epiDisplayed)
            return epiDisplayed 
        }
    }
    async enableCheckToRecallThisBatch(){


     //   isChecked=!isChecked
      
        await this.enableRecallThisBatch.scrollIntoView()
       await this.enableRecallThisBatch.click()  
       if(isChecked == false){
        isChecked = true
        }
        else{
            isChecked = false
        }
       // console.log("check value is "+await this.enableRecallThisBatch.isDisabled())
        await expect(this.enableRecallThisBatch).toBeEnabled()

    }
    async checkBatchRecall()  {   
        if(isChecked){
           let batchRecall='true'
           return batchRecall
        }
        else{
            let batchRecall='false'
           return batchRecall
        }
           }
    async enterRecallMessage(RecallMessage){
        //await this.enterRecallMessageInTextbox.scrollIntoView()
        await this.enterRecallMessageInTextbox.click()
        //await this.enterRecallMessageInTextbox.clearValue()
        await this.enterRecallMessageInTextbox.setValue(RecallMessage)
    }
    async clearRecallMessage(){
       
        await this.enterRecallMessageInTextbox.click()
        await this.enterRecallMessageInTextbox.clearValue()
        
    }
    async checkBatchRecallMessage()  {   
        if(await this.enterRecallMessageInTextbox.isDisplayed()==true){
           let recallMessage="This is a sample recall message"
           return recallMessage
        }
        else{
            let recallMessage="No Message"
           return recallMessage
        }
           }
    async updateBatchForEdit(){
        await this.updateBatchForEditButton.click()
    }
    async cancelButton(){
        await cancelButtonForBatch.click()
    }
   
    async acceptButton(){
        await this.addEpiAcceptButton.scrollIntoView()
        await this.addEpiAcceptButton.click()
    }
    async createBatch(){

        await this.createBatchButton.click()
       // await browser.waitUntil(() => $('.modal-title').waitForDisplayed({ reverse: true }))
        // await browser.waitUntil(
        //     () => browser.execute(() => document.readyState === 'complete'),
        //     {
        //       timeout: 80 * 1000, // 60 seconds
        //       //timeoutMsg: 'Message on failure'
        //     }
        // )
       // const frameGroup = await browser.$('iframe[frameborder=\'0\']');
        // await browser.waitUntil(
            
        //    // await browser.switchToFrame(frameGroup)
        //     async () => (await $('//h6[@slot="page-content"]').waitForDisplayed()),
        //     {
        //         timeout: 5000,
        //         timeoutMsg: 'no title'
        //     }
            
        // );
    }

    async  deleteAllFile(){
       
        var i = 1

        for (;  await browser.$("//li["+i+"]//div[1]//button[1]//i[1]").isExisting();) {
            console.log(i)
            await browser.$("//li["+i+"]//div[1]//button[1]//i[1]").click()  
        }
        if(await browser.$('//i[@class="fa fa-trash-o"]').isExisting()){
            await browser.$('//i[@class="fa fa-trash-o"]').click()
        }
               
    }


    async clickImport(){
        
        await this.importButton.click()

        await browser.waitUntil(
            async () => (await $('//label[normalize-space()="Select files"]').waitForEnabled()),
            {
                timeout: 5000,
                timeoutMsg: 'select button is not active'
            }
        );
    }
    async selectFile(file){
        
        await this.importFile.addValue(file)
    }
    async import(){
        
        await this.importF.click()
    }
    async viewMessageInFailedLogs(){
        
        await this.clickViewMessageInFailedLogs.click()
    }
    async viewMessageInSuccessLogs(){
        
        await this.clickViewMessageInSuccessLogs.click()
    }
    async downloadMsgInSuccessLogs(){
        
        const downloadHref = await browser.getUrl();
        // pass through Node's `URL` class
        // @see https://nodejs.org/dist/latest-v8.x/docs/api/url.html
        const downloadUrl = new URL(downloadHref);
        // get the 'pathname' off the url
        // e.g. 'download/some-file.txt'
        const fullPath = downloadUrl.pathname;
        console.log("fullpath " + fullPath)
        // split in to an array, so we can get just the filename
        // e.g. ['download', 'some-file.txt']
        const splitPath = fullPath.split('/')
        // get just the filename at the end of the array
        // e.g.  'some-file.txt'
        const fileName = splitPath.splice(-1)[0]
       
        // join the filename to the path where we're storing the downloads
        // '/path/to/wdio/tests/tempDownload/some-file.txt'
        const filePath = path.join(global.downloadDir, fileName)
        console.log(filePath)
        await this.clickDownloadMsg.click()
        await browser.pause(5000)

        let rawdata = JSON.parse(fs.readFileSync(testData.path.batchImport, 'utf8'))
        const file1 = filePath.concat("\\", "batch_", rawdata.batch.batch, ".json")
        console.log(file1)
        let fileContents = JSON.parse(fs.readFileSync(file1, 'utf-8'))
        // console.log(JSON.stringify(fileContents))
        // console.log(JSON.stringify(rawdata))
        console.log(JSON.stringify(fileContents) === JSON.stringify(rawdata))
        await browser.pause(5000)
        fs.unlinkSync(file1)
    }
    async downloadMsgInFailedLogs(){
        
        const downloadHref = await browser.getUrl();
        // pass through Node's `URL` class
        // @see https://nodejs.org/dist/latest-v8.x/docs/api/url.html
        const downloadUrl = new URL(downloadHref);
        // get the 'pathname' off the url
        // e.g. 'download/some-file.txt'
        const fullPath = downloadUrl.pathname;
        console.log("fullpath " + fullPath)
        // split in to an array, so we can get just the filename
        // e.g. ['download', 'some-file.txt']
        const splitPath = fullPath.split('/')
        // get just the filename at the end of the array
        // e.g.  'some-file.txt'
        const fileName = splitPath.splice(-1)[0]
        
        // join the filename to the path where we're storing the downloads
        // '/path/to/wdio/tests/tempDownload/some-file.txt'
        const filePath = path.join(global.downloadDir, fileName)
        console.log(filePath)
        //Click on download button
        await this.clickDownloadMsg.click()
        await browser.pause(5000)

        let rawdata = JSON.parse(fs.readFileSync(testData.path.batchImport, 'utf8'))
        const file1 = filePath.concat("\\", "batch_", rawdata.batch.batch, ".json")
        console.log(file1)
        let fileContents = JSON.parse(fs.readFileSync(file1, 'utf-8'))
        // console.log(JSON.stringify(fileContents))
        // console.log(JSON.stringify(rawdata))
        console.log(JSON.stringify(fileContents) === JSON.stringify(rawdata))
        await browser.pause(5000)
        fs.unlinkSync(file1)
    }
    async invalidFieldInfo(){
        
        await this.clickInvalidFieldInfo.click()
    }
    async invalidFieldInfoRequired(){

        const allFields= await this.requiredFields.getText()
        console.log('required fields are '+allFields)   
    
}
async closeButtonInPopup(){
    await this.closeButtonInPopupClick.click()
}



        }

    
    module.exports = new batchesPage();
 
