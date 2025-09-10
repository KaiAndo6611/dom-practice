import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");

  // ← 検索フィルタ：name / username / email のいずれかに部分一致
  const qLower = q.toLowerCase();
  const filtered = users.filter(u =>
    [u.name, u.username, u.email].some(v => v?.toLowerCase().includes(qLower))
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        setError(e.message ?? "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Users</h2>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="名前 / ユーザー名 / メールで検索"
        style={{ marginBottom: 12 }}
      />

      {filtered.length === 0 ? (
        <p style={{ opacity: 0.7 }}>該当するユーザーがいません。</p>
      ) : (
        <ul>
          {filtered.map((u) => (
            <li key={u.id}>
              <strong>{u.name}</strong> @{u.username} / {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
