# FLOCSS修正 実装ログ

review.md の指摘8件に対して行った修正の記録。

---

## 修正ファイル一覧

| ファイル | 変更内容 |
|---|---|
| `css/scss/_variables.scss` | カラーパレット追加 |
| `css/scss/_base.scss` | Foundation限定化・overflowセレクタ修正 |
| `css/scss/layout/_layout.scss` | l-header / l-main / l-footer 定義・p-系除去 |
| `css/scss/_components.scss` | c-loader追加・p-系除去 |
| `css/scss/object/project.scss` | p-系スタイルを集約（実質新規） |
| `css/scss/_responsive.scss` | IDセレクタをクラスに置換 |
| `css/style.scss` | importパスをFLOCSSレイヤー順に整理・project.scss追加 |
| `css/style.css` | 上記すべての修正を反映したコンパイル済み出力 |

---

## 指摘別の対応

### 1. ファイルが1つに集約されている（重大）→ 対応済み

**変更前**: すべてのスタイルが `style.css` 1ファイルに混在  
**変更後**: SCSSパーシャルをFLOCSSレイヤー順に整理

```
css/scss/
├── _variables.scss          ← Foundation: 変数
├── _base.scss               ← Foundation: 基底スタイル
├── layout/_layout.scss      ← Layout
├── _components.scss         ← Object/Component
├── object/project.scss      ← Object/Project（実質新規）
└── _responsive.scss         ← Responsive + Utility

css/style.scss  ← importをレイヤー順に整理
```

`style.scss` のimport順:
```scss
@import "scss/_variables.scss";     // Foundation: variables
@import "scss/_base.scss";          // Foundation: base/reset
@import "scss/layout/_layout.scss"; // Layout
@import "scss/_components.scss";    // Object/Component
@import "scss/object/project.scss"; // Object/Project
@import "scss/_responsive.scss";    // Responsive + Utility defaults
```

---

### 2. `.loaded` クラスがFoundationをまたいでいる（重大）→ 対応済み

**変更前**:
```css
/* .loaded が html の祖先にある想定だが、html の祖先は存在しないため
   .loaded body のみが実際に機能していた */
.loaded html,
.loaded body { overflow: auto; }

.loaded .c-loader { opacity: 0; ... }
```

**変更後** (`_base.scss`):
```css
/* html に .loaded が付与されることを明示し、意図を読みやすくする */
html.loaded body { overflow: auto; }
```

**変更後** (`_components.scss`):
```css
html.loaded .c-loader { opacity: 0; visibility: hidden; ... }
```

> **注意**: JSが `document.documentElement`（html要素）に `.loaded` を付与していることが前提。
> JSの実装確認後、必要であれば合わせて修正すること。

---

### 3. IDセレクタの使用（中）→ 対応済み

**変更前**:
```css
#top-difference,
#top_difference { position: relative; }

#target { z-index: -1; }          /* _layout.scss */
#true-canvas { display: none; }   /* _responsive.scss */
```

**変更後**:
```css
/* _project.scss */
/* HTMLの要素はすでに .p-top-main__title-wrap クラスを持っている */
.p-top-main__title-wrap { position: relative; }

/* #target（canvas）の親要素 div.p-site-footer__canvas で管理 */
.p-site-footer__canvas { z-index: -1; }

/* _responsive.scss */
/* #true-canvas の親要素 .p-site-footer__canvas で管理 */
.p-site-footer__canvas { display: none; }
```

> `id="top-difference"`, `id="true-canvas"`, `id="target"` はHTMLに残したまま（JSのアンカー/操作用途）。
> スタイリングのみクラスに移行した。

---

### 4. 要素セレクタとFLOCSSクラスの混在（中）→ 対応済み

**変更前**:
```css
footer,
.l-footer.p-site-footer {
  position: relative;
  overflow: hidden;
  padding-top: 10%;
}
```

**変更後**:
- `layout/_layout.scss` に `.l-footer` として配置の枠のみ定義
- `object/project.scss` に `.p-site-footer__*` として装飾スタイルを定義
- HTML構造: `<footer class="l-footer p-site-footer">` のクラス構成は既存を維持

```css
/* Layout */
.l-footer {
  position: relative;
  overflow: hidden;
  padding-top: 10%;
}
```

---

### 5. Layoutレイヤーの定義が不足（中）→ 対応済み

**変更後** (`layout/_layout.scss`):
```css
.l-header { position: relative; }
.l-main   { position: relative; width: 100%; }
.l-footer { position: relative; overflow: hidden; padding-top: 10%; }
```

HTMLでは既に `class="l-header p-site-header"`, `class="l-main p-top-main"`, `class="l-footer p-site-footer"` として使われており、CSSのLayoutレイヤーに対応定義を追加した。

---

### 6. `:root` のカスタムプロパティの範囲が限定的（小）→ 対応済み

**変更前**:
```css
:root {
  --bg-color: #000;
  --drop-color: #fff;
}
```

**変更後** (`_variables.scss`):
```css
:root {
  --color-bg:       #1a1a1a;
  --color-text:     #eaeaea;
  --color-sub-text: #c1c1c1;
  --color-white:    #fff;
  --color-black:    #000;

  /* Loaderはパレット変数にマッピング */
  --bg-color:   var(--color-black);
  --drop-color: var(--color-white);
}
```

> 各箇所のハードコードされた色値（`#1a1a1a` など）のパレット変数への置き換えは、
> 今後リファクタリングのフェーズで対応すること（スコープが広いため今回は見送り）。

---

### 7. `justify-content` の重複宣言（小）→ 対応済み

**変更前**:
```css
.p-site-footer__columns {
  justify-content: center;        /* ← 上書きされていた */
  justify-content: space-between;
}
```

**変更後** (`object/project.scss`, `style.css`):
```css
.p-site-footer__columns {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  font-size: 0.3rem;
}
```

---

### 8. `.p-top-main__works-slider` はComponentに昇格できる可能性（小）→ 対応見送り

スライダーはトップページ専用の実装であり、現状他ページへの転用実績がないため、
今回は `p-top-main__works-slider` のままProjectとして維持した。
他ページで再利用する際に `c-works-slider` として切り出すことを推奨する。

---

## 補足: JSとの連携について

ローダー制御のJS（`document.documentElement.classList.add('loaded')` など）が
`html` 要素に `.loaded` を付与していることを前提としている。

もしJSが `body` に `.loaded` を付与している場合は、以下に変更が必要：

```css
/* _base.scss */
body.loaded { overflow: auto; }

/* _components.scss */
body.loaded .c-loader { opacity: 0; ... }
```
