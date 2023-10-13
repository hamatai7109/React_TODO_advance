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
      alert("Error: Nothing has been typed");
    }
  }

  return (
    <form
      className="my-6 flex flex-col items-center gap-3 border-b-2 pb-10 border-b-violet-300"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl">
        <label htmlFor="new-todo-input">What needs to be done?</label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="w-full px-4 py-3"
        name="text"
        autoComplete="off"
        placeholder="type here..."
        value={name}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="btn mt-4 h-12 rounded-xl w-3/4 max-w-sm hover:bg-red-500"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
