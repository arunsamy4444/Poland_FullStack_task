// src/App.js
import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import OrderList from './components/OrderList';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('isLoggedIn');
    if (stored === 'true') setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <OrderList />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
