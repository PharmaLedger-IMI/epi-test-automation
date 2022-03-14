const LoginPage = require('../pageobjects/login.page');
const digits= require('../pageobjects/digit.cal.js');
const info=require('../utility/reusableFile')
const wait=require('../utility/timeout')
//const allureReporter = require('@wdio/allure-reporter').default

// let GTIN=""
// class gtin{
//   gt(){
//     return GTIN
// }
// }
describe('Gtin generator', () => {
   
    
    it('should open the digitcalculator', async() => {
       
        
        await LoginPage.opensuburl();
        await wait.setTimeoutwait(2);
        await browser.maximizeWindow();
        await wait.setTimeoutwait(2);
        await digits.clickCookie();
        await wait.setTimeoutwait(4);
        const random= Math.floor(1000000000000 + Math.random() * 9000000000000)
        await digits.digitenter(random);
        await wait.setTimeoutwait(2);
        await digits.caldigit();
        await wait.setTimeoutwait(2);
        await digits.numbercopy();
        await digits.codeCopy();
        await digits.concat1();
        GTIN= await digits.concat1()
        info.setProductId(await digits.concat1())
        console.log("Generated GTIN code is "+GTIN)
        
        
    });
    

})
//module.exports = new gtin();