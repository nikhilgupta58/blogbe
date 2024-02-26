const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');

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

const blog = sequelize.define("blog", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});


app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TEST");
});

app.post("/create-blog", async (req, res) => {
  const { title, author,content } = req.body;
  try {
    const newBlog = await blog.create({ title, author, content });
    res.status(200).send("Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating blog post");
  }
});

app.get("/get-blogs", async (req, res) => {
  try {
    const allBlogs = await blog.findAll();
    res.json(allBlogs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching blog posts");
  }
});

app.get("/blog/:id", async (req, res) => {
  try {
    const blogPost = await blog.findByPk(id);
    if (!blogPost) {
      return res.status(404).send("Blog post not found");
    }
    res.json(blogPost);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching blog post");
  }
});

app.listen(5001, () => {
  console.log("Server started");
});