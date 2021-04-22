import React from "react";
import { UseWalletProvider } from "use-wallet";

import { EthersProvider } from "../../contexts";
import { CHAIN_ID, RPC_URL } from "../../env";

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => (
  <UseWalletProvider
    chainId={CHAIN_ID}
    connectors={{
      injected: {},
      walletconnect: {
        rpcUrl: RPC_URL,
      },
    }}
  >
    <EthersProvider>{children}</EthersProvider>
  </UseWalletProvider>
);

export default Providers;
