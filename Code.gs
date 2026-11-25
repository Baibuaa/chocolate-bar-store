const SHEET_NAME = "Orders";

// รับข้อมูลคำสั่งซื้อจากหน้า Landing Page (POST)
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);
  
  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toLocaleString("th-TH");
  
  sheet.appendRow([
    orderId,
    timestamp,
    data.name,
    "'" + data.phone,
    data.address,
    data.sku1Qty,
    data.sku2Qty,
    data.totalPrice,
    "รอดำเนินการ"
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ status: "success", orderId: orderId }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ดึงข้อมูลออเดอร์ทั้งหมดไปแสดงหน้า Admin และอัปเดตสถานะการแพ็ค (GET)
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const action = e.parameter.action;
  
  if (action === "updateStatus") {
    const orderId = e.parameter.orderId;
    const newStatus = e.parameter.status;
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === orderId) {
        sheet.getRange(i + 1, 9).setValue(newStatus);
        break;
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "updated" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const result = [];
  
  for (let i = 1; i < rows.length; i++) {
    let obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j];
    }
    result.push(obj);
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
