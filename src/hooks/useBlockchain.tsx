
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BlockchainState {
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  balance: string | null;
  isLoading: boolean;
}

interface BlockchainContextType extends BlockchainState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
  sendTransaction: (to: string, amount: string) => Promise<string>;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BlockchainState>({
    isConnected: false,
    account: null,
    chainId: null,
    balance: null,
    isLoading: false
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask ist nicht installiert! Bitte installiere MetaMask um fortzufahren.');
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      });

      // Convert balance from Wei to ETH
      const balanceInEth = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4);

      setState({
        isConnected: true,
        account: accounts[0],
        chainId: parseInt(chainId, 16),
        balance: balanceInEth,
        isLoading: false
      });

      console.log('Wallet connected:', accounts[0]);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const disconnectWallet = () => {
    setState({
      isConnected: false,
      account: null,
      chainId: null,
      balance: null,
      isLoading: false
    });
    console.log('Wallet disconnected');
  };

  const switchNetwork = async (targetChainId: number) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }]
      });
    } catch (error: any) {
      console.error('Failed to switch network:', error);
    }
  };

  const sendTransaction = async (to: string, amount: string): Promise<string> => {
    if (!window.ethereum || !state.account) {
      throw new Error('Wallet not connected');
    }

    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: state.account,
          to: to,
          value: `0x${(parseFloat(amount) * Math.pow(10, 18)).toString(16)}`
        }]
      });

      console.log('Transaction sent:', txHash);
      return txHash;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setState(prev => ({ ...prev, account: accounts[0] }));
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setState(prev => ({ ...prev, chainId: parseInt(chainId, 16) }));
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  return (
    <BlockchainContext.Provider value={{
      ...state,
      connectWallet,
      disconnectWallet,
      switchNetwork,
      sendTransaction
    }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};
