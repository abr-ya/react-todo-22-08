import { useCallback, useReducer } from "react";

type ActionType =
  | { type: "ADD"; title: string }
  | { type: "REMOVE"; id: string };

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function useTodos(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
} {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: new Date().toISOString(),
            title: action.title,
            completed: false,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, initialTodos);

  const addTodo = useCallback((title: string) => {
    dispatch({
      type: "ADD",
      title,
    });
  }, []);

  const removeTodo = useCallback((id: string) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  }, []);

  return { todos, addTodo, removeTodo };
}
