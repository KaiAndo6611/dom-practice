import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function UsersExplorer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI 状態
  const [q, setQ] = useState("");
  const [city, setCity] = useState("all");
  const [sortKey, setSortKey] = useState("name"); // 'name' | 'username'

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        if (!cancelled) setUsers(res.data);
      } catch (e) {
        if (!cancelled) setError(e.message ?? "エラーが発生しました");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // 都市の選択肢（重複を排除）
  const cityOptions = useMemo(() => {
    const set = new Set(users.map(u => u.address?.city).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [users]);

  // 検索 + フィルタ + ソートを合成
  const qLower = q.toLowerCase();
  const filtered = useMemo(() => {
    const afterSearch = users.filter(u =>
      [u.name, u.username, u.email].some(v => v?.toLowerCase().includes(qLower))
    );
    const afterCity = city === "all"
      ? afterSearch
      : afterSearch.filter(u => (u.address?.city ?? "") === city);

    const sorted = [...afterCity].sort((a, b) => {
      const va = (a[sortKey] ?? "").toLowerCase();
      const vb = (b[sortKey] ?? "").toLowerCase();
      return va.localeCompare(vb);
    });
    return sorted;
  }, [users, qLower, city, sortKey]);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Users Explorer</h2>

      {/* コントロール群 */}
      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 160px 160px", alignItems: "center", margin: "12px 0" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="名前 / ユーザー名 / メールで検索"
          aria-label="検索"
        />
        <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="都市フィルタ">
          {cityOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt === "all" ? "すべての都市" : opt}
            </option>
          ))}
        </select>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} aria-label="並び替え">
          <option value="name">名前で昇順</option>
          <option value="username">ユーザー名で昇順</option>
        </select>
      </div>

      {/* 件数表示 */}
      <p style={{ margin: "6px 0 12px" }}>
        表示件数: <strong>{filtered.length}</strong> / {users.length}
      </p>

      {/* リスト */}
      {filtered.length === 0 ? (
        <p style={{ opacity: 0.7 }}>該当するユーザーが見つかりません。</p>
      ) : (
        <ul style={{ lineHeight: 1.6 }}>
          {filtered.map(u => (
            <li key={u.id} style={{ marginBottom: 8 }}>
              <strong>{u.name}</strong> @{u.username} / {u.email}
              <div style={{ opacity: 0.8, fontSize: 12 }}>
                {u.address?.city} / {u.company?.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
