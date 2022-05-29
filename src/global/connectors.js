import { Mainnet, Ropsten } from "@usedapp/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { getDefaultProvider } from "ethers";

export const injected = new InjectedConnector({
  supportedChainIds: [Mainnet.chainId, Ropsten.chainId],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    [Mainnet.chainId]: getDefaultProvider("mainnet"),
    [Ropsten.chainId]: getDefaultProvider("ropsten"),
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 15000,
  supportedChainIds: [Mainnet.chainId, Ropsten.chainId],
});
