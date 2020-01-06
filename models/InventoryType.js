const mongoose = require('mongoose');

const InventoryTypeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String }
});

module.exports = InventoryType = mongoose.model(
  'InventoryType',
  InventoryTypeSchema
);
