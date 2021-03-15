import axios from "axios";
import {Category, Question, Report, ReportHandled, RetrievedTopics, Topic} from "../interfaces/Interfaces"
import {HOSTNAME} from "../config/config"
export const getCategories = async (lang:string):Promise<Category[]|null> => {
  try{
    let response = await axios
    .get(`${HOSTNAME}/topicks/categories/`+lang)
    .then((response) => {
      return response.data;
    })
    return response;
  } catch(err){
      console.error(err);
  }
  return null;
}

export const getTopics = async (lang:string):Promise<RetrievedTopics|null> => {
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
  return null;
}

export const addTopic = async ( id: number, title:string, source: string, categoriesId:number[], lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .post(`${HOSTNAME}/topicks/add_topic`, {
      id,
      categoriesId,
      title,
      source,
      lang
    });
      return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}

export const updateTopic = async (id:number, title:string,  categoriesId:number[], lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .put(`${HOSTNAME}/topicks/update_topic`, {
      id,
      title,
      categoriesId,
      lang
    });
    return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}

export const deleteTopic = async (id:number, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .delete(`${HOSTNAME}/topicks/delete_topic`, {
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

export const deleteCategory = async (id:number, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .delete(`${HOSTNAME}/topicks/delete_category`, {
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



export const addQuestions = async (questions:Question[], lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .post(`${HOSTNAME}/topicks/add_questions`, {
      questions,
      lang
    });
      return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}


//updateCategory
export const addCategory = async (title:string, id:number, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .post(`${HOSTNAME}/topicks/add_category`, {
      title,
      id,
      lang
    });
    return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}

export const updateCategory = async (title:string, id:number, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .put(`${HOSTNAME}/topicks/update_category`, {
      title,
      id,
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

export const updateQuestion = async (id:number, title:string, topicId:number, lang:string):Promise<boolean> => {
  try{
    let response = await  axios
    .put(`${HOSTNAME}/topicks/update_question`, {
      id,
      title,
      topicId,
      lang
    });
      return response.status == 200;
  } catch(err){
    console.log(err)
      return false;
  }
}
 
export const deleteReport = async (id:number, lang:string):Promise<boolean> => {
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


export const deleteQuestion = async (id:number, lang:string):Promise<boolean> => {
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



export const getReports = async (lang:string):Promise<ReportHandled[]|null> => {
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
  return null;
}


export const getQuestions = async (lang:string):Promise<Question[]| null> => {
  try{
    let response = await axios
    .get(`${HOSTNAME}/topicks/get_questions/${lang}`)
    .then((response) => {
      return response.data;
    })
    return response;
  } catch(err){
      console.error(err);
  }
  return null;

}

