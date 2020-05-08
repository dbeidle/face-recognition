const signupHandler = (db, bcrypt) => (req, resp) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return resp.status(400).json("invalid form submission");
  }
  const hash = bcrypt.hashSync(password, 8);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            resp.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => resp.status(400).json("Error on registration"));
};

module.exports = {
  signupHandler: signupHandler,
};
