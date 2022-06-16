const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3002;

// models
const FoodModel = require("./models/FoodModel");

app.post("/insert", async (req, res) => {
  const { foodName, days } = req.body;

  const food = new FoodModel({ foodName, daysSinceIAte: days });
  try {
    await food.save();
    res.send("inserted Data");
  } catch (error) {
    console.log(err);
  }
});
app.get("/read", (req, res) => {
  FoodModel.find((err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const { id, newFoodName } = req.body;
  console.log(req.body);
  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("Updated");
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await FoodModel.findByIdAndRemove(id);
    res.send("Deleted");
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
