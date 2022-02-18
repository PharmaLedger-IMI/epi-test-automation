const { browser } = require("har-validator");


class batchesPage{
    get manageBatches(){
        return  $("=Batches")
    }
    get addbatchbutton(){
        return $("//button[normalize-space()='ADD BATCH']")
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
    get manageSerialNumbersClick(){
        return $('//psk-select[@class=\'hydrated\']//select[@class=\'form-control\']')
    }
    get manageSerialNumberFieldEnter(){
        return $('//textarea[@value=\'@actionModalModel.serialNumbers\']')
    }
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
    get videoSourceEpiEnter(){
        return $("//textarea[@value='@modalData.product.videoSource']")
    }
    get addEpiAcceptButton(){
        return $("//button[normalize-space()='Accept']")
    }
    get createBatchButton(){
        return $("//button[normalize-space()='Add batch']")
    }

    //
    async Batch(){
        
        await this.manageBatches.click();
    }
    async addBatch(){

        await this.addbatchbutton.click();
    }
    async siteName(site){
        
        await this.addsitename.click();
        await this.addsitename.setValue(site)
    }
    async enableDaySelection(){
        await this.enableDaySelectionCheckbox.isEnabled()
        await expect(this.enableDaySelectionCheckbox).toBeEnabled();
    }
    async videoSource(link1){
        await this.videoSourceEnter.setValue(link1)
    }
    async enableIncorrectExpirationDateVerification(){
        await this.enableIncorrectExpirationDateVerificationCheckbox.isEnabled()
        await expect(this.enableIncorrectExpirationDateVerificationCheckbox).toBeEnabled();
    }
    async expirationDateVerification(){
        await this.expirationDateVerificationCheckbox.isEnabled()
        await expect(this.expirationDateVerificationCheckbox).toBeEnabled();
    }
    async enableSerialNumberVerification(){

        await this.enableSerialNumberVerificationCheckbox.isEnabled()
        await expect(this.enableSerialNumberVerificationCheckbox).toBeEnabled();
    }
    async manageSerialNumbersDropdown(updateValidSerial){
        await this.manageSerialNumbersClick.addValue(updateValidSerial)
    }
    async manageSerialNumberField(serialnumber){
        await this.manageSerialNumberFieldEnter.setValue(serialnumber)

    }
    async serialNumberAccept(){
        await this.serialNumberAcceptButton.click()
    }
    async serialNumberCancel(){
        await this.serialNumberCancelButton.click()
    }
    async batchMessage(message){
        await this.batchMessageEnter.setValue(message)
    }
    async addEpi(){
        await this.addEpiButton.click()
    }
    async videoSourceEpi(link2){
        await this.videoSourceEpiEnter.setValue(link2)
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