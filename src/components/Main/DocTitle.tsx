import React from "react";
import { Layout, Card, Typography, Divider } from "antd";
import styled from "styled-components";
import pdf from "../../img/pdf.svg";

const { Title, Text } = Typography;

function DocTitle() {
  return (
    <Layout>
      <Card>
        <DocHeader>
          <CircleIcon>
            <img src={pdf} alt="pdf" />
          </CircleIcon>
          <div>
            <Title level={4}>
              Example_HS_signed_completed_Referral_Agreement-pages-deleted
            </Title>
            <Text type="secondary">Created By: Clifford Sarkin</Text>
            <Divider type="vertical" />
            <Text type="secondary">
              Document ID: 4250a5b3-c0be-4cac-a425-d59c0ce4e288
            </Text>
          </div>
        </DocHeader>
      </Card>
    </Layout>
  );
}

const CircleIcon = styled.div`
  width: 53px;
  margin-right: 25px;
`;

const DocHeader = styled.div`
  display: flex;
`;

export default DocTitle;
