import React from "react";
import { Card, Avatar, Row, Col } from "antd";

const { Meta } = Card;

interface IProps {
  avatar: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
}

function Signer({ avatar, title, description, children }: IProps) {
  return (
    <Row gutter={48}>
      <Col>
        <Meta
          avatar={<Avatar src={avatar} />}
          title={title}
          description={description}
        />
      </Col>
      <Col>{children}</Col>
    </Row>
  );
}

export default Signer;
