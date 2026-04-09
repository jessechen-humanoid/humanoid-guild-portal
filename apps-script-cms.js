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
      try {
        dateStr = Utilities.formatDate(new Date(dateVal), Session.getScriptTimeZone(), 'yyyy-MM-dd');
      } catch(e) {
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

  // 讀取「懸賞」工作表
  var bountySheet = ss.getSheetByName('懸賞');
  var bounties = [];
  if (bountySheet) {
    var bountyData = bountySheet.getDataRange().getValues();
    for (var b = 1; b < bountyData.length; b++) {
      var brow = bountyData[b];
      if (!brow[0] && !brow[2]) continue;

      var bDateVal = brow[0];
      var bDateStr = '';
      try {
        bDateStr = Utilities.formatDate(new Date(bDateVal), Session.getScriptTimeZone(), 'yyyy-MM-dd');
      } catch(e) {
        bDateStr = (bDateVal || '').toString().trim();
      }

      var completionDateVal = brow[7];
      var completionDateStr = '';
      if (completionDateVal) {
        try {
          completionDateStr = Utilities.formatDate(new Date(completionDateVal), Session.getScriptTimeZone(), 'yyyy-MM-dd');
        } catch(e) {
          completionDateStr = (completionDateVal || '').toString().trim();
        }
      }

      bounties.push({
        row: b + 1,
        date: bDateStr,
        commissioner: (brow[1] || '').toString().trim(),
        task: (brow[2] || '').toString().trim(),
        plusOneCount: parseInt(brow[3]) || 0,
        plusOneList: (brow[4] || '').toString().trim(),
        challenger: (brow[5] || '').toString().trim(),
        status: (brow[6] || '').toString().trim(),
        completionDate: completionDateStr,
        daysSpent: parseInt(brow[8]) || 0
      });
    }
  }

  var result = {
    tools: tools,
    journal: journal,
    bounties: bounties
  };

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ========== 懸賞任務寫入 ==========
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('懸賞');
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, reason: 'sheet_not_found'}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var body = JSON.parse(e.postData.contents);
  var action = body.action;

  if (action === 'newBounty') {
    var email = (body.commissioner || '').toString().trim();
    var task = (body.task || '').toString().trim();
    // 從 email 擷取顯示名稱：jesse.chen@humanoid.com.tw → jesse chen
    var displayName = email.split('@')[0].replace(/\./g, ' ');
    var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    sheet.appendRow([today, displayName, task, 0, '', '', '', '', 0]);
    var newRow = sheet.getLastRow();
    return ContentService
      .createTextOutput(JSON.stringify({success: true, row: newRow}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'plusOne') {
    var row = parseInt(body.row);
    var voterEmail = (body.email || '').toString().trim();
    var currentList = (sheet.getRange(row, 5).getValue() || '').toString().trim();
    var emails = currentList ? currentList.split(',') : [];
    var idx = emails.indexOf(voterEmail);
    if (idx !== -1) {
      // Toggle: 移除投票
      emails.splice(idx, 1);
      sheet.getRange(row, 5).setValue(emails.join(','));
      var newCount = emails.length;
      sheet.getRange(row, 4).setValue(newCount);
      return ContentService
        .createTextOutput(JSON.stringify({success: true, action: 'removed', newCount: newCount}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    emails.push(voterEmail);
    sheet.getRange(row, 5).setValue(emails.join(','));
    var newCount = emails.length;
    sheet.getRange(row, 4).setValue(newCount);
    return ContentService
      .createTextOutput(JSON.stringify({success: true, action: 'added', newCount: newCount}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'challenge') {
    var row = parseInt(body.row);
    var challengerEmail = (body.email || '').toString().trim();
    var currentChallenger = (sheet.getRange(row, 6).getValue() || '').toString().trim();
    if (!currentChallenger) {
      sheet.getRange(row, 6).setValue(challengerEmail);
      return ContentService
        .createTextOutput(JSON.stringify({success: true, action: 'claimed'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    if (currentChallenger === challengerEmail) {
      sheet.getRange(row, 6).setValue('');
      return ContentService
        .createTextOutput(JSON.stringify({success: true, action: 'unclaimed'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService
      .createTextOutput(JSON.stringify({success: false, reason: 'already_claimed'}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'complete') {
    var row = parseInt(body.row);
    var completerEmail = (body.email || '').toString().trim();
    var currentChallenger = (sheet.getRange(row, 6).getValue() || '').toString().trim();
    if (currentChallenger !== completerEmail) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, reason: 'not_challenger'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    var commissionDate = new Date(sheet.getRange(row, 1).getValue());
    var completionDate = new Date();
    var daysSpent = Math.round((completionDate - commissionDate) / (1000 * 60 * 60 * 24));
    sheet.getRange(row, 7).setValue('done');
    sheet.getRange(row, 8).setValue(today);
    sheet.getRange(row, 9).setValue(daysSpent);
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({success: false, reason: 'unknown_action'}))
    .setMimeType(ContentService.MimeType.JSON);
}
