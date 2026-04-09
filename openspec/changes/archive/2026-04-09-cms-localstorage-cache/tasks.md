## 1. 實作 CMS data localStorage caching

- [x] 1.1 在 `script.js` 新增快取常數：`CMS_CACHE_KEY = 'cms_cache'`、`CMS_CACHE_TTL = 60 * 60 * 1000`（1 小時）
- [x] 1.2 新增 `getCMSCache()` 函式：從 localStorage 讀取快取，解析 JSON，回傳 `{ data, timestamp }` 或 `null`（localStorage 不可用或資料損壞時回傳 null）
- [x] 1.3 新增 `setCMSCache(data)` 函式：將 CMS 回應資料和 `Date.now()` 時間戳存入 localStorage，localStorage 不可用時靜默失敗
- [x] 1.4 改寫 `fetchCMSData()` 實作 CMS data localStorage caching 核心邏輯：先呼叫 `getCMSCache()`，有快取就立即用快取資料呼叫 `renderToolCards()` 和 `renderJournalCards()` 渲染畫面
- [x] 1.5 在 `fetchCMSData()` 中加入過期判斷：快取存在且未過期（< 1 小時）則不打 API；快取過期則背景打 API 更新快取；無快取則走原本的即時 fetch 流程
- [x] 1.6 背景 fetch 成功時呼叫 `setCMSCache()` 更新快取，失敗時不做任何處理（不顯示錯誤、不影響已渲染的畫面）

## 2. 驗證

- [x] 2.1 手動測試：清除 localStorage 後載入頁面，確認資料正常顯示且快取已寫入
- [x] 2.2 手動測試：重新載入頁面，確認從快取秒開、不打 API
- [x] 2.3 手動測試：手動將快取時間戳改成 2 小時前，重新載入，確認先顯示舊資料再背景更新
