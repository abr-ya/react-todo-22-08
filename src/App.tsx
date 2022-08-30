import TodoList from "./components/TodoList";
import AddToDoForm from "./components/AddToDoForm";
import { addTodo, toggleTodo, deleteTodo, selectTodos, getTodos, selectTodosFull } from "./store/todoSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/typedRedux";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const todos = useAppSelector(selectTodos);
  const { loading, error } = useAppSelector(selectTodosFull);

  // work with Store
  const addHandler = (text: string) => {
    dispatch(addTodo(text));
  };
  const toggleHandler = (id: string) => {
    dispatch(toggleTodo(id));
  };
  const deleteHandler = (id: string) => {
    dispatch(deleteTodo(id));
  };

  // loading / error / content ??
  const renderContent = () => {
    if (loading) return <span>loading ...</span>;

    if (error) return <span>Что-то пошло не так: {error}</span>;

    return (
      <>
        <AddToDoForm addHandler={addHandler} />
        <TodoList todos={todos} toggleHandler={toggleHandler} deleteHandler={deleteHandler} />
      </>
    );
  };

  return (
    <div className="App">
      <h1>ToDo List App</h1>
      <h2>TypeScript, Webpack 5, React, Redux Toolkit, Axios, ESLint, Prettier</h2>
      {renderContent()}
    </div>
  );
};

export default App;
