import React, { useCallback, useEffect, useState } from "react";
import { useQueryParam, StringParam } from "use-query-params";
import { Layout as AntLayout } from "antd";

import { VALIDATE_UI_URL } from "../../env";
import { apiService } from "../../services";
import { DocumentDetails } from "../../types";
import Footer from "../Footer";
import Header from "../Header";
import SignDocument from "./SignDocument";

function Main() {
  const [signatureId] = useQueryParam("signature_id", StringParam);
  const [doc, setDoc] = useState<DocumentDetails>();
  const [loading, setLoading] = useState(true);
  const [alreadySigned, setAlreadySigned] = useState(false);

  const handleContinue = useCallback(() => {
    setCookie("postSign", "true");
    const param = doc?.hashes[0] || doc?.signatures[0].signatureUid;
    window.location.href = `${VALIDATE_UI_URL}?hash=${param}`;
  }, [doc]);

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

  return (
    <>
      <Header loading={loading} onSkip={handleContinue} />
      <AntLayout>
        <SignDocument
          signatureId={signatureId as string}
          doc={doc as DocumentDetails}
          loading={loading}
          alreadySigned={alreadySigned}
          onContinue={handleContinue}
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

export default Main;
