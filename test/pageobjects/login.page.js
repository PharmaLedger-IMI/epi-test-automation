


const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */


    get enterpriseWallet(){
        return $('=Enterprise Wallet')
    }
    get microsoftUrl()
    {
        return browser.url('https://upm365.sharepoint.com/sites/PharmaLedger/Documentos%20compartidos/Forms/AllItems.aspx')
    }
    get enterMicrosoftEmail(){
        return $('//input[@type=\'email\']')
    }
    get enterMicrosoftPassword(){
        return $('//input[@type=\'password\']')
    }
    get microsoftNextButton(){
        return $('//input[@type=\'submit\']')
    }
    get staySigninNo(){
        return $('//input[@id=\'idBtn_Back\']')
    }



    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    // async login (username, password) {
    //     await this.inputUsername.setValue(username);
    //     await this.inputPassword.setValue(password);
    //     await this.btnSubmit.click();
    // }

    async openEnterpriseWallet(){
        await this.enterpriseWallet.click();
    }
    async openMicrosoftUrl(){
        await this.microsoftUrl;
    }
    async microsoftEmail(mail){
        await this.enterMicrosoftEmail.setValue(mail);
    }
    async microsoftPassword(pwd){
        await this.enterMicrosoftPassword.setValue(pwd);
    }
    async microsoftNext(){
        await this.microsoftNextButton.click();
    }
    async stayNo(){
        await this.staySigninNo.click();
    }
   
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('login');
    }
    opensuburl() {
        return super.opensuburl('gs1');
    }

}

module.exports = new LoginPage();
