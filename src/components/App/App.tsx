import React from "react";
import { Layout as AntLayout } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";

import Providers from "./Providers";
import GlobalStyle from "./GlobalStyle";
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import { CHAIN_ID } from "../../env";

function getChainName() {
  switch (CHAIN_ID) {
    case 3: {
      return "ropsten";
    }
    default: {
      return CHAIN_ID;
    }
  }
}

function App() {
  return (
    <Providers>
      <StyledApp>
        <GlobalStyle />
        <AntLayout className="layout">
          {CHAIN_ID !== 1 && (
            <NonMainnetWarning>
              Current network: {getChainName()}
            </NonMainnetWarning>
          )}
          <Header />
          <AntLayout>
            <Main />
          </AntLayout>
          <Footer />
        </AntLayout>
      </StyledApp>
    </Providers>
  );
}

const NonMainnetWarning = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: normal;
  padding: 8px 16px;
  background-color: orange;
`;

const StyledApp = styled.div`
  .layout {
    min-height: 100vh;
  }
`;

export default App;
