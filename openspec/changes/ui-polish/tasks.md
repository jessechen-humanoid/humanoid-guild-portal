## 1. 移除 Emoji

- [x] 1.1 在 `index.html` 移除懸賞任務區塊中的所有 emoji（`⚔️ 勇者大人幫幫我` 按鈕改為 `勇者大人幫幫我`、`✅ 完成任務` 標題改為 `完成任務`），符合 Commission input 與 Card sorting and layout 的無 emoji 規範
- [x] 1.2 在 `script.js` 的 `renderBountyCard` 函式中移除所有 emoji：`👤`/`📅`/`✅`/`⏱`/`👍`/`⚔️`/`🏆` 全部改為純文字，符合 Bounty card display 的無 emoji 規範

## 2. Plus-one voting Toggle

- [x] 2.1 修改 Plus-one voting 的按鈕渲染：在 `script.js` 的 `renderBountyCard` 中，已投票時按鈕保持可點擊（移除 `disabled`），改為點擊呼叫 `handleUnplusOne(row)`
- [x] 2.2 在 `script.js` 新增 `handleUnplusOne(row)` 函式實作 optimistic 收回 +1：點擊後在本地 bounties 中找到對應 row，將 plusOneCount -1（最低為 0）、從 plusOneList 移除當前 email，呼叫 `updateLocalBounties()` 立即渲染。背景 POST `action: "plusOne"` 到 API（toggle 模式）。失敗時還原 plusOneCount 和 plusOneList 並重新渲染
- [x] 2.3 在 `apps-script-cms.js` 的 `doPost` 中修改 `plusOne` action：如果 email 已在 plusOneList 中，則移除該 email 並將 count -1（toggle 模式），回傳 `{success: true, action: "removed"}`；如果 email 不在 list 中，維持原本的加票邏輯

## 3. 卡片樣式調整（Bounty card display）

- [x] 3.1 在 `style.css` 中修改 `.bounty-card-actions` 加上 `justify-content: flex-end` 讓所有按鈕靠右對齊
- [x] 3.2 在 `style.css` 中調整懸賞卡片字級：`.bounty-card-task` 改為 `font-size: 16px`、`.bounty-card-meta` 改為 `font-size: 13px`、`.bounty-btn` 改為 `font-size: 13px`
