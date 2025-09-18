# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

これは**Astro View Transitions実験プロジェクト**です。Astro 5.13のView Transitions API（ClientRouter）を活用したスムーズなページ遷移アニメーションの実装例を提供しています。フィーチャーベースのディレクトリ構造で整理され、日本語コンテンツに対応し、アクセシビリティとブラウザ互換性を考慮した設計になっています。

## 開発コマンド

```bash
# 開発サーバー起動（推奨）
npm run dev

# 代替コマンド
npm start

# TypeScriptチェックと本番ビルド
npm run build

# 本番ビルドのプレビュー
npm run preview

# Biome（linter + formatter）
npm run biome:check      # チェックのみ
npm run biome:format     # フォーマット実行
npm run biome:lint       # lintのみ
npm run biome:fix        # 自動修正（check + write）

# その他のツール
npm run astro           # Astro CLIの直接実行
```

## アーキテクチャ概要

### View Transitions システム

- **ベースレイアウト**: `src/shared/layouts/BaseLayout.astro` が基本的なHTML構造を提供
- **View Transitions**: Astro 5の `<ClientRouter />` コンポーネントでページ遷移アニメーション有効化
- **フィーチャーレイアウト**: 各機能ごとに専用レイアウト（`src/features/*/layouts/Layout.astro`）
- **永続化要素**: `transition:persist` でヘッダーの状態維持
- **共有要素**: `transition:name` で要素間のスムーズな遷移演出

### フィーチャーベース アーキテクチャ

```
src/
├── features/          # 機能別モジュール
│   ├── top/          # トップページ機能
│   ├── about/        # アバウトページ機能  
│   ├── blog/         # ブログ機能
│   └── contact/      # コンタクト機能
│       ├── components/   # 機能固有コンポーネント
│       └── layouts/      # 機能固有レイアウト
├── shared/           # 共有リソース
│   ├── layouts/      # BaseLayout.astro
│   ├── components/   # 共通コンポーネント
│   ├── styles/       # グローバルCSS
│   ├── types/        # TypeScript型定義
│   └── utils/        # ユーティリティ関数
└── pages/            # Astroページファイル
```

### カスタムアニメーションシステム

`src/shared/styles/global.css` に包括的なアニメーション定義：
- **基本遷移**: slide, fade, scale パターン
- **要素特化**: page-title, hero-image, post-cards 用カスタマイズ
- **スタガーアニメーション**: 複数要素の連続表示
- **レスポンシブ対応**: モバイル端末での最適化
- **アクセシビリティ**: `prefers-reduced-motion` 自動対応

### ブラウザ対応システム

- **実行時検知**: JavaScript による `startViewTransition` API サポート確認
- **フォールバック**: 未対応ブラウザでの通常ページ遷移
- **可視化**: ヘッダーでの対応状況表示

## 技術スタック・設定

- **フレームワーク**: Astro 5.13.0 (ESモジュール)
- **TypeScript**: 5.5.0 + `@astrojs/check` 0.9.4 で型安全性確保
- **コード品質**: Biome 2.2.3（ESLint/Prettier代替）
- **Node.js**: 22.5.0（Volta管理）
- **ターゲット**: 静的サイト生成 (`output: 'static'`)
- **バンドル解析**: rollup-plugin-visualizer 6.0.3
- **パスエイリアス**: `@/*` → `./src/*`

### Biome設定のポイント

- **フォーマット**: 2スペース、シングルクォート、セミコロン必須、行幅100文字
- **linter**: 推奨ルール + a11y警告、complexity/correctness/style/suspicious チェック
- **自動化**: import整理、Git統合、VCS連携
- **厳格ルール**: 未使用変数エラー、console.warn、debuggerエラー

### Astro設定のポイント

- **HMR最適化**: オーバーレイ無効化で View Transitions テスト向け
- **パスエイリアス**: `@/` でsrcディレクトリへの絶対パス
- **TypeScript**: strict設定で型安全性を重視

## 実装時の重要事項

### View Transitions実装ルール

1. **transition:name の一意性**: 各ページで固有の名前を使用
2. **アニメーション定義**: `global.css` の既存パターンに従う
3. **アクセシビリティ**: `prefers-reduced-motion` を必ず考慮
4. **フォールバック**: JavaScript無効時の代替UI実装

### ページ作成時の注意点

- **ベースレイアウト**: `src/shared/layouts/BaseLayout.astro` を基盤として使用
- **機能レイアウト**: 機能ごとに `src/features/*/layouts/Layout.astro` を作成
- **パスエイリアス**: `@/` でsrcディレクトリへのインポートを簡略化
- **ClientRouter**: Astro 5の `<ClientRouter />` で View Transitions 有効化
- `transition:name` で要素の継承関係を明確化
- レスポンシブデザイン（768px breakpoint）

### デバッグ・テスト手順

```javascript
// ブラウザコンソールでのデバッグコマンド
document.documentElement.classList.add('debug-transitions'); // スローモーション
document.documentElement.style.setProperty('--transition-duration', '1s'); // 速度調整
```

## ファイル構造の特徴

- **機能ベース組織**: `src/features/` で機能ごとにコンポーネント・レイアウトを配置
- **共有リソース**: `src/shared/` にグローバルなアセットやユーティリティを集約
- **スタイル管理**: グローバルCSS（`src/shared/styles/global.css`）+ コンポーネント内スコープCSS
- **アニメーション**: CSS カスタムプロパティ（`--transition-duration`）による動的制御
- **設定ファイル**: Astro, TypeScript, Biome の連携設定
- **公開フォルダ**: `public/` に静的アセット（favicon等）

## 開発ワークフロー

開発時は `npm run dev` でローカルサーバーを起動し、ブラウザのネットワークタブでView Transitionsの動作を確認してください。

```bash
# 開発環境セットアップ
npm install
npm run dev

# コード品質チェック（推奨）
npm run biome:check
npm run build      # TypeScriptチェック含む
```