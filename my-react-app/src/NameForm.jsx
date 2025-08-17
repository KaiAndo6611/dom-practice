import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");

  return (
    <div style={{marginTop:16}}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前を入力"
      />
      <p>こんにちは、{name || "名無し"} さん！</p>
    </div>
  );
}
