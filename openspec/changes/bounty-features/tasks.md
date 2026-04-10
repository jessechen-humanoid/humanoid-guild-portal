## 1. Delete bounty card（刪除功能用自訂 Modal 而非 window.confirm，刪除後必須重新 fetch 而非只更新本地）

- [x] 1.1 在 `index.html` 底部新增 Delete bounty card 確認 modal HTML：背景遮罩 + modal 框，內含「確定要刪除這個懸賞任務嗎？」文字、「確定刪除」和「取消」兩個按鈕，預設 hidden
- [x] 1.2 在 `style.css` 新增確認 modal 樣式：`.confirm-modal-overlay`（全螢幕半透明遮罩）、`.confirm-modal`（置中白色方框）、`.confirm-modal-btn`（按鈕樣式，與 bounty-btn 統一高度字級）
- [x] 1.3 在 `script.js` 新增垃圾桶 SVG icon 常數 `ICON_TRASH`（16x16 viewBox、`currentColor`、`crispEdges`、簡單外框造型）
- [x] 1.4 在 `script.js` 的 `renderBountyCard` 中，於卡片右側加入 Delete bounty card 垃圾桶 icon 按鈕，使用 `position: absolute; right: 20px` 定位
- [x] 1.5 在 `style.css` 新增 `.bounty-delete-btn` 樣式：無背景無邊框、`color: #a0a09b`、hover 時 `color: #1a1a1a`、cursor pointer
- [x] 1.6 在 `script.js` 新增 `showDeleteModal(row)` 函式：顯示確認 modal，將 row 存到全域變數 `pendingDeleteRow`
- [x] 1.7 在 `script.js` 新增 `confirmDelete()` 函式：隱藏 modal、optimistic 移除卡片、POST `action: "deleteBounty"` + `row` 到 API、成功後清除快取重新 fetch（因為刪除後 row number 重排）、失敗時還原卡片
- [x] 1.8 在 `script.js` 新增 `cancelDelete()` 函式：隱藏 modal、清除 `pendingDeleteRow`
- [x] 1.9 在 `apps-script-cms.js` 的 `doPost` 新增 `deleteBounty` action：接收 `row` 參數，呼叫 `sheet.deleteRow(parseInt(row))`，回傳 `{success: true}`

## 2. Commission input（+1 預設值）

- [x] 2.1 修改 Commission input 預設 +1：在 `script.js` 的 `submitBounty()` 中，將新卡片的 `plusOneCount` 從 0 改為 1，`plusOneList` 從空字串改為當前使用者的 email
- [x] 2.2 在 `apps-script-cms.js` 的 `doPost` 的 `newBounty` action 中，新增行時 D 欄（累計+1）寫入 1、E 欄（+1名單）寫入提交者 email

## 3. Card sorting and layout（FLIP 動畫在 renderBounties 中實作）

- [x] 3.1 在 `style.css` 的 `.bounty-card` 加上 `transition: transform 0.3s ease`，支援 Card sorting and layout 的 smooth reorder
- [x] 3.2 在 `script.js` 的 `renderBounties()` 中實作 FLIP 動畫：渲染前記錄每張卡片的 `data-row` 和 `getBoundingClientRect().top`，渲染後計算 deltaY，設定 `transform: translateY(deltaY)` 再用 `requestAnimationFrame` 移除 transform 觸發 transition

## 4. Hero leaderboard + Village chief leaderboard + Leaderboard layout（排行榜從前端 bounties 陣列計算）

- [x] 4.1 在 `index.html` 的 `tab-bounty` 區塊最上方新增 Leaderboard layout HTML：`.bounty-leaderboard-row` 包含左側 Hero leaderboard `.leaderboard-card#hero-leaderboard`（勇者排行榜）和右側 Village chief leaderboard `.leaderboard-card#chief-leaderboard`（村長排行榜），各有標題和 `<ol>` 列表
- [x] 4.2 在 `style.css` 新增 Leaderboard layout 排行榜樣式：`.bounty-leaderboard-row`（`display: flex; gap: 16px`）、`.leaderboard-card`（`flex: 1`、白色背景、圓角邊框）、`.leaderboard-title`（字級 14px、font-weight 700）、`.leaderboard-list`（ol 列表）、mobile 時 `flex-direction: column`
- [x] 4.3 在 `script.js` 新增 `renderLeaderboards(bounties)` 函式：統計 Hero leaderboard（status=done 的 challenger 計數前三）和 Village chief leaderboard（commissioner 計數前三），渲染到 `<ol>` 中，每個 `<li>` 顯示排名、display name 和數量
- [x] 4.4 在 `script.js` 的 `renderBounties()` 中呼叫 `renderLeaderboards(allBounties)`

## 5. Refresh button（重新整理按鈕放在排行榜旁邊）

- [x] 5.1 在 `index.html` 的排行榜區域旁新增 Refresh button `<button class="bounty-refresh-btn" id="bounty-refresh" onclick="handleRefresh()">重新整理</button>`
- [x] 5.2 在 `style.css` 新增 `.bounty-refresh-btn` 樣式：與 bounty-btn 統一高度字級、無填滿背景、border 灰色
- [x] 5.3 在 `script.js` 新增 Refresh button `handleRefresh()` 函式：清除快取、按鈕顯示「載入中...」並 disabled、呼叫 `fetchCMSData()` 後還原按鈕
