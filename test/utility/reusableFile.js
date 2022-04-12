
const testData=require('../testdata/config.json')
let expiredDate= randomDateExpired()
let currentDate=''
let currentID = ''
let currentSerial=''
let currentSnRecall=''
let currentBatchRecall=''
let currentBatchRecallMsg=''
let currentBrandName=''
let currentBatchMsg=''
let EpiDisplayed=''
let currentDay=''
let currentMonth=''
let currentYear=''
let currentImage=''
let currentData=''
let GTIN=''
const incrementalValue=process.argv
const incrementalArg=incrementalValue.length-1
//const newbatch=incrementalValue.length-1

class reuseFile{

    setProductId(id) {
        GTIN = id
    }

    getProductId() {
        console.log("increment test value" + process.argv)
        console.log("incrementalArg value is " + process.argv[incrementalArg])
        console.log("arg value is " + process.argv[incrementalArg].split('=')[1])
       // console.log("arg newbatch value is " + process.argv[newbatch].split('=')[1])
        if (process.env.npm_config_incremental) {

            console.log("incremental product value is " + testData.incrementalTest.prodId)
            return testData.incrementalTest.prodId
        }
        else {

            console.log("gtin value is " + GTIN)
            return GTIN

        }
    }

    setBatchId(id) {
        currentID = id
    }
    getbatchId() {
        if (process.env.npm_config_incremental) {
            console.log("value iss   "+process.env.npm_config_incremental )
            console.log("incremental batch value is " + testData.incrementalTest.batchId)
            return testData.incrementalTest.batchId
        }

        else {

            console.log("batch value is " + currentID)
            return currentID
        }
    }

    setImage(image){
        currentImage=image

    }
    
    getImage(){
        
        return currentImage
    }
    setExpectationFile(data){
        currentData=data

    }
    getExpectationFile(){
        return currentData
    }
    setSerialNumber(Number) {
        currentSerial = Number

    }
    getSerialNumber() {

        if (process.env.npm_config_incremental ) {
            console.log("serial value is " + testData.incrementalTest.serialNumber)
            return testData.incrementalTest.serialNumber
        }
        else {
            console.log("Serial Number is " + currentSerial)
            return currentSerial
        }
    }

    setBrandName(brand){
        currentBrandName=brand
        console.log("current brandName is " +currentBrandName)
       
    }
    getBrandName(){
        
        if (process.env.npm_config_incremental ) {
            console.log("product name is " + testData.incrementalTest.prodName)
            return testData.incrementalTest.prodName
        }
        else {
            return currentBrandName
        }
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
    setSnIsinRecallList(SnRecall){
        currentSnRecall=SnRecall
    }
    getSnIsinRecallList(){
        return currentSnRecall
    }
    setEpiDisplayed(epi){
        EpiDisplayed= epi
    }
    getEpiDisplayed(){
        return EpiDisplayed
    }


    setCurrentRandomDate(){
        
        return currentDate=randomDateF()
    }
    getCurrentRandomDate(){
     
        if(process.env.npm_config_incremental ){
        console.log("incremental date value is " + testData.incrementalTest.expiryDate)
        return testData.incrementalTest.expiryDate 
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
       
        if(process.env.npm_config_incremental ){
            console.log("date value is " + testData.incrementalTest.expiryDate)
            return testData.incrementalTest.expiryDate 
        }
        else
        {
        return currentDay
        }
    }
    // setMonthChange(randomDate){

    //     return currentMonth=randomMonth(randomDate)
    // }
    getMonthChange(){
                
        if(process.env.npm_config_incremental ){
            console.log("date value is " + testData.incrementalTest.expiryDate)
            return testData.incrementalTest.expiryDate 
        }
        else
        {
        return currentMonth
        }
    }
    setYearChange(randomDate){

        return currentYear=randomYear(randomDate)
    }
    getYearChange(){
        
        if(process.env.npm_config_incremental ){
            console.log("date value is " + testData.incrementalTest.expiryDate)
            return testData.incrementalTest.expiryDate 
        }
        else
        {
        return currentYear
        }
    }

    setDateChange(randomDate,type){
        
        if(type=="day"){
            currentDay = dateChange(randomDate,type)
        }
        else if(type=="month"){
            currentMonth = dateChange(randomDate,type)
        }
        else if(type=="year"){
            currentYear = dateChange(randomDate,type)
        }
    }

    getDateChange(type){
              
         if(type=="day"){
           return currentDay
        }
        else if(type=="month"){
           return currentMonth
        }
        else if(type=="year"){
            return currentYear
        }
    }


  async  editBatchRow(editValue){
        let fArry = []
        var i = 10

        for (;  await browser.$("div:nth-child(" + i + ")").isExisting(); i++) {
            console.log(i)
    
            fArry.push({ batchId: await browser.$("div:nth-child(" + i + ")").getText(), edit: i + 4 })
            i = i + 6
        }
        
        let batchValue=editValue
      
        //console.log("batch value is "+batchValue)
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

    
     serialNum10(){
        var serialNumberWithComma=''
        var serialNumberUplaod=''
        for (var i = 0; i < 10; i++) {
        const  SerialNumber=  (Math.floor(100000 + Math.random() * 900000)).toString()
        serialNumberWithComma += SerialNumber+",";
        console.log(serialNumberWithComma)
        
        }
        serialNumberUplaod=serialNumberWithComma.substring(0, serialNumberWithComma.length - 1)
        return serialNumberUplaod
      }
       serialNum50K(){
        var serialNumberWithComma=''
        var serialNumberUplaod=''
        for (var i = 0; i < 50000; i++) {
        const  SerialNumber=  (Math.floor(100000 + Math.random() * 900000)).toString()
        serialNumberWithComma += SerialNumber+",";
        console.log(serialNumberWithComma)
        
        }
        serialNumberUplaod=serialNumberWithComma.substring(0, serialNumberWithComma.length - 1)
        return serialNumberUplaod
      }

      unKnownBatch(){
         
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        function generateString(length) {
            let result = ' ';
            let  batchResult=''
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result = characters.charAt(Math.floor(Math.random() * charactersLength));
                batchResult=result+characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        
            return batchResult;
        }
        
        return (generateString(2)+(Math.floor(1000 + Math.random() * 9000))).toString()
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
        console.log("date2 is "+date2)  
        return date2
     }
     
 function randomDateExpired() {

        let end = new Date("2021-05-28")
        let start = new Date("2011-01-01")
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
 //To change day/month/Year
function dateChange(randomDate,type) {
    let randomDateG=new Date(randomDate)
    let startYear = randomDateG.getFullYear()
    let startDate = randomDateG.getDate()
    let startMonth = randomDateG.getMonth()+1
    console.log("newdate"+startDate,startMonth)
    let start = ""
    let end = ""
    if(type=="day"){
         start = new Date(startYear+"-"+startMonth+"-"+"01")
         end = new Date(startYear+"-"+startMonth+"-"+"28")
    }
    else if(type=="month"){
         
        start = new Date(startYear + "-" + "01" + "-" + startDate)
        end = new Date(startYear + "-" + "12" + "-" + startDate)
    }
    else if(type=="year"){
         start = new Date("2023"+"-"+startMonth+"-"+startDate)
         end = new Date("2029"+"-"+startMonth+"-"+startDate)
    }
    
    var date1 = new Date(+start + Math.random() * (end - start)); //2023-08-17 to 2029-08-17
    finalD = date1

    let month = type=="year"?randomDateG.getMonth() + 1:finalD.getMonth() + 1
    let date = type=="year"||type=="month"?randomDateG.getDate():finalD.getDate()

    // let month = finalD.getMonth()+1
    // let date = finalD.getDate()
    if(month<10){
        month = "0"+(month)
    }
    if(date<10){
        date =  "0"+date
       }
    var date2=finalD.getFullYear() +"-" + month + "-" + date
    console.log('changeddate of day/month/year'+date2,randomDate)
    return date2

}







 module.exports = new reuseFile();