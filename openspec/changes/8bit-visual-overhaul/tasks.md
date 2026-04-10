## 1. 角色 SVG 重畫（符合 Tool card display 和 Bounty board tab page 的大頭可愛風格）

- [x] 1.1 重畫 `assets/priest.svg`：大頭可愛風格，參考 `8bit reference/Snipaste_2026-04-10_07-26-40.png` 的魔法師造型，16x16 viewBox、`#1a1a1a` 單色、`crispEdges`，頭部佔身體 40-50% 比例，有法杖道具
- [x] 1.2 重畫 `assets/mage.svg`：大頭可愛風格，參考同一張圖的魔法師造型，有尖帽和法杖
- [x] 1.3 重畫 `assets/warrior.svg`：大頭可愛風格，參考同一張圖的戰士造型，有劍和盾
- [x] 1.4 重畫 `assets/villager.svg`：大頭可愛風格，保留歡呼動作（雙手舉高），維持 Bounty board tab page 的 villager-cheer 動畫相容
- [x] 1.5 重畫 `assets/runner.svg`：大頭可愛風格，保留跑步姿勢（loading bar 用）

## 2. 按鈕像素化（Tab bar navigation + Bounty card display + 全站按鈕）

- [x] 2.1 在 `style.css` 中將所有按鈕的 `border-radius` 改為 `0`（影響 `.tab`、`.bounty-btn`、`.bounty-submit-btn`、`.bounty-challenger`、`.logout-btn`、`.denied-retry-btn`、`.bounty-refresh-btn`），實現 Tab bar navigation 和 Bounty card display 的像素風格方角
- [x] 2.2 在 `style.css` 統一全站按鈕高度和字級：以「完成勇者」按鈕（`.bounty-challenger--done`）的 `font-size: 13px`、`padding: 6px 14px` 為標準，確保 `.bounty-btn`、`.bounty-submit-btn`、`.tab`、`.logout-btn` 全部一致，符合 Bounty card display 的 All buttons uniform size 規範
- [x] 2.3 在 `style.css` 將卡片（`.bounty-card`、`.tool-card`、`.login-card`、`.denied-card`、`.error-card`）的 `border-radius` 改為 `0` 或 `2px`，配合像素風格
- [x] 2.4 在 `style.css` 將輸入框（`.bounty-input`）的 `border-radius` 改為 `0`，配合整體像素風格

## 3. 風格文件

- [x] 3.1 在 `8bit reference/style-guide.md` 撰寫視覺規範文件，內容包含：色盤（列出所有 MUJI 色碼）、按鈕規範（方角、無陰影、統一高度字級）、角色 SVG 規範（大頭可愛風、16x16、單色）、Icon 規範（簡單外框、currentColor、16x16）、禁止事項（無立體、無漸層、無新顏色、無 emoji）
