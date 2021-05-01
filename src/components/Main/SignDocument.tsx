import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Layout, Typography, Button, Space } from "antd";
import Torus from "@toruslabs/torus-embed";
import { ethers } from "ethers";

import shield from "../../img/shield.svg";
import {
  DocumentDetails,
  SignatureInfo,
  SignatureInfoSigned,
  SignerInfo,
  TorusUserInfo,
} from "../../types";
import { skyblue } from "../colors";
import Spinner from "./Spinner";
import { sha256hex, sleep } from "../../utils";
import { apiService } from "../../services";
import SignatureModal from "./SignatureModal";
import HowItWorks from "./HowItWorks";

const { Title, Text } = Typography;

const torus = new Torus({});

interface IProps {
  doc: DocumentDetails;
  signatureId: string;
  loading: boolean;
  alreadySigned: boolean;
  onContinue: () => void;
}

function SignDocument({
  doc,
  signatureId,
  loading,
  alreadySigned,
  onContinue,
}: IProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initializingTorus, setInitializingTorus] = useState(true);
  const [currentStep, setCurrentStep] = useState(-1);
  const [processing, setProcessing] = useState(false);
  const [processingDone, setProcessingDone] = useState(false);
  const initializing = initializingTorus || loading;

  const handleCancelModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleSign = useCallback(async () => {
    try {
      setIsModalVisible(true);
      setProcessing(true);
      setCurrentStep(0);
      await sleep(1000);
      const [pk] = await torus.login({});
      const userInfo = await torus.getUserInfo(
        "Your name and email are required to sign the document"
      );
      setCurrentStep(1);
      const wallet = new ethers.Wallet(pk);
      const signatureInfo = await constructSignatureInfo(
        wallet,
        doc,
        signatureId,
        userInfo
      );
      const signedSignatureInfo = await signSignatureInfo(
        wallet,
        signatureInfo
      );
      const signerInfo: SignerInfo = {
        documentUid: doc.documentUid,
        signatureUid: signatureId,
        documentHashes: doc.hashes,
        verifier: userInfo.verifier,
        email: userInfo.email,
        payload: JSON.stringify(signedSignatureInfo),
      };
      await sleep(500);
      setCurrentStep(2);
      await apiService.sign(signerInfo);
      await sleep(5000);
      setCurrentStep(3);
      setProcessingDone(true);
    } finally {
      setProcessing(false);
    }
  }, [doc, signatureId]);

  const handleContinue = useCallback(() => {
    setIsModalVisible(false);
    onContinue();
  }, [onContinue]);

  useEffect(() => {
    initTorus();
    async function initTorus() {
      try {
        await torus.init({ showTorusButton: false });
      } catch (err) {
        // ignore
      } finally {
        setInitializingTorus(false);
      }
    }
  }, []);

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
                {alreadySigned
                  ? "Thank you for signing the document."
                  : `${
                      doc?.createdByName || doc?.createdByEmail
                    } (Creator) has requested that you additionally sign the document onto the blockchain.`}
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
                onClick={alreadySigned ? handleContinue : handleSign}
              >
                {alreadySigned ? "Continue" : "Continue to sign"}
              </Button>
            </Request>
          </Space>
          <SignatureModal
            visible={isModalVisible}
            currentStep={currentStep}
            processing={processing}
            done={processingDone}
            onSign={handleSign}
            onContinue={handleContinue}
            onCancel={handleCancelModal}
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

async function constructSignatureInfo(
  wallet: ethers.Wallet,
  doc: DocumentDetails,
  signatureId: string,
  userInfo: TorusUserInfo
): Promise<SignatureInfo> {
  const signerEmail = userInfo.email || "";
  const recipientEmail =
    doc.signatures.find((sig) => sig.signatureUid === signatureId)?.hs.email ||
    "";
  const ip = await apiService.getIp();

  return {
    v: userInfo.verifier,
    e: await sha256hex(signerEmail as string),
    r: await sha256hex(recipientEmail as string),
    i: await sha256hex(ip),
    t: new Date().getTime(),
    h: doc.hashes,
    p: wallet.address.toLowerCase(),
  };
}

async function signSignatureInfo(
  wallet: ethers.Wallet,
  info: SignatureInfo
): Promise<SignatureInfoSigned> {
  const infoHash = await sha256hex(JSON.stringify(info));
  const signature = await wallet.signMessage(infoHash);

  return {
    ...info,
    s: signature.toString(),
  };
}

export default SignDocument;
