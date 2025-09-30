// src/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>404 Not Found</h1>
      <p>お探しのページは見つかりませんでした。</p>
      <Link to="/">ホームに戻る</Link>
    </div>
  );
}

export default NotFound;