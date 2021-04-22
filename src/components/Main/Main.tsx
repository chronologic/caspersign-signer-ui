import React, { useCallback, useState } from "react";
import DetailsPage from "./DetailsPage";
import UploadPage from "./UploadPage";

function Main() {
  const [uploadDone, setUploadDone] = useState(false);

  const handleUploadDone = useCallback(() => {
    setUploadDone(true);
  }, []);

  return uploadDone ? (
    <DetailsPage />
  ) : (
    <UploadPage onUploadDone={handleUploadDone} />
  );
}

export default Main;
