import React, { useCallback } from "react";
import styled from "styled-components";
import { Button, Steps, Modal } from "antd";
import {
  UserOutlined,
  AuditOutlined,
  DeploymentUnitOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { applegreen, skyblue } from "../colors";

const { Step } = Steps;

interface IProps {
  visible: boolean;
  currentStep: number;
  processing: boolean;
  done: boolean;
  onSign: () => void;
  onContinue: () => void;
}

function SignatureModal({
  visible,
  currentStep,
  processing,
  done,
  onSign,
  onContinue,
}: IProps) {
  const handleClick = useCallback(() => {
    if (!processing && !done) {
      onSign();
    } else if (done) {
      onContinue();
    }
  }, [done, onContinue, onSign, processing]);

  return (
    <Modal
      title="Signing Process"
      visible={visible}
      closable={false}
      footer={[
        <Button
          key="link"
          type="default"
          size="large"
          style={{
            textAlign: "center",
          }}
          disabled={processing}
          onClick={onContinue}
        >
          Cancel
        </Button>,
        <Button
          key="link"
          type="primary"
          size="large"
          style={{
            textAlign: "center",
            background: skyblue,
            borderColor: skyblue,
          }}
          disabled={processing}
          onClick={handleClick}
        >
          Continue
        </Button>,
      ]}
    >
      <StepsProcess>
        <Steps direction="vertical" current={currentStep}>
          <Step
            title="Authenticating."
            icon={getStatusIcon(
              currentStep,
              0,
              processing,
              <UserOutlined style={{ color: skyblue }} />
            )}
          />
          <Step
            title="Signing the document using your unique private key."
            icon={getStatusIcon(
              currentStep,
              1,
              processing,
              <AuditOutlined style={{ color: skyblue }} />
            )}
          />
          <Step
            title="Storing timestamped signature on the blockchain."
            icon={getStatusIcon(
              currentStep,
              2,
              processing,
              <DeploymentUnitOutlined style={{ color: skyblue }} />
            )}
          />
        </Steps>
      </StepsProcess>
    </Modal>
  );
}

const StepsProcess = styled.div`
  .ant-steps-vertical > .ant-steps-item .ant-steps-item-content {
    margin-bottom: 18px;
  }
`;

function getStatusIcon(
  currentStep: number,
  stepNumber: number,
  processing: boolean,
  stepIcon: React.ReactNode
): React.ReactNode {
  if (currentStep === stepNumber && processing) {
    return <LoadingOutlined style={{ color: skyblue }} />;
  }

  if (currentStep > stepNumber) {
    return <CheckCircleOutlined style={{ color: applegreen }} />;
  }

  return stepIcon;
}

export default SignatureModal;
