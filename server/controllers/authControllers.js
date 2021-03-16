
const {getLastUpdateDate, setLastUpdateDate, generateAuthToken} = require ("../utils/utils");
const config = require('../../config/config')
const knex = require('../db');


async function addUserToken(_id, token)
{

}


exports.login = async (req, res) => {
  const username=req.body.username;
  const password = req.body.password;
  knex 
  .select("username", "language", "id")
  .from('users' ) 
  .where({ "username":username, "password": password})
  .then(data => {
    console.log("authhh",data)
    const token = await generateAuthToken(id);

    //add token to tokens table
    if(!token)
      {
        throw new Error("couldn't generate token")
      }

      console.log("token generate",token)
      knex('tokens') 
      .insert({id, token})
      .then(()=>{
        res.send({ data, token });
      })
      .catch((e) => {console.log(e);
      res.status(500)
      res.send()
    });
  })
  .catch(err => {
      console.log("err")
      res.status(400).send();
  })
}
 
exports.logout = (req, res) => {
router.post('/users/login', async (req, res) => {
  const token=req.body.token;
  knex("token")
  .where("token", token)
  .del()
  .then(() => {
    console.log("ok deleting")
    res.send();
  })
  .catch(err => {
      console.log("err")
      res.status(500).send();
  })
})}
