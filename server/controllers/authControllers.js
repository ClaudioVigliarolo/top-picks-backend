const {
  getLastUpdateDate,
  setLastUpdateDate,
  generateAuthToken,
  encriptPassword,
  verifyPassword,
} = require('../utils/utils');
const mailer = require('../utils/mailer'); // In the top of the file
const knex = require('../db');

//const isMatch = await bcrypt.compare(password, user.password)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('my root hashed pass', await encriptPassword('gennaio'));
  try {
    const values = await knex
      .select('id', 'username', 'email', 'password', 'type')
      .from('users')
      .where('email', email)
      .limit(1);

    //check if user found
    if (!values) {
      throw new Error('LoggedUser not found');
    }

    const user = values[0];
    console.log('a meta');

    //verify password
    if (!user || !(await verifyPassword(password, user.password))) {
      //password not verified
      throw new Error('wrong credentials!');
    }
    console.log('crdentials verified');
    console.log('ecco lo user obje', user);

    //generate auth token
    const token = generateAuthToken(user.id);
    //add token to tokens table
    if (!token) {
      throw new Error("couldn't generate token");
    }
    console.log('token generate', token);
    await knex('tokens').insert({ id: user.id, token });

    //get user enabled languages
    const languages = await knex
      .select('language')
      .from('user_languages')
      .where({ id: user.id });
    console.log('sending cookie');
    res.send({
      type: user.type,
      username: user.username,
      email: user.email,
      languages: languages.map((l) => l.language),
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
};

exports.register = async (req, res) => {
  const { user } = req.body.user;
  const { username, password, type, email, languages, id } = req.body.user;

  try {
    const encriptedPassword = await encriptPassword(password);

    if (!encriptedPassword) {
      throw new Error("couldn't generate password");
    }

    const enabledLanguages = languages.map((language) => ({ id, language }));
    await knex('users').insert({
      id,
      username,
      email,
      type,
      password: encriptedPassword,
    });

    await knex('user_languages').insert(enabledLanguages);

    res.status(201).send();
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
};

exports.logout = (req, res) => {
  const token = req.token;
  knex('tokens')
    .where('token', token)
    .del()
    .then(() => {
      console.log('ok deleting');
      res.send();
    })
    .catch((err) => {
      console.log('err' + err);
      res.status(500).send();
    });
};

exports.user = async (req, res) => {
  const token = req.token;
  const id = req.userID;

  try {
    const values = await knex.select('*').from('users').where('id', id);

    //check if user found
    if (!values || values.length == 0) {
      throw new Error('LoggedUser not found');
    }

    const user = values[0];

    //get user enabled languages
    const languages = await knex
      .select('language')
      .from('user_languages')
      .where('id', id);
    res.send({
      type: user.type,
      username: user.username,
      email: user.email,
      languages: languages.map((l) => l.language),
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
};

exports.userDelete = async (req, res) => {
  const id = req.body.id;

  try {
    await knex('users').where('id', id).del();
    await knex('tokens').where('id', id).del();
    res.status(201).send();
  } catch (err) {
    console.log('err' + err);
    res.status(500).send();
  }
};
exports.userUpdate = async (req, res) => {
  const { username, password, type, email, languages, id } = req.body.user;

  const encriptedPassword = await encriptPassword(password);
  console.log('myquora', req.body);
  try {
    await knex('users')
      .update({
        username,
        password: encriptedPassword,
        type,
        email,
      })
      .where('id', id);

    const updatedLanguages = languages.map((language) => ({ id, language }));

    //remove old languages
    await knex('user_languages').where('id', id).del();

    //push new languages
    await knex('user_languages').insert(updatedLanguages);
    //the updated user will have to sign up again with
    //the updated credentials. Hence, remove all of his tokens
    await knex('tokens').where('id', id).del();

    res.status(200).send();
  } catch (err) {
    console.log('err' + err);
    res.status(500).send();
  }
};

exports.usersAll = async (req, res) => {
  const rootID = req.userID;
  try {
    //get all the users (except the root user)
    const usersArray = await knex
      .select('*')
      .from('users')
      .whereNot('id', rootID);

    //get user enabled languages for every user
    const usersLanguages = await knex
      .select('*')
      .from('user_languages')
      .whereNot('id', rootID);

    //should never come here
    if (!usersArray || !usersLanguages) {
      throw new Error('Error users/languages not found');
    }

    const users = usersArray.map((user) => {
      const userId = user.id;
      //decript password
      const languages = [];
      usersLanguages.forEach((o) => {
        if (o.id === userId) languages.push(o.language);
      });
      user.languages = languages;
      return { ...user };
    });

    res.send(users);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
};

exports.mail = async (req, res) => {
  const {
    username,
    email,
    password,
    languages,
    template,
    senderEmail,
    subject,
  } = req.body;
  console.log('email data body', req.body);
  const locals = { username, email, password };
  const messageInfo = {
    email,
    fromEmail: senderEmail,
    fromName: 'Top Picks',
    subject,
  };
  mailer
    .sendOne(template, messageInfo, locals)
    .then(() => {
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
};
