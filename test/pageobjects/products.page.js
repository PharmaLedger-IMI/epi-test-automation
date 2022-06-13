
const testData = require('../testdata/config.json')
const path = require('path')
const { URL } = require('url')
const assert = require('assert');
const fs = require('fs')
const { expect } = require('chai')


class productsPage {


    get openProduct() {
        //return  $('//a[@href=\'/products\']//span')
        return $("//p[normalize-space()='Manage Products']")
    }

    get productFromleftsideNav() {
        return $("=Products")
    }
    //add product
    get addProductButton() {
        return $('//button[normalize-space()=\'+ ADD PRODUCT\']')
    }
    //gtin text
    get gtinField() {
        return $("#productcode-input")
    }
    //brand
    get brandField() {
        return $("(//input[@placeholder='Add product name'])[1]")
    }
    //product description
    get productDescriptionField() {
        return $("//div//textarea[@placeholder='Add product description']")
    }
    //upload photo
    get uploadPhoto() {
        return $("//input[@type=\'file\']")
    }
    //upload epi
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
    //batch is recalled checkbox
    get batchIsRecalledCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-08'])//input[@type='checkbox']")
    }
    //expiration date is incorrect checkbox
    get expirationDateIsIncorrectCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-07'])[1]//input[@type='checkbox'][1]")
    }
    //bathc is expired checkbox
    get batchIsExpiredCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-02'])//input[@type='checkbox']")
    }
    //SN is in recall list checkbox
    get snIsInRecallListCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-07'])[2]//input[@type='checkbox'][1]")
    }
    //SN is in decommissioned list checkbox
    get snIsInDecommissionedListCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-07'])[3]//input[@type='checkbox'][1]")
    }
    //SN is unknown checkbox
    get snIsUnknownCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-07'])[4]//input[@type='checkbox'][1]")
    }
    //batch number unknown checkbox
    get batchNumberUnknownEnabled() {
        return $("(//div[@class='checkbox-container featureCode-03'])[1]//input[@type='checkbox'][1]")
    }
    //batch number unknown checkbox
    get disableBatchNumberUnknownCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-03'])[1]//input[@type='checkbox'][1]")
    }
    get patientInformation() {
        return $("//div[contains(text(),'Patient Specific Information Leaflet')]")
    }
    get healthCareInformation() {
        return $("//div[contains(text(),'Healthcare practitioner information')]")
    }
    //add epi button
    get addEpiButton() {
        return $('//button[normalize-space()=\'+ Add ePI\']')
    }
    //select epi language
    get selectLanguageDropdown() {
        return $('//select[@id=\'language\']')
    }
    //select epi type
    get selectTypeDropdown() {
        // return $('//select[@id=\'type\']')
        return $('//select[@class="document-type-select dsu-select"]')
    }
    //video source
    get videoSourceEpiField() {
        return $("//textarea[@value='@modalData.product.videoSource']")
    }
    //epi accept button
    get addEpiAcceptButton() {
        return $("//button[normalize-space()='Accept']")
    }
    //delete first file
    get deleteLanguageButton() {
        return $("//button[@class='delete-language']")
    }
    //delete second file
    get deleteSecondLanguageButton() {
        //return  $('//li[2]//div[1]//button[1]//i[1]')
        return $("(//button[@class='delete-language'])[2]")
    }
    get marketManagementButton() {
        return $("div:nth-child(2) > div:nth-child(1) > psk-button:nth-child(2) > button:nth-child(1)")
    }
    //add market button
    get addMarketButton() {
        return $("//button[normalize-space()='Add Market']")
    }
    //select country
    get selectLanguageInMarketPageDropdown() {
        return $("//select[@id='selectcountry']")
    }
    //national code
    get nationalCodeTextbox() {
        return $("//input[@placeholder='Enter national code']")
    }
    //mah
    get mahNameTextbox() {
        return $("//input[@placeholder='Enter MAH name']")
    }
    get legalEntityNameTextbox() {
        return $("//input[@placeholder='Enter legal entity name']")
    }
    get addMarketButtonInPopup() {
        return ('document.querySelector("body > webc-app-root:nth-child(1) > webc-app-container:nth-child(3) > div:nth-child(1) > webc-app-router:nth-child(1) > stencil-router:nth-child(1) > stencil-route-switch:nth-child(1) > stencil-route:nth-child(9) > webc-app-loader:nth-child(1) > psk-page:nth-child(1) > h6:nth-child(1) > webc-container:nth-child(1) > webc-modal:nth-child(3) > footer:nth-child(3) > psk-button:nth-child(2) > button:nth-child(1)").click()')
    }
    //close button
    get closeButton() {
        return $("//button[normalize-space()='Close']")
    }

    //save product button
    get saveProductButton() {
        return $("//button[normalize-space()='Save Product']")
    }
    //search box
    get searchProduct() {
        return $("//input[@id='code-search']")
    }
    //update product button
    get updateProductButton() {
        return $("//button[normalize-space()='Update Product']")
    }
    //import button in product page
    get importButton() {
        return $('button[data-tag="import"]')
    }
    //select file
    get selectFileButton() {
        return $('//input[@type="file"]')
    }
    //import file
    get importFileButton() {
        return $('//button[normalize-space()="Import"]')
    }
    //view msg in failed logs
    get viewMessageInFailedLogs() {
        return $('webc-datatable[datasource="@failedDataSource"] button[class="btn btn-link p-0 col align-self-center text-left"]')
    }
    //invalid field info button
    get invalidFieldInfoButton() {
        return $('psk-accordion-item[title="Invalid fields info"]')
    }
    //view msg in success logs
    get viewMessageInSuccessLogs() {
        return $('div:nth-child(14) button:nth-child(1)')
    }
    //download button
    get downloadMsgButton() {
        return $('//button[normalize-space()="Download message"]')
    }
    //required fields
    get requiredFieldsText() {
        return $('ul[data-for="@actionModalModel.secondMessageData"]')
    }
    //required fields
    get firstRowText() {
        return $('li:nth-child(1) h6:nth-child(1)')
    }
    //required fields
    get secondRowText() {
        return $('li:nth-child(2) h6:nth-child(1)')
    }
    //required fields
    get thirdRowText() {
        return $('li:nth-child(3) h6:nth-child(1)')
    }
    //home text from sidenav
    get homeText() {
        return $('//a[normalize-space()="Home"]')
    }

    //cancel button
    get cancelButton() {
        return $("//button[normalize-space()='Cancel']")

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
        //await expect(this.snIsInDecommissionedListClick).toBeEnabled();
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

    async deleteAllFile() {

        var i = 1

        for (; await browser.$("//li[" + i + "]//div[1]//button[1]//i[1]").isExisting();) {
            console.log(i)
            await browser.$("//li[" + i + "]//div[1]//button[1]//i[1]").click()
        }
        if (await browser.$('//i[@class="fa fa-trash-o"]').isExisting()) {
            await browser.$('//i[@class="fa fa-trash-o"]').click()
        }

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
    async clickViewMessageInFailedLog(missingFields) {

        try {

            await this.viewMessageInFailedLogs.click()
        }
        catch (e) {


            expect(JSON.stringify(e)).to.have.lengthOf(0, `${missingFields} not found in failed logs`)
            //     expect(function () {
            //       throw Error( `${missingFields} not found in failed logs`)
            //     }).to.not.throw();
        }
    }
    async clickViewMessageInSuccessLog(missingFields) {

        try {

            await this.viewMessageInSuccessLogs.click()

        }
        catch (e) {
            expect(JSON.stringify(e)).to.have.lengthOf(0, `${missingFields} not found in success logs`)

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
            console.log("not found in failed logs")
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
            console.log("not found in failed logs")
        }
        await browser.pause(5000)

        let rawdata = JSON.parse(fs.readFileSync(testData.path.productImport, 'utf8'))
        const productFile = filePath.concat(path.sep, "product_", rawdata.product.productCode, ".json")
        console.log(productFile)
        await browser.pause(5000)
        try {
            if (fs.existsSync(productFile)) {

                let fileContents = JSON.parse(fs.readFileSync(productFile, 'utf-8'))

                // console.log(JSON.stringify(fileContents))
                // console.log(JSON.stringify(rawdata))
                console.log(JSON.stringify(fileContents) === JSON.stringify(rawdata))
                await browser.pause(5000)
                fs.unlinkSync(productFile)
            }
            else {
                const undefinedFile = filePath.concat(path.sep, "product_", "undefined", ".json")
                console.log(undefinedFile)
                console.log(JSON.stringify(undefinedFile) === JSON.stringify(rawdata))
                await browser.pause(5000)
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

            console.log("not found in failed logs")
        }
    }
    async firstRow() {
        const firstElement = await this.firstRowText.getText()
        return firstElement
    }
    async secondRow() {
        const secondElement = await this.secondRowText.getText()
        return secondElement
    }
    async thirdRow() {
        const thirdElement = await this.thirdRowText.getText()
        return thirdElement
    }
    async invalidFieldInfoRequired(missingFields) {
        let failedCase = []
        try {

            const allFields = await this.requiredFieldsText.getText()
            console.log('required fields are ' + allFields)

            for (var i = 0; i < missingFields.length; i++) {
                if (missingFields[i] != allFields) {
                    failedCase.push(missingFields[i])
                    console.log(expect(allFields).to.equal(`${missingFields[i]}`))
                }
                // else {
                //     console.log(expect(allFields).to.equal(`${missingFields[i]}`))
                // }
            }

            // if (failedCase.length > 0) {
            //     expect(JSON.stringify(failedCase)).to.have.lengthOf(0, `${JSON.stringify(failedCase)} not found in failed logs`)
            // }
        }
        catch (e) {

            expect(JSON.stringify(failedCase)).to.have.lengthOf(0, `${JSON.stringify(failedCase)} not found in failed logs`)

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