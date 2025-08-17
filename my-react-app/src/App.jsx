import './App.css'
import Header from "./header";
import Main from "./Body";
import Footer from "./Footer";
import TinyTodo from "./TinyTodo";

export default function App() {
  return (
    <div>
      <Header />
      <Main />
      <TinyTodo />
      <Footer />
    </div>
  );
}
