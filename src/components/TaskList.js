import React from "react";

const TaskList = (props) => {
  if (props.taskList.length === 0 && props.filter !== "Completed") {
    return null;
  }

  return (
    <>
      <div className="flex mt-4 md:items-center justify-center gap-3 md:flex-col">
        {props.filterList}
      </div>
      <h3 className="text-center mt-3 p-3 text-white bg-blue-400 text-xl font-bold">
        {props.filter} Tasks
      </h3>
      <ul className="mt-5 flex flex-col gap-8">{props.taskList}</ul>
    </>
  );
};

export default TaskList;
