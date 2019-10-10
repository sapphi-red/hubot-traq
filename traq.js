const TraQAdapter = require("./src/adapter.js")

const NAME_ENV_NAME = "HUBOT_TRAQ_NAME"
const VERIFY_TOKEN_ENV_NAME = "HUBOT_TRAQ_VERIFY_TOKEN"
const ACCESS_TOKEN_ENV_NAME = "HUBOT_TRAQ_ACCESS_TOKEN"
const PATH_ENV_NAME = "HUBOT_TRAQ_PATH"
const EMBED_ENV_NAME = "HUBOT_TRAQ_EMBED"

const getEnvs = () => {
  const name = process.env[NAME_ENV_NAME]
  if (typeof name === "undefined") {
    console.warn("HUBOT_TRAQ_NAMEが存在しません")
  }

  const verifyToken = process.env[VERIFY_TOKEN_ENV_NAME]
  if (typeof verifyToken === "undefined") {
    throw new Error("HUBOT_TRAQ_VERIFY_TOKENが存在しません")
  }

  const accessToken = process.env[ACCESS_TOKEN_ENV_NAME]
  if (typeof accessToken === "undefined") {
    throw new Error("HUBOT_TRAQ_ACCESS_TOKENが存在しません")
  }

  let path = process.env[PATH_ENV_NAME]
  if (typeof path === "undefined") {
    console.warn("HUBOT_TRAQ_PATHが存在しません。'/'が利用されます")
    path = "/"
  }

  const embed = process.env[EMBED_ENV_NAME] === "TRUE"

  return { verifyToken, accessToken, path, embed }
}

exports.use = robot => {
  try {
    return new TraQAdapter(robot, getEnvs())
  } catch (e) {
    console.error(e)
  }
}
