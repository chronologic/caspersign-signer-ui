import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Spin, Layout, Typography, Upload, Card, message } from "antd";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";
import { skyblue } from "../colors";

const { Title, Text } = Typography;
const { Dragger } = Upload;
const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: `${skyblue}` }} spin />
);

function UploadPage({ onUploadDone }: { onUploadDone: () => void }) {
  const [loading, setLoading] = useState(false);
  const handleChange = useCallback(
    (info: UploadChangeParam) => {
      const { status } = info.file;
      setLoading(status === "uploading");
      if (status === "done") {
        message.success(`${info.file.name} uploaded successfully.`);
        onUploadDone();
      } else if (status === "error") {
        message.error(`${info.file.name} upload failed.`);
      }
    },
    [onUploadDone]
  );
  return (
    <Layout>
      <Main>
        <HeaderTitle>
          <Title level={4}>
            Verify the authenticity of your signed document
          </Title>
          <Text type="secondary">
            We&#39;ll detect if the document has been modified after it was
            signed.
          </Text>
        </HeaderTitle>
        <Card>
          <Dragger
            name="file"
            accept="application/pdf"
            showUploadList
            action=""
            customRequest={(options) => {
              if (options.onSuccess) {
                options.onSuccess(options.file, new XMLHttpRequest());
              }
            }}
            onChange={handleChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Upload a Signed Document Here</p>
            <p className="ant-upload-hint">
              Upload or drop your signed document here in the dropzone for
              verification
            </p>
          </Dragger>
          <div className="spinner">
            {loading && <Spin indicator={antIcon} />}
          </div>
        </Card>
      </Main>
    </Layout>
  );
}

const Main = styled.div`
  width: 100%;
  max-width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const HeaderTitle = styled.div`
  margin: 64px 0 12px;
`;

export default UploadPage;
