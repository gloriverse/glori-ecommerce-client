import {
  EditOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import laptop from "../../images/laptop.png";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

function ProductCard({ product }) {
  //redux
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const [tooltip, setTooltip] = useState("Click to Add");
  const handleAddtoCart = () => {
    //create cart array
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      //save to local Storage
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");

      //add to Redux state

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      //show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  const { images, title, description, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No Rating yet!</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddtoCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br />{" "}
              {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Card.Meta
          title={`${title} - ₱ ${price}`}
          description={`${description && description.substring(0, 40)}...`}
        ></Card.Meta>
      </Card>
    </>
  );
}

export default ProductCard;
