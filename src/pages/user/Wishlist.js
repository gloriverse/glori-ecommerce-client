import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getWishlist, removeWishlist } from "../../functions/user";
import { DeleteOutlined } from "@ant-design/icons";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });
  };

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  return (
    <div className="container-fluid">
      <div className="row">
        <UserNav />

        <div className="col">
          <h4>Wishlist</h4>
          {wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                className="btn btn-sm float-right"
                onClick={() => handleRemove(p._id)}
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
