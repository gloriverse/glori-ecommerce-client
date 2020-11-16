import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { changeStatus, getOrders } from "../../functions/admin";
import Orders from "../../components/order/Orders";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success(`Order Status Updated`);
      loadOrders();
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <AdminNav />

        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
