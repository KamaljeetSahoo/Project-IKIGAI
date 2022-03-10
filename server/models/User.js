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
});
const User = new mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
