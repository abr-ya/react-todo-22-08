import AddToDoForm from "./components/AddToDoForm";
import { addTodo } from "./store/todoSlice";
import { useEffect, useState } from "react";
import readToken from "jwt-decode";
import { useAppDispatch } from "hooks/typedRedux";
import { IGUser } from "interfaces";
import TodoListContainer from "containers/TodoListContainer";

const App = () => {
  const [user, setUser] = useState<IGUser | null>(null);

  const dispatch = useAppDispatch();

  const loginHandler = (response: any) => {
    const token = response.credential;
    const gUser = readToken(token);
    setUser(gUser as IGUser);
    document.getElementById("authDiv").hidden = true;
  };

  const logoutHandler = (e: any) => {
    setUser(null);
    document.getElementById("authDiv").hidden = false;
  };

  useEffect(() => {
    console.log("App UseEffect!");

    // google auth global
    google.accounts.id.initialize({
      client_id: process.env.CLIENT_ID,
      callback: loginHandler,
    });

    google.accounts.id.renderButton(document.getElementById("authDiv"), { theme: "outline", size: "large" });
  }, []);

  // work with Store
  const addHandler = (text: string) => {
    dispatch(addTodo(text));
  };

  // login / logout
  const renderAuth = () => {
    if (user)
      return (
        <div>
          <img src={user.picture} alt="avatar" />
          <h3>{user.name}</h3>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      );

    return <span>логин Google:</span>;
  };

  return (
    <div className="App">
      {renderAuth()}
      <div id="authDiv"></div>
      <h1>ToDo List App</h1>
      <h2>TypeScript, Webpack 5, React, Redux Toolkit, Axios, ESLint, Prettier</h2>
      <AddToDoForm addHandler={addHandler} />
      <TodoListContainer />
    </div>
  );
};

export default App;
