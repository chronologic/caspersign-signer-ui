import React from "react";
import styled from "styled-components";
import { Layout, Row, Col, Typography } from "antd";
import DocHistory from "./DocHistory";
import DocSigners from "./DocSigners";
import DocBlockchain from "./DocBlockchain";
import DocTitle from "./DocTitle";

const { Title } = Typography;

function DetailsPage() {
  return (
    <Layout>
      <Main>
        <HeaderTitle>
          <Title level={4}>Document Details</Title>
        </HeaderTitle>
        <DocTitle />
        <Row gutter={24}>
          <Col flex={3}>
            <DocSigners />
            <DocHistory />
          </Col>
          <Col flex={2}>
            <DocBlockchain />
          </Col>
        </Row>
      </Main>
    </Layout>
  );
}

const Main = styled.div`
  width: 100%;
  max-width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const HeaderTitle = styled.div`
  margin: 64px 0 12px;
`;

export default DetailsPage;
