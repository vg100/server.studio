
const mongoose = require('mongoose');
const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  rentPerDay: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Available', 'Rented Out', 'Maintenance'],
    default: 'Available'
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    trim: true
  },
  addedByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});


const Stock = mongoose.model('Stock', equipmentSchema);

module.exports = Stock;
