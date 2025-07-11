# 🎯 モダンTodoアプリ

Nuxt 3 + Vue 3 + TypeScriptで構築された、シンプルで美しいTodoアプリケーションです。

## ✨ 機能

- ✅ **タスクの追加・編集・削除**
- 🔄 **完了状態の切り替え**
- 🎛️ **フィルタリング機能**（全て・未完了・完了済み）
- 💾 **ローカルストレージでのデータ永続化**
- 📱 **レスポンシブデザイン**
- 🎨 **モダンなUI/UX**
- ⚡ **スムーズなアニメーション**
- 🧹 **完了済みタスクの一括削除**

## 🏗️ 技術スタック

- **フレームワーク**: Nuxt 3
- **言語**: TypeScript
- **UI**: Vue 3 Composition API
- **スタイリング**: CSS3 (Scoped Styles)
- **データ保存**: LocalStorage

## 📁 プロジェクト構造

```
nuxt-cap-todo/
├── components/
│   ├── TodoApp.vue      # メインアプリケーションコンポーネント
│   ├── TodoForm.vue     # 新規タスク追加フォーム
│   ├── TodoFilter.vue   # フィルタリング・統計表示
│   ├── TodoList.vue     # タスクリスト表示
│   └── TodoItem.vue     # 個別タスクアイテム
├── types/
│   └── todo.ts          # TypeScript型定義
├── app.vue              # アプリケーションエントリーポイント
└── package.json
```

## 🚀 セットアップ

### 依存関係のインストール

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 開発サーバーの起動

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

ブラウザで `http://localhost:3000` を開いてアプリケーションを確認してください。

## 🏭 本番ビルド

### アプリケーションのビルド

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

### 本番ビルドのプレビュー

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 📱 Capacitor（モバイルアプリ）

### Capacitorの初期化

```bash
# Capacitorの初期化
npx cap init

# プラットフォームの追加
npx cap add ios
npx cap add android
```

### アプリケーションのビルドと同期

```bash
# アプリケーションをビルド
npm run build

# Capacitorに同期
npx cap sync

# プラットフォーム固有のファイルをコピー
npx cap copy ios
npx cap copy android
```

### 開発サーバーの起動

```bash
# iOSシミュレーターで起動
npx cap run ios

# Androidエミュレーターで起動
npx cap run android

# ブラウザで起動
npx cap serve
```

### ネイティブIDEでの開発

```bash
# XcodeでiOSプロジェクトを開く
npx cap open ios

# Android StudioでAndroidプロジェクトを開く
npx cap open android
```

### プラグインの追加

```bash
# カメラプラグインの追加例
npm install @capacitor/camera
npx cap sync
```

## 🎮 使用方法

1. **タスクの追加**: 入力フィールドにタスクを入力して「+」ボタンをクリック
2. **タスクの完了**: チェックボックスをクリックして完了状態を切り替え
3. **タスクの編集**: タスクテキストをダブルクリックして編集モードに入る
4. **タスクの削除**: 削除ボタン（ゴミ箱アイコン）をクリック
5. **フィルタリング**: 「全て」「未完了」「完了済み」ボタンで表示を切り替え
6. **完了済みの削除**: 「完了済みを削除」ボタンで一括削除

## 🎨 デザインの特徴

- **グラデーション背景**: 美しい紫から青へのグラデーション
- **カード型レイアウト**: モダンなカードデザイン
- **スムーズアニメーション**: ホバー効果とトランジション
- **レスポンシブ対応**: モバイル・タブレット・デスクトップ対応
- **アクセシビリティ**: キーボードナビゲーション対応

## 🔧 カスタマイズ

### 色の変更

`components/TodoApp.vue`のCSS変数を編集して色をカスタマイズできます：

```css
.todo-app {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📝 ライセンス

MIT License

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！

---

**Happy Coding! 🎉**
