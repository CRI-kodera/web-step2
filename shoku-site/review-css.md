## project.scss レビュー

### 良い点

- FLOCSSのObject/Project層として、`p-top-page`, `p-top-main`, `p-course-card`, `p-site-footer`といったページ・セクション固有のBlockに整理されており、Layout（配置の枠）とProject（見た目の装飾）の役割分担がコメントでも明記されている。
- BlockElementModifierの命名が一貫している（`.p-course-card__body`, `.p-course-card--web`, `.p-top-main__welcome-line--indented` など）。
- コメントで「IDはJS用に残すがスタイルはクラスで管理する」という設計意図が明記されている（`#top-difference`, `#target`）。これはFLOCSSの推奨プラクティスに沿っている。

### 改善したい点

- **`.p-top-main__training .p-top-main__training-title` のような子孫セレクタでの上書き**
  ```scss
  .p-top-main__training .p-top-main__training-title {
    font-size: 3.125rem;
  }
  ```
  BEMの原則では、Elementのスタイルは単一クラスで完結させるべきで、親Blockの状態に依存させる場合は本来Modifierを使うべきです。ここでは`.p-top-main__training-title`単体では別のfont-sizeが定義されており、親要素に依存して上書きされる構造になっているため、クラス名から見た目が予測しづらくなっています。

- **Utility的な処理がProject層に混在している**
  `.p-top-main__map iframe, .p-top-main__map .p-top-main__map-frame { border: 0; }` のように、要素セレクタ（`iframe`）を直接使っている箇所があります。FLOCSSではObject層はできるだけクラスセレクタで完結させるのが望ましいです。
