const mongoose = require('mongoose');

const InvoiceStatusSchema = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = InvoiceStatus = mongoose.model(
  'InvoiceStatus',
  InvoiceStatusSchema
);
