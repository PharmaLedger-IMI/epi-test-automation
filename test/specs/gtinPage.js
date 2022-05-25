const LoginPage = require('../pageobjects/login.page');
const digits = require('../pageobjects/digit.cal.js');
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default

describe('001_Generate gtin', () => {


    it('Browser - should generate gtin', async () => {

        allureReporter.addStep('Open the digit calculator url')
        allureReporter.addStep('Enter 13 digits and click on calculate')
        allureReporter.addStep('Copy the 14 digits')
        await LoginPage.opensuburl();
        await wait.setTimeoutwait(2);
        await browser.maximizeWindow();
        await wait.setTimeoutwait(2);
        await digits.clickCookie();
        await wait.setTimeoutwait(4);
        const random = Math.floor(1000000000000 + Math.random() * 9000000000000)
        await digits.enterDigits(random);
        await wait.setTimeoutwait(2);
        await digits.clickCalculate();
        await wait.setTimeoutwait(2);
        GTIN = await digits.copyGtin()
        await wait.setTimeoutwait(2);
        utilityFunction.setProductId(await digits.copyGtin())
        await wait.setTimeoutwait(2);
        console.log("Generated GTIN code is " + GTIN)


    });


})
