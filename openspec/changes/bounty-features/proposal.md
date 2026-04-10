## Why

懸賞任務功能缺少幾個核心互動：無法刪除卡片、新卡片 +1 從 0 開始不合理（提出者當然支持自己的任務）、卡片排序變動是瞬間跳轉缺乏回饋感、沒有排行榜激勵機制、沒有手動重新整理的方式。

## What Changes

- 卡片右側新增垃圾桶圖示按鈕，點擊彈出確認 modal，確認後刪除卡片（含 Google Sheet 資料）
- 新建懸賞時 +1 預設為 1，plusOneList 預填提交者 email
- 卡片排序變動時加入 FLIP 滑動動畫（CSS transition 300ms）
- 懸賞分頁最上方新增勇者排行榜（完成最多挑戰，前三名）和村長排行榜（提出最多懸賞，前三名），左右並排
- 新增重新整理按鈕，清除 CMS cache 重新 fetch 資料

## Non-Goals

- 不做即時同步（WebSocket），接受 cache TTL 延遲 + 手動重新整理
- 排行榜不需要額外的 Google Sheet 欄位，從現有 bounties 資料計算
- 不做批次刪除

## Capabilities

### New Capabilities

- `bounty-delete`：刪除懸賞卡片（含確認 modal 和 Google Sheet 行刪除）
- `bounty-leaderboard`：勇者排行榜和村長排行榜

### Modified Capabilities

- `bounty-board`：+1 預設值改為 1、卡片排序加入 FLIP 動畫、新增重新整理按鈕

## Impact

- 受影響的 specs：`bounty-delete`（新增）、`bounty-leaderboard`（新增）、`bounty-board`（修改）
- 受影響的程式碼：
  - `index.html` — 排行榜 HTML、重新整理按鈕、確認 modal
  - `script.js` — 刪除功能、FLIP 動畫、排行榜計算、+1 預設值、重新整理按鈕
  - `style.css` — 排行榜樣式、確認 modal 樣式、FLIP transition
  - `apps-script-cms.js` — `doPost` 新增 `deleteBounty` action
