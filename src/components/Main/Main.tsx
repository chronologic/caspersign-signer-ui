/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useState } from "react";
import { useQueryParam, StringParam } from "use-query-params";
import { Layout as AntLayout } from "antd";
import Torus from "@toruslabs/torus-embed";
import { ethers } from "ethers";

import { APP_UI_URL, VALIDATE_UI_URL } from "../../env";
import { apiService } from "../../services";
import {
  DocumentDetails,
  SignatureInfo,
  SignatureInfoSigned,
  SignerInfo,
  TorusUserInfo,
} from "../../types";
import { sha256hex, sleep } from "../../utils";
import Footer from "../Footer";
import Header from "../Header";
import SignDocument from "./SignDocument";

const torus = new Torus({});

function Main() {
  const [signatureId] = useQueryParam("signature_id", StringParam);
  const [doc, setDoc] = useState<DocumentDetails>();
  const [loading, setLoading] = useState(true);
  const [alreadySigned, setAlreadySigned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [initializingTorus, setInitializingTorus] = useState(true);
  const [currentStep, setCurrentStep] = useState(-1);
  const [processing, setProcessing] = useState(false);
  const [processingDone, setProcessingDone] = useState(false);
  const initializing = initializingTorus || loading;

  const handleCancelModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSign = useCallback(async () => {
    try {
      setShowModal(true);
      setProcessing(true);
      setCurrentStep(0);
      await sleep(3000);
      const [pk] = await torus.login({});
      const userInfo = await torus.getUserInfo(
        "Your name and email are required to sign the document"
      );
      setCurrentStep(1);
      const wallet = new ethers.Wallet(pk);
      const ip = await apiService.getIp();
      const signatureInfo = await constructSignatureInfo(
        wallet,
        doc!,
        signatureId!,
        ip,
        userInfo
      );
      const signedSignatureInfo = await signSignatureInfo(
        wallet,
        signatureInfo
      );
      const signerInfo: SignerInfo = {
        documentUid: doc!.documentUid,
        signatureUid: signatureId!,
        verifier: userInfo.verifier,
        email: userInfo.email,
        ip,
      };
      await sleep(2500);
      setCurrentStep(2);
      await apiService.sign(signerInfo, signedSignatureInfo);
      torus.logout();
      await sleep(5000);
      setCurrentStep(3);
      setProcessingDone(true);
    } finally {
      setProcessing(false);
    }
  }, [doc, signatureId]);

  const handleContinue = useCallback(() => {
    setCookie("postSign", "true");
    const param = doc?.hashes[0] || signatureId;
    window.location.href = `${VALIDATE_UI_URL}?hash=${param}`;
  }, [doc, signatureId]);

  const refreshHashes = useCallback(
    async (docDetails: DocumentDetails, attempt = 0) => {
      const newHashes = await apiService.getHashes(signatureId as string);

      let timeoutId: NodeJS.Timeout;
      if (JSON.stringify(newHashes) !== JSON.stringify(docDetails.hashes)) {
        setDoc({
          ...docDetails,
          hashes: newHashes,
        });
      } else if (attempt < 10) {
        timeoutId = setTimeout(
          () => refreshHashes(docDetails, attempt + 1),
          5000
        );
      }

      return () => {
        clearTimeout(timeoutId);
      };
    },
    [signatureId]
  );

  useEffect(() => {
    if (signatureId && !doc) {
      getDetails();
    }

    async function getDetails() {
      setLoading(true);
      try {
        const docDetails = await apiService.getDetails(signatureId as string);
        setDoc(docDetails);

        const currentSignature = docDetails.signatures.find(
          (sig) => sig.signatureUid === signatureId
        );
        if (currentSignature && currentSignature.completed) {
          setAlreadySigned(true);
        } else {
          refreshHashes(docDetails);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [doc, refreshHashes, signatureId]);

  useEffect(() => {
    initTorus();
    async function initTorus() {
      try {
        await torus.init({
          showTorusButton: false,
          enabledVerifiers: {
            google: true,
            linkedin: true,
            // facebook: false,
            // reddit: false,
            // discord: false,
            // twitch: false,
            // apple: false,
            // github: false,
            // twitter: false,
            // weibo: false,
            // line: false,
            // jwt: false,
            // "email-password": false,
            // passwordless: false,
          },
        } as any);
      } catch (err) {
        // ignore
      } finally {
        setInitializingTorus(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!signatureId) {
      window.location.href = APP_UI_URL;
    }
  }, [signatureId]);

  const creator = doc?.createdByName
    ? `${doc?.createdByName} (${doc?.createdByEmail})`
    : `${doc?.createdByEmail}`;

  return (
    <>
      <Header loading={loading} onNext={handleSign} />
      <AntLayout>
        <SignDocument
          creator={creator}
          currentStep={currentStep}
          initializing={initializing}
          processing={processing}
          processingDone={processingDone}
          showModal={showModal}
          alreadySigned={alreadySigned}
          onSign={handleSign}
          onContinue={handleContinue}
          onCancel={handleCancelModal}
        />
      </AntLayout>
      <Footer />
    </>
  );
}

function setCookie(name: string, value = ""): void {
  let domain = window.location.host;

  const domainParts = domain.split(".");
  if (domainParts.length > 2) {
    domain = domainParts.slice(1).join(".");
  } else if (domainParts.length === 1) {
    domain = "";
  }

  document.cookie = `${name}=${value}; path=/; domain=${domain}`;
}

async function constructSignatureInfo(
  wallet: ethers.Wallet,
  doc: DocumentDetails,
  signatureId: string,
  ip: string,
  userInfo: TorusUserInfo
): Promise<SignatureInfo> {
  const signerEmail = userInfo.email || "";
  const recipientEmail =
    doc.signatures.find((sig) => sig.signatureUid === signatureId)
      ?.recipientEmail || "";

  return {
    verifier: userInfo.verifier,
    documentHashes: doc.hashes,
    ipHash: await sha256hex(ip),
    originalDocumentHash: doc.originalHash,
    otherSignatures: doc.signatures.map((sig) => sig.txHash).filter(Boolean),
    recipientHash: await sha256hex(recipientEmail as string),
    signerHash: await sha256hex(signerEmail as string),
    signerPubkey: wallet.address.toLowerCase(),
    timestamp: new Date().getTime(),
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
    signature: signature.toString(),
  };
}

export default Main;
