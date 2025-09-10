import { useState } from "react";

export default function FormObjectSample() {
  // フォーム全体を1つのオブジェクトで管理
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    
    bio: "",
    gender: "other",
  });

  // 共通のハンドラ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,       // 既存の値は保持
      [name]: value, // name 属性で指定された項目だけ更新
    }));
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <h2>フォーム全体をオブジェクトで管理</h2>

      <label style={{ display: "block", marginTop: 8 }}>
        名前：
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </label>

      <label style={{ display: "block", marginTop: 8 }}>
        メール：
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </label>

      <label style={{ display: "block", marginTop: 8 }}>
        年齢：
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />
      </label>

      <label style={{ display: "block", marginTop: 8 }}>
        自己紹介：
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
        />
      </label>

      <fieldset style={{ marginTop: 12 }}>
        <legend>性別：</legend>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={form.gender === "male"}
            onChange={handleChange}
          /> 男性
        </label>
        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={form.gender === "female"}
            onChange={handleChange}
          /> 女性
        </label>
        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            name="gender"
            value="other"
            checked={form.gender === "other"}
            onChange={handleChange}
          /> その他
        </label>
      </fieldset>

      <hr style={{ margin: "16px 0" }} />
      <h3>入力内容の確認</h3>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}
