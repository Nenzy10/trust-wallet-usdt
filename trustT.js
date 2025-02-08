import React, { useState } from "react";
import { WagmiConfig, createClient, configureChains, useAccount, useConnect, useDisconnect } from "wagmi";
import { mainnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { ethers } from "ethers";

// Use environment variable from GitHub for the RPC URL
const CUSTOM_RPC_URL = process.env.REACT_APP_CUSTOM_RPC_URL || "https://your-custom-rpc-url.com"; // Fallback if not set

// Configure chains and providers
const { chains, provider } = configureChains([mainnet], [publicProvider()]);

// Create the Wagmi client
const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: { qrcode: true },
    }),
  ],
  provider,
});

const ConnectWallet = () => {
  const { connect, connectors, isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [rpcUpdated, setRpcUpdated] = useState(false);

  // Function to switch the RPC
  const switchRpc = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("wallet_addEthereumChain", [
          {
            chainId: "0x1", // Ethereum Mainnet (modify if needed)
            chainName: "Ethereum Mainnet",
            rpcUrls: [CUSTOM_RPC_URL],
            nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
            blockExplorerUrls: ["https://etherscan.io"],
          },
        ]);
        setRpcUpdated(true);
      } catch (error) {
        console.error("Failed to switch RPC:", error);
      }
    } else {
      alert("Wallet provider not found");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">Trust Wallet Connection</h1>
      {!isConnected ? (
        connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect(connector)}
            className="bg-blue-500 px-4 py-2 rounded-lg m-2"
          >
            Connect {connector.name}
          </button>
        ))
      ) : (
        <div className="flex flex-col items-center">
          <p>Connected: {address}</p>
          <button onClick={switchRpc} className="bg-green-500 px-4 py-2 rounded-lg m-2">
            {rpcUpdated ? "RPC Updated" : "Switch to Custom RPC"}
          </button>
          <button onClick={() => disconnect()} className="bg-red-500 px-4 py-2 rounded-lg m-2">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <WagmiConfig client={wagmiClient}>
    <ConnectWallet />
  </WagmiConfig>
);

export default App;
