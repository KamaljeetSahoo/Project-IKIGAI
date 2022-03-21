const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  enrolledUnder: {
    type: String,
  },
  waterIntake: [
    {
      date: String,
      water: Number
    }
  ],
  food: [
    {
      date: String,
      foodList: [
        {
          foodName: String,
          calories: Number,
          quantity: String,
        }
      ]
    }
  ],
  exercise: [
    {
      date: String,
      exerciseList: [
        {
          exerciseName: String,
          caloriesBurnt: String,
        }
      ],
      totalCaloriesBurnt: Number
    }
  ],
  meditation: [
    {
      date: String,
      time: Number,
    }
  ]
});
const User = new mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
