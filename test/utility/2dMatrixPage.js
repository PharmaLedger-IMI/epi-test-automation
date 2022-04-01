const fs = require('fs')
const bwipjs = require('bwip-js');
const testData=require('../testdata/config.json')

class matrixGenerator{
 

 generate2dMatrixImage(gtin, batchNumber, expiryDate, serialNumber){
        
        const expdate = expiryDate.replace('-', '')
        const expdated = expdate.replace('-', '')
        var expiryDateR = expdated.slice(2);
        let barcode=''
        
        if(serialNumber==""){
             barcode='(01)'+gtin+'(17)'+expiryDateR+'(10)'+batchNumber
            console.log("barcode1"+barcode)
        } 
        else{
            barcode='(01)'+gtin+'(17)'+expiryDateR+'(10)'+batchNumber +'(21)'+serialNumber
           console.log("barcode2"+barcode)
        }  
        bwipjs.toBuffer({
            bcid:        'gs1datamatrix',  
            text:        barcode,    
            backgroundcolor: 'ffffff',
            padding: 65 
        }, function (err, buff) {
            if (err) {
        
                console.log("error", err)
        
            } else {
    
                fs.writeFileSync(testData[4]['path'].MatrixImage, buff)
                console.log("image generated")
        
            }
        
        });
        return barcode
        
    }
    

    // generateNewImage(gtin, batchNumber, expiryDate, serialNumber){

            
    //     const expdate = expiryDate.replace('-', '')
    //     const expdated = expdate.replace('-', '')
    //     var expiryDateR = expdated.slice(2);

    //     const barcode='(01)'+gtin+'(17)'+expiryDateR+'(10)'+batchNumber +'(21)'+serialNumber
    //     console.log(barcode)    
    //     bwipjs.toBuffer({
    //         bcid:        'gs1datamatrix',  
    //         text:        barcode,    
    //         backgroundcolor: 'ffffff',
    //         padding: 65 
    //     }, function (err, buff) {
    //         if (err) {
        
    //             console.log("error", err)
        
    //         } else {
    
    //             fs.writeFileSync('/Users/snehav/AppData/Local/Android/Sdk/emulator/resources/customNew.png', buff)
    //             console.log("second image generated")
        
    //         }
        
    //     });
    //     return barcode
        
    // }





}

module.exports = new matrixGenerator();
    
// })
// })