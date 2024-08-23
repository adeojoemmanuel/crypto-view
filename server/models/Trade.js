const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  userId: String,
  timestamp: { type: Date, default: Date.now },
  currencyPair: String,
  amount: Number,
  price: Number,
  orderType: String,
  transactionHash: String,
  status: { type: String, enum: ['pending', 'confirmed', 'failed'], default: 'pending' },
});

module.exports = mongoose.model('Trade', tradeSchema);