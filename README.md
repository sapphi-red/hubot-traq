# hubot-traq
[![NPM](https://nodei.co/npm/hubot-traq.png)](https://nodei.co/npm/hubot-traq/) [![Build Status](https://travis-ci.org/sapphi-red/hubot-traq.svg)](https://travis-ci.org/sapphi-red/hubot-traq) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)  

[traQ][]用[Hubot][]アダプター

## 使い方

### 新しいbotをつくる

#### インストール
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

```bash
# gitレポジトリの作成
git init
git add .
git commit -m "Init"
```

#### 初期設定
下記の環境変数をそれぞれ設定します
- `HUBOT_TRAQ_ID` - traQで動かすHubotのUSER ID
- `HUBOT_TRAQ_VERIFY_TOKEN` - traQで動かすHubotのVerification Code
- `HUBOT_TRAQ_ACCESS_TOKEN` - traQで動かすHubotのAccess Token

Verification CodeなどはそれぞれtraQのBot Consoleから確認できます

#### 実行
```
./bin/hubot -a traq -n "your-bot-traq-id"
```
- `your-bot-traq-id` - traQ ID (例: `@BOT_TEST`なら`BOT_TEST`)

#### showcase.yaml
```yml
type: runtime
startup: npm install -g coffee-script && npm install && npm update && export PATH="node_modules/.bin:node_modules/hubot/node_modules/.bin:$PATH"
entrypoint: exec node_modules/.bin/hubot -a traq -n "your-bot-traq-id" "$@"
http_proxy: 8080
```
このようにするとshowcaseで実行できます

#### `javascript` `coffeescript`
`./scripts/example.coffee`が存在していますが、拡張子が`.coffee`ではなく`.js`のファイルを`./scripts`に置くことでcoffeescriptではなくjavascriptで書くことも可能です  
ただし、この場合でも`npm -g coffee-script`は必要です

---

さらに詳しい説明は[hubotのドキュメント][docs]を参照してください

## リファレンス
- [Wiki][]
- [Example][]

[traQ]: https://github.com/traPtitech/traQ/
[Hubot]: https://hubot.github.com/
[cmd-docs]: https://hubot.github.com/docs/
[docs]: https://github.com/github/hubot/tree/master/docs
[Wiki]: https://github.com/sapphi-red/hubot-traq/wiki
[Example]: https://github.com/sapphi-red/traq-hubot-example
