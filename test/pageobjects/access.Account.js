

// let userNameclt="kpepiwdio"

class accessAccount {
    get accessAccount() {
        return $("(//div/descendant::a[@id='access-wallet'][text()='Access Account'])")
    }

    get userName() {
        return $("(//div/descendant::input[@id='username'][@placeholder='Enter your username'])")
    }
    get email() {
        return $('//input[@id="email"]')
    }
    get enterPassword() {
        return $('//input[@id="password"]')
    }
    get enterCompanyName() {
        return $('//input[@id="company"]')
    }
    get enterConfirmPassword() {
        return $('//input[@id="confirm-password"]')
    }

    get Enter() {
        return $("#open-wallet-btn")
    }

    async clickAccessAccount() {

        await this.accessAccount.click();
    }

    async clearUserName() {
        await this.userName.click();
        await this.userName.clearValue();
    }

    async enterUserName(userName) {
        await browser.waitUntil(
            async () => (await this.userName),
            {
                timeout: 5000,
                timeoutMsg: 'expected text to be different after 5s'
            }
        );

        await this.userName.setValue(userName);

    }
    async emailId() {
        await this.email.click();
        await this.email.clearValue();
    }
    async password() {
        await this.enterPassword.click();
        await this.enterPassword.clearValue();
    }
    async confirmPassword() {
        await this.enterConfirmPassword.click();
        await this.enterConfirmPassword.clearValue();
    }
    async companyName() {
        await this.enterCompanyName.click();
        await this.enterCompanyName.clearValue();
    }
    async Enterbutton() {

        await this.Enter.click();
    }

}
module.exports = new accessAccount();