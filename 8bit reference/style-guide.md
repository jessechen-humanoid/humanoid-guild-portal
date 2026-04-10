# 8bit 像素遊戲化視覺規範

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

## 按鈕規範

- `border-radius: 0`（方角，像素風格）
- 無陰影（`box-shadow: none`）
- 無漸層（`background` 只用純色）
- 統一字級：`font-size: 13px`
- 統一 padding：`padding: 6px 14px`
- 統一字重：`font-weight: 500`
- 過渡效果：`transition: all 0.2s ease`

### 按鈕狀態

| 狀態 | 背景 | 文字 | 邊框 |
|------|------|------|------|
| 預設 | transparent | `#6b6b6b` | `#e8e8e5` |
| hover | transparent | `#1a1a1a` | `#c8c8c5` |
| active/voted | `#1a1a1a` | `#ffffff` | `#1a1a1a` |
| 挑戰中 | `#c9a96e` | `#ffffff` | `#c9a96e` |
| 完成勇者 | `#c9a96e` | `#ffffff` | `#c9a96e` |
| disabled | 同預設，opacity 0.4 | | |

## 角色 SVG 規範

- `viewBox="0 0 16 16"`（標準角色），`viewBox="0 0 12 10"`（runner）
- `fill="#1a1a1a"` 單色
- `shape-rendering="crispEdges"`
- 大頭可愛風格：頭部佔整體高度 40-50%
- 眼睛用 `fill="#fafaf8"` 的長方形（2x1 px）
- 道具（法杖、劍、盾）用簡單幾何形狀
- 寬度 48px / 高度 48px（rendered size，runner 24x20）

### 角色清單

| 檔案 | 角色 | 特徵 |
|------|------|------|
| `priest.svg` | 牧師 | 兜帽 + 十字架法杖 |
| `mage.svg` | 魔法師 | 尖帽 + 法杖（頂端有星） |
| `warrior.svg` | 戰士 | 頭盔 + 劍 + 盾 |
| `villager.svg` | 村民 | 雙手舉高歡呼（有動畫） |
| `runner.svg` | 跑者 | 跑步姿勢（loading bar） |

## Icon 規範

- `viewBox="0 0 16 16"`
- `fill="currentColor"`（跟隨文字色）
- `shape-rendering="crispEdges"`
- 簡單外框造型，不做細節紋路
- 無立體感（無高光、無陰影色塊）
- rendered size：14x14（inline button icon）或 16x16（standalone）

## 卡片規範

- `border-radius: 0`（方角）
- `border: 1px solid #e8e8e5`
- `background: #ffffff`
- 無陰影

## 輸入框規範

- `border-radius: 0`
- `border: 1px solid #e8e8e5`
- focus 時 `border-color: #1a1a1a`

## 禁止事項

- 不使用 emoji
- 不使用漸層
- 不使用陰影（box-shadow / text-shadow）
- 不使用立體效果
- 不新增色碼（只用上方色盤）
- 不使用圓角（除 `border-radius: 50%` 的頭像）
