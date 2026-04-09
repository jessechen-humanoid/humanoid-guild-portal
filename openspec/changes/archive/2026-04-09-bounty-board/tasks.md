## 1. Tab navigation 擴充

- [x] 1.1 在 `index.html` 的 tab-bar 新增第三個按鈕 `<button class="tab" data-tab="bounty">懸賞任務</button>`，實作 tab navigation bar 三分頁
- [x] 1.2 在 `index.html` 新增 `<div class="tab-content hidden" id="tab-bounty">` 區塊，包含懸賞任務的完整 HTML 結構
- [x] 1.3 在 `script.js` 的 `showLogin`、`showDenied`、`showError` 函式中加入 `tabBounty.classList.add('hidden')` 確保 tab switching behavior 正確隱藏懸賞分頁

## 2. 8bit 歡呼村民像素動畫

- [x] 2.1 在 `style.css` 新增 `.pixel-character.villager` 的 CSS 像素動畫，風格與 priest/mage/warrior 一致（黑色 8bit、同大小、歡呼動作），作為 bounty board tab page 的視覺元素
- [x] 2.2 在 `index.html` 的 bounty 分頁區塊頂部放置歡呼村民動畫元素

## 3. 委託輸入區塊

- [x] 3.1 在 bounty 分頁頂部建立「勇者大人幫幫我」commission input 區塊：包含文字輸入欄位和送出按鈕，樣式統一 MUJI 風格
- [x] 3.2 在 `script.js` 實作送出邏輯：點擊按鈕後取得輸入文字、從 session 取得使用者 email、呼叫 doPost `action: "newBounty"`，成功後清空輸入並重新載入卡片列表。需包含 empty submission prevented 驗證（空白不能送出）

## 4. Apps Script API — bounty-api

- [x] 4.1 在 `apps-script-cms.js` 的 `doGet()` 中新增讀取「懸賞」工作表的邏輯（read bounty data via doGet），回傳 `bounties` 陣列，每筆包含 `row`、`date`、`commissioner`、`task`、`plusOneCount`、`plusOneList`、`challenger`、`status`、`completionDate`、`daysSpent` 欄位，實作 row identification
- [x] 4.2 在 `apps-script-cms.js` 新增 `doPost(e)` 函式，處理 `action: "newBounty"` — 在「懸賞」工作表末尾新增一列，從 email 擷取顯示名稱（`jesse.chen@humanoid.com.tw` → `jesse chen`），回傳 `{success: true, row: N}`（write bounty data via doPost）
- [x] 4.3 在 `doPost()` 中實作 `action: "plusOne"` — 檢查 E 欄是否已含該 email，未含則追加並將 D 欄 +1（vote plus one），已含則回傳 `{success: false, reason: "already_voted"}`
- [x] 4.4 在 `doPost()` 中實作 `action: "challenge"` — 空值寫入 email（claimed）、同 email 清空（unclaimed）、不同 email 拒絕（already_claimed），實作 claim or unclaim a challenge
- [x] 4.5 在 `doPost()` 中實作 `action: "complete"` — 驗證 F 欄 email 一致後，設 G 欄 "done"、H 欄當日日期、I 欄計算花費天數（complete a bounty）

## 5. 前端 — 卡片列表與 bounty card display

- [x] 5.1 在 `script.js` 新增 `fetchBounties()` 函式：從 CMS API 取得 bounties 資料，依 card sorting and layout 規則排序（未完成：+1 多的在上，同數時先委託的在上；已完成：完成日期新的在上），分為「進行中」和「完成任務」兩區
- [x] 5.2 在 `script.js` 新增 `renderBountyCard(bounty)` 函式：渲染單張卡片，顯示任務內容、委託人、幾天前、+1 數量、挑戰勇者（bounty card display），completed card appearance 用不同底色並顯示完成日期與花費天數
- [x] 5.3 在 `style.css` 新增懸賞卡片樣式（`.bounty-card`、`.bounty-card--done`、`.bounty-section`、`.bounty-input` 等），與現有 journal/guild 卡片風格統一

## 6. 前端 — 互動功能

- [x] 6.1 在 `script.js` 實作 plus-one voting 功能：點擊 +1 按鈕後呼叫 doPost `action: "plusOne"`，成功後更新卡片計數與按鈕樣式（已投票顯示不同顏色且不可再點）
- [x] 6.2 在 `script.js` 實作 challenge claim 功能：點擊「我想挑戰」按鈕後呼叫 doPost `action: "challenge"`，根據回傳結果更新卡片狀態（顯示挑戰勇者名稱、其他人按鈕停用）
- [x] 6.3 在 `script.js` 實作 task completion 功能：挑戰者點擊「完成任務」按鈕後呼叫 doPost `action: "complete"`，成功後卡片移至完成區域並更新外觀

## 7. 整合與快取

- [x] 7.1 在 `script.js` 的 `fetchCMSData()` 中整合 bounties 資料，使 bounty 資料也受現有 CMS cache 機制管理（或在切換到 bounty tab 時獨立載入），確保懸賞分頁打開時資料已就緒
