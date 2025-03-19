// app/components/Header.tsx
'use client';

import React from 'react';
import UserConnection from './UserConnect';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">ECO Auto Track</div>
      <UserConnection />
    </header>
  );
};

export default Header;
