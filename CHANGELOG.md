# Changelog
フォーマットは[Keep a Changelog][]に、バージョンは[Semantic Versioning][]に準拠しています。

## [Unreleased]

## [1.7.2][] - 2020-11-09
### 修正
- スタンプ変化イベントのスタンプ名のフィールド名を`name`から`stampName`に修正

## [1.7.1][] - 2020-11-09
### 修正
- `HUBOT_TRAQ_EMBED`未定義時に動作しないバグの修正
- スタンプ変化イベントのスタンプ名が正しくなかった

## [1.7.0][] - 2020-11-09
### 追加
- スタンプ変化イベントでスタンプ名を参照可能に
### 変更
- `HUBOT_TRAQ_EMBED`を小文字でも有効に (`true`や`True`でも`TRUE`として扱われます)
- `node-traq`を3.4.6-4から3.5.0-2にアップデート

## [1.6.0][] - 2020-10-17
### 追加
- スタンプ変化イベントに対応(`BOT_MESSAGE_STAMPS_UPDATED`)
### 変更
- `node-traq`を3.2.1-3から3.4.6-4にアップデート

## [1.5.4][] - 2020-07-03
### 修正
- 動作しないバグの修正

## [1.5.3][] - 2020-07-02
### 変更
- `node-traq`を3.1.1-0から3.2.1-3にアップデート
- トピック変更イベントをTopicMessageからMessageに(`robot.hear`で流れてこないように)

## [1.5.2][] - 2020-07-02
### 修正
- メンション・チャンネルリンクの自動埋め込み機能が有効な際に`res.reply`のメンションがおかしくなっていたのを修正

## [1.5.1][] - 2020-05-10
### 変更
- `node-traq`を3.0.1-0から3.1.1-0にアップデート
### 修正
- ダミーユーザーのcreatedAtの型がstringではなくDateになっていたのを修正

## [1.5.0][] - 2020-05-10
### 追加
- タグの追加/削除イベントに対応(`TAG_ADDED`/`TAG_REMOVED`)
- チャンネル参加/退出イベントに対応(`JOIN`/`LEFT`)

## [1.4.7][] - 2020-05-03
### 変更
- `node-traq`を3.0.0-29から3.0.1-0にアップデート

## [1.4.6][] - 2020-05-03
### 修正
- メッセージが送信できないバグの修正

## [1.4.5][] - 2020-05-03
### 修正
- メッセージが送信できないバグの修正
- トピックが変更できないバグの修正

## [1.4.4][] - 2020-05-03
### 変更
- `node-traq`を2.8.1-3から3.0.0-29にアップデート
  - これによりtraQ v3 APIに移行しました

## [1.4.3][] - 2019-12-29
### 変更
- 環境変数周りのログの出力の改善

## [1.4.2][] - 2019-12-29
### 変更
- `node-traq`を2.7.7-0から2.8.1-3にアップデート

## [1.4.1][] - 2019-10-10
### 修正
- スタンプが送信できないバグの修正

## [1.4.0][] - 2019-10-10
### 追加
- メンション・チャンネルリンクの自動埋め込み機能(`HUBOT_TRAQ_EMBED`)

### 変更
- `node-traq`を2.7.2-1から2.7.7-0にアップデート
- スタンプを複数個同時に送れるように

## [1.3.4][] - 2019-07-30
### 修正
- スタンプを送信できないバグの修正

## [1.3.3][] - 2019-07-30
### 修正
- スタンプを送信できないバグの修正

## [1.3.2][] - 2019-07-24
### 変更
- 依存関係のバージョンアップ

## [1.3.1][] - 2019-07-24
### 修正
- 使っていない依存関係の削除

## [1.3.0][] - 2019-07-24
### 変更
- スタンプの送信を直列に

## [1.2.1][] - 2019-06-21
### 追加
- `HUBOT_TRAQ_NAME`の利用を推奨
- **CHANGELOG**: 作成

### 変更
- 環境変数が存在しないエラーとその判定を変更
- **README**: Typescriptの例とそれの説明を追加
- **README**: `./hubot-scripts.json`について加筆
- **README**: `showcase.yaml`で`npm ci`を使用するように

### 削除
- `HUBOT_TRAQ_ID`の利用を廃止

## [1.2.0][] - 2019-06-18
### 追加
- `STAMP_CREATED`を受け取れるように

### 変更
- **README**: `HUBOT_TRAQ_PATH`の説明を追加

## [1.1.4][] - 2019-06-15
### 修正
- `.reply()`ができないバグ

## [1.1.3][] - 2019-06-08
### 修正
- 環境変数が空の場合起動できないバグ

## [1.1.2][] - 2019-06-04
### 修正
- メッセージが送信できないバグ

## [1.1.1][] - 2019-06-04
### 修正
- スタンプ送信の際にメッセージ送信が必須になっていたバグ

### 変更
- **README**: `./external-scripts.json`の変更後に`npm install`をすることを加筆

## [1.1.0][] - 2019-06-02
### 追加
- `ChannelCreated`、`UserCreated`に`type`プロパティを追加

### 変更
- **README**: 内容を読みやすく

## [1.0.1][] - 2019-06-02
### 削除
- 不要な処理の削除

## [1.0.0][] - 2019-06-02
### 追加
- 初リリース

[Unreleased]: https://github.com/sapphi-red/hubot-traq/compare/v1.7.2...HEAD
[1.7.2]: https://github.com/sapphi-red/hubot-traq/compare/v1.7.1...v1.7.2
[1.7.1]: https://github.com/sapphi-red/hubot-traq/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/sapphi-red/hubot-traq/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/sapphi-red/hubot-traq/compare/v1.5.4...v1.6.0
[1.5.4]: https://github.com/sapphi-red/hubot-traq/compare/v1.5.3...v1.5.4
[1.5.3]: https://github.com/sapphi-red/hubot-traq/compare/v1.5.2...v1.5.3
[1.5.2]: https://github.com/sapphi-red/hubot-traq/compare/v1.5.1...v1.5.2
[1.5.1]: https://github.com/sapphi-red/hubot-traq/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/sapphi-red/hubot-traq/compare/v1.4.7...v1.5.0
[1.4.7]: https://github.com/sapphi-red/hubot-traq/compare/v1.4.6...v1.4.7
[1.4.6]: https://github.com/sapphi-red/hubot-traq/compare/v1.4.5...v1.4.6
[1.4.5]: https://github.com/sapphi-red/hubot-traq/compare/v1.4.4...v1.4.5
[1.4.4]: https://github.com/sapphi-red/hubot-traq/compare/v1.4.3...v1.4.4
[1.4.3]: https://github.com/sapphi-red/hubot-traq/compare/v1.4.2...v1.4.3
[1.4.2]: https://github.com/sapphi-red/hubot-traq/compare/v1.4.1...v1.4.2
[1.4.1]: https://github.com/sapphi-red/hubot-traq/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/sapphi-red/hubot-traq/compare/v1.3.4...v1.4.0
[1.3.4]: https://github.com/sapphi-red/hubot-traq/compare/v1.3.3...v1.3.4
[1.3.3]: https://github.com/sapphi-red/hubot-traq/compare/v1.3.2...v1.3.3
[1.3.2]: https://github.com/sapphi-red/hubot-traq/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/sapphi-red/hubot-traq/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/sapphi-red/hubot-traq/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/sapphi-red/hubot-traq/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/sapphi-red/hubot-traq/compare/v1.1.4...v1.2.0
[1.1.4]: https://github.com/sapphi-red/hubot-traq/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/sapphi-red/hubot-traq/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/sapphi-red/hubot-traq/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/sapphi-red/hubot-traq/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/sapphi-red/hubot-traq/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/sapphi-red/hubot-traq/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/sapphi-red/hubot-traq/releases/tag/v1.0.0

[Keep a Changelog]: https://keepachangelog.com/en/1.0.0/
[Semantic Versioning]: https://semver.org/spec/v2.0.0.html
