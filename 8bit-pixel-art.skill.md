# 8-Bit Pixel Art 設計系統

為「只要有人冒險者公會」網站產生一致風格的 8-bit 像素圖。所有圖示皆使用純 SVG `<rect>` 元素構成，不使用 path 或圓形。

## 技術規格

### SVG 基本設定
- 格式：純 `<rect>` 元素構成的 SVG
- 必要屬性：`shape-rendering="crispEdges"`（確保像素銳利不模糊）
- 預設填色：`fill="#1a1a1a"`（深色主色）
- 高亮/眼睛顏色：`fill="#fafaf8"`（淺色）

### 尺寸規格

| 用途 | viewBox | 像素單位 | 顯示尺寸 |
|------|---------|---------|---------|
| 公會角色（頁面內） | `0 0 16 16` | 1px = 1 格 | `width="48" height="48"` |
| 進度條動畫角色 | `0 0 12 10` | 1px = 1 格 | `width="24" height="20"` |
| Favicon | `0 0 32 32` | 2px = 1 格 | 瀏覽器自動縮放 |

### Favicon 注意事項
- 使用 2px 為一格（因為 32x32 空間較大）
- 圖案需置中：上下左右留白一致
- 內容應盡量填滿空間，避免顯示時比其他網站 icon 小

## 設計風格

### 整體原則
- **可愛圓潤**：角色造型偏 Q 版，頭大身小
- **極簡**：用最少的像素格數表達特徵，不堆砌細節
- **高辨識度**：每個角色要有一個明確的視覺特徵（帽子、武器、法杖等）

### 角色結構（16x16 格）
```
頭部特徵（帽子/頭髮）：y=0~2，約 2~3 格高
臉部：y=2~4，含眼睛（1x1 白色方塊）
身體：y=4~9，含手臂與裝備
腿/腳：y=10~12
```

### 眼睛畫法
- 固定使用 `fill="#fafaf8"` 白色方塊
- 角色類：左右各 1x1 格，間隔 2~3 格
- 生物類（史萊姆）：左右各 2x1 格，更大更可愛

### 現有角色參考

#### 牧師（營運公會）
- 特徵：圓頂帽 + 十字架 + 長袍 + 法杖
- 帽上有十字標記，袍上也有十字標記（白色）
- 法杖在右手側，T 型頂端

#### 魔法使（創意公會）
- 特徵：尖頂巫師帽 + 長袍 + 魔杖星光
- 帽子是三角形，佔 4 格高（最大的頭部特徵）
- 左手持魔杖，杖尖有十字星光效果

#### 戰士（業務公會）
- 特徵：頭盔 + 肩甲 + 劍 + 盾
- 右手側長劍（從 y=3 延伸到 y=10）
- 左手側盾牌（3x4 格，含白色高光）
- 腰帶有白色方塊裝飾

#### 史萊姆
- 特徵：水滴形輪廓 + 大眼睛
- 頂部窄、中間寬、底部分兩瓣
- 眼睛比角色類更大（2x1 白色方塊）
- 無手腳，靠輪廓表達可愛感

## CSS 動畫搭配

### 閒置呼吸（角色用）
```css
animation: idle-bob 1.2s ease-in-out infinite;

@keyframes idle-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
```

### 彈跳（史萊姆用）
```css
animation: slime-bounce 0.5s ease-in-out infinite;

@keyframes slime-bounce {
  0%, 100% { transform: scaleX(1) scaleY(1); }
  50% { transform: scaleX(1.1) scaleY(0.85); }
}
```

### 圖片渲染
所有像素圖必須加上：
```css
image-rendering: pixelated;
image-rendering: crisp-edges;
```

## 範例：史萊姆（12x10 格）

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 10"
     width="24" height="20" fill="#1a1a1a" shape-rendering="crispEdges">
  <!-- 頂部 -->
  <rect x="4" y="0" width="4" height="1"/>
  <!-- 上半身 -->
  <rect x="3" y="1" width="6" height="1"/>
  <rect x="2" y="2" width="8" height="1"/>
  <!-- 眼睛列 -->
  <rect x="1" y="3" width="10" height="1"/>
  <rect x="3" y="3" width="2" height="1" fill="#fafaf8"/>
  <rect x="7" y="3" width="2" height="1" fill="#fafaf8"/>
  <!-- 身體 -->
  <rect x="1" y="4" width="10" height="1"/>
  <rect x="1" y="5" width="10" height="1"/>
  <rect x="1" y="6" width="10" height="1"/>
  <!-- 底部弧線 -->
  <rect x="2" y="7" width="8" height="1"/>
  <rect x="3" y="8" width="2" height="1"/>
  <rect x="7" y="8" width="2" height="1"/>
</svg>
```

## 產圖流程

1. 確認用途與尺寸規格
2. 先用 `<rect>` 畫出輪廓（由上到下逐列）
3. 加入眼睛（白色方塊）
4. 加入特徵細節（武器、裝飾等）
5. 加入 HTML 註解標記各部位
6. 確認置中與留白一致
