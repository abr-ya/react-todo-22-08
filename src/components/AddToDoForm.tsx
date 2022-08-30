import { ChangeEvent, SyntheticEvent, useState } from "react";

interface IAddToDoForm {
  addHandler: (text: string) => void;
}

const AddToDoForm = ({ addHandler }: IAddToDoForm) => {
  const [text, setText] = useState("");

  const changeHandler = (target: HTMLInputElement) => {
    setText(target.value);
  };

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (text.trim().length) {
      addHandler(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => changeHandler(e.target as HTMLInputElement)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddToDoForm;
