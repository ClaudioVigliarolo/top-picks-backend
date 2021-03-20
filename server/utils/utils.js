//used to store the last update time in db
const store = require("store");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const knex = require("../db");

const LAST_UPDATE_KEY = "LAST_UPDATE_KEY";

const getCurrentTime = () => {
  return new Date().toISOString().slice(0, 10);
};

const getLastUpdateDate = () => {
  return store.get(LAST_UPDATE_KEY);
};

const encriptPassword = async (password) => {
  const encriptedPassword = await bcrypt.hash(password, 8);
  return encriptedPassword;
};

const verifyPassword = async (pass1, pass2) => {
  const isMatch = await bcrypt.compare(pass1, pass2);
  return true;
};

const setLastUpdateDate = () => {
  store.set(LAST_UPDATE_KEY, getCurrentTime());
};

const generateAuthToken = (_id) => {
  const token = jwt.sign({ _id }, config.JWT_CODE);
  return token;
};

const decodeAuthToken = (token) => {
  const decodedToken = jwt.verify(token, config.JWT_CODE);
  return decodedToken;
};

const isUserConnected = async (id, token) => {
  try {
    const found = await knex("tokens").select("token").where({ id, token });
    if (found) return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  encriptPassword,
  isUserConnected,
  decodeAuthToken,
  generateAuthToken,
  verifyPassword,
};
