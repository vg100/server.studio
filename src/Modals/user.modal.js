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
    canCreateOrders: { type: Boolean, default: false },
    canEditOrders: { type: Boolean, default: false },
    canDeleteOrders: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model("User", userSchema);


