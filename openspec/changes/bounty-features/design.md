## Context

懸賞任務系統使用 Google Sheet 作為資料庫，透過 Apps Script doGet/doPost 存取。前端使用 localStorage 快取（10 分鐘 TTL）和 Optimistic UI 模式。目前缺少刪除、排行榜、排序動畫等功能。

## Goals / Non-Goals

**Goals:**

- 刪除卡片時有確認步驟，避免誤刪
- 新卡片自帶 +1，符合直覺
- 排序變動有動態回饋
- 排行榜激勵參與

**Non-Goals:**

- 不做即時同步
- 不做批次操作

## Decisions

### 刪除功能用自訂 Modal 而非 window.confirm

自訂 modal 可以配合全站像素遊戲風格，且可控制位置和樣式。modal HTML 放在 index.html 底部，JS 控制顯示/隱藏。刪除流程：optimistic 移除卡片 → POST `action: "deleteBounty"` → 成功則清除快取重新 fetch（因為 row number 會重新排列）→ 失敗則還原卡片。

替代方案：`window.confirm()` 更簡單但無法自訂樣式。

### 刪除後必須重新 fetch 而非只更新本地

Google Sheet 以 row number 作為 ID，刪除一行後所有後續 row 的編號都會變。因此刪除成功後必須 `localStorage.removeItem(CMS_CACHE_KEY)` 並重新 `fetchCMSData()`，不能只是本地移除。

### FLIP 動畫在 renderBounties 中實作

在重新渲染前，記錄每張卡片的 `getBoundingClientRect()`（以 row 為 key）。渲染後，計算新舊位置差異，用 `transform: translateY(deltaY)` 設定初始偏移，然後移除 transform 讓 CSS transition 做動畫。需要在 `.bounty-card` 加 `transition: transform 0.3s ease`。

### 排行榜從前端 bounties 陣列計算

不需要額外 API 或 Sheet 欄位。勇者排行：統計所有 `status=done` 的 bounty，按 `challenger` email 計數取前三。村長排行：統計所有 bounty 的 `commissioner` 計數取前三。每次 `renderBounties()` 時一併計算並渲染排行榜。

### 重新整理按鈕放在排行榜旁邊

點擊後清除 `CMS_CACHE_KEY`，呼叫 `fetchCMSData()` 重新拉資料。按鈕加一個短暫的旋轉動畫表示載入中。

## Risks / Trade-offs

- **刪除後重新 fetch 會有延遲**：因為 Apps Script cold start 可能要幾秒。Optimistic 先移除卡片可以讓使用者感覺很快，但 fetch 回來後整個列表會閃一下重新渲染。用 FLIP 動畫可以緩解這個感覺。
- **排行榜只算前端已載入的資料**：如果快取過期前有新完成的任務，排行榜可能不是最新的。按重新整理就能解決。
