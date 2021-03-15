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
  