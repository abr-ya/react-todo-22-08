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

export interface IGUser {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
