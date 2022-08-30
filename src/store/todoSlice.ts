import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "interfaces";
import { RootStateType } from "./index";

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
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        return data;
      } else {
        throw new Error("getTodos response !ok");
      }
    } catch (error: any) {
      console.log("getTodos catch error:", error.message);

      return rejectWithValue(error.message);
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
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      });
    },
    toggleTodo(state, action: PayloadAction<string>) {
      // console.log(state, action);
      state.todos.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        if (el.id === action.payload) el.completed = !el.completed;
      });
    },
    deleteTodo(state, action: PayloadAction<string>) {
      // console.log(state, action);
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export const selectTodos = (state: RootStateType) => state.todos.todos;
export const selectTodosFull = (state: RootStateType) => state.todos;

export default todoSlice.reducer;
