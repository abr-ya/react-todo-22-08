import { useState } from "react";

const AddToDoForm = ({ addHandler }) => {
  const [text, setText] = useState("");

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (text.trim().length) {
      addHandler(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" value={text} onChange={changeHandler} />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddToDoForm;
