import React from "react";

export const Form = ({ handleSubmit, handleInput, todo }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h4>You can create a to do </h4>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={todo.description}
          onChange={handleInput}
        />
      </div>

      <button type="submit">Send</button>
    </form>
  );
};
