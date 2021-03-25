//used to store the last update time in db
const store = require('store');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../db');

const LAST_UPDATE_KEY = 'LAST_UPDATE_KEY';

const getCurrentTime = () => {
  return new Date().toISOString().slice(0, 10);
};

const getLastUpdateDate = () => {
  const storedDate = store.get(LAST_UPDATE_KEY);
  return storedDate ? storedDate : Date();
};

const encriptPassword = async (password) => {
  const encriptedPassword = await bcrypt.hash(password, 8);
  return encriptedPassword;
};

const verifyPassword = async (pass1, pass2) => {
  const isMatch = await bcrypt.compare(pass1, pass2);
  return isMatch;
};

const setLastUpdateDate = (LANG_PREFIX) => {
  console.log('ecco linguaset', LANG_PREFIX);
  store.set(LAST_UPDATE_KEY + LANG_PREFIX, getCurrentTime());
};

const generateAuthToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_CODE);
  return token;
};

const decodeAuthToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_CODE);
  return decodedToken;
};

const isUserConnected = async (id, token) => {
  try {
    const found = await knex('tokens').select('token').where({ id, token });
    if (found) return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  setLastUpdateDate,
  getLastUpdateDate,
  encriptPassword,
  isUserConnected,
  decodeAuthToken,
  generateAuthToken,
  verifyPassword,
};
