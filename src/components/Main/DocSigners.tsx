import React from "react";
import { Layout, Card, Timeline, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import Signer from "./Signer";
import hellogreen from "../../img/hellogreen.svg";
import helloblack from "../../img/helloblack.svg";
import caspergreen from "../../img/caspergreen.svg";
import casperblack from "../../img/casperblack.svg";

function Signers() {
  return (
    <Layout>
      <Card title="Signers">
        <Timeline>
          <Timeline.Item color="green">
            <Signer
              avatar="https://media-exp1.licdn.com/dms/image/C5603AQHan8MKDDbG8w/profile-displayphoto-shrink_400_400/0/1562011727476?e=1622073600&v=beta&t=r6Rq9MeuNbOAdzT5a-9pbbD3GzEnjhneg7LSv1Pdzj4"
              title="Clifford Sarkin (Creator)"
              description="cliff@casperlabs.io"
            >
              <Tag
                icon={
                  <img src={hellogreen} className="tag-icon" alt="hellogreen" />
                }
                color="success"
              >
                SIGNED
              </Tag>
              <Tag
                icon={
                  <img
                    src={caspergreen}
                    className="tag-icon"
                    alt="caspergreen"
                  />
                }
                color="success"
              >
                SIGNED
              </Tag>
            </Signer>
          </Timeline.Item>
          <Timeline.Item
            dot={<ClockCircleOutlined className="timeline-clock-icon" />}
            color="gray"
          >
            <Signer
              avatar="https://media-exp1.licdn.com/dms/image/C4D03AQHVQf5edhvWUw/profile-displayphoto-shrink_400_400/0/1554754824709?e=1622073600&v=beta&t=XEjTfTGHW8njxWw5jvoHquvYm110IdDiEkD6_8tXjWA"
              title="Mrinal Manohar (Signer)"
              description="mrinal@casperlabs.io"
            >
              <Tag
                icon={
                  <img src={hellogreen} className="tag-icon" alt="hellogreen" />
                }
                color="success"
              >
                SIGNED
              </Tag>
              <Tag
                icon={
                  <img
                    src={casperblack}
                    className="tag-icon"
                    alt="casperblack"
                  />
                }
                color="default"
              >
                AWAITING SIGN
              </Tag>
            </Signer>
          </Timeline.Item>
        </Timeline>
      </Card>
    </Layout>
  );
}

export default Signers;
