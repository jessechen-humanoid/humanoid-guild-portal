## Why

團隊透過 Claude 建立了多個自動化工具（網頁應用與 Claude Skills），但目前分散在不同平台，團隊成員需要記住各工具的網址或安裝方式。需要一個統一的入口頁面，讓所有人能快速找到並使用這些工具。

## What Changes

- 建立「只要有人冒險者公會」靜態網頁，作為所有團隊自動化工具的入口
- 採用 MUJI 極簡設計風格，搭配單色黑 8-bit pixel art 動態 RPG 職業角色
- 將工具依解決的問題分為三大公會：
  - **營運公會（牧師）**：只要工時、ai-ops、company-elder、skill-builder
  - **創意公會（魔法使）**：只要輿情、mcd-publish
  - **業務公會（戰士）**：只要截圖、mcd-handbook、contract-builder
- Web 工具點擊直接開啟對應網頁（新分頁）
- Skill 工具點擊連結到 Google Drive 下載安裝檔案

## Capabilities

### New Capabilities

- `guild-portal`: 冒險者公會入口頁面 — 靜態網頁，展示三大公會分類及其工具卡片，支援連結外部網頁與 Google Drive 下載

### Modified Capabilities

（無）

## Impact

- 新增靜態網頁專案（HTML/CSS/JS）
- 部署至 Vercel（Hobby 免費方案）
- 需要為每個 Skill 工具取得對應的 Google Drive 下載連結
- 需要製作 8-bit pixel art 動態角色素材（牧師、魔法使、戰士）
