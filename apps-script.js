// 這份程式碼要貼到 Google Sheets 的 Apps Script 編輯器裡
// 開啟方式：Google Sheets → 擴充功能 → Apps Script
//
// 部署方式：
// 1. 貼上這段程式碼後，點選「部署」→「新增部署作業」
// 2. 類型選「網頁應用程式」
// 3. 執行身份：「我」
// 4. 誰可以存取：「所有人」
// 5. 點選「部署」，複製產生的 URL
// 6. 把 URL 貼到 script.js 的 APPS_SCRIPT_URL 變數

function doGet(e) {
  var email = (e.parameter.email || '').toLowerCase().trim();

  if (!email) {
    return ContentService
      .createTextOutput(JSON.stringify({ authorized: false, error: 'missing email' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var rowEmail = (data[i][2] || '').toString().toLowerCase().trim(); // C 欄 (index 2)
    var rowPermission = data[i][3]; // D 欄 (index 3)

    if (rowEmail === email) {
      var authorized = (rowPermission === true || rowPermission === 'TRUE' || rowPermission === 'true');
      return ContentService
        .createTextOutput(JSON.stringify({ authorized: authorized }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ authorized: false }))
    .setMimeType(ContentService.MimeType.JSON);
}
