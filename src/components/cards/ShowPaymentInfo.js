import React from "react";

function ShowPaymentInfo({ order, showStatus = true }) {
  return (
    <div>
      <p>
        <span>Order Id: {order.paymentIntent.id}</span>
        {" / "}
        <span>
          Amount:
          {(order.paymentIntent.amount /= 100).toLocaleString("en-PH", {
            style: "currency",
            currency: "php",
          })}
        </span>
        {" / "}
        <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
        {" / "}
        <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
        {" / "}
        <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
        {" / "}
        <span>
          Order on:
          {new Date(order.paymentIntent.created * 1000).toLocaleDateString()}
        </span>
        {" / "}
        <br />
        {showStatus && (
          <span className="badge bg-primary text-white">
            Order Status: {order.orderStatus}
          </span>
        )}
      </p>
    </div>
  );
}

export default ShowPaymentInfo;
