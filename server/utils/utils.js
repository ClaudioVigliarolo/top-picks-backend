//used to store the last update time in db
const store = require('store')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const knex = require('../db');


 const LAST_UPDATE_KEY="LAST_UPDATE_KEY";

  const getCurrentTime=()=>{
  return new Date().toISOString().slice(0,10);
  }

  const getLastUpdateDate=()=>{
   return store.get(LAST_UPDATE_KEY);
 }


  const setLastUpdateDate=()=>{
  store.set(LAST_UPDATE_KEY, getCurrentTime())
}

  const generateAuthToken=(_id)=>{
  const token = jwt.sign({ _id }, config.JWT_CODE)
  return token;
  }


  const decodeAuthToken=(token)=>{
   const decodedToken = jwt.verify(token, config.JWT_CODE);
    return decodedToken;
    }
  
  

  const isUserConnected=async (id,token)=>{
  knex('tokens') 
  .select('1')
    .where({id, token})
      .then(()=>{
        //exist ok
        return true;
    })
    .catch(err => {
        return false;
    })
} 
  

  
