# Changelog
フォーマットは[Keep a Changelog][]に、バージョンは[Semantic Versioning][]に準拠しています。

## [Unreleased]
### 変更
- 依存関係のバージョンアップ

## [1.3.1][] - 2019-07-24
### 修正
- 使っていない依存関係の削除

## [1.3.0][] - 2019-07-24
### 変更
- スタンプの送信を直列に

# [1.2.1][] - 2019-06-21
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

# [1.2.0][] - 2019-06-18
### 追加
- `STAMP_CREATED`を受け取れるように

### 変更
- **README**: `HUBOT_TRAQ_PATH`の説明を追加

# [1.1.4][] - 2019-06-15
### 修正
- `.reply()`ができないバグ

# [1.1.3][] - 2019-06-08
### 修正
- 環境変数が空の場合起動できないバグ

# [1.1.2][] - 2019-06-04
### 修正
- メッセージが送信できないバグ

# [1.1.1][] - 2019-06-04
### 修正
- スタンプ送信の際にメッセージ送信が必須になっていたバグ

### 変更
- **README**: `./external-scripts.json`の変更後に`npm install`をすることを加筆

# [1.1.0][] - 2019-06-02
### 追加
- `ChannelCreated`、`UserCreated`に`type`プロパティを追加

### 変更
- **README**: 内容を読みやすく

# [1.0.1][] - 2019-06-02
### 削除
- 不要な処理の削除

# [1.0.0][] - 2019-06-02
### 追加
- 初リリース

[Unreleased]: https://github.com/sapphi-red/hubot-traq/compare/v1.3.0...HEAD
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
