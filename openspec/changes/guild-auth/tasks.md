## 1. Google Apps Script 權限查詢 API

- [x] 1.1 在 Google Sheets「冒險者公會權限」建立 Apps Script 專案，撰寫 `doGet(e)` 函式：接收 `email` 參數，讀取工作表中 C 欄與 D 欄，比對 email 是否存在且 D 欄為 true，回傳 JSON `{ authorized: true/false }`
- [ ] 1.2 將 Apps Script 部署為 Web App（執行身份：自己，存取權限：任何人），取得部署 URL

## 2. Google Sign-In 前端整合

- [x] 2.1 在 `index.html` 的 `<head>` 引入 Google Identity Services SDK（`https://accounts.google.com/gsi/client`）
- [x] 2.2 在 `index.html` 新增登入畫面區塊：置中顯示公會 logo/標題 + Google 登入按鈕（`g_id_signin`），初始狀態為可見；原有的 `site-header`、`tab-content`、`skill-overlay` 區塊初始狀態加上 `hidden` class 隱藏
- [x] 2.3 在 `index.html` 新增無權限提示畫面區塊：顯示「你沒有權限登入」訊息與一個「重新登入」按鈕，初始狀態為隱藏

## 3. 登入與權限驗證邏輯

- [x] 3.1 在 `script.js` 實作 Google Sign-In callback 函式：從 Google ID token 解析出使用者 email，呼叫 Apps Script Web App URL 帶入 email 參數查詢權限
- [x] 3.2 在 `script.js` 實作權限判斷邏輯：API 回傳 `authorized: true` → 隱藏登入畫面、顯示公會內容；API 回傳 `authorized: false` → 隱藏登入畫面、顯示無權限提示；API 呼叫失敗 → 顯示錯誤訊息提示重試
- [x] 3.3 在 `script.js` 實作 localStorage 快取：登入成功後存入 `{ email, expiry }`（有效期 24 小時）；頁面載入時先檢查快取，若有效則直接呼叫 API 驗證權限跳過登入畫面，若過期則清除快取顯示登入畫面

## 4. 登出功能

- [x] 4.1 在 `index.html` 的 `site-header` 加入登出按鈕（登入後才顯示）
- [x] 4.2 在 `script.js` 實作登出邏輯：清除 localStorage 快取、呼叫 `google.accounts.id.disableAutoSelect()` 撤銷自動登入、隱藏公會內容、顯示登入畫面

## 5. 樣式

- [x] 5.1 在 `style.css` 新增登入畫面樣式：全頁置中、遵循 MUJI 設計系統（`#fafaf8` 背景、Geist Sans 字體、無陰影、圓角卡片容器）
- [x] 5.2 在 `style.css` 新增無權限提示畫面樣式：同樣全頁置中、簡潔的錯誤訊息呈現
- [x] 5.3 在 `style.css` 新增登出按鈕樣式：放在 header 右側、低調不搶眼的文字按鈕風格
- [x] 5.4 新增 `.hidden` class（`display: none`）用於控制各區塊的顯示/隱藏

## 6. 使用者資訊顯示

- [x] 6.1 在 `script.js` 的 `parseJwt` 結果中額外取出 `name` 和 `picture`，存入 localStorage 快取
- [x] 6.2 在 `index.html` 的 `header-row` 中，登出按鈕左邊加上圓形大頭照 `<img>` 和使用者名稱 `<span>`
- [x] 6.3 在 `script.js` 登入成功後從快取讀取 `name` 和 `picture`，填入 header 的大頭照和名稱元素
- [x] 6.4 在 `style.css` 新增使用者資訊樣式：圓形大頭照（32px）、名稱文字、與登出按鈕水平排列

## 7. 設定與驗證

- [x] 7.1 在 `script.js` 頂部設定 Google OAuth Client ID 變數與 Apps Script Web App URL 變數（需使用者自行填入）
- [ ] 7.2 驗證完整登入流程：未登入 → 登入畫面 → Google 登入 → 有權限 → 公會頁面（含大頭照和名稱）
- [ ] 7.3 驗證無權限流程：Google 登入 → email 不在允許名單 → 顯示「你沒有權限登入」
- [ ] 7.4 驗證登出流程：點擊登出 → 清除狀態 → 回到登入畫面
- [ ] 7.5 驗證快取流程：登入後重新整理頁面 → 不用再次登入直接進入公會頁面（大頭照和名稱正常顯示）
