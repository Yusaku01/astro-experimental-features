# Astro View Transitions 実験プロジェクト

記事「AstroのView Transitions」の実装例を実際に動作させて体験できるプロジェクトです。

## 🚀 クイックスタート

### 1. 依存関係のインストール
```bash
npm install
```

**注意**: npm installでエラーが発生する場合は、以下を試してください：
```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```

**トラブルシューティング**: 
- コマンドが見つからない場合: `npx astro dev`
- それでもエラーの場合: パッケージの再インストールが必要な可能性があります

### 3. ブラウザでアクセス
開発サーバーが起動したら、表示されるローカルURL（通常 http://localhost:4321）にアクセスしてください。

## 📋 実装されている機能

### ページ構成
- **ホームページ (`/`)**: View Transitionsの基本機能紹介
- **アバウトページ (`/about`)**: 共有要素の遷移デモ
- **ブログ一覧 (`/blog`)**: 複数のアニメーションパターン
- **記事詳細 (`/blog/sample`)**: 記事カードの遷移例

### View Transitions機能
- **基本的なページ遷移**: smooth な画面切り替え
- **共有要素遷移**: `transition:name` による要素の引き継ぎ
- **状態の永続化**: `transition:persist` によるヘッダー固定
- **カスタムアニメーション**: CSS keyframes による独自効果

### 実験機能
- **ブラウザ対応検知**: View Transitions API の対応状況を表示
- **アクセシビリティ**: `prefers-reduced-motion` への自動対応
- **デバッグ機能**: 開発者ツールでのアニメーション調整

## 🔍 動作テスト手順

### 基本的な遷移テスト
1. ホームページから各ページへナビゲーション
2. タイトルとヒーロー画像の滑らかな遷移を確認
3. ブラウザの戻る・進むボタンでの動作確認

### アニメーションパターンのテスト
1. ブログページ（`/blog`）で各デモカードを確認
2. 記事カード（`/blog/sample`）への遷移を体験
3. 異なるブラウザでの対応状況を確認

### 実験的なテスト
開発者ツールのコンソールで以下のコマンドを実行：

```javascript
// アニメーション速度の調整
document.documentElement.style.setProperty('--transition-duration', '1s');

// アニメーション無効化
document.documentElement.style.setProperty('--transition-duration', '0s');

// デバッグモード（スローモーション）
document.documentElement.classList.add('debug-transitions');
```

## 🛠️ カスタマイズポイント

### アニメーションの調整
- `src/styles/global.css`: カスタムアニメーションの定義
- CSS変数 `--transition-duration` でグローバルな速度調整
- 各要素の `transition:name` で個別アニメーション設定

### 画像の追加
- `public/hero-home.jpg`: ホームページのヒーロー画像
- `public/hero-about.jpg`: アバウトページのヒーロー画像
- 現在はCSS gradientでプレースホルダー表示中

### 新しいページの追加
1. `src/pages/` に新しい .astro ファイルを作成
2. Layout コンポーネントを使用
3. 適切な `transition:name` を設定

## 📚 学習のポイント

### 記事で紹介された概念の実装箇所

#### ViewTransitions コンポーネント
- `src/layouts/Layout.astro:21` - 基本設定

#### transition:name による要素共有
- ページタイトル: `transition:name="page-title"`
- ヒーロー画像: `transition:name="hero-image"`  
- 記事カード: `transition:name="post-1"` など

#### transition:persist による状態保持
- ヘッダー: `src/layouts/Layout.astro:28`

#### カスタムアニメーション
- `src/styles/global.css` - 全カスタムアニメーション定義
- `::view-transition-old/new` 疑似要素の活用

## 🌐 ブラウザサポート

- **Chrome 111+**: フルサポート
- **Safari 18.0+**: フルサポート  
- **Firefox 144+**: フルサポート
- **未対応ブラウザ**: 通常のページ遷移として動作

## 📝 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 型チェック
npm run check

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 🤝 フィードバック

実際に動作させてみて気づいた点や改善提案があれば、ぜひフィードバックをお願いします！

---

*このプロジェクトは記事「AstroのView Transitions」の理解を深めるための実験環境です。*