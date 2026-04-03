## Why

冒險者公會頁面目前是完全公開的，任何人都可以存取。公司希望限制只有授權的團隊成員才能使用，而且權限管理要方便——直接在 Google Sheets 上打勾就能控制誰可以登入，不用每次都改程式碼。

## What Changes

- 頁面新增 Google 帳號登入功能（使用 Google Identity Services SDK）
- 登入後透過 Google Apps Script API 即時查詢 Google Sheets「冒險者公會權限」工作表，比對使用者 email 是否有權限（D 欄 = true 且 C 欄的 email 相符）
- 有權限：顯示公會頁面內容
- 沒權限：顯示「你沒有權限登入」的提示畫面
- 登入狀態快取在瀏覽器 localStorage，避免每次都重新登入
- Google Sheets 上建立 Apps Script，部署為 Web App 提供權限查詢 API

## Non-Goals

- 不做後端伺服器（整體維持純前端架構）
- 不做角色分級或細粒度權限控制（只有「可以進」和「不能進」）
- 不保護頁面原始碼（前端 gate 而非 server-side 保護）
- 不處理 Google Cloud Console 專案建立（使用者自行設定 OAuth Client ID）

## Capabilities

### New Capabilities

- `guild-auth`: Google 帳號登入與權限驗證機制，包含登入 UI、權限查詢 API 串接、登入狀態快取、無權限提示畫面

### Modified Capabilities

- `guild-portal`: 頁面載入時先檢查登入狀態，未登入或無權限時隱藏公會內容

## Impact

- 受影響的 spec：`guild-portal`（新增登入前置檢查）
- 新增 spec：`guild-auth`
- 受影響的檔案：`index.html`、`style.css`、`script.js`
- 外部依賴：Google Identity Services SDK（前端 CDN）、Google Apps Script（部署在 Google Sheets 上）
- 需要使用者自備：Google Cloud Console OAuth Client ID、Google Sheets 的 Apps Script 部署
