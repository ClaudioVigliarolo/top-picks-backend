import axios from "axios";
import {Category, Question, Report, Topic} from "../interfaces/Interfaces"
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

export const getUpdates = async (date:string, lang:string):Promise<Topic[]> => {
  try{
    let response = await axios
    .get(`${HOSTNAME}/topicks/get_updates/${date}/${lang}`)
    .then((response) => {
      console.log(response)
      return response.data;
    })
    return response;
  } catch(err){
      console.error(err);
  }
  return []
}


export const addReport = async (report:Report, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .post(`${HOSTNAME}/topicks/add_report`, {
      report,
      lang
    });
      return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}

export const updateQuestion = async (id:number, question:string, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .put(`${HOSTNAME}/topicks/update_question`, {
      id,
      question,
      lang
    });
      return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}
 
export const removeReport = async (id:number, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .delete(`${HOSTNAME}/topicks/delete_report`, {
      data:{
        id,
        lang
      }
    });
      return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}


export const removeQuestion = async (id:number, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .delete(`${HOSTNAME}/topicks/delete_question`, {
      data:{
        id,
        lang
    }
    });
      return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}



export const getReports = async (lang:string):Promise<Report[]> => {
  try{
    let response = await axios
    .get(`${HOSTNAME}/topicks/get_reports/${lang}`)
    .then((response) => {
      console.log(response)
      return response.data;
    })
    return response;
  } catch(err){
      console.error(err);
  }
  return []
}


