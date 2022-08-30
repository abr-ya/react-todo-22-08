import { ITodo } from "interfaces";
import TodoItem from "./TodoItem";

interface ITodoList {
  todos: ITodo[];
  toggleHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
}

const TodoList = ({ todos, toggleHandler, deleteHandler }: ITodoList) => (
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
