const fs = require('fs')
//let currentJSON = ""
 class expectationData{
    
    // getJSONdata(){
    //     return currentID
    // }

    // if(batchCheck!=""){

    //     testExpectations.batchRecall = batchCheck
        
    //     } 
    async generateExpectationFile(gtin, batchNumber, expiryDate, serialNumber, productName, batchRecallCheck, batchMessage, snIsInRecallList, recallMessage, epiDisplayed){

    const expdate = expiryDate.replace('-', '')
    const expdated = expdate.replace('-', '')
    var expiryDateR = expdated.slice(2);

    const testExpectations = {};
    testExpectations.prodCode = gtin
    testExpectations.batchValue=batchNumber
    testExpectations.expiry = expiryDateR
    testExpectations.batchSerialNumber = serialNumber
    testExpectations.prodName = productName  
    testExpectations.batchRecall = batchRecallCheck
    testExpectations.batchMessageDisplayed = batchMessage
    testExpectations.snIsInRecallListePIBeDisplayed = snIsInRecallList
    testExpectations.batchRecallMessage = recallMessage
    testExpectations.epiDisplayed = epiDisplayed


    // currentJSON = testExpectations
    
    let jsonData = JSON.stringify(testExpectations)
    console.log("file is " + jsonData)
    fs.writeFile('C:/Users/snehav/epi-mobileapp-test-automation/test/testdata/testExpectations.json', jsonData, 'utf8', () => {
    console.log('written file')

    });

}
}
 module.exports = new expectationData();