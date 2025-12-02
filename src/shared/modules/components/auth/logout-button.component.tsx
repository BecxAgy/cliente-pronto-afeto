'use client';

import React from 'react';
import { logout } from '../../actions/auth.actions';

export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};
