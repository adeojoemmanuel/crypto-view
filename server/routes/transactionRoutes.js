const express = require('express');
const { trackTransactions } = require('../controllers/transactionController');
const router = express.Router();

router.get('/transactions/:address', trackTransactions);

module.exports = router;