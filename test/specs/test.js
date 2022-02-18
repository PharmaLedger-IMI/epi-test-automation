const LoginPage = require('../pageobjects/login.page');
const accessAccount= require('../pageobjects/access.Account');
const products= require('../pageobjects/products.page');
const manages1= require('../pageobjects/batches.page.js');
const digits= require('../pageobjects/digit.cal.js');
const path= require('path');
// const { remote } = require('webdriverio');
// const sharp = require('sharp')

const allureReporter = require('@wdio/allure-reporter').default
let temp=""
describe('ePI Automation Testing', () => {
    
    
    // (async () => {
    //     const browser = await remote({
    //         capabilities: {
    //             browserName: "chrome",
    //             // 'goog:chromeOptions': {
    //             //     args: ["--incognito"]
    //             // }
    //         }
    //     })
    it('login sucess page', async() => {
    const serialNumber = '12345678910137';
    await browser.url('https://epiqa.westeurope.cloudapp.azure.com/')
    //await browser.url('http://localhost:3000')
    await browser.pause(4000);
    await browser.$('=Enterprise Wallet').click()
    await browser.pause(4000)
    const  handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
    await browser.pause(4000);
    
   
    await browser.$('//a[@id=\'access-wallet\']').click();
    await browser.pause(4000)
    await browser.$('//input[@id=\'username\']').setValue('devusersession1')

    await browser.pause(1000)
    await browser.$('//button[@id=\'open-wallet-btn\']').click();

    await browser.pause(10000);

    const frame = await browser.$('iframe[frameborder=\'0\']');
    await browser.switchToFrame(frame);

    await browser.pause(3000);

    //await browser.waitForExist('//a[@href=\'/products\']//span')
    await browser.$('//a[@href=\'/products\']//span').click()
    await browser.pause(3000)
    await browser.$('//button[normalize-space()=\'+ ADD PRODUCT\']').click()
    await browser.pause(4000)
    // const frame1 = await browser.$('iframe[frameborder=\'0\']');
    // await browser.switchToFrame(frame1);

    await browser.$('//input[@placeholder=\'Add product code\']').setValue(serialNumber);
    await browser.pause(1000)
    await browser.$('//input[@placeholder=\'Add product name\']').setValue("Test Product-2")
    await browser.pause(1000)
    await browser.$('//textarea[@placeholder=\'Add product description\']').setValue('Product created using Automation')
    await browser.pause(1000)
    const filePath = path.join(__dirname, '/src/entresto.jpg');
    console.log(filePath)
    
    await browser.$('//input[@type=\'file\']').setValue(filePath)
    await browser.pause(1000)

    await browser.$('//input[@id=\'showEPIOnBatchRecalled\']').click();
    await browser.pause(1000)
    await browser.$('//input[@id=\'showEPIOnBatchExpired\']').click();
    await browser.pause(1000)
    await browser.$('//button[normalize-space()=\'+ Add ePI\']').click();
    await browser.pause(1000)
    await browser.$('(//input[@type=\'file\'])[2]').setValue(path.join(__dirname, '/src/NewLeaflet'));
    await browser.pause(5000)
    //await browser.$('(//input[@type=\'file\'])[2]').setValue(path.join(__dirname, '/src/SMPC_Sample'));
    await browser.$('//button[normalize-space()=\'Accept\']').click();

    // await browser.pause(500)
    // await browser.$('//button[normalize-space()=\'+ Add ePI\']').click();
    // await browser.pause(2000)
    // //await browser.$('//select[@id=\'type\']').selectByVisibleText('SMPC');
    // const h = await browser.$$('//select[@id=\'type\']')
    // //console.log(h.capabilities());
    // await h.selectByAttribute('value', 'smpc');
    // await browser.$('(//input[@type=\'file\'])[2]').setValue(path.join(__dirname, '/src/SMPC_Sample'));
    // await browser.pause(500)
    // //await browser.$('(//input[@type=\'file\'])[2]').setValue(path.join(__dirname, '/src/SMPC_Sample'));
    // await browser.$('//button[normalize-space()=\'Accept\']').click();

    // await browser.$('//button[normalize-space()=\'Save Product\']').click()
    // await browser.pause(12000)
   
    await browser.$('//a[normalize-space()=\'Batches\']').click()
    await browser.pause(3000)

//    await browser.getWindowHandle()
    await browser.$('//button[normalize-space()=\'ADD BATCH\']').click()
    await browser.pause(8000)

    // const loc = await browser.execute('return document.querySelector("input[placeholder=\'dd/mm/yyyy\']").getBoundingClientRect();')
    // console.log(loc)
    // await browser.execute('document.elementFromPoint(loc.right-22, loc.bottom-14).click()', loc);
    
    await browser.execute('document.querySelector("input[placeholder=\'dd/mm/yyyy\']").dataset.date = \'31/12/2024\'')
    // await browser.execute('arguments[0].click()', css)
    // await browser.$('//input[@placeholder=\'dd/mm/yyyy\']').click()
    // await date.setValue('31/12/2022')

    await browser.pause(1000)
    await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']').setValue(serialNumber)
    await browser.pause(2000)
    await browser.$('//psk-select[@class=\'hydrated\']//select[@class=\'form-control\']').setValue('update-valid-serial')
    await browser.pause(1000)
    await browser.$('//textarea[@value=\'@actionModalModel.serialNumbers\']').setValue('123123123')
    await browser.pause(2000)
    const batchId = await browser.$('//input[@placeholder=\'Add batch id\']').getValue();
    console.log(batchId);
    await browser.$('//button[normalize-space()=\'Accept\']').click();
    await browser.pause(4000)

    await browser.$('//psk-button[@data-tag=\'add-batch\']').click();
    await browser.pause(12000)

    // await browser.url('http://localhost:8080/datamatrix?content=01096523892966831724102810GW880921311342454534')
    // await browser.saveScreenshot('/Users/PRATIKS1/Library/Android/sdk/emulator/resources/custom.png')
    // await browser.deleteSession()

    // Pattern to generate Data Matrix - "01012345678901281721022121345456\F10Batch"

})
});