import { useState } from "react";

export default function FormSubmitValidate() {
  // ① フォーム全体を1つのオブジェクトで管理
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    bio: "",
  });

  // ② エラー文（各項目ごと）
  const [errors, setErrors] = useState({});
  // ③ 送信後の結果表示用
  const [submitted, setSubmitted] = useState(null);

  // 共通ハンドラ：name属性をキーにして部分更新
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ④ バリデーション関数（必要十分な最低限）
  const validate = (values) => {
    const es = {};

    // 必須チェック
    if (!values.name.trim()) es.name = "名前は必須です。";
    if (!values.email.trim()) es.email = "メールは必須です。";
    if (!values.password) es.password = "パスワードは必須です。";

    // 形式チェック（簡易的）
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      es.email = "メール形式が正しくありません。";
    }

    // 数値チェック：空は許容、入力があれば0〜120の整数
    if (values.age !== "") {
      const n = Number(values.age);
      if (Number.isNaN(n)) es.age = "年齢は数値で入力してください。";
      else if (n < 0 || n > 120) es.age = "年齢は0〜120の範囲で入力してください。";
      else if (!Number.isInteger(n)) es.age = "年齢は整数で入力してください。";
    }

    // パスワード強度（最低8文字）
    if (values.password && values.password.length < 8) {
      es.password = "パスワードは8文字以上にしてください。";
    }

    // 自己紹介は任意（文字数上限だけ例示）
    if (values.bio.length > 300) {
      es.bio = "自己紹介は300文字以内で入力してください。";
    }

    return es;
  };

  // ⑤ 送信処理
  const handleSubmit = (e) => {
    e.preventDefault(); // ← 既定のフォーム送信（ページ遷移）を止める
    const es = validate(form);
    setErrors(es);

    if (Object.keys(es).length > 0) {
      setSubmitted(null); // エラーがあれば結果は消す
      return;
    }

    // エラーがなければ「送信成功」として結果表示（実際の送信API呼び出しはここで）
    setSubmitted(form);
  };

  // ⑥ UI：入力欄 + エラー表示 + 送信結果
  return (
    <div style={{ maxWidth: 640 }}>
      <h2>onSubmit と バリデーション</h2>

      <form onSubmit={handleSubmit} noValidate>
        <label style={{ display: "block", marginTop: 8 }}>
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

        <label style={{ display: "block", marginTop: 12 }}>
          年齢（任意）
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            min={0}
            max={120}
            step={1}
            aria-invalid={!!errors.age}
            aria-describedby="err-age"
            style={{ display: "block", width: 200, marginTop: 6 }}
          />
          {errors.age && (
            <span id="err-age" style={{ color: "red" }}>{errors.age}</span>
          )}
        </label>

        <label style={{ display: "block", marginTop: 12 }}>
          パスワード（必須・8文字以上）
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            aria-invalid={!!errors.password}
            aria-describedby="err-password"
            style={{ display: "block", width: "100%", marginTop: 6 }}
          />
          {errors.password && (
            <span id="err-password" style={{ color: "red" }}>{errors.password}</span>
          )}
        </label>

        <label style={{ display: "block", marginTop: 12 }}>
          自己紹介（任意・〜300文字）
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

        <button type="submit" style={{ marginTop: 16 }}>
          送信
        </button>
      </form>

      {/* 成功時の確認表示 */}
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
