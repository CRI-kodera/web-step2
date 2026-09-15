# 【共有】レイアウト崩れ修正とCSS構造整理について

対象: `index.html` / トップページのレイアウト崩れ修正、および `css/scss` 配下のCSS構造整理

このドキュメントは、今回行った大幅な修正の意図と、今後みなさんが同じ場所を触るときに気をつけてほしいポイントをまとめたものです。

---

## 1. どんな構造が悪さをしていたのか？

### 原因：CSSの供給元（source of truth）が2系統に分裂していた

これが一番大きな問題でした。

- `index.html` が実際に読み込んでいるのは `css/style.css`
- `css/style.css` は本来 **`css/style.scss` をSassでビルドして生成するファイル**（`npm run build:css`）
- しかし実態は、`css/style.css` の中身が手書きで直接編集されてしまっており、`css/style.scss`（および`css/scss/`配下）とは**別物として食い違って**いた
- つまり「見た目を直したつもりの修正が、ビルドし直すと消えてしまう」状態だった

→ **見た目を編集する場所が2箇所に増えてしまうと、どちらが正か誰にも分からなくなる**、という教訓です。

### 原因：セクションごとにバラバラの%指定で余白・幅を決めていた

共通のコンテナ（幅の基準）が無いまま、セクションごとに個別の`%`指定で余白を作っていました。

```css
/* 例：footerのコンテンツ幅 */
.p-site-footer__content {
  margin: 10% 30% 2% 30%;
}
```

`%`は「親要素の幅に対する割合」なので、画面幅が変わるたびに**余白と本文幅の両方が非線形に変化**します。さらにブレイクポイント（1366px / 1200px / 767px / 375pxなど）もファイルごとにバラバラで、統一された「PCサイズの基準」が存在しませんでした。

### 原因：フッターの円形装飾（canvas）が固定サイズで崩れていた

`<canvas id="target" width="1920" height="2000">` は、CSSで幅を指定しない限り**指定した属性値どおり常に1920×2000pxの固定サイズ**で描画されます。親要素の幅が変わっても連動しません。

- 基準値の1366pxではたまたま見た目が整っていただけで、実際は「たまたま隠れる位置で切れていなかった」だけ
- それより広い画面ではみ出し方が変わり、崩れて見えるようになっていた

→ **「絶対配置＋固定px」は、画面幅が変わると簡単に破綻する**、という典型例でした。

---

## 2. どんなレイアウトルールを作ったか？どう使うのか？

`css/scss/foundation/_variables.scss` に、ページ共通で使う「基準値」を変数として定義しました。

```scss
:root {
  // Layout
  --layout-content-width: 1366px; // コンテンツの最大幅
  --layout-gutter: 24px;          // 左右の余白（ガター）
  --space-section: 120px;         // セクション間の縦の余白
  --space-heading: 48px;          // 見出し周りの余白
}
```

これを使う共通クラスが `css/scss/layout/_layout.scss` にあります。

```scss
.l-container {
  width: min(
    calc(100% - (var(--layout-gutter) * 2)),
    var(--layout-content-width)
  );
  margin-inline: auto;
}

.l-section {
  margin-block-start: var(--space-section);
}
```

### 使い方

セクションの外側に `.l-container` を1枚被せるだけで、「最大1366px・左右に最低24pxの余白・中央寄せ」が自動的に決まります。

```html
<section class="p-top-main__training">
  <div class="l-container">
    <h2 class="p-top-main__training-title">Manifesto</h2>
    <p>...</p>
  </div>
</section>
```

セクション同士の縦の間隔を揃えたいときは `.l-section` を使います（`margin-top`を個別に`%`指定しない）。

```html
<section class="p-top-main__contact l-section">
  ...
</section>
```

---

## 3. 動作確認時の注意点（フォルダ構造を壊さないために）

今回、CSSの管理場所を `css/scss/` 配下に一本化しました。**見た目を直すときは必ず `css/scss/` の中の `.scss` ファイルを編集してください。**

### やってはいけないこと

- ❌ **`css/style.css` を直接編集する**
  → `css/style.scss` からビルドされる生成物なので、次に誰かが `npm run build:css` を実行した瞬間に上書きされて消えます。
- ❌ 以前あった `css/foundation` / `css/layout` / `css/object` フォルダを作り直して編集する
  → これらは今回の整理で削除済みの旧構造です。もし復活していたら、それは`index.html`から読み込まれていない「死んだファイル」になっている可能性が高いです。

### 正しい編集〜確認の手順

1. `css/scss/` 配下の該当する`.scss`ファイルを編集する
   - 色・共通変数 → `css/scss/foundation/_variables.scss`
   - ページの骨格（コンテナ幅など） → `css/scss/layout/_layout.scss`
   - ヘッダーのナビ・ローダーなど部品 → `css/scss/object/_components.scss`
   - ページ固有の見た目（トップページ・フッターなど） → `css/scss/object/project.scss`

2. ビルドコマンドを実行して `css/style.css` を生成し直す
   ```bash
   npm run build:css
   ```
   
3. `index.html` をブラウザで開いて確認する

### VSCodeの拡張機能に注意

もし「Live Sass Compiler」のような自動コンパイル系の拡張機能を入れている場合、**保存するたびに独自の設定で`css/style.css`を勝手に上書きしてしまう**ことがあります（今回の検証中、ベンダープレフィックス付きのCSSが意図せず混ざっていたのはこれが原因と思われます）。

- 複数人で作業する場合は、`npm run build:css` に統一し、エディタの自動コンパイル機能はオフにしておくと事故が起きにくいです。
- 「自分は`css/scss/`を直しただけなのに、`git diff`で`css/style.css`に見覚えのない差分（プレフィックスなど）が出ている」ときは、この自動コンパイルを疑ってください。

---

以上、不明点があれば気軽に聞いてください。
