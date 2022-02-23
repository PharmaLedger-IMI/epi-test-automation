const fs = require('fs')
const bwipjs = require('bwip-js');
//describe('2d Matrix page', () => {
//it('should generate 2D Matrix', async() => {
   
     const expiryDate='290528'
    //  const expdate= batches1.randomDate().replace('-', '')
    //  const expdate1= expdate.replace('-', '')

    const barcode='(01)'+'52943620880115'+'(17)'+expiryDate+'(10)'+'YV1456'+'(21)'+'123456'
    console.log(barcode)
    //await browser.pause(2000)
    //await browser.url('https://barcode.tec-it.com/barcode.ashx?data='+barcode+'&code=DataMatrix&dmsize=Default')
    //await browser.pause(10000)
    //await browser.saveScreenshot('/Users/snehav/AppData/Local/Android/Sdk/emulator/resources/custom.png')

    bwipjs.toBuffer({

        bcid:        'gs1datamatrix',  
        text:        barcode,    // Text to encode
    
        backgroundcolor: 'ffffff',
    
        padding: 5
     
    }, function (err, buff) {
    
        if (err) {
    
            console.log("error",err)
    
        } else {

            fs.writeFileSync('/Users/snehav/AppData/Local/Android/Sdk/emulator/resources/custom.png', buff)
    
            console.log("image generated")
    
        }
    
    });
   // await browser.deleteSession()
    
//})
//})