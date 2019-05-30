const TraQAdapter = require("./src/adapter.js");

const ID_ENV_NAME = "HUBOT_TRAQ_ID";
const TOKEN_ENV_NAME = "HUBOT_TRAQ_TOKEN";
const PATH_ENV_NAME = "HUBOT_TRAQ_PATH";

const getEnvs = () => {
  const id = process.env[ID_ENV_NAME];
  if (!id) {
    throw new Error("HUBOT_TRAQ_IDが存在しません");
  }

  const token = process.env[TOKEN_ENV_NAME];
  if (!token) {
    throw new Error("HUBOT_TRAQ_TOKENが存在しません");
  }

  const path = process.env[TOKEN_ENV_PATH];
  if (!path) {
    throw new Error("HUBOT_TRAQ_PATHが存在しません");
  }

  return { id, token, path };
};

exports.use = robot => {
  return new TraQAdapter(robot, getEnvs());
};
