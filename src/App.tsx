import { useSelector, useDispatch } from "react-redux";
import TodoList from "./components/TodoList";
import AddToDoForm from "./components/AddToDoForm";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  selectTodos,
} from "./store/todoSlice";

const App = () => {
  const todos = useSelector(selectTodos); // data for List

  // work with Store
  const dispatch = useDispatch();
  const addHandler = (text: string) => {
    dispatch(addTodo(text));
  };
  const toggleHandler = (id: string) => {
    dispatch(toggleTodo(id));
  };
  const deleteHandler = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="App">
      <h1>ToDo List App</h1>
      <AddToDoForm addHandler={addHandler} />
      <TodoList
        todos={todos}
        toggleHandler={toggleHandler}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
