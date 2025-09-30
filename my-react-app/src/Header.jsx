import { Link } from 'react-router-dom';
import CurrentLocation from "./CurrentLocation";

function Header() {
  return (
    <header>
      <h1>My React Site</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">ホーム</Link>
          </li>
          <li>
            <Link to="/tiny-todo">Todoリスト</Link>
          </li>
          <li>
            <Link to="/api-sample">APIサンプル</Link>
          </li>
          <li>
            <Link to="/posts/1">記事1を見る</Link>
          </li>
          <li>
            <Link to="/posts/2">記事2を見る</Link>
          </li>
        </ul>
      </nav>
      <CurrentLocation />
    </header>
  );
}
  
export default Header;