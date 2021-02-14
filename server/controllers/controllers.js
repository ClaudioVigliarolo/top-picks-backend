// Import database
const knex = require('../db')

// Retrieve all topics
exports.categoryAdd = async (req, res) => {
  knex('categories'+ req.body.lang) 
  .insert({title:req.body.category}) // select all records
  .then(() => {
    // Send books extracted from database in response
    res.status(200)
    res.json()
  })
  .catch(err => {
    // Send a error message in response
    console.log(err)
    res.status(500)
    res.json({ message: `There was an error retrieving data: ${err}` })
  })
}

function getHash(str) {
  var hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}


async function addQuestion  (question, topic, lang)  {
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
          res.status(200)
          res.send()
        }).catch(err=>{
        res.status(500)
        res.send()

        });
}
 


exports.topicAdd = async (req, res) => {
  console.log("ttrrrrrrrr",req.body.categories)
  console.log("lan",req.body.lang)
  console.log("top",req.body.topic)
  try{
    //1: add topic to topicsLANG table
    knex('topics'+ req.body.lang) 
    .insert({title:req.body.topic, source: "TopPicks Creators" })// select all records
    .then(()=>{
      //2: foeach categ: add a tuple category, topic in the category_topics table
      req.body.categories.forEach(async categ =>{
     await knex('category_topics'+ req.body.lang) 
      .insert({topic:req.body.topic, category: categ }) // select all records
    });
      res.status(200)
      res.json()
    }).catch((err)=>console.log(err),
    res.status(500))
  }catch(err)
  {
    console.log(err),
    res.status(500)
  }
}


// Retrieve all categories
exports.categoriesAll = async (req, res) => {
  // Get all books from database
  knex 
  .select('title') // select all records
  .from('categories'+req.params.lang) // from 'books' table
  .then(userData => {
    // Send books extracted from database in response
    console.log(userData)
    res.json(userData)
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error retrieving data: ${err}` })
  })
}


// Retrieve all categories
exports.topicsAll = async (req, res) => {
  // Get all books from database
  knex 
  .select('title') // select all records
  .from('topics'+req.params.lang) // from 'books' table
  .then(userData => {
    // Send books extracted from database in response
    console.log("topics",userData)
    res.json(userData)
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error retrieving data: ${err}` })
  })
}


