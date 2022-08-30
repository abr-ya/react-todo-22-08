import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "interfaces";
import { addTodoReguest, getTodosReguest } from "services/api";
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
  async function (title, { rejectWithValue }) {
    const todo = {
      title,
      userId: 1, // temp
      completed: false, // default ))
    };

    try {
      const { data, status } = await addTodoReguest(todo);
      const not201mes = "Axios получил результат, но статус не 200.";
      return status === 201 ? data : rejectWithValue(not201mes);
    } catch (error) {
      // rejectWithValue с проверкой типа ошибки и шаблоном сообщения
      return typedCatchHandler(error, rejectWithValue, "addTodo");
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
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
  reducers: {
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

export const { toggleTodo, deleteTodo } = todoSlice.actions;

export const selectTodos = (state: RootStateType) => state.todos.todos;
export const selectTodosFull = (state: RootStateType) => state.todos;

export default todoSlice.reducer;
