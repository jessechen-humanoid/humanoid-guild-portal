# 可愛像素遊戲化視覺規範

## 色盤（MUJI Color Palette）

| 用途 | 色碼 | 說明 |
|------|------|------|
| 背景 | `#fafaf8` | 頁面底色 |
| 主色 | `#1a1a1a` | 文字、active 按鈕、角色填色 |
| 邊線 | `#e8e8e5` | 卡片邊框、inactive 按鈕邊框 |
| 邊線 hover | `#c8c8c5` | hover 時的邊框色 |
| 輔助文字 | `#6b6b6b` | 次要文字、inactive 按鈕文字 |
| 淡灰文字 | `#a0a09b` | meta 資訊、placeholder |
| 金色 | `#c9a96e` | 挑戰勇者邊框、完成勇者填色、日誌 badge |
| 完成卡片背景 | `#f6f6f3` | 完成任務卡片底色 |

**禁止新增顏色。** 所有元件只能使用以上色碼。

## 像素缺角（Pixel-Notch）系統

所有按鈕、卡片、徽章使用 CSS `clip-path` 產生像素風格的階梯缺角，參考 RPG 遊戲 UI。

### 原理

使用雙層偽元素實現：
- `::before`（z-index: -2）= 邊框形狀（填充邊框顏色）
- `::after`（z-index: -1）= 內填形狀（填充背景顏色，inset 2px）

兩層之間的 2px 間距形成視覺邊框。

### 按鈕缺角（6px/3px 兩階階梯）

外層 clip-path（`::before`, inset: 0）：
```css
clip-path: polygon(
  6px 0%, calc(100% - 6px) 0%,
  calc(100% - 3px) 3px, 100% 6px,
  100% calc(100% - 6px), calc(100% - 3px) calc(100% - 3px),
  calc(100% - 6px) 100%, 6px 100%,
  3px calc(100% - 3px), 0% calc(100% - 6px),
  0% 6px, 3px 3px
);
```

內層 clip-path（`::after`, inset: 2px）：
```css
clip-path: polygon(
  4px 0%, calc(100% - 4px) 0%,
  calc(100% - 2px) 2px, 100% 4px,
  100% calc(100% - 4px), calc(100% - 2px) calc(100% - 2px),
  calc(100% - 4px) 100%, 4px 100%,
  2px calc(100% - 2px), 0% calc(100% - 4px),
  0% 4px, 2px 2px
);
```

### 卡片缺角（8px/4px 兩階階梯）

外層 clip-path（`::before`, inset: 0）：
```css
clip-path: polygon(
  8px 0%, calc(100% - 8px) 0%,
  calc(100% - 4px) 4px, 100% 8px,
  100% calc(100% - 8px), calc(100% - 4px) calc(100% - 4px),
  calc(100% - 8px) 100%, 8px 100%,
  4px calc(100% - 4px), 0% calc(100% - 8px),
  0% 8px, 4px 4px
);
```

內層 clip-path（`::after`, inset: 1px）。

### 徽章缺角（3px/1px 小型）

單層 `::before` clip-path。

### CSS 變數

每個按鈕/卡片透過 CSS 變數控制顏色：
- `--pixel-border-color`：邊框顏色（`::before` 的 background）
- `--pixel-fill`：填充顏色（`::after` 的 background）
- `--card-border-color` / `--card-fill`：卡片用

### 重要：isolation: isolate

所有使用偽元素的按鈕需設定 `isolation: isolate`，確保 z-index 負值不會穿透到父層。

## 按鈕規範

- 無原生 `border`（偽元素處理）
- 無陰影（`box-shadow: none`）
- 無漸層（`background` 只用純色）
- 統一字級：`font-size: 13px`
- 統一 padding：`padding: 6px 14px`
- 統一字重：`font-weight: 500`
- 過渡效果：`transition: all 0.2s ease`

### 按鈕狀態

| 狀態 | --pixel-border-color | --pixel-fill | 文字色 |
|------|---------------------|-------------|--------|
| 預設 | `#e8e8e5` | `#ffffff` | `#6b6b6b` |
| hover | `#c8c8c5` | `#ffffff` | `#1a1a1a` |
| active/voted | `#1a1a1a` | `#1a1a1a` | `#ffffff` |
| 挑戰中 | `#c9a96e` | `#c9a96e` | `#ffffff` |
| 完成勇者 | `#c9a96e` | `#c9a96e` | `#ffffff` |
| 挑戰勇者（outline） | `#c9a96e` | `#ffffff` | `#c9a96e` |
| 提交按鈕 | `#1a1a1a` | `#1a1a1a` | `#ffffff` |
| disabled | 同預設，opacity 0.4 | | |
| Tab（頁面背景） | `#e8e8e5` | `#fafaf8` | `#6b6b6b` |
| Tab active | `#1a1a1a` | `#1a1a1a` | `#ffffff` |

## 角色 SVG 規範

- `viewBox="0 0 32 32"`（標準角色），`viewBox="0 0 20 16"`（runner）
- `fill="#1a1a1a"` 單色
- `shape-rendering="crispEdges"`
- 可愛大頭風格：頭部佔整體高度 50-55%
- 眼睛用 `fill="#fafaf8"` 的長方形（3x2 px）
- 道具（法杖、劍、盾）用像素幾何形狀
- 高光/裝飾（十字架、星星、腰帶）用 `fill="#fafaf8"`
- 渲染尺寸：48x48（標準角色）、30x24（runner）

### 角色清單

| 檔案 | 角色 | 特徵 |
|------|------|------|
| `priest.svg` | 牧師 | 兜帽（白色十字）+ 長袍（白色十字）+ T 字法杖 |
| `mage.svg` | 魔法師 | 尖帽（白色星星）+ 長袍（白色腰帶）+ 星光法杖 |
| `warrior.svg` | 戰士 | 頭盔（白色冠飾）+ 盔甲（白色腰帶）+ 劍 + 盾（白色高光） |
| `villager.svg` | 村民 | 頭髮 + 長衫（白色腰帶）+ 雙手舉高歡呼 |
| `runner.svg` | 跑者 | 大頭 + 跑步姿勢（前後手腳）|

## 卡片規範

- 使用像素缺角系統（8px/4px）
- 無原生 border / border-radius
- `--card-border-color: #e8e8e5`
- `--card-fill: #ffffff`
- 無陰影

### 卡片類型

| 類型 | --card-fill |
|------|------------|
| 預設（bounty-card, tool-card） | `#ffffff` |
| 完成（bounty-card--done） | `#f6f6f3` |
| 輸入區（bounty-input-section） | `#ffffff` |

## 輸入框規範

- `border-radius: 0`
- `border: 1px solid #e8e8e5`
- focus 時 `border-color: #1a1a1a`

## 裝飾元素

- 完成任務區分隔線：`border-top: 2px dashed #e8e8e5`（像素風格虛線）

## 禁止事項

- 不使用 emoji
- 不使用漸層
- 不使用陰影（box-shadow / text-shadow）
- 不使用立體效果
- 不新增色碼（只用上方色盤）
- 不使用圓角（除 `border-radius: 50%` 的頭像）
- 不使用原生 border 做像素缺角（一律用 clip-path 偽元素）
