import { useEffect, useState } from "react";
import api from "../../api/axios";

const statuses = ["pending", "processing", "shipped", "delivered"];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  return (
    <section>
      <h2>Manage Orders</h2>
      <div className="grid">
        {orders.map((order) => (
          <div className="card" key={order._id}>
            <p>Customer: {order.user?.name || "Unknown"}</p>
            <p>Total: ${order.totalAmount}</p>
            <p>Status: {order.status}</p>
            <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageOrders;
