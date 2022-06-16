import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  const updateFood = (id) => {
    axios.put("http://localhost:3001/update", { id: id, newFoodName });
  };

  const AddTolist = () => {
    axios.post("http://localhost:3001/insert", { foodName, days });
  };
  const deleteFood = (id) => {
    axios.get(`http://localhost:3001/delete/${id}`, { foodName, days });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/read").then(async (response) => {
      setFoodList(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>CRUD App With MERN</h1>
      <label htmlFor="foodname">Food Name:</label>
      <input
        type="text"
        name=""
        id="foodname"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <label htmlFor="Days">Days Since You Ate It:</label>
      <input
        type="number"
        name=""
        id="Days"
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
      <button onClick={AddTolist}>Add To List</button>
      <hr />
      <h1>Food List</h1>
      {foodList.map((val, key) => {
        return (
          <div key={key} className="food">
            <h1>
              Food Name: {val.foodName}, Days Since I Ate: {val.daysSinceIAte}
            </h1>
            <input
              type="text"
              placeholder="New Food Name..."
              onChange={(e) => {
                setNewFoodName(e.target.value);
              }}
            />
            <button onClick={() => updateFood(val._id)}>Update</button>

            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
