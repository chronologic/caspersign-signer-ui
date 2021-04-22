import React from "react";
import { Layout, Typography, Card, Tag, List } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;

const data = [
  {
    title: "Original Document Hash:",
    description: (
      <Link href="https://casperlabs.io/" target="_blank">
        0cd30fE29782Bb093e9986CB7f287bDA4791d05f73b
      </Link>
    ),
  },
  {
    title: "Blockchain Hash:",
    description: (
      <Link href="https://casperlabs.io/" target="_blank">
        0cd30fE29782Bb093e9986CB7f287bDA4791d05f73b
      </Link>
    ),
  },
  {
    title: "Signed Document Hash:",
    description: (
      <Link href="https://casperlabs.io/" target="_blank">
        0cd30fE29782Bb093e9986CB7f287bDA4791d05f73b
      </Link>
    ),
  },
];

function DocBlockchain() {
  return (
    <Layout>
      <Card
        title="Blockchain"
        extra={
          <Tag icon={<CheckCircleOutlined />} color="success">
            BLOCKCHAIN VERIFIED
          </Tag>
        }
      >
        <List
          itemLayout="horizontal"
          footer={
            <Text type="secondary">
              Timestamped on Blockchain: 15-MAR-2021 11:40 AM CEST
            </Text>
          }
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </Layout>
  );
}

export default DocBlockchain;
