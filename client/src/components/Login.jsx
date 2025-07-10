import React, { useState } from 'react';
import './login.css'; // Add this at top
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const envUser = process.env.REACT_APP_BASIC_USER;
    const envPass = process.env.REACT_APP_BASIC_PASS;

 if (username === envUser && password === envPass) {
      const base64Creds = btoa(`${username}:${password}`);
      localStorage.setItem('authToken', base64Creds);
      toast.success('🎉 Logged in successfully!');
      setTimeout(() => onLogin(), 1000); // delay to show toast
    } else {
      toast.error('❌ Invalid credentials');
    }
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Login</button>
    </form>
     <ToastContainer position="top-center" autoClose={2000} />
    </>

  );
};

export default Login;
