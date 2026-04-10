## Summary

全站視覺風格升級為 8bit 像素遊戲化風格，維持 MUJI 扁平配色，參考「8bit reference」資料夾中的圖片。

## Motivation

目前網站視覺偏現代簡約，與「冒險者公會」的 RPG 主題不夠搭。需要讓整體視覺更遊戲化，同時保持 MUJI 簡潔美感（不加新顏色、不做立體效果）。

## Proposed Solution

1. **角色 SVG 重畫**：所有小人（priest、mage、warrior、villager、runner）重畫為大頭可愛風格，參考 `Snipaste_2026-04-10_07-26-40.png` 的比例造型
2. **按鈕像素化**：所有按鈕改為像素鋸齒邊框風格，參考 `Snipaste_2026-04-10_07-27-45.png`，無立體感無漸層，維持 MUJI 配色，全站按鈕統一高度字級（以「完成勇者」按鈕為標準）
3. **Icon 風格統一**：所有需要 icon 的地方使用簡單外框造型的像素 SVG，參考 `Snipaste_2026-04-10_07-26-19.png` 的風格，`currentColor` 單色，無立體感
4. **全站一致性**：登入畫面、工具分頁、日誌分頁、懸賞分頁的按鈕和元件都要套用新風格
5. **風格文件**：將確定的視覺規範寫成 MD 檔放在 `8bit reference/` 資料夾

## Non-Goals

- 不加入新顏色（維持現有 MUJI 色盤）
- 不加入立體效果（無漸層、無陰影、無 3D）
- 不改變功能邏輯（純視覺調整）
- Icon 不做細節紋路，只要簡單外框造型

## Impact

- 受影響的 specs：`guild-portal`（工具卡片按鈕樣式）、`bounty-board`（按鈕高度統一）、`tab-navigation`（tab 按鈕樣式）
- 受影響的程式碼：
  - `assets/*.svg` — 全部角色 SVG 重畫
  - `style.css` — 按鈕、卡片、tab 等全站樣式
  - `index.html` — 可能需要調整結構配合新樣式
  - `script.js` — inline SVG icon 常數
  - `8bit reference/style-guide.md` — 新增風格文件
