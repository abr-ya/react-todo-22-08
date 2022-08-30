import axios from "axios";
import { IPatchTodo, IPostTodo } from "interfaces";

const baseUrl = "https://jsonplaceholder.typicode.com/";
// const apiKey = process.env.API_KEY;

export const getTodosReguest = async () => {
  const { data, status } = await axios.get(`${baseUrl}todos?_limit=10`);

  // если ошибка, то сейчас ловлю её в редюсере
  // а может логичнее здесь делать try - catch ?
  return { data, status };
};

export const addTodoReguest = async (todo: IPostTodo) => {
  const { data, status } = await axios.post(`${baseUrl}todos`, todo);

  return { data, status };
};

export const toggleTodoReguest = async ({ id, completed }: IPatchTodo) => {
  const { data, status } = await axios.patch(`${baseUrl}todos/${id}`, { completed });

  return { data, status };
};

export const deleteTodoReguest = async (id: string) => {
  // data здесь бессмысленна - она пустая
  const { status } = await axios.delete(`${baseUrl}todos/${id}`);

  return { data: { id }, status };
};
