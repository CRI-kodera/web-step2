# index.html レビュー結果

レビュー観点：ベストプラクティス / BEM・FLOCSS 命名規則

---

## ベストプラクティス観点

### ✅ 良い点

- `<!doctype html>` / `lang="ja"` / `charset` / `viewport` が揃っている
- Google Fonts に `preconnect` を使って事前接続している
- 外部リンクに `rel="noopener noreferrer"` をつけている
- `<iframe>` に `title` 属性がある
- `<img>` に `alt` 属性がある（ほぼ全箇所）
- `<button>` に `type="button"` がある

### ⚠️ 改善点

| # | 場所 | 問題 | 改善案 |
|---|------|------|--------|
| 1 | `<title>`（14行目） | `TOP_page` はユーザー向けでなくデバッグ用の名前 | `matsumoto toraki \| portfolio` のような実際のタイトルに |
| 2 | `index.html` 全体 | `<meta name="description">` がない | SEO・SNSシェア用に追加する |
| 3 | `<link rel="shortcut icon">` | `contact.html` にはあるが `index.html` にない | `<link rel="icon">` を追加する（`shortcut icon` は古い記法） |
| 4 | 53〜82行目 | ハンバーガーメニューが **同じ内容で2つ** ある（`primary` / `secondary`） | HTMLの重複はJSやCSS側で制御するのが望ましい |
| 5 | 111行目 | `id="top_difference"` にスネークケースとキャメルケースが混在 | `id` はケバブケース（`top-difference`）に統一 |
| 6 | 238〜243行目 | `id="prev"` / `id="next"` という汎用的すぎる `id` | `id="slider-prev"` など具体的な名前にする |
| 7 | 274行目 | `style="border: 0"` のインラインスタイル | CSSに切り出す |
| 8 | 282〜290行目 | `<main>` 内と フッター内（293〜301行目）に同じInstagramリンクが重複 | `aria-hidden="true"` を付けるか、display切り替えにする |
| 9 | 280行目 | ページトップリンクが `href="#"` のみ | `href="#top"` にして `<html id="top">` か `<body id="top">` と対応させる |
| 10 | 333〜339行目 | `<p>` タグで `<img>` をラップしているがセマンティクス的に不適切 | `<figure>` か `<div>` を使う |

---

## BEM / FLOCSS 命名規則観点

### ✅ 良い点

- FLOCSS のレイヤー接頭辞（`l-` / `c-` / `p-` / `u-`）が一貫して使われている
- BEM の `Block__Element--Modifier` 構造が全体的に守られている
- コンポーネント（`c-hamburger`, `c-global-nav`, `c-button-link` など）とページ固有スタイル（`p-top-main__*`）が分離されている

### ⚠️ 改善点

| # | 該当クラス | 問題 | 改善案 |
|---|-----------|------|--------|
| 1 | `p-top-page__center-box`（22行目） | 「center-box」は見た目の説明であり意味が不明瞭 | 役割に基づいた名前（例: `p-top-page__overlay`）に |
| 2 | `p-top-main__panel--card` 等（218〜231行目） | ページ固有コンテンツがスライダーパネル種別まで `p-` 層に直接並んでおり肥大化しやすい | `c-works-slider__panel--card` のようにコンポーネント化を検討 |
| 3 | `p-site-footer__instagram--sp`（282行目） | `--sp` は実装詳細（デバイス種別）を表しており FLOCSS の原則と合わない | `u-hidden-pc` のようなユーティリティクラスで表示制御する方が FLOCSS らしい |
| 4 | `TRUE_canvas`（302行目） | `id` に大文字・アンダースコアが混在 | `id="true-canvas"` のようにケバブケースに統一 |

---

## まとめ

全体的に FLOCSS の層分けと BEM の `__` / `--` 記法はしっかり守れています。
主な改善ポイントは以下の3点です。

1. **`<title>` と `<meta name="description">` の整備**（SEO 基礎）
2. **ハンバーガーメニューと Instagram リンクの HTML 重複の解消**
3. **`id` のケバブケース統一と汎用すぎる名前の改善**
