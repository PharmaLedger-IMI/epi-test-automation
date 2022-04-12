//const moment = require('moment');
//var message = require('./hello');
//const testData=require('../epi-test-automation/test/testdata/sampleProductImport.json')
const fs = require('fs');
//  console.log(message.sayHello())

//  const expiryDate='2001-01-10'

//  const expdate = expiryDate.replace('-', '')
//         const expdated = expdate.replace('-', '')
//         var expiryDateR = expdated.slice(2);
// // const expdate=moment( '010110', 'YYMMDD').format("DD-MMM-YYYY");
//  console.log("expdate "+ expiryDateR)


// read the file into raw data
 let rawdata = JSON.parse(fs.readFileSync('../epi-test-automation/test/testdata/sampleProductImport.json', 'utf8' ))
 console.log(rawdata)

 const inventedNameValue=rawdata.product.inventedName
//delete
 delete rawdata.product.inventedName

fs.writeFileSync('../epi-test-automation/test/testdata/sampleProductImport.json', JSON.stringify(rawdata) )
//update 
rawdata.product.inventedName = inventedNameValue

fs.writeFileSync('../epi-test-automation/test/testdata/sampleProductImport.json', JSON.stringify(rawdata) )




 