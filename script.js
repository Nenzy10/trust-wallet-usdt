// Initialize WalletConnect provider for TRON (TRC-20)
const provider = new WalletConnectProvider.default({
    rpc: {
        1: "https://api.trongrid.io" // TRON Mainnet RPC URL (for TRC-20)
    }
});

// Connect to Trust Wallet using WalletConnect
document.getElementById('connect-wallet-btn').addEventListener('click', async () => {
    if (!provider.connected) {
        await provider.enable();
        const accounts = await provider.request({ method: 'eth_accounts' });
        const address = accounts[0];
        document.getElementById('status').textContent = `Connected: ${address}`;

        // Mock balance update to 1B USDT (TRC-20)
        document.getElementById('balance').textContent = 'Fake USDT Balance: 1,000,000,000 USDT';
        document.getElementById('send-fake-usdt').disabled = false;
    } else {
        alert('Already connected to Trust Wallet');
    }
});

// Send Fake USDT (mock function)
document.getElementById('send-fake-usdt').addEventListener('click', () => {
    alert('Fake USDT sent to another Trust Wallet address!');
});
