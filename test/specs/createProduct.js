//const LoginPage = require('../pageobjects/login.page');
const gtinPage = require('../specs/gtinPage.js');
//const accessAccount= require('../pageobjects/access.Account');
const products= require('../pageobjects/products.page');
const date=require('../utility/randomDate')
const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');
// const fs = require('fs');

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
//let data =JSON.parse(fs.readFileSync('test/testData/myjsonFile.json'))
//const testData= require('../test/testdata/myjsonFile.json')


describe('Create Product', () => {


   
it('should verify product page', async() => { 
    
    allureReporter.addFeature('Create Product')
    allureReporter.addSeverity('Critical');
    allureReporter.addTestId('ProdAndBatchSetup_1')
    allureReporter.addDescription('No. of products can be created by Adding Product')
    allureReporter.startStep("Create new product with a valid GTIN, and add the ePI");

    await products.clickProduct();
    await browser.pause(3000);
    await products.addProduct();
    await browser.pause(5000);
    await products.gtinClrEnt();
    await browser.pause(2000)
    console.log(gtinPage.gt())
    await products.gtinClrEnt(gtinPage.gt());
    //await browser.$('//button[normalize-space()=\'+ ADD PRODUCT\']').setValue("09088884204609")
    await browser.pause(2000)

    await products.brandName("Dolo-650");
    date.setBrandName(await products.checkBrandName()) 
    await browser.pause(2000)
    await products.productDescription("Dolo-650 Tablet 15's contains 'Paracetamol' which is a mild analgesic and fever reducer"); 
    await browser.pause(4000)
    //Upload product photo
    const filePath = path.join(__dirname, '/src/entresto.jpg');
    await products.productPhoto(filePath);
    await browser.pause(1000)
    //internal material code
    await products.internalMaterialCode("D-60")
    await browser.pause(1000)
    //strength
    await products.addStrength("123")
    await browser.pause(1000)
    // video source
    await products.videoSource("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
    await browser.pause(2000) 
    await products.enableBatchIsRecalled(); 
    await browser.pause(1000)
     //add epi
     await products.addEpi()
     await browser.pause(3000)
     //select language	
     await products.selectLanguage('German')
     await browser.pause(1000)
     //select type
     await products.selectType('SMPC')
     await browser.pause(1000)
     //Video source
     await products.videoSourceEpi("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
     await browser.pause(1000)
     await browser.$('(//input[@type=\'file\'])[2]').addValue(path.join(__dirname, '/src/Entresto'));
     await browser.pause(3000)
     //add epi accept
     await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
     await browser.pause(3000)
     //Save product
    //  await products.saveProduct()
    await browser.execute('document.querySelector(`psk-button[data-tag="add-product"] button[class="btn btn-primary"]`).click()')
   
    await browser.pause(33000)
     allureReporter.endStep("passed");
     allureReporter.addAttachment('img',Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');
    
    
 });

})