## Why

目前頁面按鈕和文字大量使用 emoji（👍⚔️🏆✅📅👤），視覺雜亂且與 MUJI 簡潔風格不搭。懸賞任務卡片的按鈕左對齊、字級偏小，與全站其他區塊不一致。此外 +1 投票只能加不能收回，使用體驗不完整。

## What Changes

- 全站移除所有 emoji，改用純文字或 MUJI 風格的簡潔表達
- 懸賞任務卡片按鈕區靠右對齊，卡片內文字級與按鈕統一放大（task 16px、meta 13px、btn 13px）
- +1 投票改為 toggle 模式：已投票可再次點擊收回
- 全站按鈕與卡片維持 MUJI 色調（`#fafaf8`/`#1a1a1a`/`#e8e8e5`/`#c9a96e`/`#6b6b6b`），搭配中古遊戲化的文字措辭，簡潔不繁複

## Non-Goals

- 不新增 SVG icon 或圖示素材（靠文字措辭營造遊戲化氛圍）
- 不改變頁面佈局結構或功能邏輯（除了 +1 toggle）
- 不調整 pixel character 動畫

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `bounty-board`：+1 投票改為 toggle（可收回）、卡片按鈕靠右對齊、字級放大、移除 emoji

## Impact

- 受影響的 specs：`bounty-board`（投票行為與卡片樣式變更）
- 受影響的程式碼：
  - `index.html` — 移除 emoji 文字
  - `script.js` — `renderBountyCard` 移除 emoji、`handlePlusOne` 改為 toggle 邏輯
  - `style.css` — `.bounty-card-actions` 靠右對齊、字級調整
  - `apps-script-cms.js` — `doPost` 的 `plusOne` action 改為 toggle（已投票則移除）
