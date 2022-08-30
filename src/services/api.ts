import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/";
// const apiKey = process.env.API_KEY;

export const getTodosReguest = async () => {
  const { data, status } = await axios.get(`${baseUrl}todos?_limit=10`);

  // если ошибка, то сейчас ловлю её в редюсере
  // а может логичнее здесь делать try - catch ?
  return { data, status };
};
