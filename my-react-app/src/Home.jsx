// src/Home.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToTodo = () => {
    // '/tiny-todo' に遷移
    navigate('/tiny-todo'); 
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>ホームへようこそ！</h2>
      <p>このボタンを押すとTodoリストへ移動します。</p>
      <button onClick={goToTodo}>Todoリストへ移動</button>
      {/* 🔴 ここに <Header /> のような記述がないか確認してください */}
    </div>
  );
}

export default Home;