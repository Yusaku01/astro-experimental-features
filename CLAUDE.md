# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

これは**Astro View Transitions実験プロジェクト**です。Astro 4.15のView Transitions APIを活用したスムーズなページ遷移アニメーションの実装例を提供しています。日本語コンテンツに対応し、アクセシビリティとブラウザ互換性を考慮した設計になっています。

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
npm run biome:lint       # lint のみ
npm run biome:fix        # 自動修正
```

## アーキテクチャ概要

### View Transitions システム

- **レイアウト基盤**: `src/layouts/Layout.astro` がすべてのページの共通レイアウトを提供
- **View Transitions**: `<ViewTransitions />` コンポーネントでページ遷移アニメーション有効化
- **永続化要素**: `transition:persist` でヘッダーの状態維持
- **共有要素**: `transition:name` で要素間のスムーズな遷移演出

### カスタムアニメーションシステム

`src/styles/global.css` に包括的なアニメーション定義：
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

- **フレームワーク**: Astro 4.15 (ESモジュール)
- **TypeScript**: 5.5 + `@astrojs/check` で型安全性確保
- **コード品質**: Biome 2.2.3（ESLint/Prettier代替）
- **Node.js**: 22.5.0（Volta管理）
- **ターゲット**: 静的サイト生成 (`output: 'static'`)

### Biome設定のポイント

- **フォーマット**: 2スペース、シングルクォート、セミコロン必須
- **linter**: 推奨ルール + 追加の complexity/correctness チェック
- **自動化**: import整理、Git統合

## 実装時の重要事項

### View Transitions実装ルール

1. **transition:name の一意性**: 各ページで固有の名前を使用
2. **アニメーション定義**: `global.css` の既存パターンに従う
3. **アクセシビリティ**: `prefers-reduced-motion` を必ず考慮
4. **フォールバック**: JavaScript無効時の代替UI実装

### ページ作成時の注意点

- `src/layouts/Layout.astro` を基本レイアウトとして使用
- 日本語コンテンツに最適化された font-family 設定
- `transition:name` で要素の継承関係を明確化
- レスポンシブデザイン（768px breakpoint）

### デバッグ・テスト手順

```javascript
// ブラウザコンソールでのデバッグコマンド
document.documentElement.classList.add('debug-transitions'); // スローモーション
document.documentElement.style.setProperty('--transition-duration', '1s'); // 速度調整
```

## ファイル構造の特徴

- **スタイル管理**: グローバルCSS（`global.css`）+ コンポーネント内スコープCSS
- **アニメーション**: CSS カスタムプロパティ（`--transition-duration`）による動的制御
- **設定ファイル**: Astro, TypeScript, Biome の連携設定
- **公開フォルダ**: `public/` に静的アセット（favicon等）

開発時は `npm run dev` でローカルサーバーを起動し、ブラウザのネットワークタブでView Transitionsの動作を確認してください。コードの品質チェックは `npm run biome:check` で実行できます。