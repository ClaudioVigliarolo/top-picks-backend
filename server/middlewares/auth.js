const { isUserConnected, decodeAuthToken } = require('../utils/utils');
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = decodeAuthToken(token);
    console.log('isUserConnected', decoded._id, token);
    const isUserFound = await isUserConnected(decoded._id, token);
    if (!isUserFound) {
      console.log('not found');
      throw new Error('user not found');
    }

    req.token = token;
    req.userID = decoded._id;
    console.log('calling next');
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
