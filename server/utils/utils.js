//used to store the last update time in db
const store = require('store')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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



   const getHash=(str)=> {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }


const generateAuthToken=(_id)=>{
  const token = jwt.sign({ _id }, config.JWT_CODE)
  return token;
  }

  