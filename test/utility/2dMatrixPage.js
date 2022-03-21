//const createbatch1= require('../specs/createBatch.js');
// const gtin = require('../specs/gtinPage.js');
// const batches= require('../pageobjects/batches.page.js');
const fs = require('fs')
const bwipjs = require('bwip-js');
// const date=require('../utility/randomDate')
//const testData= require('../testdata/myjsonFile.json')
//const gtinPage = require('../specs/gtinPage.js');


class matrixGenerator{
 

 generateImage(gtin, batchNumber, expiryDate, serialNumber){

            
        const expdate = expiryDate.replace('-', '')
        const expdated = expdate.replace('-', '')
        var expiryDateR = expdated.slice(2);

        const barcode='(01)'+gtin+'(17)'+expiryDateR+'(10)'+batchNumber +'(21)'+serialNumber
        console.log(barcode)    
        bwipjs.toBuffer({
            bcid:        'gs1datamatrix',  
            text:        barcode,    
            backgroundcolor: 'ffffff',
            padding: 65 
        }, function (err, buff) {
            if (err) {
        
                console.log("error", err)
        
            } else {
    
                fs.writeFileSync('/Users/snehav/AppData/Local/Android/Sdk/emulator/resources/custom.png', buff)
                console.log("image generated")
        
            }
        
        });
        return barcode
        
    }
}

module.exports = new matrixGenerator();
    
// })
// })