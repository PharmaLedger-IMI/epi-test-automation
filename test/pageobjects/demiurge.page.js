


class DemiurgePage {

    get demiurgeWallet() {
        return $('=Demiurge Wallet')
    }
    get newAccountButton() {
        return $('//a[@id="new-wallet"]')
    }
    get userName() {
        return $('//input[@id="username"]')
    }
    get emailIdField() {
        return $('//input[@id="email"]')
    }
    get passwordField() {
        return $('//input[@id="password"]')
    }
    get companyNameField() {
        return $('//input[@id="company"]')
    }
    get confirmPasswordField() {
        return $('//input[@id="confirm-password"]')
    }
    get registerButton() {
        return $('//button[@id="register-btn"]')
    }
    get recoveryCode() {
        return $('//div[@id="recovery-code"]')
    }
    get copyUserIdendity() {
        return $("//span[@class='icon fa fa-copy']")
    }
    get clickOpenWallet() {
        return $("//button[@id='access-wallet']")
    }
    get enterButton() {
        return $("#open-wallet-btn")
    }
    get adminIdentity() {
        return $("//sl-input[@type='text']")
    }
    get title() {
        return $('webc-container[id="booting-page"] dw-title')
    }
    get groupsLink() {
        return $('=Groups')
    }
    get myIdentityTab() {
        return $('//webc-app-menu[@class="slot-before slot-after hydrated"]//a[@class="link-active"][normalize-space()="My Identities"]')
    }
    get clickMyIdentity() {
        return $("//sl-icon[@slot='suffix']")
    }
    get currentIdentity() {
        return $('//dw-clipboard-input[@value="@did"]')
    }
    get userIdentity() {
        return $('psk-label[id="did"] label[class="col-form-label"]')
    }
    get adminGroupButton() {
        return $('//strong[normalize-space()="ePI Administration Group"]')
    }
    get memeberIdTextbox() {
        return $("//sl-input[@name='did']")

    }
    get writeGroupButton() {
        return $('//strong[normalize-space()="ePI Write Group"]')
    }
    get addMemberButton() {
        return $('//sl-button[normalize-space()="Add member"]')
    }

    async openDemiurgeWallet() {
        await this.demiurgeWallet.click();
    }
    async clickNewAccount() {
        await this.newAccountButton.click();
    }
    // async clearUserName() {

    //     await this.userName.click();
    //     await this.userName.clearValue();
    // }
    async enterUserName(userName) {

        await this.userName.click();
        await this.userName.clearValue();
        await this.userName.setValue(userName);

    }
    async enterEmailId(email) {
        await this.emailIdField.click();
        await this.emailIdField.clearValue();
        await this.emailIdField.setValue(email);
    }
    async enterPassword(password) {
        await this.passwordField.click();
        await this.passwordField.clearValue();
        await this.passwordField.setValue(password);
    }
    async enterConfirmPassword(password) {
        await this.confirmPasswordField.click();
        await this.confirmPasswordField.clearValue();
        await this.confirmPasswordField.setValue(password);
    }
    async enterCompanyName(companyName) {
        await this.companyNameField.click();
        await this.companyNameField.clearValue();
        await this.companyNameField.setValue(companyName);
    }
    async clickRegister() {

        await this.registerButton.click();

    }
    async copyRecoveryCode() {

        const recoveryCode = await this.recoveryCode.getText();
        // console.log("recoveryCode1 "+recoveryCode)
        return recoveryCode

    }
    async userIdendity() {

        await this.copyUserIdendity.click();

    }
    async openWallet() {

        await this.clickOpenWallet.click();
    }
    async clickEnter() {

        await this.enterButton.click();
    }
    async copyAdminIdentity() {

        await this.adminIdentity.click();
    }
    async bootingTitle() {
        if (await this.title.isExisting() == true) {
            console.log(await this.title.getText())

            return true
        }
        else {
            return false
        }
    }
    async clickGroups() {
        await this.groupsLink.click();
    }
    async myIdentity() {

        await this.myIdentityTab.click();
    }
    async copyMyIdentity() {

        const identity = await this.clickMyIdentity.click();
        // console.log("identity is "+identity)
        return identity
    }
    async clickCurrentIdentity() {

        await this.currentIdentity.click();

    }
    async doubleClickUserIdentity() {

        if (await this.userIdentity.isExisting() == true) {

            await this.userIdentity.doubleClick();
            return true
        }
        else {
            return false
        }

    }
    async clickAdminGroup() {
        await this.adminGroupButton.click();

    }
    async memeberId() {
        await this.memeberIdTextbox.click();

    }
    async clickWriteGroup() {
        await this.writeGroupButton.click();

    }
    async clickAddMember() {
        await this.addMemberButton.click();

    }
}


module.exports = new DemiurgePage();