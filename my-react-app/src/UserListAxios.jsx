import { useEffect, useState } from "react";
import axios from "axios";

export default function UserListAxios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        // fetch の代わりに axios.get を使用
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(res.data); // axiosはデータを直接 res.data に入れてくれる
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{color:"red"}}>Error: {error}</p>;

  return (
    <div>
      <h2>Users (axios)</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <strong>{u.name}</strong> @{u.username} / {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
