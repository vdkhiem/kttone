const mongoose = require('mongoose');

const InvoiceDetailSchema = new mongoose.Schema({
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: { type: Number, required: true }
});

module.exports = InvoiceDetail = mongoose.model(
  'InvoiceDetail',
  InvoiceDetailSchema
);
