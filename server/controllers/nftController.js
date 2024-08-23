const Web3 = require('web3');
const NFT = require('../models/NFT');
const web3 = new Web3(Web3.providers.HttpProvider('https://testnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));

exports.getNftMetadata = async (req, res) => {
  try {
    const { contractAddress, tokenId } = req.body;
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const metadata = await contract.methods.tokenURI(tokenId).call();
    
    const nftData = {
      contractAddress,
      tokenId,
      metadata,
    };

    const nft = new NFT(nftData);
    await nft.save();

    res.status(200).json(nftData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving metadata', error: error.message });
  }
};