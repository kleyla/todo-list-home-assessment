import React from "react";

export const Todo = ({ todo, handleDelete }) => {
  return (
    <li className="todo-item">
      <p>{todo.description}</p>
      <button className="btn-icon" onClick={() => handleDelete(todo)}>
        <i className="fa fa-trash"></i>
      </button>
    </li>
  );
};
