let data = server_data;
function getDetailsForGenerateBill() {
//   fetch("https://script.googleusercontent.com/macros/echo?user_content_key=NQbxBzl4nSvE4YbCF63yFRf1MxdNOX6qVGBixbpVnpbXu7JxkUFsm2dcBYykudYX9I8BOYeVX2aSLw2aQrC0bfjvv9F9oSw1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAsFBmfMwKQdcoMKcH9_5GEJ-pK2KUi5gSIRpYRt_j_AiD2fBzxmVC5InepTpGQj2wZSTS8_urDmNbOGWqhHMqdW3u-uin3ud9z9Jw9Md8uu&lib=MrR8GFw6mYWPyDHWcQs22xwB3Lct-SX0_")
// .then(res => res.json())
// .then(data => {
    let selectedMonth = getBillGenerateMonth();
    let columnName = readColumnsName(data.content);
    let indexOfSelectedMonth = getIndexOfSelectedMonth(columnName, selectedMonth);
    let date = readDate(data.content);
    let noOfDays = calculateNoOfDays(date, indexOfSelectedMonth);
    let unitRate = readUnitRate(data.content, indexOfSelectedMonth);
    let shopDetails = getCurrentConsumptionDetail(data.content, indexOfSelectedMonth);
    generateBill(indexOfSelectedMonth, unitRate, shopDetails, date, noOfDays);
  // })
  }
  function getBillGenerateMonth() {
    let select = document.getElementById("selectMonthName");
    let option = select.options[select.selectedIndex];
    monthToGenerateBill = option.text;
    return monthToGenerateBill;
  }
  function readColumnsName(data) {
    let columns = data[0];
    return columns;
  }
  function getIndexOfSelectedMonth(columnName, selectedMonth) {
    let getDate = columnName.slice(2); 
    let indexOfMonth = ''; 
    for (let index = 0; index < getDate.length; index++) { 
      let findMonthNameInDate = new Date(getDate[index]).toDateString('en-IN'); 
     if(findMonthNameInDate.includes(selectedMonth)){ 
      indexOfMonth = getDate.indexOf(getDate[index +2]); 
     } 
    } 
    return indexOfMonth;  
  }
  function readDate(data){
    return data[0];
  } 
  function calculateNoOfDays(date, indexOfSelectedMonth){
    let milliSecondPerDay = 24*60*60*1000;
    let date1 = new Date(date[indexOfSelectedMonth - 1]);
    let date2 = new Date(date[indexOfSelectedMonth]);
    var difference_In_Time = date2.getTime() - date1.getTime();
    var difference_In_Days = difference_In_Time / milliSecondPerDay;
    return difference_In_Days;
  }
  function readUnitRate(data, indexOfSelectedMonth) {
    let billUnitRate = data[1];
    return billUnitRate[indexOfSelectedMonth];
  }
  function getCurrentConsumptionDetail(data) {
    return data.slice(2);
  }
  function generateBill(indexOfSelectedMonth, unitRate, shopDetails, date, noOfDays){
    let displayBill = document.querySelector(".display-bill"); 
    displayBill.innerHTML = '';
  for (let index = 0; index < shopDetails.length; index++) { 
    if ("content" in document.createElement("template")) { 
        let template = document.querySelector("#shopDetailTemplate"); 
        let clone = template.content.cloneNode(true);
        let div = clone.querySelectorAll(".shopinfo"); 
        div[0].textContent = `${shopDetails[index][1]}`; 
        div[1].innerHTML = `${new Date(date[indexOfSelectedMonth-1]).toLocaleDateString('en-IN')} -  ${new Date(date[indexOfSelectedMonth]).toLocaleDateString('en-IN')} (<b>${noOfDays} Days</b>)`; 
        div[2].textContent = `${shopDetails[index][indexOfSelectedMonth]} - ${shopDetails[index][indexOfSelectedMonth - 1]} = ${ 
          shopDetails[index][indexOfSelectedMonth] - 
          shopDetails[index][indexOfSelectedMonth - 1] 
        }`;
        div[3].textContent = `${shopDetails[index][indexOfSelectedMonth] - shopDetails[index][indexOfSelectedMonth - 1]} * ${unitRate} = ${(shopDetails[index][indexOfSelectedMonth] - shopDetails[index][indexOfSelectedMonth - 1]) * unitRate}`; 
            displayBill.appendChild(clone); 
        }
    }
}
  

