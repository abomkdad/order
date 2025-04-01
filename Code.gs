function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getProducts() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = sheet.getDataRange().getValues();
  const products = [];

  for (let i = 1; i < data.length; i++) {
    products.push({
      code: data[i][0],     // A
      name: data[i][1],     // B
      price: data[i][2],    // C
      image: data[i][3],    // D
      brand: data[i][4],    // E
      size: data[i][5],     // F
      stock: data[i][8],    // I
    });
  }
  return products;
}

function submitCart(cart) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const ordersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("الطلبات") || SpreadsheetApp.getActiveSpreadsheet().insertSheet("الطلبات");
  const data = sheet.getDataRange().getValues();

  cart.forEach(order => {
    const code = order.code;
    const qty = parseInt(order.quantity);

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === code) {
        const currentStock = parseInt(data[i][8]); // I
        const newStock = currentStock - qty;

        sheet.getRange(i + 1, 9).setValue(newStock); // تحديث الكمية في العمود I

        ordersSheet.appendRow([
          new Date(), code, data[i][1], qty, data[i][2], currentStock, newStock
        ]);
        break;
      }
    }
  });

  return "✅ تم تسجيل الطلبات وخصم الكميات.";
}
