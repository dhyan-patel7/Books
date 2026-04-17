import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => setOrders(res.data));
  }, []);

  return (
    <section>
      <div className="card">
        <h2>My Profile</h2>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>

      <div className="card">
        <h3>My Orders</h3>
        {orders.map((order) => (
          <p key={order._id}>
            #{order._id.slice(-6)} - ${order.totalAmount} - {order.status}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Profile;
