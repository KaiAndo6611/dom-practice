import { useState } from "react";

export default function ProfileForm() {
  // フォーム全体（制御コンポーネント）
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "other", // "male" | "female" | "other"
    bio: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [showPw, setShowPw] = useState(false);

  // 共通ハンドラ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 最低限のバリデーション
  const validate = (v) => {
    const es = {};
    if (!v.name.trim()) es.name = "名前は必須です。";
    if (!v.email.trim()) es.email = "メールは必須です。";
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
      es.email = "メール形式が正しくありません。";
    if (!v.password) es.password = "パスワードは必須です。";
    if (v.password && v.password.length < 8)
      es.password = "パスワードは8文字以上にしてください。";
    if (v.bio.length > 300) es.bio = "自己紹介は300文字以内で入力してください。";
    return es;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 既定の送信（ページ遷移）を止める
    const es = validate(form);
    setErrors(es);
    if (Object.keys(es).length) {
      setSubmitted(null);
      return;
    }
    setSubmitted(form); // ここでAPI送信もOK（例：axios.post('/api/profile', form)）
  };

  return (
    <div style={{ maxWidth: 680 }}>
      <h2>プロフィール入力フォーム</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* 名前 */}
        <label style={{ display: "block", marginTop: 10 }}>
          名前（必須）
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby="err-name"
            style={{ display: "block", width: "100%", marginTop: 6 }}
          />
          {errors.name && (
            <span id="err-name" style={{ color: "red" }}>{errors.name}</span>
          )}
        </label>

        {/* メール */}
        <label style={{ display: "block", marginTop: 12 }}>
          メール（必須）
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby="err-email"
            style={{ display: "block", width: "100%", marginTop: 6 }}
          />
          {errors.email && (
            <span id="err-email" style={{ color: "red" }}>{errors.email}</span>
          )}
        </label>

        {/* パスワード + 表示切替 */}
        <label style={{ display: "block", marginTop: 12 }}>
          パスワード（必須・8文字以上）
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
            <input
              type={showPw ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby="err-password"
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
          {errors.password && (
            <span id="err-password" style={{ color: "red" }}>{errors.password}</span>
          )}
        </label>

        {/* 性別（radio） */}
        <fieldset style={{ marginTop: 16 }}>
          <legend>性別</legend>
          {["male", "female", "other"].map((g) => (
            <label key={g} style={{ marginRight: 16 }}>
              <input
                type="radio"
                name="gender"
                value={g}
                checked={form.gender === g}
                onChange={handleChange}
              />
              {g}
            </label>
          ))}
        </fieldset>

        {/* 自己紹介（textarea） */}
        <label style={{ display: "block", marginTop: 12 }}>
          自己紹介（〜300文字）
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
            aria-invalid={!!errors.bio}
            aria-describedby="err-bio"
            style={{ display: "block", width: "100%", marginTop: 6 }}
          />
          {errors.bio && (
            <span id="err-bio" style={{ color: "red" }}>{errors.bio}</span>
          )}
        </label>

        <button type="submit" style={{ marginTop: 16 }}>送信</button>
      </form>

      {/* 送信結果 */}
      {submitted && (
        <>
          <hr style={{ margin: "16px 0" }} />
          <h3>送信された内容</h3>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
