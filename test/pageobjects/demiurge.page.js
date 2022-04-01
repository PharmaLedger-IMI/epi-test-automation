
class DemiurgePage {

 get demiurgeWallet(){
    return $('=Demiurge Wallet')
}
get clickNewAccount(){
    return $('//a[@id="new-wallet"]')
}
get userName(){
    return $('//input[@id="username"]')
}
get registerButton(){
    return $('//button[@id="register-btn"]')
}
get recoveryCode(){
    return $('//button[@id="register-btn"]')
}

async openDemiurgeWallet(){
    await this.demiurgeWallet.click();
}
async newAccount(){
    await this.clickNewAccount.click();
}
async clearUserName(){
    
    await this.userName.click();
    await this.userName.clearValue();
}
async enterUserName(userName){
        
    await this.userName.setValue(userName);

}
async register(){
        
    await this.registerButton.click();

}
async copyRecoveryCode(){
        
    await this.recoveryCode.click();

}
}


module.exports = new DemiurgePage();