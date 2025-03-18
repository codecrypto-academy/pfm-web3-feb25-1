import React from 'react';
import { useWeb3 } from '../context/Web3Context';

const Header: React.FC = () => {
  const { account, connect, disconnect, isConnected } = useWeb3();
    return (
      <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">ECO Auto Track</div>
        
        {!isConnected ? (
        <div>
          <span className="text-sm mr-4">
            {account && account?.slice(0, 6) + "..."}{account?.slice(-4)}
          </span>
          <button
            onClick={connect}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  
          >
            Connect
          </button>
        </div>
        ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm">
                {account?.slice(0, 6)+ "..."}{account?.slice(-4)}
              </span>
              <button
                onClick={disconnect}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
              >
                Disconnect
              </button>
            </div>
        )}
        
        
      </header>
    );
  };
  
  export default Header;