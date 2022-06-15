const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.DB_URI, () => {
  try {
    console.log("DB Connected");
  } catch (error) {
    console.log(Error(error));
  }
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
