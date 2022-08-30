export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export interface IPostTodo {
  title: string;
  completed: boolean;
  userId: number;
}

export interface IPatchTodo {
  id: string;
  completed: boolean;
}
