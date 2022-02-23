const LoginPage = require('../pageobjects/login.page');
const gtinPage = require('../specs/gtinPage.js');
const accessAccount= require('../pageobjects/access.Account');
const products= require('../pageobjects/products.page');
//const allureReporter = require('@wdio/allure-reporter').default
const path= require('path');

describe('Create Product', () => {

it('should open the Products page and its functionality', async() => { 
    const frame = await browser.$('iframe[frameborder=\'0\']');
    await browser.switchToFrame(frame);
    await browser.pause(5000)
    await products.clickProduct();
    await browser.pause(2000);
    await products.addProduct();
    await browser.pause(5000);
    await products.gtinClrEnt();
    await browser.pause(2000)
    console.log(gtinPage.gt())
    await products.gtinClrEnt(gtinPage.gt());
    await browser.pause(2000)
    await products.brandName("Eye-drops"); 
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
    await browser.pause(1000) 
    await products.enableBatchIsRecalled(); 
    await browser.pause(1000)
     //add epi
     await products.addEpi()
     await browser.pause(1000)
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
     await products.saveProduct()
     await browser.pause(8000)
    
 });

 xit('should verify View/Edit for products in dashboard page', async() => { 
    
    await browser.$("//input[@id='code-search']").setValue("64359348118242")
    await browser.pause(5000);
    await browser.keys('Enter')
    await browser.pause(2000);
    //view or edit
    //await products.clickViewEdit()
    await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
    await browser.pause(5000);
 }) 


 

})