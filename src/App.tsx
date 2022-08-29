import { useCallback, useRef } from "react";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

const App = () => {
  const { todos, addTodo, removeTodo } = useTodos([
    { id: "1", title: "Проснуться!", completed: false },
    { id: "2", title: "Позавтракать", completed: false },
    { id: "3", title: "Сходить на работу", completed: false },
  ]);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <div className="App">
      <h1>ToDo List App</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.title}
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default App;
