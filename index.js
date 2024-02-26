const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.sync().then(() => console.log('DB Connect')).catch((e) => console.error(e))

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