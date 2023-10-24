let data = server_data;
function printTable() {
  //   fetch("https://script.googleusercontent.com/macros/echo?user_content_key=NQbxBzl4nSvE4YbCF63yFRf1MxdNOX6qVGBixbpVnpbXu7JxkUFsm2dcBYykudYX9I8BOYeVX2aSLw2aQrC0bfjvv9F9oSw1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAsFBmfMwKQdcoMKcH9_5GEJ-pK2KUi5gSIRpYRt_j_AiD2fBzxmVC5InepTpGQj2wZSTS8_urDmNbOGWqhHMqdW3u-uin3ud9z9Jw9Md8uu&lib=MrR8GFw6mYWPyDHWcQs22xwB3Lct-SX0_")
  // .then(res => res.json())
  // .then(data => {
  getBillGenerateMonth();
  // let date = readDate(data.content);
  // let indexOfSelectedMonth = getIndexOfSelectedMonth(date, selectedMonth);
  // let noOfDays = calculateNoOfDays(date, indexOfSelectedMonth);
  // let unitRate = readUnitRate(data.content, indexOfSelectedMonth);
  // let shopDetails = getCurrentConsumptionDetail(data.content, indexOfSelectedMonth);
  // let shopBIll = generateBill(indexOfSelectedMonth, unitRate, shopDetails, date, noOfDays, selectedMonth)
  // })
}
function getBillGenerateMonth() {
  let arrayOfMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let index = 0; index < arrayOfMonth.length; index++) {
    for (let index = 0; index < array.length; index++) {
      
      let selectedMonth = arrayOfMonth[index];
      let date = readDate(data.content);
      let indexOfSelectedMonth = getIndexOfSelectedMonth(date, selectedMonth);
      let noOfDays = calculateNoOfDays(date, indexOfSelectedMonth);
      let unitRate = readUnitRate(data.content, indexOfSelectedMonth);
      let shopDetails = getCurrentConsumptionDetail(data.content, indexOfSelectedMonth);
      generateBill(indexOfSelectedMonth, unitRate, shopDetails, date, noOfDays, selectedMonth);
    }
  }

}
function readDate(data) {
  let date_monthName = data[0];
  return date_monthName;
}
function getIndexOfSelectedMonth(date, selectedMonth) {
  let getDate = date.slice(2);
  let indexOfMonth = "";
  for (let index = 0; index < getDate.length; index++) {
    let findMonthNameInDate = new Date(getDate[index]).toDateString("en-IN");
    if (findMonthNameInDate.includes(selectedMonth)) {
      indexOfMonth = getDate.indexOf(getDate[index + 2]);
    }
  }
  return indexOfMonth;
}
function calculateNoOfDays(date, indexOfSelectedMonth) {
  let milliSecondPerDay = 24 * 60 * 60 * 1000;
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
function generateBill(indexOfSelectedMonth, unitRate, shopDetails, date, noOfDays, selectedMonth) {
  let displayBill = document.querySelector(".display-bill");
  displayBill.innerHTML = "";
  for (let index = 0; index < shopDetails.length; index++) {
    if ("content" in document.createElement("template")) {
      let template = document.querySelector("#shopDetailTemplate");
      let clone = template.content.cloneNode(true);
      clone.querySelector(".shop").setAttribute("id", `${shopDetails[index][1].replace(" ", "_")}`);
      let div = clone.querySelectorAll(".shopinfo");
      div[0].innerHTML = `${shopDetails[index][1]}`;
      div[1].innerHTML = `${new Date(date[indexOfSelectedMonth - 1]).toLocaleDateString("en-IN")} -  ${new Date(date[indexOfSelectedMonth]).toLocaleDateString("en-IN")} (<b>${noOfDays} Days</b>)`;
      div[2].innerHTML = `${shopDetails[index][indexOfSelectedMonth]} - ${shopDetails[index][indexOfSelectedMonth - 1]} = ${shopDetails[index][indexOfSelectedMonth] - shopDetails[index][indexOfSelectedMonth - 1]}`;
      div[3].innerHTML = `${shopDetails[index][indexOfSelectedMonth] - shopDetails[index][indexOfSelectedMonth - 1]} * ${unitRate} = ${(shopDetails[index][indexOfSelectedMonth] - shopDetails[index][indexOfSelectedMonth - 1]) * unitRate}`;
      displayBill.appendChild(clone);
    }
  }
  displayTable(shopDetails, date, selectedMonth);
}
function displayTable(shopDetails, date) {
  let table = document.querySelector("table");
  table.style.display = "block";
  let tbody = document.querySelector("tbody");
  for (let rowIndex = 0; rowIndex < shopDetails.length; rowIndex++) {
    let tr = document.createElement("tr");
    for (let colIndex = 0; colIndex < date.length; colIndex++) {
      let td = document.createElement("td");
      if (isDateColumn(colIndex)) {
        td.setAttribute("id", `${shopDetails[rowIndex][0]}-${monthName(date[colIndex])}`);
      } else {
        td.setAttribute("id", `${shopDetails[rowIndex][0]}-${date[colIndex]}`);
      }
      td.innerHTML = `${shopDetails[rowIndex][colIndex]}`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
   
  }
  function monthName(date) {
    let d = new Date(date);
    monthIndex = d.getMonth();
    let monthNameArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNameArray[monthIndex];
  }
  function isDateColumn(index) {
    return index > 1;
  }
}
