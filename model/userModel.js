const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "MANAGER", "USER"],
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    // required: true,
  },
  managerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    // required: true,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
