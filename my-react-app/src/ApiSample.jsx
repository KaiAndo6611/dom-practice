import { useEffect, useState } from "react";

export default function ApiSample() {
  const [post, setPost] = useState(null);     // 取得したデータ
  const [loading, setLoading] = useState(true); // ローディング状態
  const [error, setError] = useState(null);     // エラー

  useEffect(() => {
    // マウント時に一度だけ呼ぶ
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://api.github.com/users/octocat");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPost(data);
      } catch (e) {
        setError(e.message ?? "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{color:"red"}}>Error: {error}</p>;
  if (!post)   return null;

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <small>post id: {post.id} / user: {post.login}</small>
    </article>
  );
}
