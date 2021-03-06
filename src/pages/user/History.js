import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserOrders } from "../../functions/user";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

function History() {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log("GETTING ORDERS", res.data);
      setOrders(res.data);
    });

  const showOrderinTable = (order) => (
    <table className="table table-borded">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.product.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        {/* {console.log(JSON.stringify(order))} */}
        <ShowPaymentInfo order={order} />
        {showOrderinTable(order)}
        <div className="row ">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));
  return (
    <div className="container-fluid">
      <div className="row">
        <UserNav />

        <div className="col text-center">
          <h4>
            {" "}
            {orders.length > 0 ? "User Purchase Orders" : "No Purchase Orders"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
}

export default History;
