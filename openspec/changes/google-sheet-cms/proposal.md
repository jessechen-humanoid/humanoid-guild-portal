## Why

目前所有工具卡片和公會日誌卡片都寫死在 `index.html` 裡。要新增或修改工具，必須編輯 HTML 並推送到 GitHub——對非技術背景的團隊成員來說門檻太高。團隊需要一個所有人都能操作的方式來管理入口頁面內容。

## What Changes

- 建立一份新的 Google Sheet 作為工具與日誌的 CMS，包含「工具」和「日誌」兩個工作表
- 新增 Google Apps Script endpoint，讀取該 Sheet 並回傳 JSON 格式的工具與日誌資料
- 修改 `script.js`，在頁面載入時即時呼叫 API，動態渲染冒險者公會的工具卡片和公會日誌卡片
- 移除 `index.html` 中寫死的工具卡片和日誌卡片 HTML（Skill overlay 保留不動）
- 新增「冒險者」欄位，在卡片左下角以小字顯示 `by {冒險者名稱}`
- Skill 類型卡片透過 Skill ID 欄位與現有 HTML overlay 對應：Sheet 中填的 ID 必須匹配 `#overlay-{id}`
- 使用獨立的 Google Sheet（不與權限驗證 Sheet 共用）

### Google Sheet 欄位設計

**「工具」工作表：**

| 公會 | 工具名稱 | 類型 | 簡短描述 | 冒險者 | 連結或 Skill ID |
|------|---------|------|---------|--------|----------------|
| 營運公會 | 只要工時 | web | 團隊工時追蹤與分析 | Jesse | https://working-hour.vercel.app/analytics |
| 營運公會 | 營運小幫手 | skill | 報帳、請假、規章 FAQ | Jesse | ai-ops |

**「日誌」工作表：**

| 標題 | 描述 | Badge | 日期 | 冒險者 | 檔案路徑 |
|------|------|-------|------|--------|---------|
| McD Handbook 使用指南 | 麥當勞客戶工作助手 | 指南 | 2026-04-07 | Jesse | 公會日誌/mcd-handbook-guide.html |

## Capabilities

### New Capabilities

- `google-sheet-cms`: 從 Google Sheet 即時抓取工具與日誌卡片資料，動態渲染頁面內容，取代寫死在 HTML 的靜態卡片

### Modified Capabilities

- `guild-portal`: 工具卡片從靜態 HTML 改為由 JS 動態產生，公會分組依據 Sheet 中的「公會」欄位
- `guild-journal`: 日誌卡片從靜態 HTML 改為由 JS 動態產生

## Impact

- 受影響 spec：`guild-portal`（工具卡片渲染方式）、`guild-journal`（日誌卡片渲染方式）
- 受影響程式碼：`script.js`（新增 API 呼叫與動態渲染邏輯）、`index.html`（移除寫死的卡片 HTML）、`style.css`（新增冒險者名稱樣式）、`apps-script.js`（新增 CMS 資料 endpoint 範例）
