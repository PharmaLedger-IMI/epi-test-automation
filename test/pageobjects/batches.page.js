
const expectChai = require('chai').expect;

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
    async serialNum10(){
        const  SerialNumber=  (Math.floor(1000000000 + Math.random() * 9000000000)).toString()
        return SerialNumber
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
    async videoSourceEpi(link2){
        await this.videoSourceEpiEnter.setValue(link2)
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
           let recallMessage="Sample"
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
    }


        }

    
    module.exports = new batchesPage();
 
