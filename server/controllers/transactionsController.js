const TransactionsSchema = require("../models/transactionsModel.js");
const PortfolioSchema = require("../models/userPortfolioModel.js");
const mongoose = require("mongoose");
const axios = require('axios');
const Transaction = require('./../models/transaction.js');

const createTransaction = async (req, res) => {
  const { id, quantity, price, spent, date } = req.body;

  const user_id = req.user._id;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!id) {
    return res.status(400).json({ error: "Please provide an ID" });
  }

  if (!quantity) {
    return res.status(400).json({ error: "Please provide a quantity" });
  }

  if (!price) {
    return res.status(400).json({ error: "Please provide a price" });
  }

  if (!spent) {
    return res.status(400).json({ error: "Please provide a spend" });
  }

  if (!date) {
    return res.status(400).json({ error: "Please provide a date" });
  }

  try {
    const transaction = await TransactionsSchema.create({
      id,
      quantity,
      price,
      spent,
      date,
      user_id,
    });

    let portfolio = await PortfolioSchema.findOne({ user_id: user_id });

    if (!portfolio) {
      res.status(404).json({
        error: "portfolio not found",
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const userFolio = await PortfolioSchema.findOne({
      user_id: userId,
    }).populate("transactions");

    if (!userFolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json(userFolio.transactions);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération du portfolio de l'utilisateur.",
    });
  }
};

const trackTransactions = async (req, res) => {
  try {
    const { address } = req.params;
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=YourApiKeyToken`);

    const transactions = response.data.result.slice(0, 5);
    await Transaction.insertMany(transactions);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error tracking transactions', error: error.message });}
};

module.exports = { createTransaction, getTransactions, trackTransactions };