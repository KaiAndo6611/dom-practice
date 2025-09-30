// src/CurrentLocation.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';

function CurrentLocation() {
  // ❶ useLocationフックを呼び出し、現在のロケーションオブジェクトを取得
  const location = useLocation();

  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>現在のロケーション情報</h3>
      {/* ❷ pathname（パス名）を表示 */}
      <p>パス名: <strong>{location.pathname}</strong></p>
      {/* ❸ search（クエリパラメータ）を表示 */}
      <p>クエリ: <strong>{location.search || 'なし'}</strong></p>
    </div>
  );
}

export default CurrentLocation;