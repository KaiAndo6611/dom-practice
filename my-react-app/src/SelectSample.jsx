import { useState } from "react";

export default function SelectSample() {
  // 選択値のstate（初期値は空文字 or "default" などに設定可能）
  const [fruit, setFruit] = useState("");

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>ドロップダウンの練習</h2>

      <label>
        好きなフルーツを選んでください：
        <select
          value={fruit}
          onChange={(e) => setFruit(e.target.value)}
          style={{ display: "block", marginTop: 8, padding: 6 }}
        >
          <option value="">-- 選択してください --</option>
          <option value="apple">🍎 りんご</option>
          <option value="banana">🍌 バナナ</option>
          <option value="orange">🍊 オレンジ</option>
          <option value="grape">🍇 ぶどう</option>
        </select>
      </label>

      <p style={{ marginTop: 12 }}>
        選択されたフルーツ:{" "}
        <strong>{fruit || "（未選択）"}</strong>
      </p>
    </div>
  );
}
