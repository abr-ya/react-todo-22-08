import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "interfaces";
import { RootStateType } from "./index";

const initialTodoes: ITodo[] = [];

export const getTodos = createAsyncThunk("todos/getTodos", async (_params, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      return data;
    } else {
      throw new Error("getTodos error!");
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: initialTodoes,
    status: null,
    error: null,
  },
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [getTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
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
