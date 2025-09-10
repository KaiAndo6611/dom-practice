import { useEffect, useState } from "react";

export default function ApiOnMount() {
  const [post, setPost] = useState(null);     // データ
  const [loading, setLoading] = useState(true); // 取得中か
  const [error, setError] = useState(null);     // エラー文

  useEffect(() => {
    let cancelled = false; // アンマウント対策（任意）

    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setPost(data);
      } catch (e) {
        if (!cancelled) setError(e.message ?? "エラーが発生しました");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPost();
    return () => { cancelled = true; }; // コンポーネントが消える時の後片付け
  }, []); // ← 空配列：初回だけ実行

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{color:"red"}}>Error: {error}</p>;
  if (!post)   return null;

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <small>post id: {post.id} / user: {post.userId}</small>
    </article>
  );
}
