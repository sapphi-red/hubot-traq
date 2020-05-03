# hubot-traq
[![npm version](https://badge.fury.io/js/hubot-traq.svg)](https://badge.fury.io/js/hubot-traq) [![Build Status](https://travis-ci.org/sapphi-red/hubot-traq.svg)](https://travis-ci.org/sapphi-red/hubot-traq) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)  

[traQ][]用[Hubot][]アダプター

## 使い方

### 新しいbotをつくる

#### インストール
前提として[Node.js][]が必要です
```bash
# 利用ツールのインストール
npm install -g hubot coffee-script yo generator-hubot
# botを管理するディレクトリの作成
mkdir -p /path/to/hubot
cd /path/to/hubot
# テンプレートの作成
yo hubot
```

ここまでしたら、画面にしたがって入力していき、**Bot adapter**と表示されたら`traq`と入力します  
(もしくは`yo hubot`のあとに[すべてコマンド引数で指定することもできます][cmd-docs])

既定で入っているscriptsが存在するので一度除きます(このままだとredisがないだの怒られるため)  
`./external-scripts.json`を開いて`[]`にします  
`package.json`の`dependencies`の`hubot`と`hubot-traq`以外を取り除いて`npm install`をするといいかもしれません  
さらに`./hubot-scripts.json`を消すと非推奨というエラーが出なくなります

```bash
# gitレポジトリの作成
git init
git add .
git commit -m "Init"
```

#### 初期設定
下記の環境変数をそれぞれ設定します
- `HUBOT_TRAQ_NAME` - traQで動かすHubotのtraQ ID (例: `@BOT_TEST`なら`BOT_TEST`)
- `HUBOT_TRAQ_VERIFY_TOKEN` - traQで動かすHubotのVerification Code
- `HUBOT_TRAQ_ACCESS_TOKEN` - traQで動かすHubotのAccess Token
- `HUBOT_TRAQ_PATH` - Botサーバーエンドポイントのパス(直下で受け取るなら`""`、`/webhook/`で受け取るなら`"/webhook/"`)
- `HUBOT_TRAQ_EMBED` - メンション・チャンネルリンクの自動埋め込みの有無(`TRUE`にすると有効、省略時は無効)

Verification CodeなどはそれぞれtraQのBot Consoleから確認できます

#### 実行
```
./bin/hubot -a traq -n "$HUBOT_TRAQ_NAME"
```

#### showcase.yaml
```yml
type: runtime
startup: |
  npm install -g coffee-script
  npm ci
entrypoint: exec node_modules/.bin/hubot -a traq -n "$HUBOT_TRAQ_NAME" "$@"
http_proxy: 8080
```
このようにするとshowcaseで実行できます

#### `javascript` `coffeescript` `typescript`
`./scripts/example.coffee`が存在していますが、拡張子が`.coffee`ではなく`.js`のファイルを`./scripts`に置くことでcoffeescriptではなくJavaScriptで書くことも可能です  
ただし、この場合でも`npm install -g coffee-script`は必要です  

また、Typescriptで書くことも可能です。  
ただし、あまり型の恩恵を受けれないと思います…。  

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
