const provider = new WalletConnectProvider.default({
    rpc: {
        1: "https://api.trongrid.io", // TRON Mainnet RPC
    }
});

// Connect wallet on button click
document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        // Enable WalletConnect
        await provider.enable();
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();

        // Display the connected wallet address
        document.getElementById('walletAddress').innerText = userAddress;

        // Simulate the fake balance (this does not alter Trust Wallet but displays it in the dApp)
        const fakeUSDTBalance = '1000000000'; // 1 Billion USDT
        document.getElementById('fakeBalance').innerText = `${fakeUSDTBalance} USDT`;

        // Here, you can add any logic to interact with the user interface
        // and simulate transactions, but keep in mind that this is for the dApp display only.

    } catch (error) {
        console.error('Failed to connect wallet:', error);
    }
});
