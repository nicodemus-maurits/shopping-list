const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const items = require("./routes/api/items");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// Middleware to be able to parse request to json
app.use(express.json());

app.use("/api/v1/items", items);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
