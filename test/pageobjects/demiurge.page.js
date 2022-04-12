


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
get email(){
    return $('//input[@id="email"]')
}
get enterPassword(){
    return $('//input[@id="password"]')
}
get enterCompanyName(){
    return $('//input[@id="company"]')
}
get enterConfirmPassword(){
    return $('//input[@id="confirm-password"]')
}
get registerButton(){
    return $('//button[@id="register-btn"]')
}
get recoveryCode(){
    return $('//div[@id="recovery-code"]')
}
get copyUserIdendity(){
    return $("//span[@class='icon fa fa-copy']")
}
get clickOpenWallet(){
    return $("//button[@id='access-wallet']")
}
get Enter() {
    return $("#open-wallet-btn")
}
get clickGroups(){
    return $('=Groups')
}
get myIdentityTab(){
    return $('=My Identities')
}
get clickMyIdentity(){
    return $("//sl-icon[@slot='suffix']")
}
get currentIdentity(){
    return $("//sl-input[@type='text']")
}
get userIdentity(){
    return $('psk-label[id="did"] label[class="col-form-label"]')
}
get clickAdminGroup(){
    return $('//strong[normalize-space()="ePI Administration Group"]')
}
get memeberIdTextbox(){
    return $("//sl-input[@name='did']")
    
}
get clickWriteGroup(){
    return $('//strong[normalize-space()="ePI Write Group"]')
}
get addMemberButton(){
    return $('//sl-button[normalize-space()="Add member"]')
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
async emailId(){
    await this.email.click();
    await this.email.clearValue();
 }
 async password(){
    await this.enterPassword.click();
    await this.enterPassword.clearValue();
 }
 async confirmPassword(){
    await this.enterConfirmPassword.click();
    await this.enterConfirmPassword.clearValue();
 }
 async companyName(){
    await this.enterCompanyName.click();
    await this.enterCompanyName.clearValue();
 }
async register(){
        
    await this.registerButton.click();

}
async copyRecoveryCode(){
        
   const recoveryCode= await this.recoveryCode.getText();
   // console.log("recoveryCode1 "+recoveryCode)
    return recoveryCode

}
async userIdendity(){
        
    await this.copyUserIdendity.click();

}
async openWallet(){
    
    await this.clickOpenWallet.click();
}
async enterButton(){
    
    await this.Enter.click();
}
async groups(){
    
    await this.clickGroups.click();
}
async myIdentity(){
    
    await this.myIdentityTab.click();
}
async copyMyIdentity(){
    
    const identity= await this.clickMyIdentity.click();
   // console.log("identity is "+identity)
    return identity
}
async clickCurrentIdentity(){
    
    await this.currentIdentity.click();
   
}
async doubleClickUserIdentity(){
    
    await this.userIdentity.doubleClick();
   
}
async adminGroup(){
    await this.clickAdminGroup.click();
    
}
async memeberId(){
    await this.memeberIdTextbox.click();
    
}
async writeGroup(){
    await this.clickWriteGroup.click();
    
}
async addMember(){
    await this.addMemberButton.click();
    
}
}


module.exports = new DemiurgePage();