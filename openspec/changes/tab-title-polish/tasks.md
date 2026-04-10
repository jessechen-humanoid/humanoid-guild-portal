## 1. Tab bar full-width layout — Tab 按鈕全寬三等分

- [x] 1.1 Tab bar full-width layout：在 `style.css` 中修改 `.tab-bar` 樣式，新增 `max-width: 960px; margin-left: auto; margin-right: auto; padding: 0 24px;`，並確認在 `@media (max-width: 768px)` 中 `padding` 改為 `0 20px`（與 `.guilds` 響應式 padding 一致）
- [x] 1.2 在 `style.css` 中為 `.tab` 新增 `flex: 1;`，讓三個 tab 按鈕等寬平分 `.tab-bar` 的可用空間

## 2. Tab navigation bar — 分頁改名

- [x] 2.1 Tab navigation bar：在 `index.html` 中將 `<button class="tab active" data-tab="guilds">公會工具</button>` 的文字從「公會工具」改為「道具裝備」

## 3. Guild portal page structure — 標題圖片放大

- [x] 3.1 Guild portal page structure：在 `style.css` 中將 `.site-title-img` 的 `max-width` 從 `320px` 改為 `420px`
- [x] 3.2 在 `style.css` 的 `@media (max-width: 768px)` 中將 `.site-title-img` 的 `max-width` 從 `240px` 改為 `300px`
