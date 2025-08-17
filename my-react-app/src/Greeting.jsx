function Greeting({ name = "ゲスト", message = "ようこそ！" }) {
    return (
      <div>
        <h2>こんにちは、{name}さん</h2>
        <p>{message}</p>
      </div>
    );
  }
  export default Greeting;
  