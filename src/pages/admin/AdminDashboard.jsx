import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, books: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  return (
    <section>
      <h2>Admin Dashboard</h2>
      <div className="grid">
        <div className="card">Users: {stats.users}</div>
        <div className="card">Books: {stats.books}</div>
        <div className="card">Orders: {stats.orders}</div>
        <div className="card">Revenue: ${stats.revenue}</div>
      </div>
      <div className="card">
        <Link to="/admin/books">Manage Books</Link> | <Link to="/admin/orders">Manage Orders</Link> |{" "}
        <Link to="/admin/users">Users</Link> | <Link to="/admin/reports">Reports</Link>
      </div>
    </section>
  );
};

export default AdminDashboard;
