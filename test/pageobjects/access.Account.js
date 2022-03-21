

// let userNameclt="kpepiwdio"

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

async clearUserName(){
   await this.userName.click();
   await this.userName.clearValue();
}

async enterUserName(userName){
    await browser.waitUntil(
        async () => (await this.userName),
        {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s'
        }
        );
    
    await this.userName.setValue(userName);

}
async Enterbutton(){
    
    await this.Enter.click();
}

}
module.exports = new accessAccount();