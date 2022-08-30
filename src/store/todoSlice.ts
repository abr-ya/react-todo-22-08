import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "interfaces";
import { addTodoReguest, deleteTodoReguest, getTodosReguest, toggleTodoReguest } from "services/api";
import { RootStateType } from "./index";
import { typedCatchHandler } from "./utils";

interface ITodosState {
  todos: ITodo[];
  loading: boolean;
  error: string | null;
}

const initialState: ITodosState = {
  todos: [],
  loading: false,
  error: null,
};

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export const getTodos = createAsyncThunk<ITodo[], undefined, { rejectValue: string }>(
  "todos/getTodos",
  async (_params, { rejectWithValue }) => {
    // без try-catch нормально 404 не обрабатывался
    try {
      const { data, status } = await getTodosReguest();
      const not200mes = "Axios получил результат, но статус не 200.";
      return status === 200 ? data : rejectWithValue(not200mes);
    } catch (error) {
      // rejectWithValue с проверкой типа ошибки и шаблоном сообщения
      return typedCatchHandler(error, rejectWithValue, "getTodos");
    }
  },
);

export const addTodo = createAsyncThunk<ITodo, string, { rejectValue: string }>(
  "todos/addTodo",
  async (title, { rejectWithValue }) => {
    const todo = {
      title,
      userId: 1, // temp
      completed: false, // default ))
    };

    try {
      const { data, status } = await addTodoReguest(todo);
      const not201mes = "Axios получил результат, но статус не 201.";
      return status === 201 ? data : rejectWithValue(not201mes);
    } catch (error) {
      // rejectWithValue с проверкой типа ошибки и шаблоном сообщения
      return typedCatchHandler(error, rejectWithValue, "addTodo");
    }
  },
);

export const toggleTodo = createAsyncThunk<ITodo, string, { rejectValue: string; state: { todos: ITodosState } }>(
  "todos/toggleTodo",
  async (id, { rejectWithValue, getState }) => {
    const todo = getState().todos.todos.find((todo) => todo.id === id);

    if (todo) {
      const completed = !todo.completed;
      try {
        const { data, status } = await toggleTodoReguest({ id, completed });
        const not200mes = "Axios получил результат, но статус не 200.";
        return status === 200 ? data : rejectWithValue(not200mes);
      } catch (error) {
        // rejectWithValue с проверкой типа ошибки и шаблоном сообщения
        return typedCatchHandler(error, rejectWithValue, "toggleTodo");
      }
    }

    return rejectWithValue("No such todo in the list!");
  },
);

export const deleteTodo = createAsyncThunk<{ id: string }, string, { rejectValue: string }>(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const { data, status } = await deleteTodoReguest(id);
      const not200mes = "Axios получил результат, но статус не 200.";
      return status === 200 ? (data as any) : rejectWithValue(not200mes); // data {} => id
    } catch (error) {
      // rejectWithValue с проверкой типа ошибки и шаблоном сообщения
      return typedCatchHandler(error, rejectWithValue, "deleteTodo");
    }
  },
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(toggleTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.loading = false;
        const toggledTodo = state.todos.find((todo) => todo.id === action.payload.id);
        if (toggledTodo) toggledTodo.completed = action.payload.completed;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
  reducers: {},
});

export const selectTodos = (state: RootStateType) => state.todos.todos;
export const selectTodosFull = (state: RootStateType) => state.todos;

export default todoSlice.reducer;
