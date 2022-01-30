const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./db/connection");

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
});
