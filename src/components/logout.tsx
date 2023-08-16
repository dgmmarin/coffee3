"use client"
import React from 'react';
import { useUserContext } from '../hooks/userContext';

function Logout() {
  const { logout } = useUserContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
