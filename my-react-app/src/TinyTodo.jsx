import { useState, useEffect } from "react";

const STORAGE_KEY = "tiny_todos_v1";

export default function TinyTodo() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // 壊れたデータの場合は初期値にフォールバック
      }
    }
    return [
      { id: 1, title: "環境構築", done: true },
      { id: 2, title: "コンポーネント分割", done: true },
      { id: 3, title: "props基礎", done: false },
    ];
  });

  const remaining = todos.filter(td => !td.done).length;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const t = text.trim();
    if (text.trim() === "") {
        setError("⚠️ 入力してください");
        return;
      }
    const newTodo = { id: Date.now(), title: t, done: false };
    setTodos([...todos, newTodo]);   // 追加（新しい配列を作る）
    setText("");    // 入力リセット
    setError("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(td => td.id === id ? { ...td, done: !td.done } : td)); // 反転
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(td => td.id !== id)); // 削除
  };

  const filteredTodos = todos.filter(td => {
    if (filter === "active") return !td.done;
    if (filter === "done")   return td.done;
    return true; // all
  });
  

  return (
    <div style={{maxWidth: 420}}>
      <h2>Mini Todo</h2>

      <div style={{display:"flex", gap:8}}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="やることを入力"
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter") {
              e.preventDefault();
              addTodo();
            }
          }}
        />
        <button onClick={addTodo}>追加</button>
      </div>
      
      <div style={{display:"flex", gap:8, marginTop:8}}>
        <button onClick={()=>setFilter("all")}   aria-pressed={filter==="all"}>All</button>
        <button onClick={()=>setFilter("active")} aria-pressed={filter==="active"}>Active</button>
        <button onClick={()=>setFilter("done")}   aria-pressed={filter==="done"}>Done</button>
      </div>
      
      <p style={{marginTop:12}}>
        残り: <strong>{remaining}</strong> 件
      </p>

      {/* 以下のリスト表示ロジックのみに統一します */}
      {todos.length === 0 ? (
        // タスクが一件もない場合
        <p style={{opacity:0.7}}>まだタスクがありません。まずは1件追加してみましょう。</p>
      ) : filteredTodos.length === 0 ? (
        // タスクはあるが、フィルターで該当するものが一つもない場合
        <p style={{opacity:0.7}}>該当するタスクがありません。</p>
      ) : (
        // フィルターされたタスクを表示する場合
        <ul>
          {filteredTodos.map(td => (
            <li key={td.id} style={{display:"flex", alignItems:"center", gap:8}}>
              <button onClick={() => toggleTodo(td.id)}>
                {td.done ? "✅" : "⬜️"}
              </button>
              <span style={{textDecoration: td.done ? "line-through" : "none"}}>
                {td.title}
              </span>
              <button onClick={() => removeTodo(td.id)} style={{marginLeft:"auto"}}>
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}