const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  code: { type: String, required: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  invoiceDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InvoiceStatus'
  },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date }
});

module.exports = Invoice = mongoose.model('Invoice', InvoiceSchema);
