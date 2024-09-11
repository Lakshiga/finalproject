// models/Umpire.js
const mongoose = require('mongoose');

const UmpireSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Umpire verification status
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Umpire', UmpireSchema);
