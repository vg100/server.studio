const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String },
  pickupBy: { type: String },
  phone: { type: String },
  pickupDate: { type: String },
  dropDate: { type: String },
  equipment: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
    qty: { type: Number, default: 1 },
    rentPerDay: { type: Number, required: true },
    days: { type: Number, required: true },
    status: { type: String, enum: ['Rented Out', 'Returned'], default: 'Rented Out' }
  }],
  totalAmount: { type: Number },
  totalBalance: { type: Number },
  paid: { type: String },
  discount: { type: String },
  outstanding: { type: Number },
}, { strict: false });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
