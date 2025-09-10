import { useState } from "react";

export default function FormMultiInputs() {
  // それぞれの入力値を state で管理
  const [bio, setBio] = useState("");          // textarea
  const [age, setAge] = useState("");          // number（空を許容するため最初は空文字）
  const [password, setPassword] = useState(""); // password
  const [showPw, setShowPw] = useState(false);  // 見える/見えない切替（任意の快適機能）

  // number入力は e.target.value が文字列で届く点に注意！
  // 空文字はそのまま保持し、数字なら Number() で数値化した値を state に入れてもOK
  const handleAgeChange = (e) => {
    const v = e.target.value;
    // 空欄は空文字のまま（未入力を表現）
    if (v === "") {
      setAge("");
      return;
    }
    // 数字に変換できる場合のみ反映（数値以外は無視）
    const n = Number(v);
    if (!Number.isNaN(n)) setAge(n);
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <h2>複数フォーム入力の練習</h2>

      {/* textarea */}
      <label style={{ display: "block", marginTop: 12 }}>
        自己紹介（textarea）
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="自由に書いてください"
          rows={4}
          style={{ width: "100%", display: "block", marginTop: 6 }}
        />
      </label>

      {/* number */}
      <label style={{ display: "block", marginTop: 12 }}>
        年齢（number）
        <input
          type="number"
          value={age}
          onChange={handleAgeChange}
          placeholder="例: 28"
          min={0}
          max={120}
          step={1}
          style={{ width: 160, display: "block", marginTop: 6 }}
        />
      </label>

      {/* password + 表示切替 */}
      <label style={{ display: "block", marginTop: 12 }}>
        パスワード（password）
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8文字以上推奨"
            style={{ flex: 1 }}
          />
          <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input
              type="checkbox"
              checked={showPw}
              onChange={(e) => setShowPw(e.target.checked)}
            />
            表示
          </label>
        </div>
      </label>

      {/* 現在の入力内容を確認表示（デバッグ/学習用） */}
      <hr style={{ margin: "16px 0" }} />
      <h3>現在の入力値</h3>
      <ul>
        <li>自己紹介: <pre style={{ display:"inline", whiteSpace:"pre-wrap" }}>{bio || "（未入力）"}</pre></li>
        <li>年齢: {age === "" ? "（未入力）" : age}</li>
        <li>パスワード: {password ? "（入力済）" : "（未入力）"}</li>
      </ul>
    </div>
  );
}
