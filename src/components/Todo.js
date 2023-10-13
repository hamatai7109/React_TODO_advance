import React, { useRef, useState, useEffect } from "react";
import usePrevious from "./util/usePrevious";

const Todo = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewname] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  // 編集中の文字をリアルタイムで取得
  function handleChange(e) {
    setNewname(e.target.value);
  }

  // 編集内容の確定
  function handleSubmit(e) {
    e.preventDefault();
    if (newName) {
      props.editTask(props.id, newName);
      setNewname("");
      setEditing(false);
    } else {
      alert("編集内容が入力されていません。");
    }
  }

  // 編集中の画面
  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label className="text-xl" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="h-10 rounded-md p-2"
          type="text"
          value={newName}
          placeholder="Edit here..."
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="mt-5 flex justify-center gap-2">
        <button
          type="button"
          className="btn w-1/2 hover:bg-green-400"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
        <button type="submit" className="btn w-1/2">
          Save
        </button>
      </div>
    </form>
  );
  // 一覧表示中の画面
  const viewTemplate = (
    <div>
      <div className="flex items-center">
        <input
          id={props.id}
          className="h-9 w-9"
          type="checkbox"
          defaultChecked={props.completed}
          // チェックの切り替えをpropsで親のApp.jsに返す。
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="ml-3 text-xl" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button
          type="button"
          className="btn w-1/2"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn w-1/2 hover:bg-red-500"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  // 常にinputにフォーカスが当たっている状態にしておくために、useEffectを使用。
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [isEditing, wasEditing]);

  return <li>{isEditing ? editingTemplate : viewTemplate}</li>;
};

export default Todo;
