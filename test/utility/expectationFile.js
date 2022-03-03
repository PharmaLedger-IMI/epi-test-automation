const fs = require('fs')
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
const createbatch= require('../specs/createBatch.js');
const gtinPage = require('../specs/gtinPage.js');
const date=require('../utility/randomDate')
const batches= require('../pageobjects/batches.page.js');
 
 class expectationData{
    async expectData(gtin, batchNumber, expiryDate, serialNumber, batchCheck, batchMessage){

    const expdate = expiryDate.replace('-', '')
    const expdate1 = expdate.replace('-', '')
    var expiryDate1 = expdate1.slice(2);

    const testExpectations = {};
    testExpectations.prodCode = gtin
    testExpectations.prodName = 'Dolo-650'
    testExpectations.expiry = expiryDate1
    testExpectations.batchSerialNumber = serialNumber
    testExpectations.batchValue=batchNumber
    testExpectations.batchRecall = batchCheck
    testExpectations.ePIBeDisplayed = true
    testExpectations.batchMessageDisplayed = batchMessage
    testExpectations.batchRecallMessage = "Tim said its recall"

    let jsonData = JSON.stringify(testExpectations)
    console.log("file is " + jsonData)
    fs.writeFile('C:/Users/snehav/epi-test-automation/test/testdata/myjsonFile.json', jsonData, 'utf8', () => {

        console.log('written file')

    });

}
 }
 module.exports = new expectationData();