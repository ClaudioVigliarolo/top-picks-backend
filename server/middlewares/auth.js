const {isUserConnected, decodeAuthToken} = require ("../utils/utils");

const config = require('../../config/config')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = decodeAuthToken(token);
        console.log("isUserConnected",decoded._id, token)
        const isUserFound = isUserConnected(decoded._id, token)
        if (!isUserFound) {
            throw new Error("user not found")
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth