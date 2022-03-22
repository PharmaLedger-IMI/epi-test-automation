const moment=require('moment')
console.log("hello")
let date="26 - Sep - 2028"
// const date=moment(new Date()).format("DD/MM/YYYY")
const date2=moment(date, "DD-MMM-YYYY").format("YYMMDD")
//console.log(date)

console.log(date2)

