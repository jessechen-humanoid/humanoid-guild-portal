## 1. Guild portal page structure — 標題圖片替換

- [x] 1.1 Guild portal page structure：在 `index.html` 中將 `.site-title` 的 `<h1>只要有人冒險者公會</h1>` 替換為 `<img src="assets/Title.png" alt="只要有人冒險者公會" class="site-title-img">`，保留登入畫面的 `.login-title` 文字不變
- [x] 1.2 在 `style.css` 中新增 `.site-title-img` 樣式：`display: block; max-width: 320px; height: auto; margin: 0 auto; image-rendering: pixelated; image-rendering: crisp-edges;`，並確保在 `@media (max-width: 768px)` 中 `max-width` 縮小為 `240px` 維持響應式

## 2. Guild visual identity with 8-bit pixel art — 角色 SVG 替換

- [x] 2.1 Guild visual identity with 8-bit pixel art：在 `style.css` 中將 `.pixel-character.priest` 的 `background-image` 從 `url('assets/priest.svg')` 改為 `url('assets/char4-priest.svg')`
- [x] 2.2 在 `style.css` 中將 `.pixel-character.mage` 的 `background-image` 從 `url('assets/mage.svg')` 改為 `url('assets/char1-mage.svg')`
- [x] 2.3 在 `style.css` 中將 `.pixel-character.warrior` 的 `background-image` 從 `url('assets/warrior.svg')` 改為 `url('assets/char3-warrior.svg')`
- [x] 2.4 在 `style.css` 中將 `.pixel-character.villager` 的 `background-image` 從 `url('assets/villager.svg')` 改為 `url('assets/char2-villager.svg')`

## 3. +1 按鈕文字顏色修正

- [x] 3.1 確認 `style.css` 中 `.bounty-btn--voted` 的 `color` 為 `#ffffff`（白色），確保黑底按鈕上的文字清晰可見
