import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  applyCoupon,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
  createCashOrderForUser,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Checkout({ history }) {
  const dispatch = useDispatch();
  const { user, cod } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("suer cart res");
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address Saved");
      }
    });
  };
  const emptyCart = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
    }

    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    //remove from backend
    emptyUserCart(user.token)
      .then((res) => {
        setProducts([]);
        setTotal(0);
        setTotalAfterDiscount(0);
        setCoupon("");
        toast.success("Cart is empty, Continue Shopping");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const applyDiscountCoupon = () => {
    applyCoupon(coupon, user.token).then((res) => {
      console.log("REs coupon applied");
      if (res.data) {
        setTotalAfterDiscount(res.data);
        //update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        //update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={i} className="">
        <p>
          {p.product.title} ({p.color}) x {p.count} = &#8369;{" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));
  };

  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        className="form-control"
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, cod, couponTrueOrFalse).then((res) => {
      console.log("User Cash ordre created", res.data);
      //empty cart from redux
      if (res.data.ok) {
        if (typeof window !== undefined) localStorage.removeItem("cart");
        dispatch({ type: "ADD_TO_CART", payload: [] });
        dispatch({ type: "COUPON_APPLIED", payload: false });
        emptyUserCart(user.token);
        setTimeout(() => {
          history.push("/user/history");
        }, 3000);
      }
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Addresss</h4>
          <br />
          <br />
          {showAddress()}
          <hr />
          <h4>Got Coupon</h4>
          <br />
          {showApplyCoupon()}
          <br />
          {discountError && <p className="bg-danger p-2">{discountError}</p>}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />

          <p>Products ({products.length})</p>
          <hr />
          {showProductSummary()}
          <hr />
          <p>Cart Total: &#8369; {total}</p>

          {totalAfterDiscount > 0 && (
            <p className="bg-success p-2">
              Discount Applied : Total Payable: &#8369; {totalAfterDiscount}
            </p>
          )}
          <div className="row">
            <div className="col-md-6">
              {cod ? (
                <button
                  className="btn btn-primary btn-raised"
                  disabled={!addressSaved || !products.length}
                  onClick={createCashOrder}
                >
                  Place Order
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-raised"
                  disabled={!addressSaved || !products.length}
                  onClick={() => history.push("/payment")}
                >
                  Place Order
                </button>
              )}
            </div>
            <div className="col-md-6">
              <button
                disabled={!products.length}
                className="btn btn-primary"
                onClick={emptyCart}
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
