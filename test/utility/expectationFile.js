const fs = require('fs')
//let currentJSON = ""
 class expectationData{
    
    // getJSONdata(){
    //     return currentID
    // }

    // if(batchCheck!=""){

    //     testExpectations.batchRecall = batchCheck
        
    //     } 
    async expectData(gtin, batchNumber, expiryDate, serialNumber, productName, batchCheck, batchMessage, snIsInRecallList, recallMessage){

    const expdate = expiryDate.replace('-', '')
    const expdated = expdate.replace('-', '')
    var expiryDateR = expdated.slice(2);

    const testExpectations = {};
    testExpectations.prodCode = gtin
    testExpectations.batchValue=batchNumber
    testExpectations.expiry = expiryDateR
    testExpectations.batchSerialNumber = serialNumber
    testExpectations.prodName = productName  
    testExpectations.batchRecall = batchCheck
    testExpectations.batchMessageDisplayed = batchMessage
    testExpectations.snIsInRecallListePIBeDisplayed = snIsInRecallList
    testExpectations.batchRecallMessage = recallMessage


    // currentJSON = testExpectations
    
    let jsonData = JSON.stringify(testExpectations)
    console.log("file is " + jsonData)
    fs.writeFile('C:/Users/snehav/epi-test-automation/test/testdata/myjsonFile.json', jsonData, 'utf8', () => {

        console.log('written file')

    });

}
 }
 module.exports = new expectationData();