
const testData=require('../testdata/config.json')
const packageJson=require('C:/Users/snehav/epi-test-automation/package.json')
let expiredDate= randomDateExpired()
let currentDate=''
let currentID = ''
let currentSerial=''
let currentBatchRecall=''
let currentBatchRecallMsg=''
let currentBrandName=''
let currentBatchMsg=''
let currentDay=''
let GTIN=''

//let SerialNumber=serialNumber()
class batchId{

    setProductId(id) {
        GTIN = id
    }

    getProductId(){
        if(packageJson['scripts'].incrementalBatch=='true'){
           
            console.log("incrementalProduct value is " + testData[3]['incrementalEditBatch'].prodId)
            return testData[3]['incrementalEditBatch'].prodId 
     }
        else{       

            console.log("gtin value is " + GTIN)
            return GTIN 

        }
    }

    setBatchId(id) {
        currentID = id
    }
    getbatchId() {
        if(packageJson['scripts'].incrementalBatch=='true'){
            console.log("incrementalBatch value is " + testData[1]['incrementalEditBatch'].batchId)
           return testData[1]['incrementalEditBatch'].batchId 
     }
        else{
            
            console.log("batch value is " + currentID)
            return currentID

        }
    }

    setSerialNumber(Number) {
        currentSerial = Number
        

    }
    getSerialNumber() {
        if(packageJson['scripts'].incrementalBatch=='true'){
            console.log("serial value is " + testData[1]['incrementalEditBatch'].serialNumber)
           return testData[1]['incrementalEditBatch'].serialNumber 
     }
        else{
        console.log("Serial NUmber is " + currentSerial)
        return currentSerial
        }
    }

    setBrandName(brand){
        currentBrandName=brand
        console.log("current brandName is " +currentBrandName)
       
    }
    getBrandName(){
        return currentBrandName
    }


    setBatchRecall(flag){
        currentBatchRecall=flag
        console.log("currentBatchRecall is " + currentBatchRecall)
    }
    getBatchRecall(){
        return currentBatchRecall
    }
    setBatchRecallMsg(Msg){
        currentBatchRecallMsg=Msg
        console.log("currentBatchRecallMsg is " + currentBatchRecallMsg)
    }
    getBatchRecallMsg(){
        return currentBatchRecallMsg
    }
    setBatchMsg(Msg){
        currentBatchMsg=Msg
    }
    getBatchMsg(){
        return currentBatchMsg
    }

    setCurrentRandomDate(){
        
        return currentDate=randomDateF()
    }
    getCurrentRandomDate(){

        if(packageJson['scripts'].incrementalBatch=='true'){
        console.log("date value is " + testData[1]['incrementalEditBatch'].expiryDate)
        return testData[1]['incrementalEditBatch'].expiryDate 
     }
     else{

        return currentDate
    }
    }

    randomDate() {
        return randomDateF()
    }
    randomDateExpired() {
        return expiredDate
    }

    setDayChange(randomDate){

        return currentDay=randomDay(randomDate)
    }

    getDayChange(){
        return currentDay
    }
    setMonthChange(randomDate){

        return currentMonth=randomMonth(randomDate)
    }
    getMonthChange(){
        return currentMonth
    }
    setYearChange(randomDate){

        return currentYear=randomYear(randomDate)
    }
    getYearChange(){
        return currentYear
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
      
        console.log("batch value is "+batchValue)
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
    


    async  editProduct(){
        let editValue = '25367613915299'
        let fArry = []
        var i = 9
        for (;  await browser.$("body > webc-app-root:nth-child(1) > webc-app-container:nth-child(3) > div:nth-child(1) > webc-app-router:nth-child(1) > stencil-router:nth-child(1) > stencil-route-switch:nth-child(1) > stencil-route:nth-child(4) > webc-app-loader:nth-child(1) > page-template:nth-child(2) > h6:nth-child(2) > webc-container:nth-child(1) > div:nth-child(2) > webc-datatable:nth-child(1) > div:nth-child(2) > div:nth-child("+i+")").isExisting(); i++)
         {
            console.log(i)
    
            fArry.push({ prodId: await browser.$("body > webc-app-root:nth-child(1) > webc-app-container:nth-child(3) > div:nth-child(1) > webc-app-router:nth-child(1) > stencil-router:nth-child(1) > stencil-route-switch:nth-child(1) > stencil-route:nth-child(4) > webc-app-loader:nth-child(1) > page-template:nth-child(2) > h6:nth-child(2) > webc-container:nth-child(1) > div:nth-child(2) > webc-datatable:nth-child(1) > div:nth-child(2) > div:nth-child("+i+")").getText(), edit: i + 3 })
            i = i + 5
        }
        
        let prodValue=editValue
      
        console.log("product value is "+prodValue)
         let rClick = "" 
        fArry.map((key) => {
            //{batchId:"QS5078",edit:68}
            if (key["prodId"] == prodValue) { 
                rClick = key["prodId"] 
            }
    
        })
        console.log(fArry)
        let editRow=""
        editRow=rClick
        return editRow    
    }     
    }





      function randomDateF() {

        let end = new Date("2029-05-28")
        let start = new Date("2023-01-01")
        var date1 = new Date(+start + Math.random() * (end - start));
        finalD = date1
        console.log(finalD)
        let month = finalD.getMonth()+1
        let date = finalD.getDate()
        if(month<10){
            month = "0"+(month)
        }
        if(date<10){
  
            date =  "0"+date
  
           }
        var date2=finalD.getFullYear() +"-" + month + "-" + date
        console.log("date2 is"+date2)  
        return date2
     }
     
 function randomDateExpired() {

        let end = new Date("2015-05-28")
        let start = new Date("2004-01-01")
        var date1 = new Date(+start + Math.random() * (end - start));
        finalD = date1
        console.log(finalD)
        let month = finalD.getMonth()+1
        let date = finalD.getDate()
        if(month<10){
            month = "0"+(month)
        }
        if(date<10){
            date =  "0"+date
           }
  
        var date2=finalD.getFullYear() +"-" + month + "-" + date
        return date2

 }
 function randomDay(randomDate) {

    let randomDateG=new Date(randomDate)

    let startYear = randomDateG.getFullYear()
    let startMonth = randomDateG.getMonth() + 1
    let start = new Date(startYear+"-"+startMonth+"-"+"01")
    let end = new Date(startYear+"-"+startMonth+"-"+"28")
    var date1 = new Date(+start + Math.random() * (end - start));
    finalD = date1
    console.log(finalD)
    let month = finalD.getMonth()+1
    let date = finalD.getDate()
    if(month<10){
        month = "0"+(month)
    }
    if(date<10){
        date =  "0"+date
       }

    var date2=finalD.getFullYear() +"-" + month + "-" + date
    //console.log("day is" +date2)
    return date2
}
function randomMonth(randomDate) {

    let randomDateG=new Date(randomDate)

    let startYear = randomDateG.getFullYear()
    let startDate = randomDateG.getDate()

    let start = new Date(startYear+"-"+"01"+"-"+startDate)
    let end = new Date(startYear+"-"+"12"+"-"+startDate)
    var date1 = new Date(+start + Math.random() * (end - start));
    finalD = date1
    console.log(finalD)
    let month = finalD.getMonth()+1
    let date = finalD.getDate()
    if(month<10){
        month = "0"+(month)
    }
    if(date<10){
        date =  "0"+date
       }

    var date2=finalD.getFullYear() +"-" + month + "-" + date
    return date2

}
function randomYear(randomDate) {
    let randomDateG=new Date(randomDate)

    let startMonth = randomDateG.getMonth() + 1
    let startDate = randomDateG.getDate()

    let start = new Date("2023"+"-"+startMonth+"-"+startDate)
    let end = new Date("2029"+"-"+startMonth+"-"+startDate)
    var date1 = new Date(+start + Math.random() * (end - start));
    finalD = date1
    console.log(finalD)
    let month = finalD.getMonth()+1
    let date = finalD.getDate()
    if(month<10){
        month = "0"+(month)
    }
    if(date<10){
        date =  "0"+date
       }

    var date2=finalD.getFullYear() +"-" + month + "-" + date
    return date2

}

 module.exports = new batchId();