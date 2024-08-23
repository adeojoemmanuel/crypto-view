import React, { useState } from 'react';
import axios from 'axios';

function TradePage() {
  const [currencyPair, setCurrencyPair] = useState('ETH/USDT');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [orderType, setOrderType] = useState('market');
  const [transactionHash, setTransactionHash] = useState('');

  const placeOrder = async () => {
    try {
      const response = await axios.post('/api/trade', { currencyPair, amount, price, orderType });
      setTransactionHash(response.data.transactionHash);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <h1>Place Trade</h1>
      <form onSubmit={(e) => { e.preventDefault(); placeOrder(); }}>
        <div>
          <label>Currency Pair</label>
          <input value={currencyPair} onChange={(e) => setCurrencyPair(e.target.value)} />
        </div>
        <div>
          <label>Amount</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        {orderType === 'limit' && (
          <div>
            <label>Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        )}
        <div>
          <label>Order Type</label>
          <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
            <option value="market">Market</option>
            <option value="limit">Limit</option>
          </select>
        </div>
        <button type="submit">Place Order</button>
      </form>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
}

export default TradePage;