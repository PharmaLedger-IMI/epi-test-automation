

const testData = require('../testdata/config.json')
const path = require('path')
const { URL } = require('url')
const assert = require('assert');
const fs = require('fs')
const { expect } = require('chai')

let isChecked = false
class batchesPage {


    //batch from side nav
    get batchFromSideNav() {
        //return  $("=Batches")
        return $("//a[normalize-space()='Batches']")
    }
    //add batch
    get addbatchbutton() {
        return $("//button[normalize-space()='ADD BATCH']")
    }
    //batch id value
    get batchIdValueTextbox() {
        return $('//input[@placeholder=\'Add batch id\']')
    }

    //site name
    get addSiteNameField() {
        return $("//input[@placeholder='Add site name']")
    }
    //date selection
    get enableDaySelectionCheckbox() {
        return $("//label[normalize-space()='Enable day selection']")
    }
    //video source
    get videoSourceEnterField() {
        return $("//textarea[@placeholder='Add video source']")
    }
    //enable incorrect expiration date verification
    get enableIncorrectExpirationDateVerificationCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-07'])[1]//input[@type='checkbox']")
    }
    //enable expired expiration date verification
    get expirationDateVerificationCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-02'])[1]//input[@type='checkbox']")
    }
    //enable serial number verification
    get enableSerialNumberVerificationCheckbox() {
        return $("(//div[@class='checkbox-container featureCode-07'])[3]//input[@type='checkbox']")
    }
    //select serial number
    get selectOptionFromDropdown() {
        return $('//psk-select[@class=\'hydrated\']//select[@class=\'form-control\']')
    }
    //reset valid serial number
    get resetAllValidSerialNumberCheckbox() {
        return $('//input[@id=\'update-valid-serial\']')
    }
    //reset recalled serial number
    get resetAllRecalledSerialNumberCheckbox() {
        return $("//input[@id='update-recalled-serial']")
    }
    //reset decommissioned serial number
    get resetAllDecommisionedSerialNumberCheckbox() {
        return $("//input[@id='update-decommissioned-serial']")
    }
    //serial number
    get enterSerialNumberField() {
        return $('//textarea[@value=\'@actionModalModel.serialNumbers\']')
    }
    //reason
    get selectReasonFromDropdown() {
        return $("//psk-select[@view-model='@actionModalModel.reason']//select[@class='form-control']")

    }
    //accept button in popup
    get serialNumberAcceptButton() {
        return $("//button[normalize-space()='Accept']")
    }
    //cancel button in popup
    get serialNumberCancelButton() {
        return $("//psk-button[@class='marketplace-manager-button hydrated']//button[@class='btn btn-primary'][normalize-space()='Cancel']")
    }
    //batch msg
    get batchMessageField() {
        return $("//textarea[@placeholder='This text will be displayed to user after Barcode is scanned']")
    }
    //add epi button
    get addEpiButton() {
        return $("//button[normalize-space()='+ Add ePI']")
    }
    //select language
    get selectLanguageDropdown() {
        return $('//select[@id=\'language\']')
    }
    //select type
    get selectTypeDropdown() {
        return $('//select[@class="document-type-select dsu-select"]')
    }
    //video source
    get videoSourceEpiField() {
        return $("//textarea[@value='@modalData.product.videoSource']")
    }
    //upload file
    get uploadEpiFile() {
        return $('//input[@type=\'file\']')
    }
    get epiFileDisplayed() {
        return $("//li[@class='d-flex flex-row overflow-auto']")
    }
    //add epi accept button
    get addEpiAcceptButton() {
        return $("//button[normalize-space()='Accept']")
    }
    //check to recall this batch
    get enableRecallThisBatch() {
        //return $("//input[@id='recalled']")
        //return $("//input[@type='checkbox'][@id='recalled']")
        return $("(//div[@class='checkbox-container featureCode-08'])[1]//input[@type='checkbox']")

    }
    //recall msg
    get recallMessageTextbox() {
        return $("//textarea[@placeholder='This text will be displayed to user after Barcode is scanned if batch is recalled']")
    }
    //update button
    get updateBatchForEditButton() {
        return $("//button[normalize-space()='Update batch']")
    }
    //cancel button
    get cancelButtonForBatch() {
        return $("//button[normalize-space()='Cancel']")
    }
    //create batch
    get createBatchButton() {
        return $("//button[normalize-space()='Add batch']")
    }
    //import button in batch page
    get importButton() {
        return $('//button[normalize-space()="IMPORT"]')
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
        return $("(//button[@class='btn btn-link p-0 col align-self-center text-left'][contains(text(),'View')])[16]")
    }
    //view msg in success logs
    get viewMessageInSuccessLogs() {
        return $('div:nth-child(14) button:nth-child(1)')
    }
    //download msg
    get downloadMsgButton() {
        return $('//button[normalize-space()="Download message"]')
    }
    //invalid field info
    get invalidFieldInfoButton() {
        return $('psk-accordion-item[title="Invalid fields info"]')
    }
    //required fields
    get requiredFieldsText() {
        return $('ul[data-for="@actionModalModel.secondMessageData"]')
    }
    //close button
    get closeButton() {
        return $("//button[normalize-space()='Close']")
    }
    get firstRowText() {
        return $('li:nth-child(1) h6:nth-child(1)')
    }
    get secondRowText() {
        return $('li:nth-child(2) h6:nth-child(1)')
    }
    get thirdRowText() {
        return $('li:nth-child(3) h6:nth-child(1)')
    }


    ///////
    async clickBatchFromSideNav() {

        await this.batchFromSideNav.click();
    }
    async addBatch() {

        await this.addbatchbutton.click();

    }
    async batchIdValue() {

        const batchId = await this.batchIdValueTextbox.getValue();

        console.log(batchId)
        return batchId

    }


    async serialNum() {
        const SerialNumber = (Math.floor(100000 + Math.random() * 900000)).toString()
        return SerialNumber
    }


    async checkSiteName() {
        if (await this.addSiteNameField.isDisplayed() == true) {
            let siteNameDisplayed = (await this.addSiteNameField.getValue()).toString()
            console.log("Site name is " + brandDisplayed)
            return siteNameDisplayed
        }
        else {
            let siteNameDisplayed = "No site name"
            return siteNameDisplayed
        }
    }
    async siteName(site) {

        await this.addSiteNameField.click();
        await this.addSiteNameField.setValue(site)
    }
    async enableDaySelection() {
        await this.enableDaySelectionCheckbox.isEnabled()
        await expect(this.enableDaySelectionCheckbox).toBeEnabled();
    }
    async enableDaySelectionClick() {
        await this.enableDaySelectionCheckbox.click()
    }

    async videoSource(link1) {
        await this.videoSourceEnterField.setValue(link1)
    }
    async enableIncorrectExpirationDateVerification() {
        await this.enableIncorrectExpirationDateVerificationCheckbox.isEnabled()
        await expect(this.enableIncorrectExpirationDateVerificationCheckbox).toBeEnabled();
    }
    async enableIncorrectExpirationDateVerificationClick() {
        await this.enableIncorrectExpirationDateVerificationCheckbox.click()
    }
    async expirationDateVerification() {
        await this.expirationDateVerificationCheckbox.isEnabled()
        await expect(this.expirationDateVerificationCheckbox).toBeEnabled();
    }

    async expirationDateVerificationClick() {
        await this.expirationDateVerificationCheckbox.click()
    }
    async enableSerialNumberVerification() {

        await this.enableSerialNumberVerificationCheckbox.isEnabled()
        await expect(this.enableSerialNumberVerificationCheckbox).toBeEnabled();
    }
    async disableSerialNumberVerification() {

        await this.enableSerialNumberVerificationCheckbox.click()

    }
    async selectUpdateValidSerialFromDropdown(updateValidSerialValue) {
        await this.selectOptionFromDropdown.selectByVisibleText(updateValidSerialValue)
    }
    async enableResetAllValidSerialNumber() {
        await this.resetAllValidSerialNumberCheckbox.click()
    }
    async enableResetAllRecalledSerialNumber() {
        await this.resetAllRecalledSerialNumberCheckbox.click()
    }
    async enableResetAllDecommisionedSerialNumber() {
        await this.resetAllDecommisionedSerialNumberCheckbox.click()
    }
    async selectUpdateRecalledSerialFromDropdown(updateRecalledSerialValue) {
        await this.selectOptionFromDropdown.selectByVisibleText(updateRecalledSerialValue)
    }
    async selectUpdateDecommissionedFromDropdown(updateDecommissionedValue) {
        await this.selectOptionFromDropdown.selectByVisibleText(updateDecommissionedValue)
    }
    async selectLostReasonFromDropdown(Lost) {
        await this.selectReasonFromDropdown.selectByVisibleText(Lost)
    }
    async selectStolenReasonFromDropdown(Stolen) {
        await this.selectReasonFromDropdown.selectByVisibleText(Stolen)
    }
    async selectDamagedReasonFromDropdown(Damaged) {
        await this.selectReasonFromDropdown.selectByVisibleText(Damaged)
    }




    async enterSerialNumber(serialNumber) {
        await this.enterSerialNumberField.setValue(serialNumber)
    }
    async acceptSerialNumber() {
        await this.serialNumberAcceptButton.click()
    }
    async cancelSerialNumber() {
        await this.serialNumberCancelButton.click()
    }
    async batchMessage(message) {
        await this.batchMessageField.setValue(message)
    }

    async checkBatchMessage() {
        if (await this.batchMessageField.isDisplayed() == true) {
            let batchMessageDisplayed = "Sample"
            return batchMessageDisplayed
        }
        else {
            let batchMessageDisplayed = "No Message"
            return batchMessageDisplayed
        }
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
    async enableCheckToRecallThisBatch() {


        //   isChecked=!isChecked

        await this.enableRecallThisBatch.scrollIntoView()
        await this.enableRecallThisBatch.click()
        if (isChecked == false) {
            isChecked = true
        }
        else {
            isChecked = false
        }
        await expect(this.enableRecallThisBatch).toBeEnabled()

    }
    async checkBatchRecall() {
        if (isChecked) {
            let batchRecall = 'true'
            return batchRecall
        }
        else {
            let batchRecall = 'false'
            return batchRecall
        }
    }
    async enterRecallMessage(RecallMessage) {

        await this.recallMessageTextbox.click()
        await this.recallMessageTextbox.setValue(RecallMessage)
    }
    async clearRecallMessage() {

        await this.recallMessageTextbox.click()
        await browser.pause(3000)
        await this.recallMessageTextbox.clearValue()

    }
    async checkBatchRecallMessage() {
        if (await this.recallMessageTextbox.isDisplayed() == true) {
            let recallMessage = "This is a sample recall message"
            return recallMessage
        }
        else {
            let recallMessage = "No Message"
            return recallMessage
        }
    }
    async updateBatchForEdit() {
        await this.updateBatchForEditButton.click()
    }
    async cancelButton() {
        await cancelButtonForBatch.click()
    }

    async acceptButton() {
        await this.addEpiAcceptButton.scrollIntoView()
        await this.addEpiAcceptButton.click()
    }
    async createBatch() {

        await this.createBatchButton.click()

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

        await browser.waitUntil(
            async () => (await $('//label[normalize-space()="Select files"]').waitForEnabled()),
            {
                timeout: 5000,
                timeoutMsg: 'select button is not active'
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
        } catch (e) {
            console.log("error")
        }

        let rawdata = JSON.parse(fs.readFileSync(testData.path.batchImport, 'utf8'))
        const batchFile = filePath.concat(path.sep, "batch_", rawdata.batch.batch, ".json")
        console.log(batchFile)
        try {
            if (fs.existsSync(batchFile)) {
                let fileContents = JSON.parse(fs.readFileSync(batchFile, 'utf-8'))
                // console.log(JSON.stringify(fileContents))
                // console.log(JSON.stringify(rawdata))
                console.log(JSON.stringify(fileContents) === JSON.stringify(rawdata))
                await browser.pause(5000)
                fs.unlinkSync(batchFile)

            }
            else {
                console.log("no file")
            }
        }

        catch (e) {
            console.log("error")
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
        //Click on download button
        try {
            await this.downloadMsgButton.click()
            await browser.pause(5000)
        }
        catch (e) {
            console.log("error")
        }

        let rawdata = JSON.parse(fs.readFileSync(testData.path.batchImport, 'utf8'))
        const batchFile = filePath.concat(path.sep, "batch_", rawdata.batch.batch, ".json")
        console.log(batchFile)

        try {
            if (fs.existsSync(batchFile)) {

                let fileContents = JSON.parse(fs.readFileSync(batchFile, 'utf-8'))
                // console.log(JSON.stringify(fileContents))
                // console.log(JSON.stringify(rawdata))
                console.log(JSON.stringify(fileContents) === JSON.stringify(rawdata))
                await browser.pause(5000)
                fs.unlinkSync(batchFile)
            }
            else {
                const undefinedFile = filePath.concat(path.sep, "batch_", "undefined", ".json")
                console.log(JSON.stringify(undefinedFile) === JSON.stringify(rawdata))
                await browser.pause(5000)
                fs.unlinkSync(undefinedFile)
            }
        }
        catch (e) {
            console.log("error")
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

            return allFields

            // for (var i = 0; i < missingFields.length; i++) {
            //    if(missingFields[i] != allFields){
            //  failedCase.push(missingFields[i])
            //console.log(expect(allFields).to.matches(`${missingFields}`))
            // }
            //    else{
            //     console.log(expect(allFields).to.equal(`${missingFields[i]}`))
            //    }
            // }

            // if(failedCase.length>0){
            //     expect(JSON.stringify(failedCase)).to.have.lengthOf(0, `${JSON.stringify(failedCase)} not found in failed logs`)
            //   }
        }
        catch (e) {

            expect(JSON.stringify(e)).to.have.lengthOf(0, `${missingFields} not found in failed logs`)

        }

    }
    async closeButtonInPopup() {
        await this.closeButton.click()
    }



}


module.exports = new batchesPage();

