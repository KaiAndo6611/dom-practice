import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{display:"flex", gap:8, alignItems:"center"}}>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
