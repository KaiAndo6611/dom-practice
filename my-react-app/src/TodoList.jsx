function TodoList({ items = [] }) {
    return (
      <ul>
        {items.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.done ? "✅" : "⬜️"}
          </li>
        ))}
      </ul>
    );
  }
  export default TodoList;
  