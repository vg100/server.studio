const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { strict: false });


module.exports = mongoose.model('Stock', stockSchema);;
