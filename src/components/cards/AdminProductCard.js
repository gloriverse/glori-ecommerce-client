import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.png";

function AdminProductCard({ product, handleRemove }) {
  const { title, slug, description, images } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={(e) => handleRemove(slug)}
        />,
      ]}
    >
      <Card.Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      ></Card.Meta>
    </Card>
  );
}

export default AdminProductCard;
