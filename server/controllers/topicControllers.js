const {
  getLastUpdateDate,
  setLastUpdateDate,
  getHash,
} = require('../utils/utils');

const knex = require('../db');

exports.categoryAdd = (req, res) => {
  const lang = req.body.lang;
  console.log('My langgg', lang);
  const category = req.body.category;
  knex('categories' + lang)
    .insert('title', category)
    .then(() => {
      setLastUpdateDate(lang);
      res.status(200);
      res.json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
    });
};

exports.questionsAdd = async (req, res) => {
  const { questions, lang } = req.body;

  const newQuestions = questions.map((question) => ({
    id: question.id,
    topic_id: question.topic_id,
    title: question.title,
  }));

  knex('questions' + lang)
    .insert(newQuestions)
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch((e) => {
      console.log(e);
      res.status(500);
      res.send();
    });
};

exports.topicAdd = async (req, res) => {
  const { id, categoriesId, title, source, lang } = req.body;
  const newCategoryTopics = categoriesId.map((categoryId) => ({
    topic_id: id,
    category_id: categoryId,
  }));

  knex('topics' + lang)
    .insert({ id, title, source })
    .then(() => knex('category_topics' + lang).insert(newCategoryTopics))
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch(() => {
      console.log('MYERR');
      res.status(500);
      res.send();
    });
};

exports.categoriesAll = (req, res) => {
  const lang = req.params.lang;
  knex
    .select('*')
    .from('categories' + lang)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.status(500);
      res.send();
    });
};

//get all category topics and topics
exports.topicsAll = (req, res) => {
  const lang = req.params.lang;
  const JSONresponse = {
    topics: [],
    category_topics: [],
    related: [],
  };

  knex
    .select('*')
    .from('topics' + lang)
    .orderBy('timestamp', 'desc')
    .then((data) => {
      JSONresponse['topics'] = data;
    })
    .then(
      knex
        .select('*')
        .from('category_topics' + lang)
        .then((data) => {
          JSONresponse['category_topics'] = data;
          res.json(JSONresponse);
        })
    )
    .catch((err) => {
      res.status(500);
      res.send();
    });
};

exports.questionsAll = (req, res) => {
  const { lang, from, to } = req.params;
  knex
    .select('id', 'topic_id', 'title', 'timestamp')
    .from('questions' + lang)
    .orderBy('timestamp', 'desc')
    .limit(to)
    .offset(from)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500);
      res.send();
    });
};

exports.reportsAll = (req, res) => {
  const lang = req.params.lang;
  knex(`reports${lang}`)
    .join(
      `questions${lang}`,
      `questions${lang}.id`,
      `reports${lang}.question_id`
    )
    .select(
      `questions${lang}.title AS title`,
      ` questions${lang}.id AS question_id`,
      ` questions${lang}.topic_id AS topic_id`,
      ` reports${lang}.reason AS reason`,
      ` reports${lang}.timestamp AS timestamp`
    )
    .then((data) => {
      console.log('reports!', data);
      //we got the reports, now we retrieve the title of the question as well
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
    });
};

exports.reportAdd = async (req, res) => {
  const { lang, report } = req.body;
  knex('reports' + lang)
    .insert({ question_id: report.question_id, reason: report.reason })
    .then(() => {
      console.log('yes');
      res.status(200);
      res.send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
    });
};

exports.getUpdates = (req, res) => {
  const lang = req.params.lang;
  const lastClientUpdate = req.params.date;
  const lastServerUpdate = getLastUpdateDate();
  const JSONresponse = {
    isUpdated: false,
    categories: [],
    questions: [],
    topics: [],
    category_topics: [],
    related: [],
  };
  console.log('client date' + lastClientUpdate);
  console.log('server date' + lastServerUpdate);
  //if it is already up to date return
  if (lastClientUpdate <= lastServerUpdate) {
    JSONresponse.isUpdated = true;
    res.json(JSONresponse);
    return;
  }

  //1 GET CATEGORIES
  knex
    .select('*')
    .from('categories' + lang)
    .then((data) => {
      //console.log("categs",data)
      JSONresponse['categories'] = data;
      //res.json(data)
    })

    .then(
      //2 GET TOPICS
      knex
        .select('*')
        .from('topics' + lang)
        .then((data) => {
          JSONresponse['topics'] = data;
          //console.log("topics",data)
          //res.json(data)
        })
    )

    .then(
      //3 GET CATEGORY_TOPICS
      knex
        .select('*')
        .from('category_topics' + lang)
        .then((data) => {
          JSONresponse['category_topics'] = data;
        })
    )
    .then(
      //4 GET RELATED
      knex
        .select('*')
        .from('related' + lang)
        .then((data) => {
          JSONresponse['related'] = data;
        })
    )
    .then(
      //5 GET QUESTIONS
      knex
        .select('*')
        .from('questions' + lang)
        .then((data) => {
          JSONresponse['questions'] = data;
          res.json(JSONresponse);
        })
    )
    .catch((err) => console.log('error retrieving db' + err));
};

exports.questionUpdate = async (req, res) => {
  const { lang, topicId, title, id } = req.body;

  knex('questions' + lang)
    .update({ title: title, topic_id: topicId, timestamp: Date() })
    .where('id', id)
    .then(() => {
      setLastUpdateDate(lang);
      res.status(200);
      res.json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
    });
};

exports.categoryDelete = (req, res) => {
  const { lang, id } = req.body;

  knex('categories' + lang)
    .where('id', id)
    .del()
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
    });
};

exports.topicDelete = (req, res) => {
  const { lang, id } = req.body;
  //delete the values in category topics table first
  knex('category_topics' + lang)
    .where('topic_id', id)
    .del()
    .then(() => {
      res.status(200);
      res.send();
    })
    .then(() => {
      //delete key in topic table
      knex('topics' + lang)
        .where('id', id)
        .del()
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
          res.send();
        });
    });
};

exports.topicUpdate = async (req, res) => {
  const { lang, id, categoriesId, title } = req.body;
  const newCategoryTopics = categoriesId.map((categoryId) => ({
    topic_id: id,
    category_id: categoryId,
  }));

  knex('topics' + lang)
    .update({ title: title, timestamp: Date() })
    .where('id', id)
    .then(() =>
      //step 1: delete all previous tuples
      knex('category_topics' + lang)
        .where('topic_id', id)
        .del()
    )
    .then(() =>
      //steps 2: add new added topic categories
      knex('category_topics' + lang).insert(newCategoryTopics)
    )
    .then(() => {
      console.log('finish ok');
      res.status(200);
      res.json();
    })
    .catch((err) => {
      console.log(err), res.status(500);
      res.send();
    });
};

exports.categoryAdd = (req, res) => {
  const { lang, id, title } = req.body;
  knex('categories' + lang)
    .insert({ title, id })
    .then(() => {
      setLastUpdateDate(lang);
      res.status(200);
      res.json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
    });
};

exports.categoryUpdate = (req, res) => {
  const { lang, id, title } = req.body;
  knex('categories' + lang)
    .update('title', title)
    .where('id', id)
    .then(() => {
      setLastUpdateDate(lang);
      res.status(200);
      res.json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
    });
};

exports.reportDelete = (req, res) => {
  const { lang, id } = req.body;
  knex('reports' + lang)
    .where('id', id)
    .del()
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
    });
};

exports.questionDelete = async (req, res) => {};
