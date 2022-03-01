const LoginPage = require('../pageobjects/login.page');
const digits= require('../pageobjects/digit.cal.js');
const allureReporter = require('@wdio/allure-reporter').default

let GTIN=""
class gtin{
  gt(){
    return GTIN
}
}
describe('Gtin generator', () => {
   
    
    it('should open the digitcalculator', async() => {
       
        
        await LoginPage.opensuburl();
        await browser.pause(2000)
        await browser.maximizeWindow();
        await browser.pause(2000)
        await digits.clickCookie();
        await browser.pause(4000)
        const random= Math.floor(1000000000000 + Math.random() * 9000000000000)
        await digits.digitenter(random);
        await browser.pause(2000)
        await digits.caldigit();
        //await digits.copydigit();
        await browser.pause(2000)
        await digits.numbercopy();
        await digits.codeCopy();
        await digits.concat1();
        GTIN= await digits.concat1()
        console.log("Generated GTIN code is "+GTIN)
        
        
    });
    

})
module.exports = new gtin();