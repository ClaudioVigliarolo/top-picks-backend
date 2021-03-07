const {getLastUpdateDate, setLastUpdateDate, getHash} = require ("../utils/utils");

const knex = require('../db');

exports.categoryAdd = (req, res) => {
  knex('categories'+ req.body.lang) 
  .insert({title:req.body.category}) 
  .then(() => {
    setLastUpdateDate();
    res.status(200)
    res.json()
  })
  .catch(err => {
    console.log(err)
    res.status(500)
    res.json({ message: `There was an error retrieving data: ${err}` })
  })
}


async function addQuestion (question, topic, lang)  {
  {
     try {
        await knex('questions'+ lang) 
        .insert({topic, id: getHash(question), title: question })

      }catch(err)
      {
        console.log(err + question)
        throw new Error()
      }
  }
}

exports.questionsAdd = async (req, res) => {
     Promise.all([...req.body.questions.map(async (question) => {
        await addQuestion(question, req.body.topic, req.body.lang )
        })]).then(()=>{
          setLastUpdateDate();
          res.status(200)
          res.send()
        }).catch(err=>{
        res.status(500)
        res.send()
        });
}


exports.topicAdd = async (req, res) => {
  try{
    knex('topics'+ req.body.lang) 
    .insert({title:req.body.topic, source: "TopPicks Creators" })
    .then(()=>{
      req.body.categories.forEach(async categ =>{
     await knex('category_topics'+ req.body.lang) 
      .insert({topic:req.body.topic, category: categ }) 
    });
      setLastUpdateDate();
      res.status(200)
      res.json()
    })
  }catch(err)
  {
    console.log(err),
    res.status(500)
  }
}


exports.categoriesAll = (req, res) => {
  knex 
  .select('title')
  .from('categories'+req.params.lang) 
  .then(data => {
    console.log(data)
    res.json(data)
  })
  .catch(err => {
    res.json({ message: `There was an error retrieving data: ${err}` })
  })
}


exports.topicsAll = (req, res) => {
  knex 
  .select('title') 
  .from('topics'+req.params.lang) 
  .then(data => {
    console.log("topics",data)
    res.json(data)
  })
  .catch(err => {
    res.json({ message: `There was an error retrieving data: ${err}` })
  })
}

exports.reportsAll = (req, res) => {

  knex('reports'+req.params.lang)
    .join('questions'+req.params.lang, 'reports'+req.params.lang+'.id', 'questions'+req.params.lang+'.id')
    .select('reports'+req.params.lang+'.id as id', 'reports'+req.params.lang+'.reason as reason',
     'questions'+req.params.lang+'.topic as topic', 'questions'+req.params.lang+'.title as question'
      )
    .then(data => {
    console.log("reports!",data)
    //we got the reports, now we retrieve the title of the question as well
    res.json(data)
  })
  .catch(err => {
    res.json({ message: `There was an error retrieving data: ${err}` })
  })
}


exports.reportAdd = async (req, res) => {
  console.log("called");
  const report = req.body.report;
  console.log("add", report);
  try{
    knex('reports'+ req.body.lang) 
    .insert({ id: report.id, topic:report.topic,  reason: report.reason})
      .then(()=>{
      setLastUpdateDate();
      res.status(200)
      res.json()
    })
  }catch(err)
  {
    console.log(err),
    res.status(500)
  }
}

exports.getUpdates= (req, res) => {
  const lang = req.params.lang;
  const lastClientUpdate = req.params.date;
  const lastServerUpdate = getLastUpdateDate();
  const JSONresponse={
    isUpdated: false,
    categories:[],
    questions:[],
    topics:[],
    category_topics:[],
    related:[],
  };
  console.log("client date"+ lastClientUpdate)
  console.log("server date"+ lastServerUpdate)
  //if it is already up to date return
  if(lastClientUpdate <= lastServerUpdate)
  {
    JSONresponse.isUpdated=true;
    res.json(JSONresponse)
    return;
  }

  //1 GET CATEGORIES
  knex 
  .select('*') 
  .from('categories'+lang)
  .then(data => {
    //console.log("categs",data)
    JSONresponse['categories']=data;
    //res.json(data)
  })

  .then(
    //2 GET TOPICS
    knex 
    .select('*') 
    .from('topics'+lang) 
    .then(data => {
        JSONresponse['topics']=data;
      //console.log("topics",data)
      //res.json(data)
    }))

    .then(
      //3 GET CATEGORY_TOPICS
      knex 
      .select('*') 
      .from('category_topics'+lang) 
      .then(data => {
        JSONresponse['category_topics']=data;

      }))
      .then(
        //4 GET RELATED
        knex 
        .select('*') 
        .from('related'+lang) 
        .then(data => {
          JSONresponse['related']=data;
        }))
        .then(
          //5 GET QUESTIONS
          knex 
          .select('*') 
          .from('questions'+lang) 
          .then(data => {
            JSONresponse['questions']=data;
            res.json(JSONresponse)
          }))
        .catch((err)=> 
          console.log("error retrieving db"+ err)
      );

}


exports.questionUpdate = async (req, res) => {
  console.log("questionUpdate");
  const id = req.body.id;
  const title = req.body.question;
  const lang = req.body.lang;
 knex('questions'+ lang) 
    .update('title', title)
    .where('id', id)
      .then(()=>{
      setLastUpdateDate();
      res.status(200)
      res.json()
    })
  .catch(err)
  {
    console.log(err),
    res.status(500)
  }
}


exports.categoryAdd = (req, res) => {
  knex('categories'+ req.body.lang) 
  .insert({title:req.body.category}) 
  .then(() => {
    setLastUpdateDate();
    res.status(200)
    res.json()
  })
  .catch(err => {
    console.log(err)
    res.status(500)
    res.json({ message: `There was an error retrieving data: ${err}` })
  })
}

exports.reportDelete  = (req, res) => {
 console.log("repdelete",req.body)
 const id = req.body.id;
 const lang = req.body.lang;
   knex('reports'+ lang) 
  .where('id', id)
  .del()
  .then(() => {
    res.status(200)
    res.send()
  })
  .catch(err => {
    console.log(err)
    res.status(500)
    res.json({ message: `There was an error retrieving data: ${err}` })
  })
} 

exports.questionDelete  = async (req, res) => {
 
}

