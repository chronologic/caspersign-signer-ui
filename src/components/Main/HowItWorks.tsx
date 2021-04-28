import React from "react";
import styled from "styled-components";
import { Typography, Space, Steps } from "antd";

const { Title } = Typography;
const { Step } = Steps;

function HowItWorks() {
  return (
    <Space direction="vertical" size="large">
      <Title level={3}>How it works</Title>
      <Content>
        <Steps direction="vertical" current={-1}>
          <Step
            title="Document secrecy"
            description="We use the SHA 256 algorithm to compute a hash of your files.
              This is done in your browser so the contents of your files
              remain confidential."
            className="stepLeft"
          />
          <Step
            title="No chance of tampering"
            description="We store the SHA 256 hash of your email, the SHA 256 hash of
              your file and a timestamp on the Casper Blockchain."
            className="stepRight"
          />
          <Step
            title="Verification Tool"
            description="Upload a signed document and easily verify its authenticity.
                We’ll detect if the document has been modified after it was
                signed."
            className="stepLeft"
          />
        </Steps>
      </Content>
    </Space>
  );
}

const Content = styled.div`
  width: 676px;
  margin: 0 auto;

  .ant-steps-item-title {
    text-transform: uppercase;
  }
  .ant-steps-item-description {
    color: black !important;
  }

  .stepLeft {
    margin-right: calc(50% - 16px);
    text-align: right;

    .ant-steps-item-icon {
      float: right;
      margin-right: 0;
    }
    .ant-steps-item-tail {
      left: auto !important;
      right: 16px;
    }
    .ant-steps-item-description {
      margin-right: 15px;
    }
  }

  .stepRight {
    margin-left: calc(50% - 16px);
  }
`;

export default HowItWorks;
