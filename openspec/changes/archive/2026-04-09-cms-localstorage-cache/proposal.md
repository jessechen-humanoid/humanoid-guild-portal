## Why

目前頁面每次載入都要即時打 Apps Script CMS API 拿工具和日誌資料，而 Apps Script 冷啟動需要 2-5 秒，導致使用者看到內容前要等很久。實際上這些資料大約 2-3 天才更新一次，不需要每次都即時查詢。加入 localStorage 快取後，回訪使用者可以秒開頁面。

## What Changes

- 在 `fetchCMSData()` 加入 localStorage 快取機制：存資料時附上時間戳
- 頁面載入時先讀快取，有快取就立即渲染，不用等 API
- 快取超過 1 小時才背景重新打 API 更新
- 快取不存在或過期時，走原本的即時查詢流程（fallback）

## Non-Goals

- 不改動權限驗證的 Apps Script（那隻是登入用的，無法快取）
- 不改成靜態 JSON 或其他部署方式
- 不做 Service Worker 或離線支援

## Capabilities

### New Capabilities

- `cms-cache`: CMS 資料的 localStorage 快取機制，包含存取、過期判斷、背景更新

### Modified Capabilities

（無）

## Impact

- 影響檔案：`script.js`（`fetchCMSData()` 函式）
- 不影響 `index.html`、`style.css`、`apps-script-cms.js`
- 不影響 Google Sheet 資料結構
