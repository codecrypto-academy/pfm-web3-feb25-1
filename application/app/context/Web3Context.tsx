// app/context/Web3Context.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

// Define types for our context
interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  account: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

// Create context with default values
const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  account: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
});

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connect = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        // Create ethers provider and signer
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        const ethersSigner = await ethersProvider.getSigner();
        
        setProvider(ethersProvider);
        setSigner(ethersSigner);
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        console.error("MetaMask not installed");
        alert("Please install MetaMask to use this feature");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

/*   const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setIsConnected(false);
  }; */

  const disconnect = async () => {
    try {
      // Limpiar estados locales
      setProvider(null);
      setSigner(null);
      setAccount(null);
      setIsConnected(false);
      
      // Si quieres que el usuario vea la interfaz de MetaMask, puedes intentar
      // cambiar a una cuenta vacía o solicitar un cambio de cuenta
      if (window.ethereum) {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{
            eth_accounts: {}
          }]
        });
      }
      
      // Opcional: Puedes también guardar el estado de desconexión en localStorage
      localStorage.removeItem('walletConnected');
      
    } catch (error) {
      console.error("Error disconnecting from MetaMask:", error);
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnect();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  return (
    <Web3Context.Provider value={{
      provider,
      signer,
      account,
      isConnected,
      connect,
      disconnect
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

// Add global type definitions for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
