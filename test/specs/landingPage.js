const LoginPage = require('../pageobjects/login.page');
const accessAccount= require('../pageobjects/access.Account');
const products= require('../pageobjects/products.page');
const batches= require('../pageobjects/batches.page.js');
const digits= require('../pageobjects/digit.cal.js');
const path= require('path');
const fs = require('fs')
const bwipjs = require('bwip-js');

const util = require('util');

const exec = util.promisify(require('child_process').exec);


const allureReporter = require('@wdio/allure-reporter').default
 let GTIN=""
let BatchID=""
describe('ePI Automation Testing page', () => {
   
  
    xit('should open the digitcalculator', async() => {
        
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



    it('should open ePI landing page', async () => {

        allureReporter.addFeature('Landing Page');
        allureReporter.addSeverity('Critical');
        await LoginPage.open();
        await browser.pause(4000)
        await browser.maximizeWindow();

    });

    it('should open Enterprise Wallet', async() => {
        allureReporter.addFeature('Enterprise Wallet Login');
        await LoginPage.openEnterpriseWallet();
        await browser.pause(3000);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        
        
    });
    it('should open Access Account', async() => {
        //allureReporter.addFeature('Access Account')
         await accessAccount.clickAccessAccount();
         await browser.pause(4000)
    });

    it('should clear and enter the username ', async() => {
        
        await accessAccount.userNameClrEnt();
        await browser.pause(2000)
        await accessAccount.userNameClrEnt("kpepiwdio");
        await browser.pause(2000)
    });

    it('should open the Wallet', async() => {
       
        await accessAccount.Enterbutton();
        await browser.pause(8000)
        const frame = await browser.$('iframe[frameborder=\'0\']');
        await browser.switchToFrame(frame);
        await browser.pause(5000)
        
    });

    it('should open the Products page', async() => { 

        await products.clickProduct();
        await browser.pause(2000);
      
     });
     it('should verify View/Edit for products in dashboard page', async() => { 


        await products.addProduct();
        await browser.pause(5000);

         const testExpectations = {};
         testExpectations.prodCode = '1234';
         testExpectations.prodName = 'dolo-650'
         testExpectations.expiry = '23/09/26'
         testExpectations.batchNum = '123456'
         testExpectations.shouldePIBeDisplayed = false
         testExpectations.batchMessageDisplayed = true

         let jsonData = JSON.stringify(testExpectations)
         console.log("file is "+jsonData)
         fs.writeFile('C:/Users/snehav/epi-test-automation/test/testdata/myjsonFile.json', jsonData, 'utf8',() => {

            console.log('written file')
            
            });

        await browser.$("//input[@id='code-search']").setValue("64359348118242")
        await browser.pause(5000);
        await browser.keys('Enter')
        await browser.pause(2000);
        //view or edit
        //await products.clickViewEdit()
        await browser.execute('document.querySelector("button[data-tag=\'edit-product\']").click()')
        await browser.pause(5000);
     }) 

    xit('should click on Add Product', async() => {

        await products.addProduct();
        await browser.pause(5000);
        
     });

     xit('should clear and enter the GTIN number', async() => {

        await products.gtinClrEnt();
        await browser.pause(2000)
        await products.gtinClrEnt(GTIN);
        await browser.pause(2000)
    });
    xit('should enter brand name and product description', async() => {
        await products.brandName("Eye-drops"); 
        await browser.pause(2000)
        await products.productDescription("Dolo-650 Tablet 15's contains 'Paracetamol' which is a mild analgesic and fever reducer"); 
        await browser.pause(4000)
        
    });
   
    xit('should upload product photo', async() => {
        
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
  
    });


    xit('should verify whether Enable Adverse Events Reporting is in enabled state ', async() => {
        await products.adverseEvents(); 
        await browser.pause(1000)
    });

    xit('should verify whether Enable Anti-Counterfeiting check for this product is in enabled state ', async() => {
        await products.antiCounterfeiting(); 
        await browser.pause(1000)
    });

    xit('should verify checkboxes', async() => {
        await products.enableBatchIsRecalled(); 
        await browser.pause(1000)
        await products.enableExpirationDateIsIncorrect()
        await browser.pause(1000)
        await products.batchExpired(); 
        await browser.pause(1000)
        await products.enableSnIsInRecallList()
        await browser.pause(1000)
        await products.enableSnIsInDecommissionedList()
        await browser.pause(1000)
        await products.enableSnIsUnknown()
        await browser.pause(1000)
        await products.batchNumberUnknown()
        await browser.pause(1000)
    });

  
    xit('should retrieve patient information text', async() => {
        await products.patientInfo(); 
        await browser.pause(1000)
    });
    it('should upload in leaflet Management', async() => {

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
        await browser.pause(4000)

        // await products.addEpi()
        // await browser.pause(1000)
        // await browser.$('(//input[@type=\'file\'])[2]').addValue(path.join(__dirname, '/src/Entresto'));
        // await browser.pause(3000)
        // await browser.execute('document.querySelector("psk-button[disabled=\'@modalData.filesWereNotSelected\'] button[class=\'btn btn-primary\']").click();');
        // await browser.pause(3000)


        //await browser.execute('document.querySelector(".delete-language").click();')
        await browser.$("//button[@class='delete-language']").click()

        // let fArry = []
        // var i = 1
        // for (; await browser.$("//li["+i+"]//div[1]//button[1]").isExisting() == true; i++) {
        // fArry.push({ i })
        // }
        // let batchValue = 1
        // let rClick = ""
        // fArry.map((key) => {
        
        // if (key == batchValue) {
        // rClick = key
        // }
        // })
        // console.log("delete value is "+rClick)
       


        // let value = await batches.deleteFile()
        //await browser.$("//li["+ rClick+"]//div[1]//button[1]").click()
        await browser.pause(10000);
        
        //Save product
        await products.saveProduct()
        await browser.pause(8000)
  
    });

    xit('should click Market Management', async() => {
       
        
        
        await browser.execute('document.querySelector("body > webc-app-root:nth-child(1) > webc-app-container:nth-child(3) > div:nth-child(1) > webc-app-router:nth-child(1) > stencil-router:nth-child(1) > stencil-route-switch:nth-child(1) > stencil-route:nth-child(9) > webc-app-loader:nth-child(1) > psk-page:nth-child(1) > h6:nth-child(1) > webc-container:nth-child(1) > div:nth-child(1) > div:nth-child(2) > psk-tab-navigator:nth-child(4) > psk-tab:nth-child(2) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)").click()')
        await browser.pause(2000)
        await products.selectLanguageInMarketPage('Germany')
        await browser.pause(1000)
        await products.enterNationalCode('+49')
        await browser.pause(1000)
        await products.enterMAHName('Sample')
        await browser.pause(1000)
        await products.enterLegalEntityName('Test')
        await browser.pause(1000)
        await browser.execute('document.querySelector("body > webc-app-root:nth-child(1) > webc-app-container:nth-child(3) > div:nth-child(1) > webc-app-router:nth-child(1) > stencil-router:nth-child(1) > stencil-route-switch:nth-child(1) > stencil-route:nth-child(9) > webc-app-loader:nth-child(1) > psk-page:nth-child(1) > h6:nth-child(1) > webc-container:nth-child(1) > webc-modal:nth-child(3) > footer:nth-child(3) > psk-button:nth-child(2) > button:nth-child(1)").click()')
        // await products.addMarketButtonInPopup()
        await browser.pause(10000)

    
    });
    xit('should click on cancel button', async() => {
        await products.Cancel(); 
        await browser.pause(4000)
    });
/// batches page
    xit('should click on Batches', async() => {
        await batches.Batch(); 
        await browser.pause(4000)

       
           
    });
    xit('should verify edit for batches page in dashboard', async() => {
        let fArry = []
        var i = 10

        for (; await browser.$("div:nth-child(" + i + ")").isExisting() == true; i++) {
            console.log(i)

            fArry.push({ batchId: await browser.$("div:nth-child(" + i + ")").getText(), edit: i + 4 })
            i = i + 6
        }
        let batchValue = "RY4115"
        let rClick = ""
        fArry.map((key, index) => {
            if (key["batchId"] == batchValue) {
                rClick = index
            }

        })
        console.log(fArry)
        console.log(fArry[rClick]["edit"])
        //click on edit
        await browser.execute('document.querySelector("div:nth-child(' + fArry[rClick]["edit"] + ') button:nth-child(1)").click()')
        await browser.pause(2000)
    })
    
    xit('Should verify batch page functionalities', async() => {
              
        await batches.addBatch(); 
        await browser.pause(2000)
        BatchID= await batches.batchIdValue()
        console.log("Batch value is "+BatchID)
        await batches.siteName("Dolo-650 Tablet 15's"); 
        await browser.pause(2000)

        function randomDate() {

            let end = new Date("2029-05-28")
            let start = new Date("2023-01-01")
            var date1 = new Date(+start + Math.random() * (end - start));
            finalD = date1
            let month = finalD.getMonth()
            let date = finalD.getDate()
            if(finalD.getMonth()<10){
                month = "0"+finalD.getMonth()
            }
            if(finalD.getDate()<10){
                date =  "0"+finalD.getDate()
               }
            var date2=finalD.getFullYear() +"-" + month + "-" + date
            console.log(date2)
            return date2

         }
        
          let expiryDate = randomDate()
          await browser.execute((date) => {
              (function () {
                  let event = new Event('change');
                  let datePicker = document.querySelector("input[placeholder='dd/mm/yyyy']")
                  datePicker.value = date;
                  datePicker.dispatchEvent(event);
              })();
          }, expiryDate);

        await browser.pause(2000);
        const selectBox = await browser.$('//psk-select[@class=\'default-select hydrated\']//select[@class=\'form-control\']');
        //  await selectBox.selectByAttribute('value', '10014331120600');
        //  await browser.pause(2000);  
        await selectBox.selectByAttribute('value', GTIN);
        await browser.pause(3000);

        //enable dateselection
        // await batches.enableDaySelection();
        // await browser.pause(1000);
        //video source
        await batches.videoSource("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
        await browser.pause(1000);
        //enable incorrect expiration date verification
        // await batches.enableIncorrectExpirationDateVerification()
        // await browser.pause(1000);
        // //expiration date verification       
        // await batches.expirationDateVerification()
        // // enable serial number verification
        // await browser.pause(1000);
        // await batches.enableSerialNumberVerification()
        // await browser.pause(1000);
    
        // manage serial numbers dropdown
        //  await batches.selectUpdateValidSerialFromDropdown('Update Valid')
        //  await browser.pause(5000);
        //  await batches.selectUpdateValidSerialFromDropdown('Update Recalled')
        //  await browser.pause(5000);
        //  await batches.selectUpdateValidSerialFromDropdown('Update decommissioned')
        //  await browser.pause(5000);
        //  await batches.selectUpdateValidSerialFromDropdown('Update decommissioned')
        //  await browser.pause(5000);
        //  await batches.enableResetAllValidSerialNumber()
        //  await browser.pause(1000);
        //await batches.enableResetAllRecalledSerialNumber()
        // await batches.enableResetAllDecommisionedSerialNumber()
        // await browser.pause(1000);

        // manage serial number enter
        // const SerialNumber=Math.floor(100000 + Math.random() * 900000)
        // await batches.enterSerialNumber(SerialNumber)
        // await browser.pause(4000);
        // await batches.selectStolenReasonFromDropdown('Stolen')
        // // manage serial number accept 
        // await batches.acceptSerialNumber()
        // await browser.pause(1000);
        // cancel button
        // await batches.cancelSerialNumber()
        // await browser.pause(1000);
        // batch msg
        await batches.batchMessage("Sample")
        await browser.pause(1000);
        // add epi leaflet
        await batches.addEpi()
        await browser.pause(1000);
        //
        await batches.selectLanguage('German')
        await browser.pause(1000)
        //select type
        await batches.selectType('SMPC')
        await browser.pause(1000)
       // video source
        await batches.videoSourceEpi("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
        await browser.pause(1000);
       // upload leaflet folder
       // await batches.uploadLeafletFolder()
        await browser.$('//input[@type=\'file\']').addValue(path.join(__dirname, '/src/Entresto'));
        await browser.pause(10000);
        await batches.acceptButton()
        await browser.pause(10000);

        await batches.addEpi()
        await browser.pause(1000);
       
       // video source
        await batches.videoSourceEpi("https://cdnapisec.kaltura.com/html5/html5lib/v2.92/mwEmbedFrame.php/p/2076321/uiconf_id/46847003/entry_id/1_cuq6u28l?wid=_2076321&iframeembed=true&playerId=kaltura_player&entry_id=1_cuq6u28l&flashvars%5bstreamerType%5d=auto&amp;flashvars%5blocalizationCode%5d=en&amp;flashvars%5bleadWithHTML5%5d=true&amp;flashvars%5bsideBarContainer.plugin%5d=true&amp;flashvars%5bsideBarContainer.position%5d=left&amp;flashvars%5bsideBarContainer.clickToClose%5d=true&amp;flashvars%5bchapters.plugin%5d=true&amp;flashvars%5bchapters.layout%5d=vertical&amp;flashvars%5bchapters.thumbnailRotator%5d=false&amp;flashvars%5bstreamSelector.plugin%5d=true&amp;flashvars%5bEmbedPlayer.SpinnerTarget%5d=videoHolder&amp;flashvars%5bdualScreen.plugin%5d=true&amp;flashvars%5bhotspots.plugin%5d=1&amp;flashvars%5bKaltura.addCrossoriginToIframe%5d=true&amp;&wid=1_iueede1t")
        await browser.pause(1000);
       // upload leaflet folder
       // await batches.uploadLeafletFolder()
        await browser.$('//input[@type=\'file\']').addValue(path.join(__dirname, '/src/Entresto'));
        await browser.pause(5000);

        await batches.acceptButton()
        await browser.pause(5000);

        let fArry = []
        var i = 1
        for (; await browser.$("//li["+i+"]//div[1]//button[1]").isExisting() == true; i++) {
        fArry.push({ i })
        }
        let batchValue = 1
        let rClick = ""
        fArry.map((key) => {
        
        if (key == batchValue) {
        rClick = key
        }
        })
        console.log("delete value is "+rClick)
       


        // let value = await batches.deleteFile()
        await browser.$("//li["+ rClick+"]//div[1]//button[1]").click()
        await browser.pause(10000);

        //div[normalize-space()="English SMPC"]
       
        //scrollIntoView
        // await batches.acceptButton()
        // await browser.pause(5000);
        //checkbox
        await batches.enableCheckToRecallThisBatch()
        await browser.pause(1000)
        //Create batch
        // await batches.createBatch()
        // await browser.pause(3000);
    });
  

    xit('should generate 2D Matrix', async() => {
        // const gtinNumber=await browser.$("//div[16]").getText()
         const expiryDate='29/05/28'
         const expdate= expiryDate.replace('/', '')
         const expdate1= expdate.replace('/', '')
       // const serialNum="9501101020917";
       // const batchNO= await browser.$("//div[normalize-space()='MV6888']").getText()
        const barcode='(01)'+GTIN+'(17)'+expdate1+'(10)'+ BatchID+'(21)'+SerialNumber
        console.log(barcode)
        await browser.pause(2000)
        await browser.url('https://barcode.tec-it.com/barcode.ashx?data='+barcode+'&code=DataMatrix&dmsize=Default')
        await browser.pause(10000)
        //await browser.saveScreenshot('/Users/snehav/AppData/Local/Android/Sdk/emulator/resources/custom.png')

        bwipjs.toBuffer({

            bcid:        'gs1datamatrix',  
        
            text:        barcode,    // Text to encode
        
            backgroundcolor: '#ffffff',
        
            padding: 5
         
        }, function (err, buff) {
        
            if (err) {
        
                console.log("error")
        
            } else {

                fs.writeFileSync('/Users/snehav/AppData/Local/Android/Sdk/emulator/resources/custom.png', buff)
        
                console.log("image generated")
        
            }
        
        });
        await browser.deleteSession()
        
    });
    





    

    


});


