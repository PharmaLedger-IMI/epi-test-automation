


class DemiurgePage {
    //demiurge wallet
    get demiurgeWallet() {
        return $('=Demiurge Wallet')
    }
    //new account
    get newAccountButton() {
        return $('//a[@id="new-wallet"]')
    }
    //username
    get userName() {
        return $('//input[@id="username"]')
    }
    //email
    get emailIdField() {x
        return $('//input[@id="email"]')
    }
    //password
    get passwordField() {
        return $('//input[@id="password"]')
    }
    //company name
    get companyNameField() {
        return $('//input[@id="company"]')
    }
    //confirm password
    get confirmPasswordField() {
        return $('//input[@id="confirm-password"]')
    }
    //register
    get registerButton() {
        return $('//button[@id="register-btn"]')
    }
    //recovery
    get recoveryCode() {
        return $('//div[@id="recovery-code"]')
    }
    //copy user identity
    get copyUserIdentity() {
        return $("//span[@class='icon fa fa-copy']")
    }
    //open wallet
    get clickOpenWallet() {
        return $("//button[@id='access-wallet']")
    }
    //enter button
    get enterButton() {
        return $("#open-wallet-btn")
    }
    //admin identity
    get adminIdentity() {
        return $("//sl-input[@type='text']")
    }
    //title
    get title() {
        return $('webc-container[id="booting-page"] dw-title')
    }
    //groups
    get groupsLink() {
        return $('=Groups')
    }
    //my identity tab
    get myIdentityTab() {
        return $('//webc-app-menu[@class="slot-before slot-after hydrated"]//a[@class="link-active"][normalize-space()="My Identities"]')
    }
    //click my identity
    get clickMyIdentity() {
        return $("//sl-icon[@slot='suffix']")
    }
    //current identity
    get currentIdentity() {
        return $('//dw-clipboard-input[@value="@did"]')
    }
    //user identity
    get userIdentity() {
        return $('psk-label[id="did"] label[class="col-form-label"]')
    }
    //admin group
    get adminGroupButton() {
        return $('//strong[normalize-space()="ePI Administration Group"]')
    }
    //member id
    get memeberIdTextbox() {
        return $("//sl-input[@name='did']")

    }
    //write group
    get writeGroupButton() {
        return $('//strong[normalize-space()="ePI Write Group"]')
    }
    //add member
    get addMemberButton() {
        return $('//sl-button[normalize-space()="Add member"]')
    }

    async openDemiurgeWallet() {
        await this.demiurgeWallet.click();
    }
    async clickNewAccount() {
        await this.newAccountButton.click();
    }

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
    async userIdentity() {

        await this.copyUserIdentity.click();

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