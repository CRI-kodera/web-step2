# BEM & FLOCSS

Web制作において、多人数での開発や長期的なメンテナンスをスムーズにするための「命名規則（BEM）」と「ファイル構成（FLOCSS）」のガイドラインです。

---

## 1. BEM（ベム）
BEMは、HTMLのクラス名を決めるための命名ルールです。


### 構成要素
| 単位 | 意味 | 書き方 | 例 |
| :--- | :--- | :--- | :--- |
| **Block** | 独立した塊（パーツ） | `block` | `.card`, `.btn` |
| **Element** | Blockを構成する要素 | `__` で繋ぐ | `.card__title`, `.card__img` |
| **Modifier** | 状態や見た目の変化 | `--` で繋ぐ | `.card--large`, `.btn--red` |

### BEMのメリット
- **影響範囲が明確**: クラス名が重複しにくいため、意図しない場所のスタイルが崩れません。
- **構造が読み取れる**: 名前を見るだけで「どこのパーツの、どの要素か」が分かります。

---

## 2. FLOCSS（フロックス）
FLOCSSは、CSSファイルを役割ごとに整理整頓するためのフォルダ分けルールです。


### レイヤー構成

#### ① Foundation
サイト全体の基盤となるスタイル。
- `_reset.css` (ブラウザ間の差異をなくす)
- `_base.css` (全体の背景色、フォント設定)

#### ② Layout
ヘッダーやフッターなど、ページ内の大きな枠組み。
- 命名：`.l-header`, `.l-footer`, `.l-main`

#### ③ Object
再利用可能なパーツをさらに3つに分類します。

| 分類 | 役割 | 命名例 |
| :--- | :--- | :--- |
| **Component** | どこでも使える最小単位のパーツ | `.c-button`, `.c-icon` |
| **Project** | 意味のあるまとまり（カードや記事リストなど） | `.p-card`, `.p-entry-list` |
| **Utility** | 微調整用の便利クラス（余白や文字色など） | `.u-mt-10` (margin-top: 10px) |

---

## Sass（SCSS）での管理イメージ

通常、以下のようにファイルを分割して管理します。

```text
scss/
  ├── foundation/
  │    ├── _base.scss
  │    └── _reset.scss
  ├── layout/
  │    ├── _header.scss
  │    └── _footer.scss
  └── object/
       ├── component/
       │    └── _button.scss
       ├── project/
       │    └── _card.scss
       └── utility/
            └── _margin.scss