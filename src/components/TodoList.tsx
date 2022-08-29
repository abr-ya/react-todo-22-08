import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleHandler, deleteHandler }) => (
  <ul>
    {todos.map(({ id, title, completed }) => (
      <TodoItem
        key={id}
        id={id}
        title={title}
        completed={completed}
        toggle={() => toggleHandler(id)}
        del={() => deleteHandler(id)}
      />
    ))}
  </ul>
);

export default TodoList;
