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
    const param = doc?.hashes[0] || doc?.signatures[0].signatureUid;
    window.location.href = `${VALIDATE_UI_URL}?hash=${param}`;
  }, [doc]);

  useEffect(() => {
    if (signatureId) {
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
        }
      } finally {
        setLoading(false);
      }
    }
  }, [signatureId]);

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

export default Main;
