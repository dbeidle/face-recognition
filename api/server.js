const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(cors());

// app.use(express.urlencoded({ extended: false }));
const database = {
  users: [
    {
      id: "id01",
      name: "Dave",
      email: "whosit@noneya.com",
      password: "asdf",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "id02",
      name: "Bailey",
      email: "ruff@noneya.com",
      password: "asdf",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, resp) => {
  //const date = Date.now();
  console.log("hit");
  resp.json(database.users);
});

app.post("/signin", (req, resp) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    resp.json(database.users[0]);
  } else {
    resp.status(400).json("You fucked up");
  }
});

app.post("/signup", (req, resp) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  database.users.push({
    id: "id03",
    Name: name,
    email: email,
    password: hash,
    entries: 0,
    joined: new Date(),
  });

  resp.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, resp) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return resp.json(user);
    }
  });
  if (!found) {
    resp.status(404).json("unknown user");
  }
});

app.put("/image", (req, resp) => {
  const { id, faceCount } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries = user.entries + faceCount;
      return resp.json(user.entries);
    }
  });
  if (!found) {
    resp.status(404).json("unknown user");
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`API server started. Listening on port ${port}`);
});
