

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

    
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('login');
    }
    opensuburl() {
        return super.opensuburl('login');
    }

}

module.exports = new LoginPage();
