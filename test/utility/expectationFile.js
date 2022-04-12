const fs = require('fs')
const testData=require('../testdata/config.json')
const moment = require('moment');

    
    exports.generateExpectationFile = function(gtin, batchNumber, expiryDate, serialNumber, productName, batchRecallCheck, batchMessage, snIsInRecallList, recallMessage, epiDisplayed){

    const expdate=moment( expiryDate, 'YYYY-MM-DD').format("YYMMDD");
    

    const testExpectations = {};
    testExpectations.prodCode = gtin
    testExpectations.batchValue=batchNumber
    testExpectations.expiry = expdate
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
    fs.writeFile(testData.path.testExpectation, jsonData, 'utf8', () => {
    console.log('written file')
    
    });
    return jsonData
    

}
