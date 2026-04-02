## 1. Overlay 基礎建設

- [x] 1.1 在 `style.css` 新增 skill overlay styling：半透明深色 backdrop、白色圓角內容面板、標題/內文/提示的排版樣式，遵循 MUJI 設計系統
- [x] 1.2 在 `script.js` 實作 skill overlay panel 的開啟/關閉邏輯：點擊 skill 卡片開啟對應 overlay、點擊關閉按鈕關閉、點擊 backdrop 關閉、按 Escape 鍵關閉

## 2. Skill 卡片改造

- [x] 2.1 將 `index.html` 中所有 Skill 卡片從 `<a href="drive.google.com/...">` 改為 `<button>` 或無連結元素，綁定 `data-skill` 屬性對應各 skill overlay ID，修改 skill tool card behavior
- [x] 2.2 在創意公會新增「顧問報告溝通流程」skill 卡片（Creative Guild tools），badge 為 Skill
- [x] 2.3 在業務公會新增「逐字稿校正助手」skill 卡片（Business Guild tools），badge 為 Skill

## 3. Overlay 內容

- [x] 3.1 讀取 `skills MD/` 資料夾中 9 個 MD 檔，將內容轉換為 HTML 格式，寫入 `index.html` 作為隱藏的 overlay 內容區塊。每個 overlay 包含：skill 名稱標題、功能說明、使用情境、「此 Skill 已在組織內啟用，你可以直接在 Claude 中使用」提示（skill overlay content structure）

## 4. 驗證

- [x] 4.1 驗證點擊每張 Skill 卡片都能開啟對應的 skill overlay panel，且內容正確顯示
- [x] 4.2 驗證 overlay 的三種關閉方式（關閉按鈕、backdrop 點擊、Escape 鍵）皆正常運作
