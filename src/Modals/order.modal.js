const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { strict: false });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
