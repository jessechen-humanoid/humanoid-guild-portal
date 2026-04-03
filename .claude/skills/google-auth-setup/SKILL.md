---
name: google-auth-setup
description: "為靜態網頁加入 Google 帳號登入 + Google Sheets 權限管理。當使用者提到「Google 登入」「登入權限」「權限管理」「Google 帳號登入」「建立登入」時觸發。"
license: MIT
metadata:
  author: jessechen-humanoid
  version: "1.0"
---

為一個靜態網頁（純 HTML/CSS/JS）加入 Google 帳號登入功能，並用 Google Sheets 作為權限管理後台。改試算表就自動生效，不需要後端伺服器，零成本。

## 觸發條件

當使用者說以下任何一種話時觸發：
- 「要建立 Google 登入權限」
- 「加上 Google 帳號登入」
- 「這個頁面要有登入功能」
- 「用 Google Sheets 管理誰可以登入」
- 任何涉及「靜態網頁 + Google 登入 + 權限控制」的需求

## 架構概覽

```
使用者開頁面
  → 看到 Google 登入按鈕
  → 登入後拿到 email、名字、大頭照
  → 前端呼叫 Google Sheets 上的 Apps Script API
  → API 查 Sheets 回傳「有沒有權限」
  → 有 → 顯示頁面內容（header 顯示大頭照 + 名字 + 登出）
  → 沒有 → 顯示「你沒有權限登入」
```

技術組成：
- **Google Identity Services SDK**（前端 CDN）— 處理 Google 帳號登入
- **Google Apps Script**（部署在 Google Sheets 上）— 當 API 用，查詢權限
- **localStorage**（瀏覽器快取）— 24 小時內不用重新登入

## 執行流程

### Phase 1：確認前置資訊

向使用者確認以下資訊（如果對話中已經有就不用重複問）：

1. **Google Sheets 網址**：哪份試算表管理權限？email 在哪一欄？權限勾選在哪一欄？
2. **正式站網址**：部署在哪裡？（需要加到 OAuth 已授權 JavaScript 來源）
3. **Google Cloud Console**：有沒有現成的 GCP 專案？有沒有現成的 OAuth Client ID？

### Phase 2：建立 Apps Script

產生一個 `apps-script.js` 檔案，內容是 `doGet(e)` 函式：
- 接收 `email` query parameter
- 讀取指定試算表的 email 欄和權限欄
- 比對後回傳 `{ authorized: true/false }` JSON

把程式碼和部署步驟一起給使用者：

```
部署方式：
1. 打開 Google Sheets → 擴充功能 → Apps Script
2. 貼上程式碼（取代預設內容）
3. 部署 → 新增部署作業 → 網頁應用程式
4. 執行身份：我，存取權限：所有人
5. 複製產生的 URL 給我
```

**注意**：根據使用者提供的欄位位置調整 column index（A=0, B=1, C=2, D=3...）。

### Phase 3：引導使用者設定 Google Cloud Console

如果使用者沒有現成的 OAuth Client ID，一步步引導：

1. 到 Google Cloud Console 建立或選擇專案
2. 設定 OAuth 同意畫面（內部，如果是 Google Workspace 組織）
3. 建立 OAuth 用戶端 ID（網頁應用程式）
4. 已授權的 JavaScript 來源加入正式站網址和 `http://localhost:3000`
5. 複製 Client ID

**溝通方式**：一次一個步驟，等使用者回報再下一步。不要一次丟所有步驟。

### Phase 4：前端實作

修改目標頁面的 HTML/CSS/JS：

**HTML 新增：**
- 登入畫面：標題 + 說明文字 + Google 登入按鈕（`g_id_signin`），置中顯示
- 無權限畫面：「你沒有權限登入」訊息 + 重新登入按鈕
- 錯誤畫面：「權限驗證失敗」訊息 + 重試按鈕
- Header 加入使用者資訊區塊：圓形大頭照 + 名字 + 登出按鈕
- 原有頁面內容加上 `hidden` class 隱藏

**CSS 新增：**
- `.hidden { display: none !important; }`
- 登入/無權限/錯誤畫面：全頁置中、白色圓角卡片（遵循頁面既有設計系統）
- Google 登入按鈕置中：`.g_id_signin { display: flex; justify-content: center; }`
- 使用者資訊：大頭照圓形 32px、名字 + 登出水平排列
- 響應式：手機版 user-info 改為 `position: static`

**JS 實作：**
- 頂部設定 `GOOGLE_CLIENT_ID` 和 `APPS_SCRIPT_URL` 變數
- `handleGoogleSignIn(response)`：從 ID token 解出 email/name/picture，呼叫 API 驗證
- `checkPermission(email)`：fetch Apps Script URL，根據結果切換畫面
- `saveSession(email)`：寫入 localStorage（含 email、name、picture、expiry）
- `getSession()`：讀取快取，過期就清除
- `displayUserInfo(session)`：填入大頭照和名字到 header
- `handleLogout()`：清除快取 + `google.accounts.id.disableAutoSelect()` + 顯示登入畫面
- `onPageLoad()`：有快取就跳過登入直接驗證權限
- `parseJwt(token)`：解碼 Google ID token

**Google 大頭照注意事項**：`<img>` 要加 `referrerpolicy="no-referrer"`，否則 Google 的大頭照 URL 會被 referrer policy 擋住。

### Phase 5：填入設定值並部署

1. 使用者提供 Apps Script URL → 填入 `APPS_SCRIPT_URL`
2. 使用者提供 OAuth Client ID → 填入 `GOOGLE_CLIENT_ID`（JS 變數和 HTML `data-client_id` 都要更新）
3. Commit + push 部署
4. 請使用者到正式站測試登入流程

### Phase 6：驗證

請使用者確認以下流程：
- 未登入 → 看到登入畫面
- 登入有權限的帳號 → 進入頁面，右上角有大頭照和名字
- 登入沒權限的帳號 → 顯示「你沒有權限登入」
- 點登出 → 回到登入畫面
- 重新整理頁面 → 不用再次登入（快取生效）

## 注意事項

- 這是**前端層級的保護**，不是後端授權。頁面原始碼仍可被查看。適合內部工具，不適合保護真正機密的資料。
- Apps Script 冷啟動約 1-2 秒，之後很快。搭配 localStorage 快取，使用者體驗很順。
- OAuth 同意畫面如果設為「內部」，只有同組織（Google Workspace）的帳號能登入。如果需要外部帳號也能登入，要設為「外部」並提交驗證。
- Google ID token 的 `picture` 欄位可能為空（使用者沒設大頭照），前端要處理這個情況。

## 溝通原則

- 用白話中文，不用英文技術框架式用語
- 一次一個步驟引導使用者完成 GCP 設定
- 使用者截圖問畫面怎麼操作時，直接告訴他按哪裡、填什麼
