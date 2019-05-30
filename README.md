# hubot-traq
[traQ][]用[Hubot][]アダプター

## 使い方

#### 新しいbotをつくる

- `npm install -g hubot coffee-script yo generator-hubot`
- `mkdir -p /path/to/hubot`
- `cd /path/to/hubot`
- `yo hubot`と打ち**Bot adapter**と表示されたら`traq`と入力します(もしくは[すべてコマンド引数で指定します][cmd-docs])
- gitを初期化(init)して初回コミットをします
- ビルドのより詳しい説明は[hubotのドキュメント][docs]を参照してください

#### ローカルでbotをテストする

- `HUBOT_TRAQ_ID=your-id HUBOT_TRAQ_TOKEN=your-token ./bin/hubot --adapter traq`

## 設定
このアダプターは以下の環境変数を利用します

- `HUBOT_TRAQ_ID` - traQで動かすHubotのBOT ID
- `HUBOT_TRAQ_TOKEN` - traQで動かすHubotのtoken



[traQ]: https://github.com/traPtitech/traQ/
[Hubot]: https://hubot.github.com/
[cmd-docs]: https://hubot.github.com/docs/
[docs]: https://github.com/github/hubot/tree/master/docs
