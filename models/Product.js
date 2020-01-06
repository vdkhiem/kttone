const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
  unit: { type: String, required: true },
  isGST: { type: Boolean, default: false },
  gst: { type: Number }
});

module.exports = Product = mongoose.model('Product', ProductSchema);
