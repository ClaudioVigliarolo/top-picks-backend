const {
  getLastUpdateDate,
  setLastUpdateDate,
  generateAuthToken,
  encriptPassword,
  verifyPassword,
} = require("../utils/utils");
const config = require("../../config/config");
const knex = require("../db");

//const isMatch = await bcrypt.compare(password, user.password)
exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  console.log(encriptPassword(password));
  try {
    const values = await knex
      .select("id", "username", "password", "type")
      .from("users")
      .where({ username })
      .limit(1);

    //check if user found
    if (!values) {
      throw new Error("User not found");
    }

    const user = values[0];
    console.log("1ok", user);

    //verify password
    if (user && !(await verifyPassword(password, user.password))) {
      //password not verified
      throw new Error("wrong credentials!");
    }

    //generate auth token
    console.log("ok2");
    const token = await generateAuthToken(user.id);
    //add token to tokens table
    if (!token) {
      throw new Error("couldn't generate token");
    }
    console.log("token generate", token);
    await knex("tokens").insert({ id: user.id, token });

    //get user enabled languages
    const languages = await knex
      .select("language")
      .from("user_languages")
      .where({ id: user.id });

    res.send({ type: user.type, username: user.username, languages, token });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
};

exports.register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const languages = req.body.languages;
  const id = req.body.id;
  console.log(req.body);

  try {
    const encriptedPassword = await encriptPassword(password);
    if (!encriptedPassword) {
      throw new Error("couldn't generate password");
    }

    console.log("mypass", encriptedPassword);

    const enabledLanguages = languages.map((language) => ({ id, language }));

    await knex("users").insert({ id, username, password: encriptedPassword });

    await knex("user_languages").insert(enabledLanguages);

    const token = await generateAuthToken(id);
    if (!token) {
      throw new Error("couldn't generate token");
    }
    res.status(201).send({ token });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
};

exports.logout = (req, res) => {
  const token = req.body.token;
  console.log("!!!!", req.body, req.user);
  knex("tokens")
    .where("token", token)
    .del()
    .then(() => {
      console.log("ok deleting");
      res.send();
    })
    .catch((err) => {
      console.log("err" + err);
      res.status(500).send();
    });
};

/*
app.get('/jwt', (req, res) => {
  const token = jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});
*/
