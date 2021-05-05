import React, { useMemo } from "react";
import styled from "styled-components";
import { Card, Layout, Typography, Button, Space } from "antd";

import shield from "../../img/shield.svg";
import { skyblue } from "../colors";
import Spinner from "./Spinner";
import SignatureModal from "./SignatureModal";
import HowItWorks from "./HowItWorks";

const { Title, Text } = Typography;

interface IProps {
  creator: string;
  initializing: boolean;
  showModal: boolean;
  alreadySigned: boolean;
  currentStep: number;
  processing: boolean;
  processingDone: boolean;
  onContinue: () => void;
  onSign: () => void;
  onCancel: () => void;
}

function SignDocument({
  creator,
  initializing,
  showModal,
  alreadySigned,
  currentStep,
  processing,
  processingDone,
  onSign,
  onCancel,
  onContinue,
}: IProps) {
  const message = useMemo(() => {
    if (alreadySigned) {
      return "Thank you for signing the document.";
    }

    return (
      <span>
        {creator} has requested that you additionally sign the document onto the
        blockchain.
        <br />
        To proceed, just click the button below and authenticate using any of
        the options you will be presented with.
      </span>
    );
  }, [alreadySigned, creator]);

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
              {initializing && <Spinner className="spinner" size={40} />}
              <Text
                type="secondary"
                style={{
                  fontSize: "18px",
                  visibility: initializing ? "hidden" : "visible",
                }}
              >
                {message}
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
                  visibility: initializing ? "hidden" : "visible",
                }}
                onClick={alreadySigned ? onContinue : onSign}
              >
                {alreadySigned ? "Continue" : "Continue to sign"}
              </Button>
            </Request>
          </Space>
          <SignatureModal
            visible={showModal}
            currentStep={currentStep}
            processing={processing}
            done={processingDone}
            onSign={onSign}
            onContinue={onContinue}
            onCancel={onCancel}
          />
        </Card>
        <HowItWorks />
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
