## Why

公會成員在工作中遇到的問題與痛點沒有統一的收集管道。需要一個「懸賞任務」系統，讓所有登入者可以發佈工作困難，其他人能投票表示「我也遇到」，冒險者可以認領挑戰並完成任務。這能有效幫助冒險者公會找到最多人需要的問題來優先解決。

## What Changes

- 在 tab-bar 新增第三個分頁按鈕「懸賞任務」（`data-tab="bounty"`）
- 新增懸賞任務分頁頁面，包含：
  - 頂部「勇者大人幫幫我」委託輸入區塊
  - 懸賞任務卡片列表（顯示任務內容、委託人、幾天前委託、+1 數、挑戰勇者）
  - 每張卡片有 +1 投票按鈕（每帳號每卡限一次）
  - 每張卡片有「我想挑戰」認領按鈕（同時只能一人認領）
  - 挑戰者可按「完成任務」結案
  - 已完成任務沉底至「完成任務」區域，顯示完成日期與花費天數
- 卡片排序：未完成依 +1 多→委託早；已完成依完成日期新→舊
- 新增 8bit 歡呼村民像素動畫（與現有 priest/mage/warrior 同風格同大小）
- Apps Script CMS 擴充 `doGet()` 讀取「懸賞」工作表，新增 `doPost()` 處理寫入
- Google Sheet「懸賞」工作表欄位：日期、委託人、懸賞任務、累計 +1、+1 名單、挑戰勇者、狀態、完成日期、花費天數

## Non-Goals

- 不做懸賞任務的編輯或刪除功能
- 不做通知系統（有人認領或完成時不發通知）
- 不做懸賞任務的分類或標籤

## Capabilities

### New Capabilities

- `bounty-board`: 懸賞任務分頁，包含委託發佈、+1 投票、挑戰認領、完成標記的完整流程
- `bounty-api`: Apps Script 讀寫懸賞任務的 API 端點（doGet 讀取 + doPost 寫入）

### Modified Capabilities

- `tab-navigation`: 新增第三個分頁按鈕「懸賞任務」

## Impact

- 受影響的 specs：`tab-navigation`（新增分頁）、新建 `bounty-board`、`bounty-api`
- 受影響的程式碼：
  - `index.html` — 新增 tab 按鈕、懸賞分頁 HTML 結構
  - `script.js` — 新增懸賞相關 JS 邏輯（委託、+1、挑戰、完成、排序）
  - `style.css` — 新增懸賞卡片樣式、歡呼村民像素動畫
  - `apps-script-cms.js` — 擴充 doGet + 新增 doPost
- 受影響的外部系統：Google Sheet 新增「懸賞」工作表
