import { useState } from "react";

export default function TextInputSample() {
  // 入力内容を保存するstate
  const [text, setText] = useState("");

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>テキスト入力の練習</h2>
      <input
        type="text"
        value={text} // ← stateが入力欄の値になる
        onChange={(e) => setText(e.target.value)} // ← 入力するたびに更新
        placeholder="ここに入力してみてください"
        style={{ width: "100%", padding: 6, marginBottom: 12 }}
      />
      <p>入力された文字列: <strong>{text}</strong></p>
    </div>
  );
}
