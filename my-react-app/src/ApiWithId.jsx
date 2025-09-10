import { useEffect, useState } from "react";

export default function ApiWithId() {
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPost(id) {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setPost(data);
      } catch (e) {
        if (!cancelled) setError(e.message ?? "エラーが発生しました");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPost(postId);
    return () => { cancelled = true; };
  }, [postId]); // ← postIdが変わるたびに再取得！

  return (
    <div>
      <div style={{display:"flex", gap:8, marginBottom:12}}>
        <button onClick={() => setPostId(1)}>ID 1</button>
        <button onClick={() => setPostId(2)}>ID 2</button>
        <button onClick={() => setPostId(3)}>ID 3</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{color:"red"}}>Error: {error}</p>}
      {post && (
        <article>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <small>post id: {post.id}</small>
        </article>
      )}
    </div>
  );
}
