const { default: $ } = require("webdriverio/build/commands/browser/$");

class userAsHolder {

    get userAsHolderLink() {
        return $('//a[normalize-space()="User as Holder"]')
    }
    get walletSettingsEditButton(){
        return $('//button[normalize-space()="EDIT"]')
    }
    get disablePatientLeafletCheckbox(){
        return $('//input[@type="checkbox"][@name="01"]')
    }
    get disableShowleafletIfBatchExpiredCheckbox(){
        return $('//input[@type="checkbox"][@name="02"]')
    }
    get disableShowLeafletIfBatchUnknownCheckbox(){
        return $('//input[@type="checkbox"][@name="03"]')
    }
    get disableHealthcarePractitionerInfoCheckbox(){
        return $('//input[@type="checkbox"][@name="04"]')
    }
    get disableVideoSourceCheckbox(){
        return $('//input[@type="checkbox"][@name="05"]')
    }
    get disableAdverseEventsReportingCheckbox(){
        return $('//input[@type="checkbox"][@name="06"]')
    }
    get disableAntiCounterfeitingFunctionsCheckbox(){
        return $('//input[@type="checkbox"][@name="07"]')
    }
    get disableRecallFunctionsCheckbox(){
        return $('//input[@type="checkbox"][@name="08"]')
    }
    get disableBatchMessageCheckbox(){
        return $('//input[@type="checkbox"][@name="09"]')
    }

    async clickUserAsHolder() {
        await this.userAsHolderLink.click();
        
    }
    
    async clickWalletSettingsEditButton(){
        await this.walletSettingsEditButton.click()
    }
    async clickDisablePatientLeaflet() {
        await this.disablePatientLeafletCheckbox.click();
        
    }
    async clickDisableShowleafletIfBatchExpired() {
        await this.disableShowleafletIfBatchExpiredCheckbox.click();
        
    }
    async clickDisableShowLeafletIfBatchUnknown() {
        await this.disableShowLeafletIfBatchUnknownCheckbox.click();
        
    }
    async clickDisableHealthcarePractitionerInfo() {
        await this.disableHealthcarePractitionerInfoCheckbox.click();
        
    }
    async clickDisableVideoSource() {
        await this.disableVideoSourceCheckbox.click();
        
    }
    async clickDisableAdverseEventsReporting() {
        await this.disableAdverseEventsReportingCheckbox.click();
        
    }
    async clickDisableAntiCounterfeitingFunctions() {
        await this.disableAntiCounterfeitingFunctionsCheckbox.click();
        
    }
    async clickDisableBatchMessage() {
        await this.disableBatchMessageCheckbox.click();
        
    }

}
module.exports = new userAsHolder();