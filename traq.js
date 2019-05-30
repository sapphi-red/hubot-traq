const TraQAdapter = require("./src/adapter.js");

const ID_ENV_NAME = "HUBOT_TRAQ_ID";
const VERIFY_TOKEN_ENV_NAME = "HUBOT_TRAQ_VERIFY_TOKEN";
const ACCESS_TOKEN_ENV_NAME = "HUBOT_TRAQ_ACCESS_TOKEN";
const PATH_ENV_NAME = "HUBOT_TRAQ_PATH";

const getEnvs = () => {
  const id = process.env[ID_ENV_NAME];
  if (!id) {
    throw new Error("HUBOT_TRAQ_IDが存在しません");
  }

  const verifyToken = process.env[VERIFY_TOKEN_ENV_NAME];
  if (!verifyToken) {
    throw new Error("HUBOT_TRAQ_VERIFY_TOKENが存在しません");
  }

  const accessToken = process.env[ACCESS_TOKEN_ENV_NAME];
  if (!accessToken) {
    throw new Error("HUBOT_TRAQ_ACCESS_TOKENが存在しません");
  }

  const path = process.env[PATH_ENV_NAME];
  if (!path) {
    throw new Error("HUBOT_TRAQ_PATHが存在しません");
  }

  return { id, verifyToken, accessToken, path };
};

exports.use = robot => {
  try {
    return new TraQAdapter(robot, getEnvs());
  } catch (e) {
    console.error(e);
  }
};
