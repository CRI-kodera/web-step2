# index.html FLOCSS / BEM レビュー

対象: `index.html`（参照CSS: `css/scss/foundation`, `css/scss/layout`, `css/scss/object`）

総評: **75〜80点**。FLOCSSの層分けとBEMの命名規則はかなり丁寧に守れています。初学者としては十分合格ラインですが、いくつか直したい点があります。

## 良い点

- Layout（`l-`）とProject/Component（`p-`, `c-`）の役割分担ができている。`<header class="l-header p-site-header">`のように「配置の枠はl-」「見た目の装飾はp-」という併記が一貫している。
- BlockElementModifierの構造が概ね正しい。例: `.p-course-card__body`, `.p-course-card--web`, `.c-works-slider__panel--card` など、Block→Element→Modifierの階層が読み取れる。
- Componentレイヤー（`c-loader`, `c-hamburger`, `c-global-nav`, `c-slider-pagination`, `c-image-link`, `c-page-top`, `c-button-link`）とProjectレイヤー（`p-top-main`, `p-course-card`, `p-site-footer`）の切り分けが妥当。
- IDセレクタ（`#top-difference`, `#target`, `#top`）はJSフックやアンカー専用にとどめ、スタイリングはクラスで行う設計が徹底されている。
- 装飾画像の`alt=""`（`aiwa_academy.png`）やリンク画像への具体的な`alt`テキスト（`alt="Webクラスページへ移動"`等）が適切に使い分けられている箇所が多い。

## 改善したい点

### 1. BEM/FLOCSS命名

- **Modifierが基本クラスと併記されていない箇所がある**（`index.html:300`）
  ```html
  <div class="p-site-footer__instagram--sp u-hidden-pc" aria-hidden="true">
  ```
  `p-site-footer__instagram--sp`はModifierですが、対になる基本クラス`p-site-footer__instagram`が併記されていません。`p-site-footer__instagram p-site-footer__instagram--sp`のように両方付けるのが正しい形です。

### 2. セマンティックコーディング

- **`main`直下のコンテンツブロックが全て`<div>`**
  about、mission-visual、courses、training、voice、contactなど、意味のあるまとまりが全て`<div>`です。それぞれ`<section>`要素にすると支援技術がページの区切りをランドマークとして認識でき、ナビゲーションしやすくなります。

### 3. アクセシビリティ

- **スライダーのページネーションボタンにテキストラベルがない**（`index.html:248-261`）
  ```html
  <button type="button" id="slider-prev" class="c-slider-pagination__button">&#8592;</button>
  ```
  中身が矢印記号のみのため、`aria-label="前のスライド"` / `aria-label="次のスライド"`を追加することを推奨します。

- **`aria-hidden="true"`とフォーカス可能なリンクの矛盾**（`index.html:300-305`）
  ```html
  <div class="p-site-footer__instagram--sp u-hidden-pc" aria-hidden="true">
    <a href="https://www.instagram.com/aiwa.kunren" ...>
  ```
  `aria-hidden="true"`は支援技術から要素を完全に隠す指定ですが、内部にフォーカス可能な`<a>`が残っています。`tabindex="-1"`を併用するか、SP/PC切り替えはCSSの`display:none`のみで行うことを推奨します。

- **装飾画像`alt="装飾の円"`は情報のない画像として扱うべき**（`index.html:84`）
  純粋な背景装飾であれば`alt=""`にしてスクリーンリーダーの読み上げをスキップさせる方が適切です。


現状で80点相当のクオリティは達成できています。
