// app/components/UserConnection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useWeb3 } from '../context/Web3Context';

const UserConnection: React.FC = () => {
  const { account, connect, disconnect, isConnected } = useWeb3();

  // Format wallet address to show only first 6 and last 4 characters
  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <button
        onClick={connect}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Connect
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium">
        {formatAddress(account)}
      </div>
      
      <Link 
        href="/dashboard" 
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Dashboard
      </Link>
      
      <button
        onClick={disconnect}
        className="bg-red-400 hover:bg-gray-300 text-gray-700 font-medium p-2 rounded-lg transition-colors"
        title="Disconnect"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-5 h-5"
        >
          <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default UserConnection;
