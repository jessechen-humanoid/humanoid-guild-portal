## Why

原本由 AI 產生的角色 SVG 不符合設計師預期的像素風格，設計師已自行製作正確版本的角色素材（`char1-mage.svg`、`char2-villager.svg`、`char3-warrior.svg`、`char4-priest.svg`）以及像素風格的標題圖片（`Title.png`）。需要將網站套用這些正式素材，並修正 +1 按鈕在黑底狀態下文字顏色看不清楚的問題。

## What Changes

- 網站標題「只要有人冒險者公會」從純文字改為 `Title.png` 像素圖片，需注意置中與排版美感
- 營運公會角色從 `priest.svg` 換為 `char4-priest.svg`
- 創意公會角色從 `mage.svg` 換為 `char1-mage.svg`
- 業務公會角色從 `warrior.svg` 換為 `char3-warrior.svg`
- 懸賞任務角色從 `villager.svg` 換為 `char2-villager.svg`
- 修正 +1 按鈕（`.bounty-btn--voted`）在黑底時文字顏色為白色

## Non-Goals

- 不修改按鈕的像素缺角系統（已完成）
- 不修改卡片的像素缺角系統（已完成）
- 不更換 runner.svg（loading bar 用，不在此次範圍）
- 不調整角色動畫效果（idle-bob、villager-cheer 維持不變）

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `guild-portal`：標題從文字改為圖片，公會角色 SVG 更換為設計師提供的正式版本

## Impact

- 受影響程式碼：`index.html`（標題元素）、`style.css`（標題圖片樣式、角色尺寸、+1 按鈕文字色）
- 受影響素材：`assets/` 目錄下的角色 SVG 引用路徑
