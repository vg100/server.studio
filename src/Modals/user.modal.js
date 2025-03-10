const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'broker'],
    default: 'broker'
  },
  permissions: {
    canCreateTasks: { type: Boolean, default: false },
    canEditTasks: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model("User", userSchema);


