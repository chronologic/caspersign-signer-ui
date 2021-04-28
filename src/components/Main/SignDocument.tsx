import React, { useState } from "react";
import styled from "styled-components";
import { Card, Layout, Typography, Button, Space, Steps, Modal } from "antd";

import shield from "../../img/shield.svg";
import { DocumentDetails } from "../../types";
import { skyblue } from "../colors";
import Spinner from "./Spinner";

const { Title, Text } = Typography;
const { Step } = Steps;

interface IProps {
  doc: DocumentDetails;
  loading: boolean;
}

function SignDocument({ doc, loading }: IProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <Layout>
      <Main>
        <Card style={{ margin: "30px 0" }}>
          <Space direction="vertical">
            <ShieldIcon>
              <img src={shield} alt="shield" />
            </ShieldIcon>
            <Title level={2}>Secure Your Document On The Blockchain!</Title>
            <Request>
              {loading && <Spinner className="spinner" size={40} />}
              <Text
                type="secondary"
                style={{
                  fontSize: "18px",
                  visibility: loading ? "hidden" : "visible",
                }}
              >
                {doc?.createdByName || doc?.createdByEmail} (Creator) has
                requested that you additionally sign the document onto the
                blockchain.
              </Text>
              <br />
              <Button
                type="primary"
                size="large"
                style={{
                  margin: "20px 0 0 0",
                  padding: "0 35px",
                  background: skyblue,
                  borderColor: skyblue,
                  visibility: loading ? "hidden" : "visible",
                }}
                onClick={showModal}
              >
                Continue to sign
              </Button>
            </Request>
          </Space>
          <Modal
            title="Signing Process"
            visible={isModalVisible}
            closable={false}
            footer={[
              <Button
                key="link"
                type="primary"
                size="large"
                style={{
                  textAlign: "center",
                  background: skyblue,
                  borderColor: skyblue,
                }}
              >
                Continue
              </Button>,
            ]}
          >
            <StepsProcess>
              <Steps direction="vertical" current={1} percent={60}>
                <Step title="Signing the document using your unique private key." />
                <Step title="Creating a unique hash value for the signed document." />
                <Step title="Timestamping signed document into blockchain." />
              </Steps>
            </StepsProcess>
          </Modal>
        </Card>
        <Space direction="vertical" size="large">
          <Title level={3}>How it works</Title>
          <HowItWorks>
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
          </HowItWorks>
        </Space>
      </Main>
    </Layout>
  );
}

const Request = styled.div`
  .spinner {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const HowItWorks = styled.div`
  width: 800px;
  margin: 0 auto;

  .stepLeft {
    margin-right: 48%;
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
    margin-left: 48%;
  }
`;

const StepsProcess = styled.div``;

const ShieldIcon = styled.div`
  display: block;
  margin: 0 auto 10px;
  width: 75px;
`;

const Main = styled.div`
  width: 100%;
  text-align: center;
  max-width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export default SignDocument;
