import React from "react";
import { UseWalletProvider } from "use-wallet";
import { QueryParamProvider } from "use-query-params";

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
    <EthersProvider>
      <QueryParamProvider>{children}</QueryParamProvider>
    </EthersProvider>
  </UseWalletProvider>
);

export default Providers;
