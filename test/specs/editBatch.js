const batches= require('../pageobjects/batches.page.js');
 const date=require('../utility/randomDate')
//const createbatch= require('../specs/createBatch.js');


const allureReporter = require('@wdio/allure-reporter').default
 
let editRow=""
class editBatch{
    editbatchRow(){
        
       return editRow
  }
}
describe('Edit Batch', () => {

it('should verify edit for batches page in dashboard', async() => {

    allureReporter.addTestId('ProdAndBatchSetup_1')
   

    await batches.Batch(); 
    await browser.pause(5000)
    date.editBatchRow()
  editRow=  await date.editBatchRow()
  console.log("edit row is" +editRow)
    
    // let fArry = []
    // var i = 10

    // for (; await browser.$("div:nth-child(" + i + ")").isExisting() == true; i++) {
    //     console.log(i)

    //     fArry.push({ batchId: await browser.$("div:nth-child(" + i + ")").getText(), edit: i + 4 })
    //     i = i + 6
    // }
    // // let batchValue = date.batchID()//"QS5078"
    //  let batchValue=createbatch.batchIdVal()
    // //let batchValue ="WL6190"
    //  let rClick = ""
     
    // fArry.map((key) => {
    //     //{batchId:"QS5078",edit:68}
    //     if (key["batchId"] == batchValue) { 
    //         rClick = key["edit"] 
    //     }

    // })
    // console.log(fArry)
  
    // editRow=rClick
    // console.log("edit row number is"+editRow)
    //click on edit
    // await browser.execute('document.querySelector("div:nth-child(' + rClick + ') button:nth-child(1)").click()')
    await browser.pause(2000)
});
})
module.exports = new editBatch();