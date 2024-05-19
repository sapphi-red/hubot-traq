# hubot-traq
[![npm version](https://badge.fury.io/js/hubot-traq.svg)](https://badge.fury.io/js/hubot-traq) ![automatic release](https://github.com/sapphi-red/hubot-traq/workflows/automatic%20release/badge.svg) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)  

[traQ][]用[Hubot][]アダプター

## 使い方

### 新しいbotをつくる

#### インストール
前提として[Node.js][]が必要です
```bash
# 利用ツールのインストール
npm install -g yo generator-hubot
# botを管理するディレクトリの作成
mkdir -p /path/to/myhubot
cd /path/to/myhubot
# テンプレートの作成
yo hubot
```

ここまでしたら、画面にしたがって入力していき、**Bot adapter**と表示されたら`hubot-traq`と入力します  
(もしくは`yo hubot`のあとに[すべてコマンド引数で指定することもできます][cmd-docs])

既定で入っているscriptsが存在するので一度除きます(このままだとredisがないだの怒られるため)  
具体的には`./external-scripts.json`を開いて`[]`にします  
追加で`package.json`の`dependencies`の`hubot`と`hubot-traq`以外を取り除いて`npm install`をするといいでしょう  

```bash
# gitレポジトリの作成
git init
git add .
git commit -m "Init"
```

#### 初期設定
下記の環境変数をそれぞれ設定します
- `HUBOT_TRAQ_NAME` - traQで動かすHubotのtraQ ID (例: `@BOT_TEST`なら`BOT_TEST`)
- `HUBOT_TRAQ_MODE` - BOTのモード (`HTTP`または`WebSocket`、省略時は`HTTP`)
- `HUBOT_TRAQ_ACCESS_TOKEN` - traQで動かすHubotのAccess Token
- `HUBOT_TRAQ_EMBED` - メンション・チャンネルリンクの自動埋め込みの有無(`TRUE`にすると有効、省略時は無効)
- `PORT`または`EXPRESS_PORT` - [HTTPモードでのポート](https://github.com/hubotio/hubot/blob/master/docs/scripting.md#http-listener) (省略時は`8080`)
- 以下はHTTPモードのときのみ必要
  - `HUBOT_TRAQ_VERIFY_TOKEN` - traQで動かすHubotのVerification Code
  - `HUBOT_TRAQ_PATH` - Botサーバーエンドポイントのパス(直下で受け取るなら`""`、`/webhook/`で受け取るなら`"/webhook/"`)

Verification CodeなどはそれぞれtraQのBot Consoleから確認できます

#### 実行
`package.json`の`scripts`の`start`を以下のように変更します

```diff
-    "start": "hubot -a hubot-traq",
+    "start": "hubot -a hubot-traq -n \"$HUBOT_TRAQ_NAME\" \"$@\"",
```

#### showcaseへのデプロイ
以下の設定で動作します

- Deploy Type: `Runtime`
- Build Type: `Buildpack`
  - Context: `.`
  - Use Database: BotでDBを使うか次第

---

さらに詳しい説明は[hubotのドキュメント][docs]を参照してください

## Changelog
- [Change log][]

## リファレンス
- [Wiki][]
- [Example][]
- [Example with Typescript][]

[traQ]: https://github.com/traPtitech/traQ/
[Hubot]: https://hubot.github.com/
[Node.js]: https://nodejs.org/ja/
[cmd-docs]: https://hubot.github.com/docs/
[docs]: https://github.com/github/hubot/tree/master/docs
[Wiki]: https://github.com/sapphi-red/hubot-traq/wiki
[Example]: https://github.com/sapphi-red/traq-hubot-example
[Example with Typescript]: https://github.com/sapphi-red/traq-hubot-example-ts
[Change log]: https://github.com/sapphi-red/hubot-traq/blob/master/CHANGELOG.md
