## 1. 基礎架構

- [x] 1.1 在 `script.js` 新增 `getLocalBounties()` 函式：從 localStorage 快取中取出 bounties 陣列並回傳（若無快取回傳空陣列），作為所有 optimistic 操作的本地資料來源
- [x] 1.2 在 `script.js` 新增 `updateLocalBounties(bounties)` 函式：將修改後的 bounties 陣列寫回 localStorage 快取（保留 tools/journal 不動，只更新 bounties），並呼叫 `renderBounties(bounties)` 立即重新渲染

## 2. Commission input — Optimistic 新增懸賞

- [x] 2.1 重寫 `submitBounty()` 實作 optimistic commission input：按下按鈕後立即建立一筆本地 bounty 物件（date=今天、commissioner=從 email 擷取顯示名稱、task=輸入值、plusOneCount=0、plusOneList=空、challenger=空、status=空、row=臨時值），呼叫 `updateLocalBounties()` 立即渲染，清空輸入欄位，再背景 POST `action: "newBounty"` 到 API。成功後用 API 回傳的 row 更新本地資料；失敗時從本地 bounties 中移除該筆並重新渲染，顯示錯誤提示

## 3. Plus-one voting — Optimistic +1

- [x] 3.1 重寫 `handlePlusOne(row)` 實作 optimistic plus-one voting：點擊後立即在本地 bounties 中找到對應 row 的資料，將 plusOneCount +1、把當前 email 加入 plusOneList，呼叫 `updateLocalBounties()` 立即渲染（按鈕變為已投票狀態）。背景 POST `action: "plusOne"`。失敗時還原 plusOneCount 和 plusOneList 並重新渲染

## 4. Challenge claim — Optimistic 挑戰

- [x] 4.1 重寫 `handleChallenge(row)` 實作 optimistic challenge claim：點擊後立即在本地 bounties 中更新 challenger 欄位（無人挑戰→寫入當前 email；自己已挑戰→清空），呼叫 `updateLocalBounties()` 立即渲染。背景 POST `action: "challenge"`。失敗時還原 challenger 欄位並重新渲染

## 5. Task completion — Optimistic 完成

- [x] 5.1 重寫 `handleComplete(row)` 實作 optimistic task completion：點擊後立即在本地 bounties 中設定 status="done"、completionDate=今天日期、daysSpent=計算天數，呼叫 `updateLocalBounties()` 立即渲染（卡片移至完成區域）。背景 POST `action: "complete"`。失敗時還原 status/completionDate/daysSpent 並重新渲染

## 6. 移除快取清除

- [x] 6.1 移除 `submitBounty`、`handlePlusOne`、`handleChallenge`、`handleComplete` 中所有的 `localStorage.removeItem(CMS_CACHE_KEY)` 呼叫，改由 `updateLocalBounties()` 統一管理快取更新
