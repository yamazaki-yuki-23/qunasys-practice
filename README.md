# chart-js-app

シリアルデータの検索、絞り込みの機能をNext.js + TypeScriptで実装しました。

## アプリケーションについて

以下の画像のように、シリアルのデータの可視化をするアプリケーションです。
ユーザがデータの特徴を知るために利用されます。

![image](https://user-images.githubusercontent.com/37053383/211444776-b74c6554-5249-42f9-8a32-1abd64f1e3c1.png)

### シリアルのデータ

このデータセットはKaggleからダウンロードしました。
該当のページにデータの詳細が載っていますのでご参照ください。
<https://www.kaggle.com/datasets/crawford/80-cereals>
License: CC BY-SA 3.0

### 実行方法

1. `npm ci` を実行
2. `npm run dev` を実行
3. <http://localhost:3000/> を開く

### Dockerを用いる場合 (Option)

- Docker環境 (Windows)

VSCode の拡張機能「Dev Containers」を事前にインストールしておき、
VSCode の Dev Containers から起動する。
※もし初回でエラーが出たら一度 `docker compose up -d` を実行してみてください。

1. VSCode の画面左下「><」みたいなボタンから「Reopen in Container」を選択
1. `npm ci` を実行
1. `npm run dev` を実行
1. <http://localhost:3000/> を開く
