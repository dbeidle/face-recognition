const Clarifai = require("clarifai");
const dotenv = require("dotenv");

dotenv.config();
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_SECRET_KEY,
});

const handleApiCall = (req, resp) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      resp.json(data);
    })
    .catch((err) => resp.status(400).json("unable to work with API" + err));
};

const imageHandler = (db) => (req, resp) => {
  const { id, faceCount } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", faceCount)
    .returning("entries")
    .then((faces) => {
      resp.json(faces[0]);
    })
    .catch((err) => resp.status(400).json("Error retreiving data", err));
};

module.exports = {
  imageHandler,
  handleApiCall,
};
