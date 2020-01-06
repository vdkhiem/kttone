const mongoose = require('mongoose');

const SystemSetupSchema = new mongoose.Schema({
  code: { type: String, required: true },
  value: { type: String, required: true }
});

module.exports = SystemSetup = mongoose.model('SystemSetup', SystemSetupSchema);
