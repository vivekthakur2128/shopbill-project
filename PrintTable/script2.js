let data = server_data;
function printTable() {
  //   fetch("https://script.googleusercontent.com/macros/echo?user_content_key=NQbxBzl4nSvE4YbCF63yFRf1MxdNOX6qVGBixbpVnpbXu7JxkUFsm2dcBYykudYX9I8BOYeVX2aSLw2aQrC0bfjvv9F9oSw1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAsFBmfMwKQdcoMKcH9_5GEJ-pK2KUi5gSIRpYRt_j_AiD2fBzxmVC5InepTpGQj2wZSTS8_urDmNbOGWqhHMqdW3u-uin3ud9z9Jw9Md8uu&lib=MrR8GFw6mYWPyDHWcQs22xwB3Lct-SX0_")
  // .then(res => res.json())
  // .then(data => {
  let date = readDate(data.content);
  let getunitRate = readUnitRate(data.content);
  let shopsDetail = getCurrentConsumptionDetail(data.content);

  let arrayOfMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let shopBillCards = {};

  for (let shopIdIndex = 0; shopIdIndex < shopsDetail.length; shopIdIndex++) {
    for (let monIndex = 0; monIndex < arrayOfMonth.length; monIndex++) {
      let shopDetail = shopsDetail[shopIdIndex];
      let card = generateBillCard(getunitRate, shopDetail, date, monIndex, arrayOfMonth);
      let id = getShopAndMonthId(shopDetail, shopIdIndex, monIndex, arrayOfMonth);
      shopBillCards[id] = card;
    }
  }
  initalizeTable(shopsDetail, date, arrayOfMonth);

  function getShopAndMonthId(shopDetail, monIndex, arrayOfMonth) {
    return `${shopDetail[0]}_${arrayOfMonth[monIndex]}`;
  }
  
  function readDate(data) {
    let date_monthName = data[0];
    return date_monthName;
  }
  function readUnitRate(data) {
    return (billUnitRate = data[1]);
  }
  function getCurrentConsumptionDetail(data) {
    return data.slice(2);
  }
  function generateBillCard(getunitRate, shopDetail, date, monIndex, arrayOfMonth) {
    let displayBill = document.querySelector(".display-bill");
    let unitRate = getunitRate[monIndex + 2];
    let noOfDays = calculateNoOfDays(date, monIndex);
    if ("content" in document.createElement("template")) {
      let template = document.querySelector("#shopDetailTemplate");
      let clone = template.content.cloneNode(true);
      clone.querySelector(".shop").setAttribute("id", `${shopDetail[0]}-${arrayOfMonth[monIndex]}`.replace(" ", "_"));
      let div = clone.querySelectorAll(".shopinfo");
      div[0].innerHTML = `${shopDetail[1]}`;
      div[1].innerHTML = `${new Date(date[monIndex + 2 - 1]).toLocaleDateString("en-IN")} -  ${new Date(date[monIndex + 2]).toLocaleDateString("en-IN")} (<b>${noOfDays} Days</b>)`;
      div[2].innerHTML = `${shopDetail[monIndex + 2]} - ${shopDetail[monIndex + 2 - 1]} = ${shopDetail[monIndex + 2] - shopDetail[monIndex + 2 - 1]}`;
      div[3].innerHTML = `${shopDetail[monIndex + 2] - shopDetail[monIndex + 2 - 1]} * ${unitRate} = ${(shopDetail[monIndex + 2] - shopDetail[monIndex + 2 - 1]) * unitRate}`;
      displayBill.appendChild(clone);
      return clone;
    }
  }
  function calculateNoOfDays(date, monIndex) {
    let milliSecondPerDay = 24 * 60 * 60 * 1000;
    let date1 = new Date(date[monIndex + 2 - 1]);
    let date2 = new Date(date[monIndex + 2]);
    var difference_In_Time = date2.getTime() - date1.getTime();
    var difference_In_Days = difference_In_Time / milliSecondPerDay;
    return difference_In_Days;
  }
  
  function monthName(date) {
    let d = new Date(date);
    let monthIndex = d.getMonth();
    let monthNameArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    console.log(monthNameArray[monthIndex]);
    return monthNameArray[monthIndex];
  }
  
  
  function initalizeTable(shopsDetail, date, arrayOfMonth) {
    let table = document.querySelector("table");
    table.style.display = "block";
    let tbody = document.querySelector("tbody");
    
    for (let rowIndex = 0; rowIndex < shopsDetail.length; rowIndex++) {
      let tr = document.createElement("tr");
      for (let colIndex = 0; colIndex < date.length; colIndex++) {
        let td = document.createElement("td");
        if (isDateColumn(colIndex)) {
          td.setAttribute("id", `${shopsDetail[rowIndex][0]}-${monthName(date[colIndex])}`);
          td.innerHTML = (document.getElementById(`${shopsDetail[rowIndex][0]}-${arrayOfMonth[colIndex-2]}`)).innerHTML;
          console.log(document.getElementById(`${shopsDetail[rowIndex][0]}-${arrayOfMonth[colIndex-2]}`).innerHTML);
        } else {
          td.setAttribute("id", `${shopsDetail[rowIndex][0]}-${date[colIndex]}`);
          td.innerHTML = `${shopsDetail[rowIndex][colIndex]}`;
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  }
  function isDateColumn(index) {
    return index > 1;
  }
  
}

