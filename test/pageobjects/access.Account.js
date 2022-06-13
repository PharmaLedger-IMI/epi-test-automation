

class accessAccount {

    get accessAccount() {
        return $("(//div/descendant::a[@id='access-wallet'][text()='Access Account'])")
    }

    get userNameField() {
        return $("(//div/descendant::input[@id='username'][@placeholder='Enter your username'])")
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

    get enterButton() {
        return $("#open-wallet-btn")
    }

    async clickAccessAccount() {

        await this.accessAccount.click();
    }


    async enterUserName(userName) {
        await this.userNameField.click();
        await this.userNameField.clearValue();
        await browser.waitUntil(
            async () => (await this.userNameField),
            {
                timeout: 5000,
                timeoutMsg: 'expected text to be different after 5s'
            }
        );

        await this.userNameField.setValue(userName);

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
    async clickEnter() {

        await this.enterButton.click();
    }

}
module.exports = new accessAccount();