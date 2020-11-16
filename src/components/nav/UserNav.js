import {
  HistoryOutlined,
  SecurityScanOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserNav() {
  const [current2, setCurrent2] = useState("");

  const handleClick = (e) => {
    setCurrent2(e.key);
    // console.log(current);
  };

  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={[current2]}
        style={{ width: 200, height: "100vh", position: "static" }}
        // mode="inline"
        theme="dark"
      >
        <Menu.Item key="history" icon={<HistoryOutlined />}>
          <Link to="/user/history">History</Link>
        </Menu.Item>
        <Menu.Item key="password" icon={<SecurityScanOutlined />}>
          <Link to="/user/password">Password</Link>
        </Menu.Item>
        <Menu.Item key="wishlist" icon={<StarOutlined />}>
          <Link to="/user/wishlist">Wishlist</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default UserNav;
