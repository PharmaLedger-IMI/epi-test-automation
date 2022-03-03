
//let BatchID=batchID()
// let editRow=editBatch()
let expiryDate = randomDate()
let expiredDate= randomDateExpired()
let currentID = ''

//let SerialNumber=serialNumber()
class batchId{
    setBatchId (id){
        currentID = id
        console.log("util value is "+currentID)
    }
    getbatchId(){
        return currentID
    }
    
        // SerialNumber(){
        //     return SerialNumber
        // }
    
        randomDate(){
            return expiryDate
        }
        randomDateExpired(){
            return expiredDate
        }



  async  editBatchRow(editValue){
        let fArry = []
        var i = 10
    
        for (;  await browser.$("div:nth-child(" + i + ")").isExisting(); i++) {
            console.log(i)
    
            fArry.push({ batchId: await browser.$("div:nth-child(" + i + ")").getText(), edit: i + 4 })
            i = i + 6
        }
        // let batchValue = date.batchID()//"QS5078"
         let batchValue=editValue
      
        console.log("value is "+batchValue)
         let rClick = ""
         
        fArry.map((key) => {
            //{batchId:"QS5078",edit:68}
            if (key["batchId"] == batchValue) { 
                rClick = key["edit"] 
            }
    
        })
        console.log(fArry)
      let editRow=""
        editRow=rClick
        return editRow
    }

        
      }

function randomDate() {

   
    let end = new Date("2029-05-28")
    let start = new Date("2023-01-01")
    var date1 = new Date(+start + Math.random() * (end - start));
    finalD = date1
    console.log(finalD)
    let month = finalD.getMonth()
    let date = finalD.getDate()
    if(finalD.getMonth()<10){
        month = "0"+(finalD.getMonth()+1)
    }
    if(finalD.getDate()<10){
        date =  "0"+finalD.getDate()
       }
    var date2=finalD.getFullYear() +"-" + month + "-" + date
    console.log(date2)
    return date2

 }

 function randomDateExpired() {

   
    let end = new Date("2015-05-28")
    let start = new Date("2004-01-01")
    var date1 = new Date(+start + Math.random() * (end - start));
    finalD = date1
    console.log(finalD)
    let month = finalD.getMonth()
    let date = finalD.getDate()
    if(finalD.getMonth()<10){
        month = "0"+(finalD.getMonth()+1)
    }
    if(finalD.getDate()<10){
        date =  "0"+finalD.getDate()
       }
    var date2=finalD.getFullYear() +"-" + month + "-" + date
    console.log(date2)
    return date2

 }



  








//  function serialNumber(){

       
//     const SerialNumber=Math.floor(100000 + Math.random() * 900000)
//     return SerialNumber

// }
// function batchID(){
//    const BatchID= batches.batchIdValue()
//    return BatchID
// }
 module.exports = new batchId();