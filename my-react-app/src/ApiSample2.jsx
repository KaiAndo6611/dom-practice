import { useEffect } from "react";

export default function ApiTest() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(res => res.json())
      .then(data => {
        console.log("取得したデータ:", data);
      })
      .catch(err => {
        console.error("エラー:", err);
      });
  }, []);

  return <h2>API Fetch Test</h2>;
}