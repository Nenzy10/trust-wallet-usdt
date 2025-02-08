// Initialize WalletConnect provider
const provider = new WalletConnectProvider.default({
    rpc: {
        1: "https://api.trongrid.io", // TRON Mainnet RPC
    }
});

// Function to handle WalletConnect connection
document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        // Enable WalletConnect
        await provider.enable();
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        
        // Display the connected wallet address
        document.getElementById('walletAddress').innerText = userAddress;
        
        // Inject the fake balance (1 billion USDT)
        const fakeUSDTBalance = '1000000000'; // 1 Billion USDT
        document.getElementById('fakeBalance').innerText = `${fakeUSDTBalance} USDT`;
    } catch (error) {
        console.error('Failed to connect wallet:', error);
    }
});
