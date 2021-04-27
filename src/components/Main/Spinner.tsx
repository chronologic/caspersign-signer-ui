/* eslint-disable react/require-default-props */
import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { skyblue } from "../colors";

interface IProps {
  size?: number;
  className?: string;
}

function Spinner({ size = 24, className }: IProps) {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: size, color: skyblue }} spin />
  );

  return <Spin className={className} indicator={antIcon} />;
}

export default Spinner;
