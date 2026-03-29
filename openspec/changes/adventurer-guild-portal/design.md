## Context

團隊目前有三個網頁工具和六個 Claude Skills 分散在不同平台。需要一個靜態入口頁面整合所有工具。現有三個網頁工具（只要工時、只要輿情、只要截圖）皆使用一致的 MUJI 極簡設計風格（Geist Sans、暖米白底 `#fafaf8`、白色卡片 + `#e8e8e5` 邊框、無陰影）。

## Goals / Non-Goals

**Goals:**

- 提供單一入口頁面，團隊成員能快速找到所有自動化工具
- 以 RPG 公會主題分類工具，兼具識別性與趣味性
- 維持與現有工具一致的 MUJI 極簡視覺風格
- 加入單色黑 8-bit pixel art 動態 RPG 職業角色，為極簡風格增添記憶點
- 部署至 Vercel 免費方案，零成本維運

**Non-Goals:**

- 不做使用者認證或登入機制
- 不做工具使用數據追蹤或分析
- 不做 Skills 的線上安裝功能（僅連結到 Google Drive 下載）
- 不做後端 API — 純靜態頁面
- 不做搜尋或篩選功能（工具數量少，不需要）

## Decisions

### 技術架構：純靜態 HTML/CSS/JS

不使用框架（React/Vue/Next.js），理由：
- 頁面內容固定，不需要動態渲染
- 工具數量少（9 個），不需要 CMS 或資料驅動
- 減少建構複雜度，零依賴
- Vercel 可直接部署靜態檔案

替代方案考量：Next.js 靜態匯出也可行，但對此規模的頁面來說過度工程化。

### 8-bit Pixel Art 實作：CSS Animation + SVG/PNG Sprite

角色使用 CSS sprite animation 實現動態效果（idle 呼吸動作或簡單循環動畫），理由：
- 全部使用單色黑 `#1a1a1a`，與 MUJI 風格融合
- CSS animation 不需要 JS runtime，效能好
- 三個角色：牧師（營運）、魔法使（創意）、戰士（業務）

### 頁面結構

```
Header: 「只要有人冒險者公會」標題
  ↓
Section × 3: 每個公會一個區塊
  ├── 公會標題 + 8-bit 職業角色動畫
  ├── 公會描述（一行文字）
  └── 工具卡片 Grid
        ├── [Web] 卡片 → 新分頁開啟網址
        └── [Skill] 卡片 → Google Drive 下載連結
```

### 卡片設計

- 統一使用白色底 + `#e8e8e5` 邊框 + `rounded-2xl`
- 區分 Web 和 Skill 兩種類型：
  - Web 卡片：顯示工具名稱 + 簡述，點擊開啟外部連結
  - Skill 卡片：顯示工具名稱 + 簡述，點擊連結到 Google Drive
- Hover 效果：輕微上移 + 邊框顏色加深（保持 MUJI 克制風格）

### 部署策略：Vercel 靜態部署

- 根目錄直接包含 `index.html`、`style.css`、`script.js`、`assets/`
- Vercel 自動偵測靜態站點，零設定部署
- 自訂域名可後續再設定

## Risks / Trade-offs

- [風險] 8-bit 角色動畫素材需要手動製作或找到合適的免費素材 → 可先用靜態 pixel art 圖片，後續再加動畫
- [風險] Google Drive 下載連結可能因權限設定無法直接下載 → 需確認 Drive 檔案分享權限為「知道連結的人都可以檢視」
- [取捨] 純靜態頁面意味著新增工具需要改 HTML 並重新部署 → 工具新增頻率低，可接受
