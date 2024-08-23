const Web3 = require('web3');
const Trade = require('../models/Trade');
const { web3Provider, privateKey } = require('../config');
const web3 = new Web3(web3Provider);

exports.placeOrder = async (req, res) => {
  try {
    const { userId, currencyPair, amount, price, orderType } = req.body;

    if (amount <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Invalid amount or price' });
    }

    const transaction = {
      // Transaction details based on inputs
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    const trade = new Trade({
      userId,
      currencyPair,
      amount,
      price,
      orderType,
      transactionHash: receipt.transactionHash,
      status: 'pending',
    });

    await trade.save();
    res.status(200).json({ transactionHash: receipt.transactionHash });

  } catch (error) {
    res.status(500).json({ message: 'Order placement failed', error: error.message });
  }
};
