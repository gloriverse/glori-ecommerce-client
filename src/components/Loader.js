import { Space, Spin } from "antd";
import React from "react";

function Loader() {
  return (
    <Space size="middle">
      <Spin size="large" />
    </Space>
  );
}

export default Loader;
