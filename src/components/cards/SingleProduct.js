import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tabs, Tooltip } from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";

function SingleProduct({ product, onStarClick, star }) {
  const history = useHistory();
  const { title, images, description, _id } = product;

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

  const handleAddtoWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED to WISHLIST", res.data);
      toast.success("Added to Wishlist");
      history.push("/user/wishlist");
    });
  };
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <img src={image.url} key={image.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}
        <div className="container">
          <Tabs type="card">
            <Tabs.TabPane tab="Description" key="1">
              {description && description}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Description" key="2">
              Call us on xxx xxxx xxx to learn more about this product!
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No Rating yet!</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddtoCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-success" /> <br />{" "}
                {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
              </a>
            </Tooltip>,
            <a onClick={handleAddtoWishlist}>
              <HeartOutlined className="text-info" /> <br />
              Add to Wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                isSelectable={true}
                starRatedColor="red"
                changeRating={onStarClick}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
}

export default SingleProduct;
