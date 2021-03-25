import axios from 'axios';
import {
  Category,
  CreatedUser,
  Question,
  Report,
  ReportHandled,
  RetrievedTopics,
  Topic,
  LoggedUser,
} from '../interfaces/Interfaces';
import { HOSTNAME } from '../config/config';

export const getCategories = async (
  lang: string,
  token: string
): Promise<Category[] | null> => {
  console.log('getc ategoris tiktok', token);
  try {
    let response = await axios
      .get(`${HOSTNAME}/topicks/categories/` + lang, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        console.log('MY RES');
        return response.data;
      });
    return response;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const getUsers = async (
  token: string
): Promise<CreatedUser[] | null> => {
  try {
    let response = await axios
      .get(`${HOSTNAME}/users/all`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        return response.data;
      });
    return response;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const getTopics = async (
  lang: string,
  token: string
): Promise<RetrievedTopics | null> => {
  try {
    let response = await axios
      .get(`${HOSTNAME}/topicks/topics/` + lang, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        return response.data;
      });
    return response;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const addTopic = async (
  id: number,
  title: string,
  source: string,
  categoriesId: number[],
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.post(
      `${HOSTNAME}/topicks/add_topic`,
      {
        id,
        categoriesId,
        title,
        source,
        lang,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateTopic = async (
  id: number,
  title: string,
  categoriesId: number[],
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.put(
      `${HOSTNAME}/topicks/update_topic`,
      {
        id,
        title,
        categoriesId,
        lang,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteTopic = async (
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.delete(`${HOSTNAME}/topicks/delete_topic`, {
      data: {
        id,
        lang,
      },

      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteUser = async (
  id: number,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.delete(`${HOSTNAME}/users/delete`, {
      data: {
        id,
      },

      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.status == 201;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//updateCategory
export const addUser = async (
  user: CreatedUser,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.post(
      `${HOSTNAME}/users/register`,
      {
        user,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    return response.status == 201;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateUser = async (
  user: CreatedUser,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.put(
      `${HOSTNAME}/users/update`,
      {
        user,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const emailUser = async (
  username: string,
  email: string,
  password: string,
  languages: string[],
  content: string,
  senderEmail: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.post(
      `${HOSTNAME}/users/mail`,
      {
        username,
        email,
        password,
        languages,
        senderEmail,
        content,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteCategory = async (
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.delete(`${HOSTNAME}/topicks/delete_category`, {
      data: {
        id,
        lang,
      },

      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addQuestions = async (
  questions: Question[],
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.post(
      `${HOSTNAME}/topicks/add_questions`,
      {
        questions,
        lang,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addCategory = async (
  title: string,
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.post(
      `${HOSTNAME}/topicks/add_category`,
      {
        title,
        id,
        lang,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateCategory = async (
  title: string,
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.put(
      `${HOSTNAME}/topicks/update_category`,
      {
        title,
        id,
        lang,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getUpdates = async (
  date: string,
  lang: string
): Promise<Topic[]> => {
  try {
    let response = await axios
      .get(`${HOSTNAME}/topicks/updates/${date}/${lang}`)
      .then((response) => {
        console.log(response);
        return response.data;
      });
    return response;
  } catch (err) {
    console.error(err);
  }
  return [];
};

export const addReport = async (
  report: Report,
  lang: string
): Promise<boolean> => {
  try {
    let response = await axios.post(`${HOSTNAME}/topicks/add_report`, {
      report,
      lang,
    });
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateQuestion = async (
  id: number,
  title: string,
  topicId: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.put(
      `${HOSTNAME}/topicks/update_question`,
      {
        id,
        title,
        topicId,
        lang,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteReport = async (
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.delete(`${HOSTNAME}/topicks/delete_report`, {
      data: {
        id,
        lang,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteQuestion = async (
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    let response = await axios.delete(`${HOSTNAME}/topicks/delete_question`, {
      data: {
        id,
        lang,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getReports = async (
  lang: string,
  token: string
): Promise<ReportHandled[] | null> => {
  try {
    let response = await axios
      .get(`${HOSTNAME}/topicks/reports/${lang}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });
    return response;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const getQuestions = async (
  lang: string,
  token: string
): Promise<Question[] | null> => {
  try {
    let response = await axios
      .get(`${HOSTNAME}/topicks/questions/${lang}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        return response.data;
      });
    return response;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const login = async (
  email: string,
  password: string
): Promise<LoggedUser | null> => {
  try {
    let response = await axios.post(`${HOSTNAME}/users/login`, {
      email,
      password,
    });
    return response.status == 200 ? response.data : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getUser = async (token: string): Promise<LoggedUser | null> => {
  try {
    let response = await axios.get(`${HOSTNAME}/users/me`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.status == 200 ? response.data : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const logoutUser = async (token: string): Promise<string[] | null> => {
  try {
    let response = await axios
      .delete(`${HOSTNAME}/users/logout`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: {
          token,
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
    return response;
  } catch (err) {
    console.error(err);
  }
  return null;
};
