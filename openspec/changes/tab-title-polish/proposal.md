## Why

Tab 按鈕目前寬度由文字內容撐開，左右邊界與下方內容區塊不對齊，視覺上顯得窄小。標題圖片（Title.png）尺寸偏小，存在感不足。另外「公會工具」這個分頁名稱要改為更符合遊戲化風格的「道具裝備」。

## What Changes

- Tab 按鈕改為三等分全寬佈局，左右邊界與下方卡片區塊（`.guilds` 容器）對齊
- 「公會工具」分頁按鈕文字改為「道具裝備」
- 標題圖片 `max-width` 從 320px 放大到 420px，響應式從 240px 放大到 300px

## Non-Goals

- 不改變 tab 按鈕的像素缺角樣式（pixel-notch）
- 不改變按鈕配色與字體
- 不調整標題圖片本身（只改 CSS 顯示尺寸）

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `tab-navigation`：tab 按鈕佈局從置中自適應改為全寬三等分，「公會工具」改名「道具裝備」
- `guild-portal`：標題圖片顯示尺寸放大

## Impact

- 受影響程式碼：`index.html`（tab 按鈕文字）、`style.css`（`.tab-bar` 佈局、`.site-title-img` 尺寸、響應式斷點）
