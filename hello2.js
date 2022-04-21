//const moment = require('moment');
//var message = require('./hello');
//const testData=require('../epi-test-automation/test/testdata/sampleProductImport.json')
const fs = require('fs');
var randomCountry = require('random-country');
const testData=require('../epi-test-automation/test/testdata/config.json')
//  console.log(message.sayHello())

//  const expiryDate='2001-01-10'

//  const expdate = expiryDate.replace('-', '')
//         const expdated = expdate.replace('-', '')
//         var expiryDateR = expdated.slice(2);
// // const expdate=moment( '010110', 'YYMMDD').format("DD-MMM-YYYY");
//  console.log("expdate "+ expiryDateR)


// read the file into raw data
 let rawdata = JSON.parse(fs.readFileSync('../epi-test-automation/test/testdata/sampleBatchImport.json', 'utf8' ))
//  console.log(Math.random().toString(36).substring(2, 5));
console.log(rawdata)
// const marketIdValue=rawdata.product.markets[0].marketId
// console.log(" is "+marketIdValue)
// // //  var arr = [];
//   rawdata.product.markets[0].marketId= randomCountry({ full: true });

//   Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
//  console.log("snRecalledValue is "+rawdata.product.markets[0].marketId)
//  const snValidValue=rawdata.batch.snValid

// rawdata.batch.snValid= []
console.log("snValidValue is "+rawdata.batch.snValid)

//  const inventedNameValue=rawdata.product.inventedName
// //delete
//  delete rawdata.product.inventedName
//const snValidValue=rawdata.batch.snValid
    //     if( rawdata.batch.snValid==''){
    //         rawdata.batch.snValid=[parseInt(testData.incrementalTest.serialNumber)]
    //         console.log("old Valid serial number is "+ rawdata.batch.snValid)
    // }
    // else{
    //     console.log("Valid serial number is "+ rawdata.batch.snValid)
    // }


fs.writeFileSync('../epi-test-automation/test/testdata/sampleBatchImport.json', JSON.stringify(rawdata) )
//update 
// rawdata.product.inventedName = inventedNameValue

//fs.writeFileSync('../epi-test-automation/test/testdata/sampleProductImport.json', JSON.stringify(rawdata) )

// let myjsonobj = {
//     "employeeid": "160915848",
//     "firstName": "tet",
//     "lastName": "test",
//     "email": "test@email.com",
//     "country": "Brasil",
//     "currentIndustry": "aaaaaaaaaaaaa",
//     "otherIndustry": "aaaaaaaaaaaaa",
//     "currentOrganization": "test",
//     "salary": "1234567"
//   }
//   delete myjsonobj['otherIndustry'];
//   console.log(myjsonobj);

var person1={first_name:"bob"};
var person2 = {first_name:"bob1"}; 
console.log(JSON.stringify(person1) === JSON.stringify(person2))

// //compare the two object
// if(JSON.stringify(person1) === JSON.stringify(person2)){
//     //objects are the same
//     console.log(JSON.stringify(person1) === JSON.stringify(person2))
// }


 