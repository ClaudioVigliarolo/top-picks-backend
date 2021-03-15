const {getLastUpdateDate, setLastUpdateDate, getHash} = require ("../utils/utils");

const knex = require('../db');

const findUser = (password) => {
    knex 
    .select("username", "language")
    .from('users' ) 
    .where("password", password)
    .then(data => {
      console.log("uuuu",data)
      
    })
    .catch(err => {
        console.log("err")
        return null;
    })
  }
  exports.login = async (req, res) => {
  router.post('/users/login', async (req, res) => {
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
   