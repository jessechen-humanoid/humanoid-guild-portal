## Why

公司使用 Claude Team 版本，所有 Skills 已透過 Organization Skills 在組織內部直接可用，不需要從 Google Drive 下載安裝。現有頁面上的 Skill 卡片連結到 Google Drive 下載頁已無意義，需要改為展示 skill 說明，讓團隊了解每個 skill 的用途與使用方式。

## What Changes

- Skill 卡片點擊行為從「開新分頁到 Google Drive」改為「在頁面內彈出 overlay 顯示 skill 說明」
- Overlay 內容從 `skills MD/` 資料夾的 MD 檔轉換，以 HTML 格式 hardcode 在 `index.html` 中
- 每個 overlay 包含 skill 名稱、用途說明、使用情境，以及「此 Skill 已在組織內啟用，可直接使用」的提示
- 創意公會新增「顧問報告溝通流程」skill 卡片（來源：`consulting-report-flow.md`）
- 業務公會新增「逐字稿校正助手」skill 卡片（來源：`transcript-proofreader.md`）

## Non-Goals

- 不動態載入 `.md` 檔案，不引入 markdown parser library
- 不保留 Google Drive 下載連結
- 不加入 docx、xlsx、pptx、pdf、schedule、skill-creator 等通用工具的卡片

## Capabilities

### New Capabilities

- `skill-overlay`: 點擊 Skill 卡片時彈出的 overlay 說明面板，包含 skill 說明內容與關閉機制

### Modified Capabilities

- `guild-portal`: Skill 卡片的點擊行為從開新分頁改為觸發 overlay；創意公會與業務公會各新增一張 skill 卡片

## Impact

- 受影響的檔案：`index.html`、`style.css`、`script.js`
- 受影響的 spec：`guild-portal`（Skill tool card behavior 變更）
- 參考資料來源：`skills MD/` 資料夾中 9 個 MD 檔（ai-ops、company-elder、skill-builder、zyyr-design-system、kol-check、consulting-report-flow、mcd-handbook、contract-builder、transcript-proofreader）
