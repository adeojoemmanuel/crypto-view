const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  blockNumber: String,
  timeStamp: String,
  hash: String,
  from: String,
  to: String,
  value: String,
  gas: String,
  gasPrice: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);