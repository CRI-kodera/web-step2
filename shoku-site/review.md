# style.css FLOCSSレビュー

## FLOCSSの基本構造（確認観点）

| レイヤー | 接頭辞 | 役割 |
|---|---|---|
| Foundation | なし | リセット・基底スタイル（html, body, a など） |
| Layout | `l-` | ページの大枠（ヘッダー、フッター、グリッドなど） |
| Object / Component | `c-` | 小さく再利用可能なUIパーツ |
| Object / Project | `p-` | プロジェクト固有の複合コンポーネント |
| Object / Utility | `u-` | 単機能のヘルパークラス |

---

## 良い点

- `c-loader`, `c-slider-pagination`, `c-works-slider__panel--*` など、**再利用可能なパーツに `c-` 接頭辞**が付いている
- `p-top-main`, `p-course-card`, `p-site-footer` など、**ページ固有コンポーネントに `p-` 接頭辞**が付いている
- `u-vertical-text`, `u-hidden-pc` など、**ユーティリティクラスに `u-` 接頭辞**が付いている
- BEMの `__element` と `--modifier` の命名規則が概ね守られている

---

## 改善が必要な点

### 1. ファイルが1つに集約されている（重大）

FLOCSSは**レイヤーごとにファイルを分割する**ことを前提にしている。
現状はすべてのレイヤーが `style.css` 1ファイルに混在している。

**推奨構成：**
```
css/
├── foundation/
│   ├── _reset.css
│   └── _base.css
├── layout/
│   └── _footer.css
├── object/
│   ├── component/
│   │   ├── _loader.css
│   │   └── _slider-pagination.css
│   ├── project/
│   │   ├── _top-main.css
│   │   ├── _course-card.css
│   │   └── _site-footer.css
│   └── utility/
│       └── _utility.css
└── style.css  ← 各ファイルを @import でまとめるエントリポイント
```

---

### 2. `.loaded` クラスがFoundationレイヤーをまたいでいる（重大）

```css
/* Foundation（html/body）の挙動をObjectの状態クラスで制御している */
.loaded html,
.loaded body {
  overflow: auto;
}
```

`.loaded` はJSで付与する状態クラス（Objectレイヤーの関心）が、Foundationレイヤーの `html/body` を直接操作している。  
レイヤーの依存関係が逆転しており、FLOCSSの原則「**上位レイヤーが下位レイヤーに影響を与えない**」に違反している。

**改善案：**  
`overflow: hidden` の制御は `.c-loader` が表示中に `body` へ直接適用するのではなく、`c-loader` 自体を `fixed` で覆うだけにとどめ、スクロール制御はJSに委ねる。

---

### 3. IDセレクタの使用（中）

```css
#top-difference,
#top_difference { ... }

#target { z-index: -1; }

#true-canvas { display: none; }
```

FLOCSSでは**IDセレクタはスタイリングに使用しない**。  
IDは詳細度が高く、後から上書きが困難になる。クラスに置き換える。

**改善案：**
```css
/* Before */
#target { z-index: -1; }

/* After */
.p-site-footer__target { z-index: -1; }
```

---

### 4. 要素セレクタとFLOCSSクラスの混在（中）

```css
footer,
.l-footer.p-site-footer { ... }
```

`footer` 要素セレクタとFLOCSSクラスが同一ルールに混在している。  
Foundationに `footer` の基底スタイルを書くか、クラスに統一する。

また `.l-footer.p-site-footer` のように**LayoutとProjectを同一要素に重ねがけ**するのはFLOCSSの想定外。  
LayoutはあくまでProjectを「配置する枠」であり、見た目の装飾はProjectに持たせる。

**改善案：**
```html
<!-- HTML -->
<footer class="l-footer">
  <div class="p-site-footer"> ... </div>
</footer>
```
```css
/* Layout */
.l-footer {
  position: relative;
  overflow: hidden;
  padding-top: 10%;
}

/* Project */
.p-site-footer { /* フッター内のコンテンツスタイル */ }
```

---

### 5. Layoutレイヤーの定義が不足（中）

`l-footer` の記述はHTMLで使用されているが、CSSで独立したLayoutスタイルとして定義されていない。  
ページ全体の骨格を担う以下のクラスが未定義、またはProjectと混在している。

- ヘッダー: `l-header` が存在しない
- メインコンテンツ: `l-main` が存在しない

---

### 6. `:root` のカスタムプロパティの範囲が限定的（小）

```css
:root {
  --bg-color: #000;
  --drop-color: #fff;
}
```

カスタムプロパティが `c-loader` 専用の値のみで、他の箇所（例：`#1a1a1a`, `#eaeaea`, `#c1c1c1`）はハードコードされている。  
Foundationでカラーパレットとして一元管理すると保守性が上がる。

**改善案：**
```css
:root {
  --color-bg:       #1a1a1a;
  --color-text:     #eaeaea;
  --color-sub-text: #c1c1c1;
  --color-white:    #fff;
  --color-black:    #000;
}
```

---

### 7. `justify-content` の重複宣言（小）

```css
.p-site-footer__columns {
  display: flex;
  flex-grow: 1;
  justify-content: center;      /* ← 上書きされる */
  justify-content: space-between; /* ← こちらが適用される */
  font-size: 0.3rem;
}
```

同一プロパティが2回宣言されている。意図的であれば前者を削除する。

---

### 8. `.p-top-main__works-slider` はComponentに昇格できる可能性（小）

スライダーは他のページでも再利用できる汎用UIであれば、`c-works-slider` として切り出す候補になる。  
現状は `p-top-main__works-slider` にネストされており、トップページ専用になっている。

---

## まとめ

| 項目 | 状態 |
|---|---|
| 接頭辞（`c-` / `p-` / `u-`）の命名 | ✅ 概ね正しい |
| BEM記法（`__` / `--`）の命名 | ✅ 概ね正しい |
| ファイル分割 | ❌ 未分割（最重要課題） |
| レイヤー間の依存方向 | ⚠️ `.loaded` がFoundationをまたいでいる |
| IDセレクタの不使用 | ❌ `#target`, `#true-canvas` などが残存 |
| Layoutレイヤーの定義 | ⚠️ `l-footer` のみで `l-header`, `l-main` が不足 |
| カスタムプロパティの活用 | ⚠️ ローダー専用のみで色が分散 |
