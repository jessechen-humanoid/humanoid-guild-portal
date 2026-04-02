## 1. Tab Navigation

- [x] 1.1 在 `index.html` 的 header 下方新增 tab navigation bar HTML 結構，包含「冒險者公會」與「公會日誌」兩個 tab 按鈕（tab navigation bar）
- [x] 1.2 將現有 `<main class="guilds">` 包裹在 tab content 容器中，修改 guild portal page structure 為 tab-based layout
- [x] 1.3 在 `style.css` 新增 tab bar 與 tab content 的樣式，遵循 tab navigation styling 規範（`#fafaf8` 背景、`#1a1a1a` 文字、Geist 字體）
- [x] 1.4 在 `script.js` 實作 tab switching behavior：點擊 tab 切換顯示對應內容區域，更新 active tab 視覺狀態

## 2. 公會日誌

- [x] 2.1 在 `index.html` 新增「公會日誌」tab content 區域，包含 guild journal card list 的 grid 容器
- [x] 2.2 新增第一張 journal card：「顧問報告溝通流程」，badge 為「簡報」，連結到 `公會日誌/顧問報告溝通流程簡報.html`（journal card click behavior）
- [x] 2.3 在 `style.css` 新增 journal card visual style：日期顯示、badge 樣式，沿用現有 `.tool-card` 的 hover animation

## 3. 驗證

- [x] 3.1 驗證頁面載入時預設顯示「冒險者公會」tab（tab navigation bar 預設選取）
- [x] 3.2 驗證 tab 切換功能正常，且 journal card hover effect 與既有 tool card 一致
