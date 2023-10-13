import React, { useState } from "react";

const Form = (props) => {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  // App.jsからpropsとして受け取った「addTask」を発動し、その結果を更にApp.jsに返す（子 → 親 へとデータを返す方法）
  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      props.addTask(name);
      setName("");
    } else {
      alert("値を入力してください");
    }
  }

  return (
    <form
      className="my-6 flex flex-col items-center gap-3"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl">
        <label htmlFor="new-todo-input">What needs to be done?</label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="w-full px-4 py-2"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn hover:bg-red-500">
        Add
      </button>
    </form>
  );
};

export default Form;
