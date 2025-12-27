# 実装方針
本ステップでは保守性と再利用性を高めるため、  
BEM（Block, Element, Modifier）の概念をベースに、FLOCSSのレイヤー構造を採用した命名規則を適用します。

---
### BEMの基本構造
クラス名は Block__Element--Modifier の形式で記述します。

・Block (block): スタンドアロンで成立する構成単位（例：c-button, p-card）。  
・Element (__element): Blockを構成する依存要素。アンダースコア2つで繋ぎます（例：__title, __item）。  
・Modifier (--modifier): BlockやElementの「状態」や「変化」を表します。ハイフン2つで繋ぎます（例：--large, --active）。  

---
### クラス名の要点
**① Elementの連結は行わない（孫要素の禁止）**
BEMでは構造を浅く保つことがルールです。
HTMLの階層が深くても、クラス名で階層を表現してはいけません。

❌：.c-card__list__item （孫要素になっている）
⭕️：.c-card__item （常にBlock直下の要素として扱う）

**② 意味（役割）で命名する**
「赤色」「右側」といった見た目（デザイン）ではなく、その要素の「役割」で命名します。

❌NG：.c-button--red
⭕️OK：.c-button--danger

**③ 命名の粒度に迷ったら**
「その要素が他の場所でも形を変えずに使えるか？」を基準にします。

・使い回すなら c- (Component)
・特有のレイアウトや大きな塊なら p- (Project)

---
### 具体例

> HTML
```html
<section class="p-news-section">
  <h2 class="p-news-section__title">お知らせ</h2>
  
  <ul class="p-news-section__list">
    <li class="p-news-section__item">
      <a href="#" class="c-button c-button--primary">
        <span class="c-button__label">詳細を見る</span>
      </a>
    </li>
  </ul>
</section>
```

> CSS
```scss
.c-button {
  display: inline-block;
  padding: 10px 20px;
  
  &__text {
    font-weight: bold;
  }
  
  &--primary {
    background-color: blue;
    color: white;
  }
  
  &.is-active {
    opacity: 0.8;
  }
}
```


