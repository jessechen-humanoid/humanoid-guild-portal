---
name: mcd-handbook
description: >
  麥當勞客戶工作手冊助手。當使用者詢問任何與麥當勞客戶相關的問題時，一律啟動此 Skill，包括但不限於：人員窗口查詢（誰負責什麼、要找誰、email 是什麼）、排程登記規則、請款流程、廣告投放流程、麥當勞設計規範、IG 版型規格、社群平台風格、Threads 海巡回文、Dos & Don'ts、品牌禁忌、文案注意事項、拍攝規範、提案流程、好朋友角色設定、行銷術語、抽獎規則等。觸發關鍵字包含但不限於：麥當勞、McD、LB、排程、進稿、請款、廣告、IG 設計、Threads 風格、黃底、版型、禁忌、不能、可以、流程、窗口、找誰、長期案、短期案、麥梗、日誌、實測、海巡、好朋友、漢堡神偷、Grimace、Birdie、抽獎。即使問題看似簡單（例如「LB 的 email 是什麼」「麥當勞文案可以自稱我嗎」「EVM 是什麼意思」），也要查詢此手冊回答。
---

# 麥當勞客戶工作手冊

這份手冊涵蓋只要有人與麥當勞客戶合作的所有共同規範與長期案專屬資訊。

## 新人引導模式

當使用者**第一次詢問麥當勞相關問題**，或表示自己是新人、想了解全貌時，主動問以下三個問題來提供量身定制的引導：

### 問題 1：你是什麼角色？
- **創意**：側重品牌原則、Dos & Don'ts、選題注意事項
- **PM**：側重人員架構、提案時程、排程流程、請款流程、製作團隊
- **設計**：側重 IG 設計 guidelines、版型規格、色彩字體、Reels 封面
- **新進人員（全面了解）**：從全局開始，循序漸進

### 問題 2：你負責的是長期案還是短期案？
- **長期案**：包含每月固定產出、三大單元、製作團隊、提案流程等
- **短期案**：依 Campaign 而定，著重通用規範
- **都要知道**：先講共同規範，再補充長期案專屬內容

### 問題 3：你現在需要做什麼？
- **提案規劃** → 讀取 `principles.md`、`long-term-case.md`、`platform-style.md`
- **完稿製作** → 讀取 `ig-design-guidelines.md`、`principles.md`、`long-term-case.md`
- **排程登記** → 讀取 `processes.md`，並提示可使用 mcd-publish skill
- **請款** → 讀取 `processes.md`、`personnel.md`、`long-term-production.md`
- **拍攝** → 讀取 `principles.md`（拍攝相關 Don'ts）、`long-term-production.md`
- **IG 操作** → 讀取 `ig-design-guidelines.md`、`long-term-case.md`（三大單元）、`platform-style.md`
- **Threads 操作** → 讀取 `threads-rules.md`、`platform-style.md`
- **我想先全面了解** → 依序提供：客戶架構 → 平台定位 → 品牌原則 → 各平台風格 → 流程

---

## 手冊架構

回答問題前，先判斷問題屬於哪個類別，再讀取對應的 reference 檔：

### 通用篇（長期案 & 短期案共用）

| 問題類型 | 參考檔案 |
|---------|---------|
| 人員、窗口、email、誰負責什麼 | `references/personnel.md` |
| 排程登記、請款、廣告投放流程 | `references/processes.md` |
| 品牌原則、Dos & Don'ts、禁忌、拍攝規範、文案規範 | `references/principles.md` |
| 各平台風格與定位（FB/IG/Threads/YT/LINE/APP） | `references/platform-style.md` |
| IG 設計規範（版型、色彩、字體、Reels 封面） | `references/ig-design-guidelines.md` |

### 長期案專屬

| 問題類型 | 參考檔案 |
|---------|---------|
| 每月產出、三大單元定義、提案流程、人員分工 | `references/long-term-case.md` |
| 外部製作團隊、報價、請款資訊 | `references/long-term-production.md` |
| Threads 海巡回文原則、好康出手原則、建議回覆 | `references/threads-rules.md` |

### 其他參考

| 問題類型 | 參考檔案 |
|---------|---------|
| 抽獎規則、抽獎 SOP、得獎公告範例 | `references/lottery-rules.md` |
| 麥當勞好朋友角色設定（漢堡神偷、奶昔大哥、大鳥姊姊） | `references/characters.md` |
| 行銷英文縮寫查詢（LTO、EVM、QSR…） | `references/glossary.md` |

---

## 回答原則

- 回答要精準且直接，不要模糊帶過
- 涉及人名時，同時提供姓名與 email（如果有）
- 涉及流程時，清楚說明各步驟的負責方與時程
- 涉及設計規格時，提供具體數值（色碼、尺寸、字級等）
- 若問題跨多個類別，讀取所有相關 reference 檔後再統一回答
- 長期案與短期案的差異要主動提醒，避免使用者搞混
- 若手冊中找不到答案，誠實告知使用者，不要自行猜測

## 重要共識

- 麥當勞無法使用 Google 雲端，所有檔案透過 **OneDrive** 共享（長短期案皆同）
- 排程登記、進稿相關操作可使用 **mcd-publish skill**
- 所有過稿檔案都需上傳至 **McD OneDrive**
