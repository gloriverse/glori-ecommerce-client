import {
  HistoryOutlined,
  SecurityScanOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminNav() {
  const [current2, setCurrent2] = useState("");

  const handleClick = (e) => {
    setCurrent2(e.key);
    // console.log(current);
  };

  return (
    <>
      <Menu
        onClick={handleClick}
        // selectedKeys={[current2]}
        style={{ width: 200, height: "100vh", position: "static" }}
        mode="inline"
        theme="dark"
      >
        <Menu.Item>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/product">Product</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/products">Products</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/category">Category</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/sub">Sub Category</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/coupon">Coupons</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/user/password">Password</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default AdminNav;
