const {getLastUpdateDate, setLastUpdateDate, getHash} = require ("../utils/utils");
const config = require('../../config/config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const knex = require('../db');

async function addUserToken(_id, token)
{

}

router.post('/login', async (req, res) => {
    const username=req.body.username;
    const password = req.body.password;

    knex 
    .select("username", "language")
    .from('users' ) 
    .where("password", password)
    .then(data => {
      console.log("uuuu",data)
      const token = await user.generateAuthToken();
      res.send({ data, token });
    })
    .catch(err => {
        console.log("err")
        res.status(400).send();
    })

    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send();
    }
  });
  
  router.post('/users/logout', auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(token => {
        return token.token !== req.token;
      });
      await req.user.save();
  
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  });


module.exports = auth