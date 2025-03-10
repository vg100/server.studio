const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pickup: {
    dateTime: { type: Date, required: true }
  },
  customerName:{ type: String },
  customerPhoneNo:{ type: Number },
  drop: {
    dateTime: { type: Date, required: true }
  },
  equipment: [
    {
      name: { type: String, required: true },
      serialNumber: { type: String },
      rentPerDay: { type: Number, required: true },
      days: { type: Number, required: true },
      totalAmount: { type: Number, required: true }
    }
  ],
  accessories: {
    battery: { type: String },
    charger: { type: String },
    bag: { type: String },
    memoryCard: { type: String },
    chargingCable: { type: String }
  },
  otherAccessories: {
    hood: { type: Number },
    caps: { type: Number }
  },
  pricing: {
    totalAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    balanceAmount: { type: Number, required: true }
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
