## Why

團隊每週進行內部議會，分享自動化與 AI 工作心得。目前這些簡報（如「顧問報告溝通流程簡報.html」）散落在 `公會日誌/` 資料夾中，沒有統一的瀏覽入口。需要在冒險者公會網站新增「公會日誌」分頁，讓團隊成員可以直接在網站上瀏覽所有內部分享。

## What Changes

- 在 `index.html` header 下方新增 Tab 導航列，包含「冒險者公會」與「公會日誌」兩個分頁
- 新增「公會日誌」分頁內容區域，以卡片形式呈現各則日誌
- 每張日誌卡片包含標題、描述、日期，點擊後在新分頁開啟對應的 HTML 簡報
- 第一張卡片：「顧問報告溝通流程」，連結到 `公會日誌/顧問報告溝通流程簡報.html`
- Tab 切換以純 CSS 或極簡 JS 實作，不引入任何框架

## Non-Goals

- 不做資料夾自動掃描或動態生成卡片，卡片手動維護在 HTML 中
- 不在頁面內嵌入簡報（iframe），簡報以新分頁開啟
- 不為公會日誌設計專屬像素角色
- 不加入搜尋、篩選、分頁等進階功能

## Capabilities

### New Capabilities

- `tab-navigation`: 頂部分頁導航系統，切換「冒險者公會」與「公會日誌」兩個視圖
- `guild-journal`: 公會日誌卡片列表頁，展示內部分享的日誌卡片並連結到對應簡報

### Modified Capabilities

- `guild-portal`: 現有公會工具區域需包裹在 tab content 容器中，配合分頁切換顯示/隱藏

## Impact

- 受影響的檔案：`index.html`、`style.css`、`script.js`
- 受影響的 spec：`guild-portal`（需修改為 tab content 結構）
- 新增檔案：無（`公會日誌/顧問報告溝通流程簡報.html` 已存在）
