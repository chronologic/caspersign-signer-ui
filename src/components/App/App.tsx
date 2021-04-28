import React from "react";
import { Layout as AntLayout } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";

import Main from "../Main";
import Providers from "./Providers";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <Providers>
      <StyledApp>
        <GlobalStyle />
        <AntLayout className="layout">
          <Main />
        </AntLayout>
      </StyledApp>
    </Providers>
  );
}

const StyledApp = styled.div`
  .layout {
    min-height: 100vh;
  }
`;

export default App;
