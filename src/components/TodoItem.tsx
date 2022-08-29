const TodoItem = ({ id, title, completed, toggle, del }) => (
  <li>
    <input
      type="checkbox"
      checked={completed}
      onChange={toggle}
      id={`title_${id}`}
    />
    <label htmlFor={`title_${id}`}>{title}</label>
    <button onClick={del} type="button">
      &times;
    </button>
  </li>
);

export default TodoItem;
