const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TEST");
});

app.post("/create-blog", (req, res) => {
  res.send("Success");
});

app.get("/get-blogs", (req, res) => {
  res.send("Success");
});

app.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  res.send(id);
});

app.listen(5001, () => {
  console.log("Server started");
});