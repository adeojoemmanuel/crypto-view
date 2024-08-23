import React, { useState } from 'react';
import axios from 'axios';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(endpoint, { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Authentication successful');
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;