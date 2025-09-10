import { useEffect, useState } from "react";

export default function PostList() {
  const [posts, setPosts] = useState([]);       // 一覧データ
  const [loading, setLoading] = useState(true); // ローディング
  const [error, setError] = useState(null);     // エラー

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        // 投稿の一覧（100件）を取得
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();  // ← ここで配列を受け取る
        setPosts(data);                 // ← state に格納（配列のまま）
      } catch (e) {
        setError(e.message ?? "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{color:"red"}}>Error: {error}</p>;
  if (!posts.length) return <p>データがありません。</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {/* ここが map の要点！ */}
        {posts.map(post => (
          <li key={post.id}>
            <strong>#{post.id}</strong> {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
