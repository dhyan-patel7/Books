import { useEffect, useState } from "react";
import api from "../../api/axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      <div className="grid">
        {users.map((user) => (
          <div className="card" key={user._id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageUsers;
