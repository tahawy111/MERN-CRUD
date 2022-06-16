const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3002;

// models
const FoodModel = require("./models/FoodModel");

app.get("/", async (req, res) => {
  const food = new FoodModel({ foodName: "Apple", daysSinceIAte: 3 });
  try {
    await food.save();
    res.send("inserted Data");
  } catch (error) {
    console.log(err);
  }
});

mongoose.connect(process.env.DB_URI, () => {
  try {
    console.log("DB Connected");
  } catch (error) {
    console.log(Error(error));
  }
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
