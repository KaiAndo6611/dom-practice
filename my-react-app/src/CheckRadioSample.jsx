import { useState } from "react";

export default function CheckRadioSample() {
  // 複数チェックボックス：配列で管理
  const toppings = ["cheese", "tomato", "basil", "olives", "mushrooms"];
  const [selectedToppings, setSelectedToppings] = useState([]);

  // ラジオボタン：単一の文字列で管理
  const sizes = ["small", "medium", "large"];
  const [size, setSize] = useState("medium"); // 初期選択

  // チェックトグル
  const toggleTopping = (name) => {
    setSelectedToppings((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  // 便利：全選択/解除
  const allChecked = selectedToppings.length === toppings.length;
  const handleCheckAll = (checked) => {
    setSelectedToppings(checked ? [...toppings] : []);
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <h2>Checkbox & Radio の練習</h2>

      {/* ✅ Checkbox: 複数選択 */}
      <fieldset style={{ marginTop: 12 }}>
        <legend>ピザのトッピング（複数可）</legend>

        <label style={{ display: "block", marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => handleCheckAll(e.target.checked)}
          />
          すべて選択 / 解除
        </label>

        {toppings.map((name) => (
          <label key={name} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={selectedToppings.includes(name)}
              onChange={() => toggleTopping(name)}
            />
            {name}
          </label>
        ))}
      </fieldset>

      {/* 🔘 Radio: 単一選択 */}
      <fieldset style={{ marginTop: 16 }}>
        <legend>サイズ（いずれか1つ）</legend>
        {sizes.map((s) => (
          <label key={s} style={{ display: "block" }}>
            <input
              type="radio"
              name="pizza-size"         // ラジオは同じ name でグループ化
              value={s}
              checked={size === s}      // state と同じなら選択
              onChange={() => setSize(s)}
            />
            {s}
          </label>
        ))}
      </fieldset>

      {/* 現在の値の確認表示 */}
      <hr style={{ margin: "16px 0" }} />
      <h3>現在の選択</h3>
      <p>サイズ：<strong>{size}</strong></p>
      <p>
        トッピング：
        {selectedToppings.length ? selectedToppings.join(", ") : "（なし）"}
      </p>
    </div>
  );
}
