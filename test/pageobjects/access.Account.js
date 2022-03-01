const { browser } = require("har-validator");

let userNameclt="kpepiwdio"

class accessAccount{
get accessAccount1(){
    return  $("(//div/descendant::a[@id='access-wallet'][text()='Access Account'])")
}

get userName() {
    return $("(//div/descendant::input[@id='username'][@placeholder='Enter your username'])")
}

get Enter() {
    return $("#open-wallet-btn")
}

async clickAccessAccount(){
    
    await this.accessAccount1.click();
}

async userNameclt(){
    return userNameclt;
}

async userNameClrEnt(userNameclt){
    
    await this.userName.click();
    await this.userName.clearValue();
    await this.userName.setValue(userNameclt);

}
async Enterbutton(){
    
    await this.Enter.click();
}

}
module.exports = new accessAccount();