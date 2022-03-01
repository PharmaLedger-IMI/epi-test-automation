//const createbatch= require('../specs/createBatch.js');
//const gtinPage = require('../specs/gtinPage.js');
//const batches= require('../pageobjects/batches.page.js');
const fs = require('fs')
const bwipjs = require('bwip-js');
const testData= require('../testdata/myjsonFile.json')

describe('2d Matrix page', () => {
it('should generate 2D Matrix', async() => {
    
    // const expdate = batches.randomDate().replace('-', '')
    // const expdate1 = expdate.replace('-', '')
    // var expiryDate = expdate1.slice(2);
   // const barcode='(01)'+gtinPage.gt()+'(17)'+expiryDate+'(10)'+createbatch.batchId()+'(21)'+createbatch.SerialNumber()
   const barcode='(01)'+testData.prodCode+'(17)'+testData.expiry+'(10)'+'WL6190' +'(21)'+testData.batchNumber
   console.log(barcode)    
    bwipjs.toBuffer({
        bcid:        'gs1datamatrix',  
        text:        barcode,    
        backgroundcolor: 'ffffff',
        padding: 15 
    }, function (err, buff) {
        if (err) {
    
            console.log("error", err)
    
        } else {

            fs.writeFileSync('/Users/snehav/AppData/Local/Android/Sdk/emulator/resources/custom.png', buff)
            console.log("image generated")
    
        }
    
    });
    
})
})