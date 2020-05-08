const profileHandlerGET = (db) => (req, resp) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        resp.json(user[0]);
      } else {
        resp.status(404).json("unknown user");
      }
    })
    .catch((err) => resp.status(400).json("Error retreiving data"));
};

module.exports = {
  profileHandlerGET,
};
