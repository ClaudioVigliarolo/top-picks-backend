const { isUserConnected, decodeAuthToken } = require("../utils/utils");

const config = require("../../config/config");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = decodeAuthToken(token);
    console.log("isUserConnected", decoded._id, token);
    const isUserFound = await isUserConnected(decoded._id, token);
    console.log("uu", isUserFound);
    if (!isUserFound) {
      throw new Error("user not found");
    }
    console.log("calling prima");

    req.token = token;
    console.log("calling next");
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
