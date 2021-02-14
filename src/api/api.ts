import axios from "axios";
import {Category, Topic} from "../interfaces/Interfaces"
import {HOSTNAME} from "../config/config"
export const getCategories = async (lang:string):Promise<Category[]> => {
  try{
    let response = await axios
    .get(`${HOSTNAME}/topicks/categories/`+lang)
    .then((response) => {
      console.log("prim",response.data)
      return response.data;
    })
    return response;
  } catch(err){
      console.error(err);
  }
  return []
}

export const getTopics = async (lang:string):Promise<Topic[]> => {
  try{
    let response = await axios
    .get(`${HOSTNAME}/topicks/topics/`+lang)
    .then((response) => {
      return response.data;
    })
    return response;
  } catch(err){
      console.error(err);
  }
  return []
}

export const addTopic = async (categories:string[], newTopic:string, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .post(`${HOSTNAME}/topicks/add_topic`, {
      categories,
      topic:newTopic,
      lang
    });
      return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}

export const addQuestions = async (questions:string[], topic:string, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .post(`${HOSTNAME}/topicks/add_questions`, {
      questions,
      topic,
      lang
    });
    console.log("stttt", response)
      return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}

export const addCategory = async (newCateg:string, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .post(`${HOSTNAME}/topicks/add_category`, {
      category: newCateg,
      lang
    });
    return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}

