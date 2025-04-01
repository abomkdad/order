function doGet(e) {
  const page = e.parameter.page || "warehouse";
  return HtmlService.createHtmlOutputFromFile(page)
    .setTitle("تجهيز الطلبات")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getAllOrders() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
    if (!sheet) return [["❌ Sheet2 غير موجودة"]];
    
    const data = sheet.getDataRange().getValues();
    if (!data || data.length === 0) return [["📭 لا توجد بيانات"]];
    
    return data;
  } catch (e) {
    return [["🚨 خطأ أثناء القراءة: " + e.message]];
  }
}
