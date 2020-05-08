const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");

const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgres",
    database: "face-recog",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
  //const date = Date.now();
  console.log("hit");
});

app.post("/signin", signin.signinHandler(db, bcrypt));

app.post("/signup", signup.signupHandler(db, bcrypt));

app.get("/profile/:id", profile.profileHandlerGET(db));

app.put("/image", image.imageHandler(db));
app.post("/imageurl", (req, resp) => {
  image.handleApiCall(req, resp);
});

const port = 3001;
app.listen(port, () => {
  console.log(`API server started. Listening on port ${port}`);
});
