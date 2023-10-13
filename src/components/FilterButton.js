import React from "react";

const FilterButton = (props) => {
  return (
    <button
      type="button"
      className="btn w-2/6 md:w-3/4"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  );
};

export default FilterButton;
