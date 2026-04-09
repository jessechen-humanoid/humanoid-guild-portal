## Summary

將懸賞任務的所有操作（新增、+1、挑戰、完成）改為 Optimistic UI 模式，前端立即更新畫面，背景再同步到 Google Sheet，消除每次操作 2-5 秒的等待。

## Motivation

目前懸賞任務每次操作後都會清除 localStorage 快取並重新呼叫 Apps Script API。Apps Script 有 cold start 問題（2-5 秒延遲），導致每按一次按鈕就要等好幾秒才能看到結果。使用者體驗極差，尤其在連續操作（例如幫多張卡片 +1）時更明顯。

改為 Optimistic UI 後，操作瞬間反映在畫面上，背景同步失敗時才 rollback，體感零延遲。

## Proposed Solution

1. **前端立即更新**：每個操作（submitBounty / handlePlusOne / handleChallenge / handleComplete）先修改本地資料並立即重新渲染卡片列表
2. **同步更新快取**：操作成功後直接修改 localStorage 裡的快取資料，不清除重抓
3. **背景 POST**：API 呼叫改為背景進行，不阻擋 UI
4. **失敗 rollback**：POST 失敗時還原到操作前的狀態並重新渲染，顯示簡短錯誤提示

## Non-Goals

- 不改變首次載入流程（cold start 問題是 Google 限制，不在此次範圍）
- 不遷移到 Firebase 或其他資料庫
- 不改變工具與日誌的載入方式（只改懸賞任務的互動操作）

## Alternatives Considered

- **只更新快取不做 Optimistic**：POST 成功後才更新畫面，仍有 2-5 秒延遲
- **換 Firebase**：根本解但改動太大，目前規模不需要

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `bounty-board`: 懸賞任務的四個操作改為 Optimistic UI 模式，前端先更新、背景同步、失敗 rollback

## Impact

- 受影響的 specs：`bounty-board`（操作流程改變）、`cms-cache`（快取更新策略改變）
- 受影響的程式碼：
  - `script.js` — 重寫 submitBounty / handlePlusOne / handleChallenge / handleComplete 四個函式，新增本地資料操作與 rollback 邏輯
