const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: { type: String },
  shipAddress: { type: String },
  shipPostalCode: { type: String },
  shipState: { type: String },
  shipCity: { type: String },
  billAddress: { type: String },
  billPostalCode: { type: String },
  billState: { type: String },
  billCity: { type: String }
});

module.exports = Customer = mongoose.model('Customer', CustomerSchema);
