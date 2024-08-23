const express = require('express');
const { getNftMetadata } = require('../controllers/nftController');
const router = express.Router();

router.post('/nft/metadata', getNftMetadata);

module.exports = router;