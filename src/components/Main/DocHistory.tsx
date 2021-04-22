import React from "react";
import { Layout, Typography, Card, Avatar, List } from "antd";

const { Text, Link } = Typography;

const data = [
  {
    title: "Clifford Sarkin created the document",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C5603AQHan8MKDDbG8w/profile-displayphoto-shrink_400_400/0/1562011727476?e=1622073600&v=beta&t=r6Rq9MeuNbOAdzT5a-9pbbD3GzEnjhneg7LSv1Pdzj4",
    description: (
      <Text type="secondary">
        Tx Hash:{" "}
        <Link href="https://casperlabs.io/" target="_blank">
          0cd30fE29782Bb093e9986CB7f287bDA4791d05f73b
        </Link>
      </Text>
    ),
  },
  {
    title: "Clifford Sarkin signed the document with HelloSign",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C5603AQHan8MKDDbG8w/profile-displayphoto-shrink_400_400/0/1562011727476?e=1622073600&v=beta&t=r6Rq9MeuNbOAdzT5a-9pbbD3GzEnjhneg7LSv1Pdzj4",
    description: (
      <Text type="secondary">
        Tx Hash:{" "}
        <Link href="https://casperlabs.io/" target="_blank">
          0cd30fE29782Bb093e9986CB7f287bDA4791d05f73b
        </Link>
      </Text>
    ),
  },
  {
    title: "Clifford Sarkin signed the document with CasperSign",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C5603AQHan8MKDDbG8w/profile-displayphoto-shrink_400_400/0/1562011727476?e=1622073600&v=beta&t=r6Rq9MeuNbOAdzT5a-9pbbD3GzEnjhneg7LSv1Pdzj4",
    description: (
      <Text type="secondary">
        Tx Hash:{" "}
        <Link href="https://casperlabs.io/" target="_blank">
          0cd30fE29782Bb093e9986CB7f287bDA4791d05f73b
        </Link>
      </Text>
    ),
  },
  {
    title: "Mrinal Manohar signed the document with HelloSign",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C4D03AQHVQf5edhvWUw/profile-displayphoto-shrink_400_400/0/1554754824709?e=1622073600&v=beta&t=XEjTfTGHW8njxWw5jvoHquvYm110IdDiEkD6_8tXjWA",
    description: (
      <Text type="secondary">
        Tx Hash:{" "}
        <Link href="https://casperlabs.io/" target="_blank">
          0cd30fE29782Bb093e9986CB7f287bDA4791d05f73b
        </Link>
      </Text>
    ),
  },
];

function DocHistory() {
  return (
    <Layout>
      <Card title="History">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="large" src={item.avatar} />}
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

export default DocHistory;
