import React from "react";

export const Todo = ({ todo, handleDelete }) => {
  return (
    <li>
      <p>{todo.description}</p>
      <button onClick={() => handleDelete(todo)}>
        <i className="fa fa-trash"></i>
      </button>
    </li>
  );
};
