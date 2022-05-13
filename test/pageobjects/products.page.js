
const testData = require('../testdata/config.json')
const path = require('path')
const { URL } = require('url')
const assert = require('assert');
const fs = require('fs')


class productsPage {


    get openProduct() {
        //return  $('//a[@href=\'/products\']//span')
        return $("//p[normalize-space()='Manage Products']")
    }
    get productFromleftsideNav() {
        return $("=Products")
    }
    get addProductButton() {
        return $('//button[normalize-space()=\'+ ADD PRODUCT\']')
    }
    get gtinField() {
        return $("#productcode-input")
    }
    get brandField() {
        return $("(//input[@placeholder='Add product name'])[1]")
    }
    get productDescriptionField() {
        return $("//div//textarea[@placeholder='Add product description']")
    }
    get uploadPhoto() {
        return $("//input[@type=\'file\']")
    }
    get uploadEpiFile() {
        return $('(//input[@type=\'file\'])[2]')
    }
    get epiFileDisplayed() {
        return $("//li[@class='d-flex flex-row overflow-auto']")
    }
    get internalMaterialCodeField() {
        return $("//input[@placeholder='Add internal material code']")
    }
    get addStrengthField() {
        return $("//input[@placeholder='Add product strength']")
    }
    get videoSourceField() {
        return $("//textarea[@placeholder='Add video source']")
    }
    get adverseEventsCheckbox() {
        return $('div[class="featureCode-06"] input[type="checkbox"]')
    }
    get adverseEventUrl() {
        return $("//input[@placeholder='Add Adverse Events Reporting URL']")
    }
    get antiCounterfeitingUrl() {
        return $("//input[@placeholder='Add Anti-Counterfeiting End Point URL']")
    }
    get adverseEventText() {
        return $("//input[@placeholder='Add Adverse Events Reporting URL'][@type='text']")
    }
    get anticounterCheckbox() {
        return $("//label[normalize-space()='Enable Anti-Counterfeiting check for this product']")
    }
    get batchIsRecalledCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-08'])//input[@type='checkbox']")
    }
    get expirationDateIsIncorrectCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-07'])[1]//input[@type='checkbox'][1]")
    }
    get batchIsExpiredCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-02'])//input[@type='checkbox']")
    }
    get snIsInRecallListCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-07'])[2]//input[@type='checkbox'][1]")
    }
    get snIsInDecommissionedListCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-07'])[3]//input[@type='checkbox'][1]")
    }
    get snIsUnknownCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-07'])[4]//input[@type='checkbox'][1]")
    }
    get batchNumberUnknownEnabled() {
        return $("(//div[@class='checkbox-container featureCode-03'])[1]//input[@type='checkbox'][1]")
    }
    get disableBatchNumberUnknownCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-03'])[1]//input[@type='checkbox'][1]")
    }
    get patientInformation() {
        return $("//div[contains(text(),'Patient Specific Information Leaflet')]")
    }
    get healthCareInformation() {
        return $("//div[contains(text(),'Healthcare practitioner information')]")
    }
    get addEpiButton() {
        return $('//button[normalize-space()=\'+ Add ePI\']')
    }
    get selectLanguageDropdown() {
        return $('//select[@id=\'language\']')
    }
    get selectTypeDropdown() {
        // return $('//select[@id=\'type\']')
        return $('//select[@class="document-type-select dsu-select"]')
    }
    get videoSourceEpiField() {
        return $("//textarea[@value='@modalData.product.videoSource']")
    }
    get addEpiAcceptButton() {
        return $("//button[normalize-space()='Accept']")
    }
    get deleteLanguageButton() {
        return $("//button[@class='delete-language']")
    }
    get deleteSecondLanguageButton() {
        //return  $('//li[2]//div[1]//button[1]//i[1]')
        return $("(//button[@class='delete-language'])[2]")
    }
    get marketManagementButton() {
        return $("div:nth-child(2) > div:nth-child(1) > psk-button:nth-child(2) > button:nth-child(1)")
    }
    get addMarketButton() {
        return $("//button[normalize-space()='Add Market']")
    }
    get selectLanguageInMarketPageDropdown() {
        return $("//select[@id='selectcountry']")
    }
    get nationalCodeTextbox() {
        return $("//input[@placeholder='Enter national code']")
    }
    get mahNameTextbox() {
        return $("//input[@placeholder='Enter MAH name']")
    }
    get legalEntityNameTextbox() {
        return $("//input[@placeholder='Enter legal entity name']")
    }
    get addMarketButtonInPopup() {
        return ('document.querySelector("body > webc-app-root:nth-child(1) > webc-app-container:nth-child(3) > div:nth-child(1) > webc-app-router:nth-child(1) > stencil-router:nth-child(1) > stencil-route-switch:nth-child(1) > stencil-route:nth-child(9) > webc-app-loader:nth-child(1) > psk-page:nth-child(1) > h6:nth-child(1) > webc-container:nth-child(1) > webc-modal:nth-child(3) > footer:nth-child(3) > psk-button:nth-child(2) > button:nth-child(1)").click()')
    }
    get closeButton() {
        return $("//button[normalize-space()='Close']")
    }


    get saveProductButton() {
        return $("//button[normalize-space()='Save Product']")
    }
    get searchProduct() {
        return $("//input[@id='code-search']")
    }
    get updateProductButton() {
        return $("//button[normalize-space()='Update Product']")
    }
    get importButton() {
        return $('button[data-tag="import"]')
    }
    get selectFileButton() {
        return $('//input[@type="file"]')
    }
    get importFileButton() {
        return $('//button[normalize-space()="Import"]')
    }
    get viewMessageInFailedLogs() {
        return $('webc-datatable[datasource="@failedDataSource"] button[class="btn btn-link p-0 col align-self-center text-left"]')
    }
    get invalidFieldInfoButton() {
        return $('psk-accordion-item[title="Invalid fields info"]')
    }
    get viewMessageInSuccessLogs() {
        return $('div:nth-child(14) button:nth-child(1)')
    }
    get downloadMsgButton() {
        return $('//button[normalize-space()="Download message"]')
    }
    get requiredFieldsText() {
        return $('ul[data-for="@actionModalModel.secondMessageData"]')
    }
    get homeText() {
        return $('//a[normalize-space()="Home"]')
    }


    get cancelButton() {
        return $("//button[normalize-space()='Cancel']")

    }
    get clickViewEditButton() {
        return browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
    }




    async clickProduct() {

        await this.openProduct.click();

    }
    async clickProductFromSideNav() {
        await this.productFromleftsideNav.click()
    }
    async addProduct() {

        await this.addProductButton.click();
    }
    async enterGtinCode(gtinNumber) {

        await this.gtinField.click();
        await this.gtinField.clearValue();
        await this.gtinField.setValue(gtinNumber);
    }
    async brandName(brandName) {

        await this.brandField.setValue(brandName);
    }
    async checkBrandName() {
        if (await this.brandField.isDisplayed() == true) {
            let brandDisplayed = (await this.brandField.getValue()).toString()
            console.log("ProductName is " + brandDisplayed)
            return brandDisplayed
        }
        else {
            let brandDisplayed = "No Message"
            return brandDisplayed
        }
    }
    async productDescription(description) {

        await this.productDescriptionField.setValue(description);
    }
    async productPhoto(uploadProductPhoto) {

        console.log(uploadProductPhoto)
        await this.uploadPhoto.addValue(uploadProductPhoto);

    }
    async uploadFile(uploadEpi) {
        await this.uploadEpiFile.addValue(uploadEpi);
    }
    async epiDisplayed() {
        if (await this.epiFileDisplayed.isExisting() == true) {
            let epiDisplayed = "true"
            console.log("epiDisplayed is " + epiDisplayed)
            return epiDisplayed
        }
        else {
            let epiDisplayed = "false"
            console.log("epiDisplayed is " + epiDisplayed)
            return epiDisplayed
        }
    }
    async internalMaterialCode(code) {
        await this.internalMaterialCodeField.setValue(code)
    }
    async addStrength(strength) {
        await this.addStrengthField.setValue(strength)
    }
    async videoSource(link1) {
        await this.videoSourceField.setValue(link1)
    }
    async adverseEvents() {

        await this.adverseEventsCheckbox.isEnabled();
        await expect(this.adverseEventsCheckbox).toBeEnabled()
        const adverseEvent = await this.adverseEventUrl.getValue()
        console.log(adverseEvent)

    }
    async antiCounterfeiting() {

        await this.anticounterCheckbox.isEnabled();
        await expect(this.anticounterCheckbox).toBeEnabled();
        const antiCounterfieting = await this.antiCounterfeitingUrl.getValue()
        console.log(antiCounterfieting)

    }
    async enableBatchIsRecalled() {

        await this.batchIsRecalledCheckbox.click();

    }
    async enableExpirationDateIsIncorrect() {
        await this.expirationDateIsIncorrectCheckbox.click()
    }
    async batchExpired() {

        await this.batchIsExpiredCheckbox.isEnabled();
    }
    async batchIsExpired() {
        await this.batchIsExpiredCheckbox.click();
    }
    async enableSnIsInRecallList() {
        await this.snIsInRecallListCheckbox.scrollIntoView()
        await this.snIsInRecallListCheckbox.click();

    }
    async checkSnIsInRecallList() {
        if (await this.snIsInRecallListCheckbox.isEnabled() == true) {
            let snIsInRecallList = 'true'
            return snIsInRecallList
        }
        else {
            let snIsInRecallList = 'false'
            return snIsInRecallList
        }
    }
    async enableSnIsInDecommissionedList() {
        await this.snIsInDecommissionedListCheckbox.click()
    }
    async enableSnIsUnknown() {
        await this.snIsUnknownCheckbox.click()
    }
    async batchNumberUnknown() {
        await this.batchNumberUnknownEnabled.isEnabled()
    }
    async disableBatchNumberUnknown() {
        await this.disableBatchNumberUnknownCheckbox.click()
    }


    async patientInfo() {

        const patientinfo = await this.patientInformation.getText();
        console.log("" + patientinfo);
        const healthinfo = await this.healthCareInformation.getText();
        console.log("" + healthinfo)
    }
    async addEpi() {
        await this.addEpiButton.click()
    }
    async selectLanguage(country) {
        await this.selectLanguageDropdown.selectByVisibleText(country)
    }
    async selectType(type) {
        await this.selectTypeDropdown.selectByVisibleText(type)
    }
    async videoSourceEpi(link) {
        await this.videoSourceEpiField.setValue(link)
    }

    async acceptButton() {
        await this.addEpiAcceptButton.scrollIntoView()
        await this.addEpiAcceptButton.click()
    }

    async clickDeleteLanguage() {
        await this.deleteLanguageButton.click()
    }
    async deleteSecondLanguage() {
        await this.deleteSecondLanguageButton.click()
    }

    async clickMarketManagement() {
        await this.marketManagementButton.scrollIntoView()
        await this.marketManagementButton.click()
    }
    async addMarket() {
        await this.addMarketButton.click()
    }
    async selectLanguageInMarketPage(country) {
        await this.selectLanguageInMarketPageDropdown.selectByVisibleText(country)
    }
    async enterNationalCode(NationalCode) {
        await this.nationalCodeTextbox.setValue(NationalCode)
    }
    async enterMAHName(MAHName) {
        await this.mahNameTextbox.setValue(MAHName)
    }
    async enterLegalEntityName(LegalEntityName) {
        await this.legalEntityNameTextbox.setValue(LegalEntityName)
    }
    async clickAddMarketButtonInPopup() {
        await this.addMarketButtonInPopup.execute()
    }
    async closeButtonInPopup() {
        await this.closeButton.click()
    }
    async clickCancel() {

        await this.cancelButton.click();
    }
    async saveProduct() {
        await this.saveProductButton.click();
    }


    ///edit
    async searchProductCode(code) {
        await this.searchProduct.setValue(code)
    }
    async updateProduct() {
        await this.updateProductButton.scrollIntoView()
        await this.updateProductButton.click()
    }
    async clickImport() {

        await this.importButton.click()
        await browser.pause(5000)
        await browser.waitUntil(
            async () => (await $('//label[normalize-space()="Select files"]').waitForEnabled()),
            {
                timeout: 10000,
                timeoutMsg: 'import button is not active'
            }
        );
    }
    async selectFile(file) {

        await this.selectFileButton.addValue(file)
    }
    async clickImportFile() {

        await this.importFileButton.click()

    }
    async clickViewMessageInFailedLog() {

        try {

            await this.viewMessageInFailedLogs.click()
        }
        catch (e) {
            console.log("Success logs")
        }
    }
    async clickViewMessageInSuccessLog() {

        try{

        await this.viewMessageInSuccessLogs.click()
        }
        catch(e){
            console.log("Failed logs")
        }
    }
    async clickDownloadMsgInSuccessLog() {


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
        try {
            await this.downloadMsgButton.click()
            await browser.pause(5000)
        }
        catch (e) {
            console.log("Failed logs")
        }

        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))

        const productFile = filePath.concat(path.sep, "product_", rawdata.product.productCode, ".json")
        console.log(productFile)
        try {
            if (fs.existsSync(productFile)) {
                let fileContents = JSON.parse(fs.readFileSync(productFile, 'utf-8'))
                // console.log(JSON.stringify(fileContents))
                // console.log(JSON.stringify(rawdata))
                console.log(JSON.stringify(fileContents) === JSON.stringify(rawdata))
                await browser.pause(5000)
                fs.unlinkSync(productFile)
            }
        }
        catch (e) {
            console.log("No file")
        }

    }
    async clickDownloadMsgInFailedLog() {

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
        try {
            await this.downloadMsgButton.click()
        } catch (e) {
            console.log("success logs")
        }
        await browser.pause(5000)

        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))
        const productFile = filePath.concat(path.sep, "product_", rawdata.product.productCode, ".json")
        console.log(productFile)
        await browser.pause(5000)
        try {
            if (fs.existsSync(productFile)) {

                let fileContents = JSON.parse(fs.readFileSync(productFile, 'utf-8'))
                fs.unlinkSync(productFile)
                // console.log(JSON.stringify(fileContents))
                // console.log(JSON.stringify(rawdata))
                console.log(JSON.stringify(fileContents) === JSON.stringify(rawdata))
                await browser.pause(5000)
            }
            else {
                const undefinedFile = filePath.concat(path.sep, "product_", "undefined", ".json")
                console.log(undefinedFile)
                fs.unlinkSync(undefinedFile)
            }
        }
        catch (e) {
            console.log("undefined file")
        }

    }

    async invalidFieldInfo() {
        try {
            await this.invalidFieldInfoButton.click()
        }
        catch (e) {
            console.log("success logs")
        }
    }
    async invalidFieldInfoRequired() {

        try {
            const allFields = await this.requiredFieldsText.getText()
            console.log('required fields are ' + allFields)
        }
        catch (e) {
            console.log("success logs")
        }
    }

    async homePage() {
        if (await this.homeText.isExisting() == true) {
            console.log(await this.homeText.getText())
            return true

        }
        else {
            return false
        }
    }

}

module.exports = new productsPage();