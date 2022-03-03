//const { browser } = require("har-validator");


const expectChai = require('chai').expect;

class productsPage {


    get openProduct(){
        return  $('//a[@href=\'/products\']//span')
       //return $("//p[normalize-space()='Manage Products']")
    }
    get clickProductFromleftsideNav(){
        return $("=Products")
    }
    get addProductButton(){
        return $('//button[normalize-space()=\'+ ADD PRODUCT\']')
    }
    get gtin()
    {
        return $("#productcode-input")
    }
    get brand()
    {
        return $("(//input[@placeholder='Add product name'])[1]")
    }
    get productdescription()
    {
        return $("//div//textarea[@placeholder='Add product description']")
    }
    get uploadphoto()
    {
        return $("//input[@type=\'file\']")
    }
    get internalMaterialCodeEnter(){
        return $("//input[@placeholder='Add internal material code']")
    }
    get addStrengthEnter(){
        return $("//input[@placeholder='Add product strength']")
    }
    get videoSourceEnter(){
        return $("//textarea[@placeholder='Add video source']")
    }
    get adverseE(){
        return $("//label[normalize-space()='Enable Anti-Counterfeiting check for this product']")
    }
    get adverseEventUrl(){
        return $("//input[@placeholder='Add Adverse Events Reporting URL']")
    }
    get antiCounterfeitingUrl(){
        return $("//input[@placeholder='Add Anti-Counterfeiting End Point URL']")
    }
    get adverseEtext(){
        return $("//input[@placeholder='Add Adverse Events Reporting URL'][@type='text']")
    }
    get anticounter(){
        return $("//label[normalize-space()='Enable Anti-Counterfeiting check for this product']")
    }
    get batchIsRecalledClick()
    {
        return $("(//input[@id='showEPIOnBatchRecalled'])[1]")
    }
    get expirationDateIsIncorrectClick(){
        return $("//label[normalize-space()='Expiration Date is incorrect']")
    }
    get batchenabled()
    {
        return $("//label[normalize-space()='Batch is expired']")
    }
    get disableBatchExpiredCheckbox(){
        return $("//label[normalize-space()='Batch is expired']")
    }
    get snIsInRecallListClick()
    {
        return $("//label[normalize-space()='SN is in Recall list']")
    }
    get snIsInDecommissionedListClick(){
        return $("//label[normalize-space()='SN is in Decommissioned list']")
    }
    get snIsUnknownClick(){
        return $("//label[normalize-space()='SN is unknown']")
    }
    get batchNumberUnknownEnabled(){
        return $("//label[normalize-space()='Batch number unknown']")
    }
    get disableBatchNumberUnknownCheckbox(){
        return $("//label[normalize-space()='Batch number unknown']")
    }
    get patientInformation()
    {
        return $("//div[contains(text(),'Patient Specific Information Leaflet')]")
    }
    get healthcareInformation(){
        return $("//div[contains(text(),'Healthcare practitioner information')]")
    }
    get addEpiButton(){
        return $('//button[normalize-space()=\'+ Add ePI\']')
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
    get clickDeleteLanguageButton(){
        return $("//button[@class='delete-language']")
    }
    get marketManagementButtonClick(){
        return $("div:nth-child(2) > div:nth-child(1) > psk-button:nth-child(2) > button:nth-child(1)")
    }
    get addMarketButtonClick(){
        return $("//button[normalize-space()='Add Market']")
    }
    get selectLanguageInMarketPageDropdown(){
        return $("//select[@id='selectcountry']")
    }
    get enterNationalCodeInTextbox(){
        return $("//input[@placeholder='Enter national code']")
    }
    get enterMAHNameInTextbox(){
        return $("//input[@placeholder='Enter MAH name']")
    }
    get enterLegalEntityNameInTextbox(){
        return $("//input[@placeholder='Enter legal entity name']")
    }
    get addMarketButtonInPopupClick(){
        return ('document.querySelector("body > webc-app-root:nth-child(1) > webc-app-container:nth-child(3) > div:nth-child(1) > webc-app-router:nth-child(1) > stencil-router:nth-child(1) > stencil-route-switch:nth-child(1) > stencil-route:nth-child(9) > webc-app-loader:nth-child(1) > psk-page:nth-child(1) > h6:nth-child(1) > webc-container:nth-child(1) > webc-modal:nth-child(3) > footer:nth-child(3) > psk-button:nth-child(2) > button:nth-child(1)").click()')
    }
    get closeButtonInPopupClick(){
        return $("//button[normalize-space()='Close']")
    }

    // get leaflet(){
    //     return $('//button[normalize-space()=\'+ Add ePI\']')
    // }
    get saveProductButton(){
        return $("//button[normalize-space()='Save Product']")
    }
    get searchProduct(){
        return $("//input[@id='code-search']")
    }
    get updateProductButton(){
        return $("//button[normalize-space()='Update Product']")
    }
   
    get cancelbutton()
    {
        return $("//button[normalize-space()='Cancel']")
       
    }
    get clickViewEditButton(){
        return browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
    }
    


    // async switchframe(){
       
    //     const frame = await this.sFrame;

    //    // await browser.switchToFrame(frame);
        
    // }
    async clickProduct(){
       
        await this.openProduct.click();
        
    }
    async clickProductFromSideNav(){
        await this.clickProductFromleftsideNav.click()
    }
    async addProduct(){
       
        await this.addProductButton.click();
    }
    async gtinClrEnt(gtinNumber){
       
        await this.gtin.click();
        await this.gtin.clearValue();
        await this.gtin.setValue(gtinNumber);
    }
    async brandName(brandName){
       
        await this.brand.setValue(brandName);
    }
    async productDescription(description){
       
        await this.productdescription.setValue(description);
    }
    async productPhoto(filePath1){
                             
        console.log(filePath1)
        await this.uploadphoto.addValue(filePath1);
       
    }
    async internalMaterialCode(code){
        await this.internalMaterialCodeEnter.setValue(code)
    }
    async addStrength(strength){
        await this.addStrengthEnter.setValue(strength)
    }
    async videoSource(link1){
        await this.videoSourceEnter.setValue(link1)
    }
    async adverseEvents(){
       
        await this.adverseE.isEnabled();
        await expect(this.adverseE).toBeEnabled()  
        const adverseEvent=await this.adverseEventUrl.getValue()
        console.log(adverseEvent)  
        
        }
    async antiCounterfeiting(){
       
        await this.anticounter.isEnabled();
        await expect(this.anticounter).toBeEnabled();  
        const antiCounterfieting= await this.antiCounterfeitingUrl.getValue()
        console.log(antiCounterfieting)    
        
    }
    async enableBatchIsRecalled(){
       
        await this.batchIsRecalledClick.click();
        //await expect(this.batchIsRecalledClick).toBeEnabled();
        
    }
    async enableExpirationDateIsIncorrect(){
        await this.expirationDateIsIncorrectClick.click()
       // await expect(this.batchIsRecalledClick).toBeEnabled();
    }
    async batchExpired(){
              
        await this.batchenabled.isEnabled();
        await expect(this.batchenabled).toBeEnabled(); 
    }
    async disableBatchExpired(){
        await this.disableBatchExpiredCheckbox.click();
    }
    async enableSnIsInRecallList(){
        await this.snIsInRecallListClick.scrollIntoView()
        await this.snIsInRecallListClick.click();
        
    }
    async checkSnIsInRecallList()  {   
        if(await this.snIsInRecallListClick.isEnabled()==true){
           let snIsInRecallList=true
           return snIsInRecallList
        }
        else{
            let snIsInRecallList=false
           return snIsInRecallList
        }
           }
    async enableSnIsInDecommissionedList(){
        await this.snIsInDecommissionedListClick.click()
       // await expect(this.snIsInDecommissionedListClick).toBeSelected(); 
    }
    async enableSnIsUnknown(){
        await this.snIsUnknownClick.click()
        //await expect(this.snIsUnknownClick).toBeSelected(); 
    }
    async batchNumberUnknown(){
        await this.batchNumberUnknownEnabled.isEnabled()
        await expect(this.batchNumberUnknownEnabled).toBeEnabled(); 
    }
    async disableBatchNumberUnknown(){
        await this.disableBatchNumberUnknownCheckbox.click()
    }

    
    async patientInfo(){
              
        const patientinfo= await this.patientInformation.getText();
        console.log(""+patientinfo);
        const healthinfo= await this.healthcareInformation.getText();
        console.log(""+healthinfo)
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

    async acceptButton(){
        await this.addEpiAcceptButton.scrollIntoView()
         await this.addEpiAcceptButton.click()
     }

    async clickDeleteLanguage(){
        await this.clickDeleteLanguageButton.click()
    }

    // async leafletUpload(filePath2){
    //     await this.leaflet.click()
    //     await this.leaflet.addValue(filePath2);
    // }

    async marketManagementButton(){
        await this.marketManagementButtonClick.scrollIntoView()
        await this.marketManagementButtonClick.click()
    }
    async addMarketButton(){
        await this.addMarketButtonClick.click()
    }
   async selectLanguageInMarketPage(country1){
       await this.selectLanguageInMarketPageDropdown.selectByVisibleText(country1)
   }
   async enterNationalCode(NationalCode){
       await this.enterNationalCodeInTextbox.setValue(NationalCode)
   }
   async enterMAHName(MAHName){
       await this.enterMAHNameInTextbox.setValue(MAHName)
   }
   async enterLegalEntityName(LegalEntityName){
       await this.enterLegalEntityNameInTextbox.setValue(LegalEntityName)
   }
   async addMarketButtonInPopup(){
       await this.addMarketButtonInPopupClick.execute()
   }
   async closeButtonInPopup(){
       await this.closeButtonInPopupClick.click()
   }
    async Cancel(){
    
        await this.cancelbutton.click();
    }
    async saveProduct(){
        await this.saveProductButton.click();
    }

    ///edit
    async searchProductCode(code){
        await this.searchProduct.setValue(code)
    }
    async updateProduct(){
        await this.updateProductButton.scrollIntoView()
        await this.updateProductButton.click()
    }

    // async  setDateInPicker (date) {
    //     //let expiryDate = "2029-05-28"

    //     await browser.execute((date) => {
    //         (function () {
    //             let event = new Event('change');
    //             let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
    //             datePicker.value = date;
    //             datePicker.dispatchEvent(event);
    //         })();

    //     }, date)
        
    //  await  browser.pause(2000)
    // }
    // async clickViewEdit(){
    //     await this.clickViewEditButton
    // }
        
}

module.exports = new productsPage();