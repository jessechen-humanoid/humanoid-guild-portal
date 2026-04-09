## 1. Google Apps Script CMS endpoint

- [x] 1.1 撰寫新的 Apps Script 程式碼，讀取 Google Sheet 的「工具」和「日誌」兩個工作表，回傳 JSON 格式資料。API 回傳格式需包含 tools（依公會分組）和 journal 兩個陣列。更新 `apps-script-cms.js` 作為部署參考（對應 google-sheet-cms: Apps Script endpoint）

## 2. 前端動態渲染

- [x] 2.1 在 `script.js` 新增 `fetchCMSData()` 函式，呼叫 CMS Apps Script API 取得工具與日誌資料（對應 Dynamic tool card rendering、Dynamic journal card rendering）
- [x] 2.2 在 `script.js` 新增 `renderToolCards(data)` 函式，依公會欄位將工具卡片動態渲染到對應的 `.tool-grid` 區塊，包含冒險者名稱顯示（對應 Tool card displays adventurer name）
- [x] 2.3 在 `script.js` 新增 `renderJournalCards(data)` 函式，將日誌卡片動態渲染到 `.journal-grid` 區塊，按日期排序（新到舊），包含冒險者名稱顯示（對應 Journal card displays adventurer name）
- [x] 2.4 修改 `showPortal()` 流程，在顯示頁面後呼叫 `fetchCMSData()`，並在載入中顯示 loading 狀態（對應 Loading state while fetching data）
- [x] 2.5 新增 API 失敗時的錯誤處理，在工具區塊顯示友善的錯誤訊息（對應 API fetch fails）

## 3. HTML 清理

- [x] 3.1 移除 `index.html` 中 `#tab-guilds` 內所有寫死的工具卡片 HTML（`.tool-grid` 內的 `<a>` 和 `<div>` 卡片），保留公會區塊結構（guild header + 空的 `.tool-grid`）（對應 Dynamic tool card rendering）
- [x] 3.2 移除 `index.html` 中 `#tab-journal` 內寫死的日誌卡片 HTML（`.journal-grid` 內的 `<a>` 卡片），保留 `.journal-grid` 容器（對應 Dynamic journal card rendering）

## 4. Skill overlay 對應

- [x] 4.1 修改 Skill overlay 事件綁定邏輯：從頁面載入時靜態綁定改為動態卡片產生後重新綁定 `data-skill` 點擊事件（對應 Skill card matches HTML overlay by ID、Skill card with no matching overlay）

## 5. 樣式更新

- [x] 5.1 在 `style.css` 新增冒險者名稱的樣式（`.tool-adventurer`），小字、`#6b6b6b` 色、positioned at bottom-left of card（對應 Tool card displays adventurer name、Journal card displays adventurer name）
- [x] 5.2 新增 loading 狀態和錯誤訊息的樣式（對應 Loading state、API fetch fails）

## 6. 驗證

- [x] 6.1 確認頁面載入後能正確從 Google Sheet 抓取資料並渲染所有工具卡片與日誌卡片（需部署 Apps Script 後手動驗證）
- [x] 6.2 確認 Skill 卡片點擊後能正確開啟對應的 overlay（需部署後手動驗證）
- [x] 6.3 確認 Web 卡片和日誌卡片點擊後能在新分頁開啟正確連結（需部署後手動驗證）
- [x] 6.4 確認所有卡片顯示冒險者名稱（需部署後手動驗證）
- [x] 6.5 確認 API 失敗時顯示友善錯誤訊息（需部署後手動驗證）
