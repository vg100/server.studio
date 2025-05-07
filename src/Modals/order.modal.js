const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  equipment: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
    qty: { type: Number, default: 1 },
    rentPerDay: { type: Number, required: true },
    days: { type: Number, required: true },
    status: { type: String, enum: ['Rented Out', 'Returned'], default: 'Rented Out' }
  }],
}, { strict: false });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
