import React from "react";
import styled from "styled-components";
import { Layout, Space } from "antd";

import FlexSpacer from "../FlexSpacer";

function Header() {
  return (
    <Layout.Header>
      <HeaderContent>
        <Space>
          <div />
        </Space>
        <FlexSpacer />
      </HeaderContent>
    </Layout.Header>
  );
}

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  line-height: normal;
`;

export default Header;
