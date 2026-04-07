// ========== CMS Apps Script ==========
// 這份程式碼要貼到「工具與日誌」Google Sheet 的 Apps Script 編輯器裡
// （跟權限驗證是不同的 Google Sheet）
//
// Google Sheet 結構：
//
// 【工作表名稱：工具】
// A 欄：公會（營運公會 / 創意公會 / 業務公會）
// B 欄：工具名稱
// C 欄：類型（web / skill）
// D 欄：簡短描述
// E 欄：冒險者
// F 欄：連結或 Skill ID（web 填完整網址，skill 填 skill ID 如 ai-ops）
//
// 【工作表名稱：日誌】
// A 欄：標題
// B 欄：描述
// C 欄：Badge（如「指南」）
// D 欄：日期（如 2026-04-07）
// E 欄：冒險者
// F 欄：檔案路徑（如 公會日誌/mcd-handbook-guide.html）
//
// 部署方式：
// 1. 貼上這段程式碼後，點選「部署」→「新增部署作業」
// 2. 類型選「網頁應用程式」
// 3. 執行身份：「我」
// 4. 誰可以存取：「所有人」
// 5. 點選「部署」，複製產生的 URL
// 6. 把 URL 貼到 script.js 的 CMS_APPS_SCRIPT_URL 變數

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 讀取「工具」工作表
  var toolsSheet = ss.getSheetByName('工具');
  var tools = [];
  if (toolsSheet) {
    var toolsData = toolsSheet.getDataRange().getValues();
    for (var i = 1; i < toolsData.length; i++) {
      var row = toolsData[i];
      // 跳過空行
      if (!row[0] && !row[1]) continue;
      tools.push({
        guild: (row[0] || '').toString().trim(),
        name: (row[1] || '').toString().trim(),
        type: (row[2] || '').toString().trim().toLowerCase(),
        description: (row[3] || '').toString().trim(),
        adventurer: (row[4] || '').toString().trim(),
        link: (row[5] || '').toString().trim()
      });
    }
  }

  // 讀取「日誌」工作表
  var journalSheet = ss.getSheetByName('日誌');
  var journal = [];
  if (journalSheet) {
    var journalData = journalSheet.getDataRange().getValues();
    for (var j = 1; j < journalData.length; j++) {
      var jrow = journalData[j];
      // 跳過空行
      if (!jrow[0] && !jrow[1]) continue;

      // 處理日期格式
      var dateVal = jrow[3];
      var dateStr = '';
      if (dateVal instanceof Date) {
        dateStr = Utilities.formatDate(dateVal, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      } else {
        dateStr = (dateVal || '').toString().trim();
      }

      journal.push({
        title: (jrow[0] || '').toString().trim(),
        description: (jrow[1] || '').toString().trim(),
        badge: (jrow[2] || '').toString().trim(),
        date: dateStr,
        adventurer: (jrow[4] || '').toString().trim(),
        filePath: (jrow[5] || '').toString().trim()
      });
    }
  }

  var result = {
    tools: tools,
    journal: journal
  };

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
