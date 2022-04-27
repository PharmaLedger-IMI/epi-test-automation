const fs = require('fs')
const bwipjs = require('bwip-js');
const testData=require('../testdata/config.json')
const moment = require('moment');

        
    exports.generate2dMatrixImage = function(gtin, batchNumber, expiryDate, serialNumber){

        // const expdate=moment( expiryDate, 'YYYY-MM-DD').format("YYMMDD");
    const expdate = expiryDate.replace('-', '')
    const expdated = expdate.replace('-', '')
    var expiryDateR = expdated.slice(2);
        let barcode=''
        
        if(serialNumber==""){
             barcode='(01)'+gtin+'(17)'+expiryDateR+'(10)'+batchNumber   
        } 
        else{
            barcode='(01)'+gtin+'(17)'+expiryDateR+'(10)'+batchNumber +'(21)'+serialNumber
           
        }  
        console.log("barcode "+barcode)
        bwipjs.toBuffer({
            bcid:        'gs1datamatrix',  
            text:        barcode,    
            backgroundcolor: 'ffffff',
            padding: 65 
        }, function (err, buff) {
            if (err) {
        
                console.log("error", err)
        
            } else {
    
                fs.writeFileSync(testData.path.matrixImage, buff)
                console.log("image generated")
        
            }
        
        });
        return barcode
        
    }
    

