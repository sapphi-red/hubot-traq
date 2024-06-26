import TraQAdapter from "./src/adapter.js"

const NAME_ENV_NAME = "HUBOT_TRAQ_NAME"
const MODE_ENV_NAME = "HUBOT_TRAQ_MODE"
const VERIFY_TOKEN_ENV_NAME = "HUBOT_TRAQ_VERIFY_TOKEN"
const ACCESS_TOKEN_ENV_NAME = "HUBOT_TRAQ_ACCESS_TOKEN"
const PATH_ENV_NAME = "HUBOT_TRAQ_PATH"
const EMBED_ENV_NAME = "HUBOT_TRAQ_EMBED"
const DOMAIN_ENV_NAME = "HUBOT_TRAQ_DOMAIN"

const getEnvs = () => {
  const name = process.env[NAME_ENV_NAME]
  if (typeof name === "undefined") {
    console.warn(`環境変数${NAME_ENV_NAME}が存在しません。意図した動作が得られない可能性があります。`)
  }
  console.info(`環境変数${NAME_ENV_NAME}の存在を確認(${name})`)

  let mode = process.env[MODE_ENV_NAME]
  if (typeof mode === "undefined") {
    console.warn(`環境変数${MODE_ENV_NAME}が存在しません。'HTTP'が利用されます`)
    mode = "HTTP"
  } else {
    console.info(`環境変数${MODE_ENV_NAME}の存在を確認`)
  }
  mode = mode.toUpperCase()
  if (!['HTTP', 'WEBSOCKET'].includes(mode)) {
    throw new Error(`環境変数${MODE_ENV_NAME}の値には'HTTP'または'WebSocket'のみ利用可能です`)
  }

  const accessToken = process.env[ACCESS_TOKEN_ENV_NAME]
  if (typeof accessToken === "undefined") {
    throw new Error(`環境変数${ACCESS_TOKEN_ENV_NAME}が存在しません`)
  }
  console.info(`環境変数${ACCESS_TOKEN_ENV_NAME}の存在を確認`)

  const embed = process.env[EMBED_ENV_NAME] && process.env[EMBED_ENV_NAME].toUpperCase() === "TRUE"
  console.info(`メンション・チャンネルリンクの自動埋め込みは${embed ? "有効" : "無効"}`)

  let domain = process.env[DOMAIN_ENV_NAME]
  if (typeof domain === "undefined") {
    domain = 'q.trap.jp'
  } else {
    console.info(`環境変数${DOMAIN_ENV_NAME}の存在を確認`)
  }

  const verifyToken = process.env[VERIFY_TOKEN_ENV_NAME]
  let path = process.env[PATH_ENV_NAME]
  if (mode === 'HTTP') {
    if (typeof verifyToken === "undefined") {
      throw new Error(`環境変数${VERIFY_TOKEN_ENV_NAME}が存在しません`)
    }
    console.info(`環境変数${VERIFY_TOKEN_ENV_NAME}の存在を確認`)

    if (typeof path === "undefined") {
      console.warn(`環境変数${PATH_ENV_NAME}が存在しません。'/'が利用されます`)
      path = "/"
    } else {
      console.info(`環境変数${PATH_ENV_NAME}の存在を確認`)
    }
  }

  return { mode, accessToken, embed, verifyToken, path, domain }
}

export default {
  use(robot) {
    try {
      return new TraQAdapter(robot, getEnvs())
    } catch (e) {
      console.error(e)
    }
  }
}
