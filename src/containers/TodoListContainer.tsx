import TodoList from "../components/TodoList";
import { toggleTodo, deleteTodo, selectTodos, getTodos, selectTodosFull } from "../store/todoSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/typedRedux";

const TodoListContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const todos = useAppSelector(selectTodos);
  const { loading, error } = useAppSelector(selectTodosFull);

  // work with Store
  const toggleHandler = (id: string) => {
    dispatch(toggleTodo(id));
  };
  const deleteHandler = (id: string) => {
    dispatch(deleteTodo(id));
  };

  // loading / error / content ??
  if (loading) return <span>loading ...</span>;

  if (error) return <span>Что-то пошло не так: {error}</span>;

  return <TodoList todos={todos} toggleHandler={toggleHandler} deleteHandler={deleteHandler} />;
};

export default TodoListContainer;
