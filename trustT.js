// Trust Wallet dApp - Connect & Switch to Tenderly RPC

document.addEventListener("DOMContentLoaded", async () => {
    const connectButton = document.createElement("button");
    connectButton.innerText = "Connect Wallet";
    connectButton.style.cssText = "padding: 10px 20px; font-size: 16px; cursor: pointer;";
    document.body.appendChild(connectButton);

    connectButton.addEventListener("click", async () => {
        if (window.ethereum) {
            try {
                // Request wallet connection
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                alert(`Connected: ${accounts[0]}`);

                // Switch to Tenderly RPC
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: "0x1", // Change if using a different chain
                        chainName: "Tenderly Virtual Mainnet",
                        rpcUrls: ["https://virtual.mainnet.rpc.tenderly.co/2664e9f0-3787-4497-91da-06b1a93ccb75"],
                        nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
                        blockExplorerUrls: ["https://etherscan.io/"]
                    }]
                });

            } catch (error) {
                console.error("Connection Failed", error);
                alert("Connection failed! Check console for details.");
            }
        } else {
            alert("Trust Wallet or MetaMask is required!");
        }
    });
});
