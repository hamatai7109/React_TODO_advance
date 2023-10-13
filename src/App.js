import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { nanoid, nanoids } from "nanoid";
import React, { useState, useEffect, useRef } from "react";
import usePrevious from "./components/util/usePrevious";
import TaskList from "./components/TaskList";

//App関数の外でフィルターを定義することで、レンダリングの影響を受けなくする。
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // tasksの内容を保持する。初期値はindex.jsから受け取ったDATAの値。
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  // チェックボタンの切り替えを保持
  function toggleTaskCompleted(id) {
    const updateTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updateTasks);
  }

  // タスク編集機能
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // タスク削除機能
  // Todo.js内で呼び出されたタスクのid「以外」の要素だけで、新しい配列「remainingTasks」を作成している。
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // index.jsで定義した「DATA」をpropsとして受け取り、map関数を用いて一覧表示している。その際に、Todoコンポーネントへ各項目をpropsとして渡している。
  // DATA(index.js) → taskList(App.js) → id,name,completed(Todo.js) : 親コンポーネントから子へと一方向の流れ
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id} //You should always pass a unique key to anything you render with iteration
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  // タスクのフィルター機能
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //taskの数によって、単数形と複数形の表示を変える。
  const tasksNoun =
    taskList.length === 0 ? "" : taskList.length === 1 ? "task" : "tasks";
  const headingNum = taskList.length === 0 ? "" : `${taskList.length}`;
  const headingText =
    taskList.length === 0 ? "You finished all tasks" : `${tasksNoun} remaining`;

  // タスクの追加機能
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="mx-auto max-w-3xl my-8 w-3/4 bg-gray-200 p-10">
      <h1 className="text-center text-5xl">Todo App</h1>
      <Form addTask={addTask} />
      <div className="mt-10  mx-auto w-3/4 md:w-full">
        <h2
          id="list-heading"
          tabIndex="-1"
          className="border-2 md:text-base bg-white p-3 text-center text-3xl font-bold"
          ref={listHeadingRef}
        >
          <span className="text-red-700 mr-1">{headingNum}</span>
          {headingText}
        </h2>
        <TaskList filter={filter} filterList={filterList} taskList={taskList} />
      </div>
    </div>
  );
}

export default App;
