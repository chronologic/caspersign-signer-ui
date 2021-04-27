import React, { useEffect, useState } from "react";
import { useQueryParam, StringParam } from "use-query-params";

import { apiService } from "../../services";
import { DocumentDetails } from "../../types";
import SignDocument from "./SignDocument";

function Main() {
  const [signatureId] = useQueryParam("signature_id", StringParam);
  const [doc, setDoc] = useState<DocumentDetails>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (signatureId) {
      getDetails();
    }

    async function getDetails() {
      setLoading(true);
      try {
        const docDetails = await apiService.getDetails(signatureId as string);
        setDoc(docDetails);
      } finally {
        setLoading(false);
      }
    }
  }, [signatureId]);

  return <SignDocument doc={doc as DocumentDetails} loading={loading} />;
}

export default Main;
