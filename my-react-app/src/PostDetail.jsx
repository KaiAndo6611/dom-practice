import React from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();

  // ここではハードコードしたデータを使用しますが、
  // 実際にはAPIからデータを取得します。
  const posts = {
    '1': { title: '最初のブログ記事', content: 'これは最初の記事の内容です。' },
    '2': { title: '2番目のブログ記事', content: 'これは2番目の記事の内容です。' },
  };

  const post = posts[id];

  if (!post) {
    return <h2>記事が見つかりません</h2>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;